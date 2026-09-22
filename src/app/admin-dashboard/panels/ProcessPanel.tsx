"use client";

import React, { FormEvent, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Plus,
  Save,
  Trash2,
  X,
  Sparkles,
  Layers,
  Upload,
  Pencil,
} from "lucide-react";
import type {
  ProcessSection,
  ProcessSectionForm,
  ProcessStep,
  ProcessStepForm,
} from "../types/dashboard";
import { Panel } from "../components/UI/Panel";
import { Input, Textarea } from "../components/UI/Input";
import { Button } from "../components/UI/Button";

interface ProcessPanelProps {
  process: ProcessSection | null;
  loading: boolean;
  saveSection: (id: string, data: ProcessSectionForm) => Promise<any>;
  createStep: (data: ProcessStepForm) => Promise<any>;
  updateStep: (id: string, data: ProcessStepForm) => Promise<any>;
  deleteStep: (id: string) => Promise<any>;
  toggleStep: (step: ProcessStep) => Promise<any>;
  moveStep: (id: string, direction: "up" | "down") => Promise<any>;
  reload: () => Promise<any>;
}

const EMPTY_STEP: ProcessStepForm = {
  title: "",
  description: "",
  image: "",
  color: "#06b6d4",
  sortOrder: 0,
  isActive: true,
};

const COLOR_PRESETS = [
  "#06b6d4", // Cyan
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#8b5cf6", // Purple
];

