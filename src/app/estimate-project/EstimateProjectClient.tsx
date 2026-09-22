"use client";

import { Check } from "lucide-react";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { emptyValues, type FormField, type PublicForm } from "@/src/lib/forms/types";

const controlClass =
  "w-full rounded-md border border-gray-300 bg-white px-4 outline-none focus:border-blue-500";

export default function EstimateProjectClient({ form }: { form: PublicForm }) {
  const fields = form.fields;
  const [formData, setFormData] = useState<Record<string, string | boolean>>(() => emptyValues(fields));
  const [loading, setLoading] = useState(false);

  const setValue = (name: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/estimate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message || "Project estimate submitted successfully!");
        setFormData(emptyValues(fields));
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkboxes = fields.filter((f) => f.type === "checkbox");
  const inputs = fields.filter((f) => f.type !== "checkbox");

  return (
    <main className="relative overflow-hidden bg-slate-950 min-h-screen py-24 pt-40">
      <section className="mx-auto max-w-5xl px-6">
        <BrandPageBackdrop />

        <h1 className="mb-8 text-center text-4xl font-semibold text-blue-900">
          ESTIMATE PROJECT
        </h1>

        <div className="mb-10 flex items-center justify-center gap-5">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-yellow-400">
            <Image src="/assets/png/nagendra-sir.png" alt="CEO" fill className="object-cover" />
          </div>

          <div className="max-w-xl rounded-md bg-gray-50 px-5 py-4 text-sm font-semibold leading-6 text-blue-900 shadow-sm">
            Hi, I Am Nagendra, CEO Of Visualytes. I Would Love To Talk With You
            About Your Project Or Needs. Send Me An Email Or Answer Questions
            Below. Talk To You Soon!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl bg-gray-50 p-10 shadow-sm">
          {!form.isActive ? (
            <p className="py-10 text-center text-sm font-semibold text-blue-900">
              This form is currently unavailable. Please contact us directly.
            </p>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {inputs.map((field) => (
                  <Field
                    key={field.name}
                    field={field}
                    value={String(formData[field.name] ?? "")}
                    onChange={(value) => setValue(field.name, value)}
                  />
                ))}
              </div>

              {checkboxes.map((field) => (
                <label key={field.name} className="mt-6 flex cursor-pointer items-center gap-3 text-sm text-gray-500">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                      formData[field.name] ? "border-emerald-500 bg-emerald-500" : "border-gray-300 bg-white"
                    }`}
                  >
                    {formData[field.name] === true && <Check className="h-5 w-5 text-white" strokeWidth={3} />}
                  </div>

                  <input
                    type="checkbox"
                    checked={formData[field.name] === true}
                    required={field.required}
                    onChange={(e) => setValue(field.name, e.target.checked)}
                    className="hidden"
                  />

                  <span>{field.label}</span>
                </label>
              ))}

              <div className="mt-8 text-center">
                <button
                  type="button"
                  className="rounded-full border-2 border-yellow-400 px-8 py-2 text-sm font-semibold text-blue-600 transition hover:bg-yellow-50"
                >
                  Answer 2 more questions to get more precise estimation
                </button>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-pink-400 px-14 py-4 text-sm font-bold tracking-[3px] text-white shadow-md transition hover:scale-105 disabled:opacity-50"
                >
                  {loading ? "SUBMITTING..." : "ESTIMATE MY PROJECT"}
                </button>
              </div>
            </>
          )}
        </form>
      </section>
    </main>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={field.width === "full" ? "md:col-span-2" : ""}>
      <label className="mb-1 block text-sm text-gray-500">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {field.type === "textarea" ? (
        <textarea
          required={field.required}
          value={value}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlClass} h-24 py-3`}
        />
      ) : field.type === "select" ? (
        <select
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlClass} h-10 text-gray-600`}
        >
          <option value="" disabled>
            {field.placeholder || "Select Option"}
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          required={field.required}
          value={value}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlClass} h-10`}
        />
      )}
    </div>
  );
}
