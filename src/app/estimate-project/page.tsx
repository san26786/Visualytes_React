import { ESTIMATE_FORM_KEY } from "@/src/lib/forms/defaults";
import { getPublicForm } from "@/src/lib/forms/server";
import EstimateProjectClient from "./EstimateProjectClient";

// Cached for an hour; any admin save clears it straight away (see api/admin/[...slug]/route.ts).
export const revalidate = 3600;

export default async function EstimateProjectPage() {
  const form = await getPublicForm(ESTIMATE_FORM_KEY);
  return <EstimateProjectClient form={form} />;
}
