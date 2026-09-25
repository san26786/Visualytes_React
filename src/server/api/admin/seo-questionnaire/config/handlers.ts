import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { defaultConfig, parseConfig } from "@/src/lib/seo-questionnaire/config";
import { getQuestionnaireConfig, resetQuestionnaireConfig, saveQuestionnaireConfig } from "@/src/lib/seo-questionnaire/server";

/** GET /api/admin/seo-questionnaire/config - the definition the public form currently uses. */
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const { config, customised, updatedAt } = await getQuestionnaireConfig();
  return NextResponse.json({ config, customised, updatedAt, defaults: defaultConfig() });
}

/** PUT /api/admin/seo-questionnaire/config  body: QConfig - validates and saves; live on the site immediately. */
export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const parsed = parseConfig(await request.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ message: parsed.message }, { status: 400 });
  const row = await saveQuestionnaireConfig(parsed.config);
  return NextResponse.json({ config: parsed.config, customised: true, updatedAt: row.updatedAt });
}

/** DELETE /api/admin/seo-questionnaire/config - restores the built-in questionnaire. */
export async function DELETE() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  await resetQuestionnaireConfig();
  return NextResponse.json({ config: defaultConfig(), customised: false, updatedAt: null });
}
