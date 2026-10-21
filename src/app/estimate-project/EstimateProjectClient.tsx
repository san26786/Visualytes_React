"use client";

import { Check } from "lucide-react";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { emptyValues, type FormField, type PublicForm } from "@/src/lib/forms/types";
import PhoneField from "@/src/common/components/form/PhoneField";
import { digitsOnly, fieldError, formErrors, isNumericFieldName } from "@/src/lib/forms/validation";

const controlClass =
  "w-full rounded-md border border-gray-300 bg-white px-4 outline-none focus:border-blue-500";

export default function EstimateProjectClient({ form }: { form: PublicForm }) {
  const fields = form.fields;
  const [formData, setFormData] = useState<Record<string, string | boolean>>(() => emptyValues(fields));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setError = (name: string, message: string) =>
    setErrors((prev) => {
      if ((prev[name] ?? "") === message) return prev;
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });

  const setValue = (field: FormField, raw: string | boolean) => {
    let value = raw;
    // Budget keeps digits only; tell the visitor why a key was ignored (phone does this in PhoneField).
    if (typeof value === "string" && isNumericFieldName(field.name)) {
      const digits = digitsOnly(value);
      if (digits !== value) {
        setError(field.name, `${field.label} must contain numbers only.`);
        value = digits;
      } else if (errors[field.name]) {
        setError(field.name, fieldError(field, value));
      }
    } else if (errors[field.name]) {
      setError(field.name, fieldError(field, value));
    }
    setFormData((prev) => ({ ...prev, [field.name]: value }));
  };

  const handleBlur = (field: FormField) => setError(field.name, fieldError(field, formData[field.name]));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const found = formErrors(fields, formData);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fill in all mandatory fields correctly.");
      return;
    }

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
        setErrors({});
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
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-yellow-400">
            <Image src="/assets/png/nagendra-sir.png" alt="CEO" fill className="object-cover" />
          </div>

          <div className="max-w-xl rounded-md bg-gray-50 px-5 py-4 text-sm font-semibold leading-6 text-blue-900 shadow-sm">
            Hi, I Am Nagendra, CEO Of Visualytes. I Would Love To Talk With You
            About Your Project Or Needs. Send Me An Email Or Answer Questions
            Below. Talk To You Soon!
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-xl bg-gray-50 p-10 shadow-sm">
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
                    error={errors[field.name]}
                    onChange={(value) => setValue(field, value)}
                    onBlur={() => handleBlur(field)}
                    onNonDigit={() => setError(field.name, `${field.label} must contain numbers only.`)}
                  />
                ))}
              </div>

              {checkboxes.map((field) => (
                <div key={field.name}>
                <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm text-gray-500">
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
                    onChange={(e) => setValue(field, e.target.checked)}
                    className="hidden"
                  />

                  <span>{field.label}</span>
                </label>
                {errors[field.name] && <p role="alert" className="mt-1 text-xs font-medium text-red-500">{errors[field.name]}</p>}
                </div>
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
  error,
  onChange,
  onBlur,
  onNonDigit,
}: {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onNonDigit: () => void;
}) {
  const errorId = `${field.name}-error`;
  const a11y = { "aria-invalid": !!error, "aria-describedby": error ? errorId : undefined, onBlur };
  const invalid = error ? " border-red-500! focus:border-red-500!" : "";
  const numeric = isNumericFieldName(field.name);

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
          className={`${controlClass} h-24 py-3${invalid}`}
          {...a11y}
        />
      ) : field.type === "select" ? (
        <select
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlClass} h-10 text-gray-600${invalid}`}
          {...a11y}
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
      ) : field.type === "tel" ? (
        <PhoneField
          name={field.name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onNonDigit={onNonDigit}
          placeholder={field.placeholder}
          required={field.required}
          invalid={!!error}
          describedBy={error ? errorId : undefined}
          boxClassName={`${controlClass} h-10`}
          inputClassName={invalid}
        />
      ) : (
        <input
          type={field.type}
          inputMode={numeric ? "numeric" : undefined}
          required={field.required}
          value={value}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlClass} h-10${invalid}`}
          {...a11y}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
