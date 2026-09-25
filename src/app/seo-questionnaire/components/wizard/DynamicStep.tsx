"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/src/common/utils/cn";
import type { QField, QStep } from "@/src/lib/seo-questionnaire/config";
import { conditionMet, singular, visibleFields, type RepeaterRow } from "@/src/lib/seo-questionnaire/schema";

import AccountCard from "./AccountCard";
import { Callout, CheckCard, PasswordField, SectionTitle, SelectField, TagInput, TextAreaField, TextField, YesNo, bind, type StepProps } from "./fields";
import PlanPicker, { type PlanOption } from "./PlanPicker";

type Props = StepProps & { step: QStep; plans: PlanOption[] };

const ALWAYS_FULL = new Set(["heading", "note", "plans", "repeater", "account", "tags"]);

function RepeaterField({ field, ...props }: StepProps & { field: QField }) {
  const rows = (props.values[field.key] as RepeaterRow[] | undefined) ?? [];
  const subs = field.subFields ?? [];
  const item = field.itemLabel || "Item";

  return (
    <div className="space-y-4">
      {rows.map((_, index) => {
        const mustFill = index < (field.requiredRows ?? 0);
        return (
          <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-colors duration-200 focus-within:border-fuchsia-200 focus-within:bg-white sm:p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-xs font-bold text-white">{index + 1}</span>
              <span className="text-sm font-semibold text-slate-800">
                {item} {index + 1}
              </span>
              {mustFill && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600">Required</span>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {subs.map((sub) => (
                <TextField
                  key={sub.key}
                  label={sub.label}
                  required={mustFill && sub.required}
                  type={sub.type}
                  placeholder={sub.placeholder}
                  {...bind(props, `${field.key}.${index}.${sub.key}`)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FieldView({ field, plans, ...props }: StepProps & { field: QField; plans: PlanOption[] }) {
  const { values, errors, set } = props;
  const f = () => bind(props, field.key);

  switch (field.type) {
    case "heading":
      return <SectionTitle title={field.label} description={field.hint} />;
    case "note":
      return <Callout tone={field.tone ?? "info"}>{field.label}</Callout>;
    case "text":
    case "email":
    case "tel":
    case "url":
      return (
        <TextField
          label={field.label}
          required={field.required}
          type={field.type}
          placeholder={field.placeholder}
          hint={field.hint}
          maxLength={field.maxLength}
          autoComplete={field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined}
          {...f()}
        />
      );
    case "textarea":
      return <TextAreaField label={field.label} required={field.required} placeholder={field.placeholder} hint={field.hint} rows={field.rows ?? 4} maxLength={field.maxLength} {...f()} />;
    case "select":
      return <SelectField label={field.label} required={field.required} placeholder={field.placeholder} hint={field.hint} options={field.options ?? []} {...f()} />;
    case "password":
      return <PasswordField label={field.label} required={field.required} placeholder={field.placeholder} hint={field.hint} {...f()} />;
    case "yesno":
      return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800">{field.label}</p>
            {field.hint && <p className="text-[13px] text-slate-500">{field.hint}</p>}
          </div>
          <YesNo label={field.key} value={values[field.key] === true} onChange={(v) => set(field.key, v)} />
        </div>
      );
    case "checkbox":
      return <CheckCard checked={values[field.key] === true} onChange={(v) => set(field.key, v)} title={field.label} description={field.hint} error={errors[field.key]} />;
    case "tags": {
      const max = field.maxLength ?? 30;
      return (
        <TagInput
          label={field.label}
          required={field.required}
          noun={singular(field.label)}
          max={max}
          values={(values[field.key] as string[] | undefined) ?? []}
          onChange={(v) => set(field.key, v)}
          placeholder={field.placeholder ?? "Type and press Enter…"}
          hint={`${field.hint ? `${field.hint} ` : ""}Add up to ${max}.`}
          error={errors[field.key]}
        />
      );
    }
    case "plans":
      return plans.length > 0 ? (
        <PlanPicker plans={plans} value={(values[field.key] as string) ?? ""} onChange={(v) => set(field.key, v)} error={errors[field.key]} />
      ) : (
        <TextField label={field.label} required={field.required} placeholder={field.placeholder ?? "e.g. Basic - £350"} hint={field.hint} {...f()} />
      );
    case "repeater":
      return <RepeaterField field={field} {...props} />;
    case "account":
      return <AccountCard field={field} {...props} />;
    default:
      return null;
  }
}

/** Renders one step of the questionnaire from its stored definition. */
export default function DynamicStep({ step, plans, ...props }: Props) {
  const fields = visibleFields(step, props.values);

  return (
    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <AnimatePresence initial={false}>
        {fields.map((field, index) => {
          const full = field.width === "full" || ALWAYS_FULL.has(field.type);
          const className = cn(full && "sm:col-span-2", field.type === "heading" && index > 0 && "mt-4");
          const content = <FieldView field={field} plans={plans} {...props} />;
          // A "show if" is evaluated against the live answers, so these fields fade in/out as the client answers.
          return field.showIf && conditionMet(field.showIf, props.values) ? (
            <motion.div key={field.key} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={className}>
              {content}
            </motion.div>
          ) : (
            <div key={field.key} className={className}>
              {content}
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
