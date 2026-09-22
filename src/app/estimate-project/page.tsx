import { ESTIMATE_FORM_KEY } from "@/src/lib/forms/defaults";
import { getPublicForm } from "@/src/lib/forms/server";
import EstimateProjectClient from "./EstimateProjectClient";

// Form fields come from the database, so this page must not be statically cached.
export const dynamic = "force-dynamic";

export default async function EstimateProjectPage() {
  const form = await getPublicForm(ESTIMATE_FORM_KEY);
  return <EstimateProjectClient form={form} />;
}
