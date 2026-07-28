import CheckoutButton from "./CheckoutButton";

import type { MarketingPlan } from "../types";

interface PlanHeaderProps {
  plan: MarketingPlan;
  loading: string | null;
  checkout: (plan: MarketingPlan) => void;
}

export default function PlanHeader({ plan, loading, checkout }: PlanHeaderProps) {
  return (
    <div
      className="
      flex
      min-h-[360px]
      flex-col
      p-8
      "
    >
      <h2
        className="
        text-3xl
        font-black
        "
      >
        {plan.name}
      </h2>

      <p
        className="
        mt-5
        text-5xl
        font-black
        "
      >
        £{plan.price}
      </p>

      <CheckoutButton
        loading={loading === plan.name}
        onClick={() => checkout(plan)}
      />

      <div
        className="
        mt-8
        grid
        grid-cols-1
        gap-3
        "
      >
        {plan.keywords.map((item) => (
          <div
            key={item.name}
            className={`
            rounded-xl
            border
            border-white/10
            bg-white/[0.04]
            p-3
            text-sm
            ${item.enabled ? "text-slate-300" : "text-slate-500 line-through opacity-50"}
            `}
          >
            {item.name}
            {item.value ? ` : ${item.value}` : ""}
          </div>
        ))}
      </div>
    </div>
  );
}