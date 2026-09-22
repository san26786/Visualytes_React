"use client";

import React, { useMemo, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { FAQ, FAQForm } from "../types/dashboard";
import { Panel } from "../components/UI/Panel";
import { Input, Textarea } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Eye,
  EyeOff,
  HelpCircle,
  Search,
  SlidersHorizontal,
  CheckCircle2} from "lucide-react";

interface FAQPanelProps {
  faqs: FAQ[];
  form: FAQForm;
  setForm: Dispatch<SetStateAction<FAQForm>>;
  editing: FAQ | null;
  setEditing: Dispatch<SetStateAction<FAQ | null>>;
  save: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  select: (faq: FAQ) => void;
  remove: (id: string) => Promise<void>;
  toggleActive: (faq: FAQ) => Promise<void>;
}

const EMPTY_FORM: FAQForm = {
  question: "",
  answer: "",
  sortOrder: 0,
  isActive: true,
};

export default function FAQPanel({
  faqs,
  form,
  setForm,
  editing,
  setEditing,
  save,
  select,
  remove,
  toggleActive,
}: FAQPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [submitting, setSubmitting] = useState(false);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return [...faqs]
      .filter((faq) => {
        const matchesQuery =
          !query ||
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && faq.isActive) ||
          (statusFilter === "inactive" && !faq.isActive);

        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [faqs, searchQuery, statusFilter]);

  const handleChange = (
    field: keyof FAQForm,
    value: string | number | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const openCreateForm = () => {
    setEditing(null);
    setForm({
      ...EMPTY_FORM,
      sortOrder: faqs.length,
    });
    setShowForm(true);
  };

  const openEditForm = (faq: FAQ) => {
    select(faq);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.question.trim()) {
      alert("Please enter a question.");
      return;
    }
    if (!form.answer.trim()) {
      alert("Please enter an answer.");
      return;
    }

    try {
      setSubmitting(true);
      await save(e);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 shadow-xs">
            <HelpCircle size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                FAQ Knowledge Base
              </h2>
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cyan-700">
                {faqs.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Create, sequence, and manage frequently asked questions for customers
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={openCreateForm}
          variant="primary"
          icon={<Plus size={16} />}
        >
          Add New FAQ
        </Button>
      </div>

      {/* Form Card (When Open) */}
      {showForm && (
        <Panel
          title={editing ? "Edit FAQ Item" : "Create New FAQ"}
          description="Write clear questions and helpful answers"
          icon={<HelpCircle size={18} className="text-cyan-600" />}
          headerAction={
            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X size={18} />
            </button>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Question"
              placeholder="e.g. How long does a standard SEO campaign take to show results?"
              value={form.question}
              required
              onChangeValue={(val) => handleChange("question", val)}
            />

            <Textarea
              label="Answer Details"
              placeholder="Provide a comprehensive and helpful response for your clients..."
              rows={4}
              value={form.answer}
              required
              onChange={(e) => handleChange("answer", e.target.value)}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Display Sort Order"
                type="number"
                min={0}
                value={String(form.sortOrder)}
                onChangeValue={(val) =>
                  handleChange("sortOrder", Number(val) || 0)
                }
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Visibility Status
                </label>
                <button
                  type="button"
                  onClick={() => handleChange("isActive", !form.isActive)}
                  className={`flex h-11 w-full items-center justify-between rounded-xl border px-3.5 text-xs font-semibold transition cursor-pointer ${
                    form.isActive
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className={form.isActive ? "text-emerald-600" : "text-slate-400"}
                    />
                    {form.isActive ? "Active (Visible on Site)" : "Inactive (Hidden)"}
                  </span>
                  {form.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button type="button" variant="secondary" onClick={closeForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={submitting}
                icon={<Save size={16} />}
              >
                {editing ? "Update FAQ" : "Save FAQ"}
              </Button>
            </div>
          </form>
        </Panel>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by question keywords or answers..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 shadow-xs outline-none focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
          <SlidersHorizontal size={14} className="ml-2 text-slate-400" />
          {(["all", "active", "inactive"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setStatusFilter(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition cursor-pointer ${
                statusFilter === type
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items Grid/List */}
      {filteredFaqs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center shadow-xs">
          <div className="rounded-full bg-slate-100 p-3 text-slate-400">
            <HelpCircle size={32} />
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900">
            No FAQs found
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            {searchQuery
              ? "No items match your search keywords."
              : "Click 'Add New FAQ' above to create your first question."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700">
                    #{faq.sortOrder}
                  </span>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="whitespace-pre-line text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>

                    <div className="pt-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          faq.isActive
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            faq.isActive ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        {faq.isActive ? "Active on Website" : "Hidden"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-start">
                  <button
                    type="button"
                    onClick={() => toggleActive(faq)}
                    title={faq.isActive ? "Deactivate FAQ" : "Activate FAQ"}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                  >
                    {faq.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditForm(faq)}
                    title="Edit FAQ"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => remove(faq.id)}
                    title="Delete FAQ"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}