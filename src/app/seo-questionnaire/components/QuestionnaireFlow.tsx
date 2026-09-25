"use client";

import { useSyncExternalStore } from "react";

import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";

import LoginCard from "./seo/LoginCard";
import type { QConfig } from "@/src/lib/seo-questionnaire/config";
import type { PlanOption } from "./wizard/PlanPicker";
import Wizard, { type WizardUser } from "./wizard/Wizard";

const subscribe = () => () => {};
/** false while rendering on the server / hydrating, true afterwards (safe place to read localStorage). */
const useMounted = () => useSyncExternalStore(subscribe, () => true, () => false);

function WizardSkeleton() {
  return (
    <div className="mx-auto h-[640px] w-full max-w-6xl animate-pulse overflow-clip rounded-[28px] bg-white/95 ring-1 ring-white/10 lg:grid lg:grid-cols-[340px_minmax(0,1fr)]">
      <div className="hidden bg-gradient-to-b from-[#070b1f] to-[#1b0a33] lg:block" />
      <div className="space-y-4 p-10">
        <div className="h-4 w-28 rounded-full bg-slate-200" />
        <div className="h-8 w-2/3 rounded-full bg-slate-200" />
        <div className="h-4 w-1/2 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

type Props = { user: WizardUser | null; plans: PlanOption[]; config: QConfig };

export default function QuestionnaireFlow({ user, plans, config }: Props) {
  const mounted = useMounted();

  return (
    <main className="relative overflow-clip bg-slate-950">
      <BrandPageBackdrop />
      <div className="relative z-10 px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        {!user ? <LoginCard /> : mounted ? <Wizard key={user.id} user={user} plans={plans} config={config} /> : <WizardSkeleton />}
      </div>
    </main>
  );
}
