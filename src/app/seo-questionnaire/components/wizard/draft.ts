import type { QConfig } from "@/src/lib/seo-questionnaire/config";
import { coerceValues, stripSecrets, type Values } from "@/src/lib/seo-questionnaire/schema";

export type Draft = { values: Values; step: number; maxReached: number; savedAt: number };

const key = (userId: number) => `visualytes:seo-questionnaire:v2:${userId}`;

/**
 * Progress is kept in this browser only, so a long questionnaire survives a refresh.
 * Passwords are never written to storage: they are stripped before saving. A saved draft is
 * re-fitted to the current questionnaire, so it still loads after the admin edits the form.
 */
export function loadDraft(userId: number, config: QConfig): Draft | null {
  try {
    const raw = window.localStorage.getItem(key(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Draft>;
    if (!parsed || typeof parsed !== "object" || !parsed.values) return null;
    const last = Math.max(config.steps.length - 1, 0);
    const clamp = (n: unknown) => (typeof n === "number" && Number.isFinite(n) ? Math.min(Math.max(Math.trunc(n), 0), last) : 0);
    const step = clamp(parsed.step);
    return { values: coerceValues(config, parsed.values), step, maxReached: Math.max(step, clamp(parsed.maxReached)), savedAt: Number(parsed.savedAt) || Date.now() };
  } catch {
    return null;
  }
}

export function saveDraft(userId: number, config: QConfig, draft: Draft): void {
  try {
    window.localStorage.setItem(key(userId), JSON.stringify({ ...draft, values: stripSecrets(config, draft.values) }));
  } catch {
    // Storage can be full or blocked (private mode); the questionnaire still works without it.
  }
}

export function clearDraft(userId: number): void {
  try {
    window.localStorage.removeItem(key(userId));
  } catch {
    // ignore
  }
}