export default function ProcessPanel({
  process,
  saveSection,
  createStep,
  updateStep,
  deleteStep,
  toggleStep,
  moveStep,
  reload,
}: ProcessPanelProps) {
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [stepForm, setStepForm] = useState<ProcessStepForm>(EMPTY_STEP);
  const [showStepForm, setShowStepForm] = useState(false);
  const [savingStep, setSavingStep] = useState(false);
  const [savingSection, setSavingSection] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [sectionForm, setSectionForm] = useState<ProcessSectionForm>({
    title: process?.title ?? "Our Process",
    subtitle: process?.subtitle ?? "",
    backgroundColor: process?.backgroundColor ?? "#111827",
    isActive: process?.isActive ?? true,
  });

  const sortedSteps = useMemo(() => {
    return [...(process?.steps ?? [])].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }, [process]);

  const startCreate = () => {
    setEditingStep(null);
    setStepForm({
      ...EMPTY_STEP,
      sortOrder: sortedSteps.length,
    });
    setShowStepForm(true);
  };

  const startEdit = (step: ProcessStep) => {
    setEditingStep(step);
    setStepForm({
      title: step.title,
      description: step.description,
      image: step.image || "",
      color: step.color || "#06b6d4",
      sortOrder: step.sortOrder,
      isActive: step.isActive,
    });
    setShowStepForm(true);
  };

  const cancelEdit = () => {
    setEditingStep(null);
    setStepForm(EMPTY_STEP);
    setShowStepForm(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadingImage(true);
      const response = await fetch("/api/admin/upload-process", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");
      setStepForm((prev) => ({ ...prev, image: data.image }));
    } catch (err) {
      console.error(err);
      alert("Failed to upload process image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveStep = async (e: FormEvent) => {
    e.preventDefault();
    if (!stepForm.title.trim()) return;

    try {
      setSavingStep(true);
      if (editingStep) {
        await updateStep(editingStep.id, stepForm);
      } else {
        await createStep(stepForm);
      }
      cancelEdit();
      await reload();
    } finally {
      setSavingStep(false);
    }
  };

  const handleSaveSection = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!process?.id) return;

    try {
      setSavingSection(true);
      await saveSection(process.id, sectionForm);
      await reload();
    } finally {
      setSavingSection(false);
    }
  };

  const handleDeleteStep = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this process step?")) {
      return;
    }
    await deleteStep(id);
    if (editingStep?.id === id) {
      cancelEdit();
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header Settings */}
      <Panel
        title="Process Section Global Settings"
        description="Configure headline and presentation settings for the process block"
        icon={<Sparkles size={18} className="text-cyan-600" />}
      >
        <form onSubmit={handleSaveSection} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Section Headline"
              value={sectionForm.title}
              required
              onChangeValue={(v) =>
                setSectionForm((prev) => ({ ...prev, title: v }))
              }
            />
            <Input
              label="Background Color Hex"
              value={sectionForm.backgroundColor}
              placeholder="#111827"
              onChangeValue={(v) =>
                setSectionForm((prev) => ({ ...prev, backgroundColor: v }))
              }
            />
            <div className="sm:col-span-2">
              <Textarea
                label="Section Subtitle / Description"
                rows={2}
                value={sectionForm.subtitle ?? ""}
                onChange={(e) =>
                  setSectionForm((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 p-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={sectionForm.isActive}
                onChange={(e) =>
                  setSectionForm((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded text-cyan-600 focus:ring-cyan-500 accent-cyan-600"
              />
              <span>Process Section Active on Homepage</span>
            </label>

            <Button
              type="submit"
              variant="primary"
              isLoading={savingSection}
              icon={<Save size={16} />}
            >
              Save Section Settings
            </Button>
          </div>
        </form>
      </Panel>

      {/* Step Creator Form (When Open) */}
      {showStepForm && (
        <Panel
          title={editingStep ? "Edit Process Step" : "Add New Process Step"}
          description="Define the workflow sequence details, accent color, and illustrative icon"
          icon={<Layers size={18} className="text-indigo-600" />}
          headerAction={
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X size={18} />
            </button>
          }
        >
          <form onSubmit={handleSaveStep} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Step Title"
                placeholder="e.g. Discovery & Blueprint"
                value={stepForm.title}
                required
                onChangeValue={(val) =>
                  setStepForm((prev) => ({ ...prev, title: val }))
                }
              />

              <Input
                label="Sequence Sort Order"
                type="number"
                value={String(stepForm.sortOrder)}
                onChangeValue={(val) =>
                  setStepForm((prev) => ({
                    ...prev,
                    sortOrder: Number(val) || 0,
                  }))
                }
              />

              <div className="sm:col-span-2">
                <Textarea
                  label="Step Description"
                  placeholder="Detailed breakdown of activities performed in this phase..."
                  rows={3}
                  value={stepForm.description}
                  required
                  onChange={(e) =>
                    setStepForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Accent Color Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Step Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={stepForm.color}
                    onChange={(e) =>
                      setStepForm((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                    className="h-11 w-14 rounded-xl border border-slate-200 p-1 cursor-pointer bg-white"
                  />
                  <div className="flex items-center gap-1.5">
                    {COLOR_PRESETS.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() =>
                          setStepForm((prev) => ({ ...prev, color: col }))
                        }
                        className={`h-7 w-7 rounded-lg border transition ${
                          stepForm.color.toLowerCase() === col.toLowerCase()
                            ? "ring-2 ring-slate-900 scale-110"
                            : "border-slate-200"
                        }`}
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Step Icon / Illustration
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-2.5 text-xs font-semibold text-slate-700 hover:border-cyan-400 hover:bg-cyan-50/20 transition cursor-pointer">
                    <Upload size={14} />
                    {uploadingImage ? "Uploading..." : "Upload Step Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>

                  {stepForm.image && (
                    <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <img
                        src={stepForm.image}
                        alt="Step"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button type="button" variant="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={savingStep}
                icon={<Save size={16} />}
              >
                {editingStep ? "Update Step" : "Save Step"}
              </Button>
            </div>
          </form>
        </Panel>
      )}

      {/* Steps List */}
      <Panel
        title="Process Steps Flow"
        description="Chronological phases in the client delivery journey"
        icon={<Layers size={18} className="text-indigo-600" />}
        badge={
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
            {sortedSteps.length} Steps
          </span>
        }
        headerAction={
          !showStepForm && (
            <Button
              type="button"
              onClick={startCreate}
              variant="primary"
              size="sm"
              icon={<Plus size={15} />}
            >
              Add Step
            </Button>
          )
        }
      >
        {sortedSteps.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-12 text-center">
            <Layers className="text-slate-300" size={32} />
            <p className="mt-2 text-sm font-semibold text-slate-700">
              No process steps configured yet.
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Click &apos;Add Step&apos; to create step #1.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedSteps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-xs text-sm"
                    style={{ backgroundColor: step.color || "#06b6d4" }}
                  >
                    0{index + 1}
                  </span>

                  {step.image && (
                    <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {step.title}
                      </h4>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.2 text-[9px] font-semibold ${
                          step.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {step.isActive ? "Active" : "Hidden"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  {/* Reordering Up/Down */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 mr-1">
                    <button
                      type="button"
                      onClick={() => moveStep(step.id, "up")}
                      disabled={index === 0}
                      className="p-1.5 text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(step.id, "down")}
                      disabled={index === sortedSteps.length - 1}
                      className="p-1.5 text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStep(step)}
                    title={step.isActive ? "Hide step" : "Show step"}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                  >
                    {step.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => startEdit(step)}
                    title="Edit step"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteStep(step.id)}
                    title="Delete step"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}