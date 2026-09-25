import { getCurrentSession } from "@/src/lib/auth";
import { publicConfig } from "@/src/lib/seo-questionnaire/config";
import { getQuestionnaireConfig } from "@/src/lib/seo-questionnaire/server";
import { getPublicPlans } from "@/src/lib/packages/queries";

import QuestionnaireFlow from "./components/QuestionnaireFlow";
import type { PlanOption } from "./components/wizard/PlanPicker";

// Depends on the visitor's session cookie.
export const dynamic = "force-dynamic";

export default async function SeoQuestionnairePage() {
  const session = await getCurrentSession();

  // Plans (from the Packages tab in admin) are only needed once the visitor is signed in.
  const { config } = await getQuestionnaireConfig();
  const plans: PlanOption[] = session
    ? (await getPublicPlans()).map((plan) => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        highlights: plan.keywords
          .filter((item) => item.enabled)
          .slice(0, 4)
          .map((item) => (item.value ? `${item.name}: ${item.value}` : item.name)),
      }))
    : [];

  return (
    <QuestionnaireFlow
      user={session ? { id: session.id, name: session.name, email: session.email } : null}
      plans={plans}
      config={publicConfig(config)}
    />
  );
}
