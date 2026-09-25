import "server-only";

import { Prisma } from "@/src/generated/prisma-admin";
import { prisma } from "@/src/lib/prisma";

import { FORM_KEY, defaultConfig, parseConfig, type QConfig } from "./config";

/**
 * The questionnaire definition the site is currently using. Falls back to the built-in default when
 * nothing has been saved yet (or the stored copy is unreadable), so the public form never breaks.
 */
export async function getQuestionnaireConfig(): Promise<{ config: QConfig; customised: boolean; updatedAt: Date | null }> {
  try {
    const row = await prisma.seoQuestionnaireConfig.findUnique({ where: { key: FORM_KEY } });
    if (row) {
      const parsed = parseConfig(row.config);
      if (parsed.ok) return { config: parsed.config, customised: true, updatedAt: row.updatedAt };
      console.error("Stored SEO questionnaire is invalid, using the default:", parsed.message);
    }
  } catch (error) {
    console.error("Unable to load the SEO questionnaire definition, using the default", error);
  }
  return { config: defaultConfig(), customised: false, updatedAt: null };
}

export async function saveQuestionnaireConfig(config: QConfig) {
  const json = config as unknown as Prisma.InputJsonValue;
  return prisma.seoQuestionnaireConfig.upsert({
    where: { key: FORM_KEY },
    create: { key: FORM_KEY, config: json },
    update: { config: json },
  });
}

export async function resetQuestionnaireConfig() {
  await prisma.seoQuestionnaireConfig.deleteMany({ where: { key: FORM_KEY } });
}
