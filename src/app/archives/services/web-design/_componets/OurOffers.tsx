"use client";

import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import { offers, type Offer } from "@/src/app/packages/data/offer";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { BRAND_HOVER } from "@/src/common/components/ui/brand/theme";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function OurOffers() {
  const router = useRouter();

  const handleCheckout = async (offer: Offer) => {
    try {
      const price = Number(offer.price);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: offer.name,
          price,
        }),
      });

      const data = await res.json();

      if (data.url) {
        router.push(data.url);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6">

        {/* Heading */}
        <motion.div
          {...sectionReveal}
          className="mb-16 text-center"
        >
          <span className="mb-6 inline-block rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-fuchsia-300">
            Our Offers
          </span>

          <h2 className="text-[40px] font-bold text-white sm:text-[48px]">
            Choose the perfect{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              package
            </span>{" "}
            for your needs
          </h2>
        </motion.div>


        {/* Cards */}
        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">

          {offers.slice(0, 4).map((offer, index) => (
            <motion.div
              key={index}
              {...sectionReveal}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative flex h-full flex-col overflow-hidden
                rounded-3xl border border-cyan-400/50
                bg-gradient-to-b from-cyan-500/10 to-slate-900/80
                p-8 backdrop-blur-xl
                shadow-[0_22px_60px_rgba(2,6,23,0.55)]
                ${BRAND_HOVER.card}
              `}
            >

              <div className="flex h-full flex-col">

                {/* Title */}
                <div className="flex h-16 items-start">
                  <h3 className="text-2xl font-bold leading-tight text-white">
                    {offer.name}
                  </h3>
                </div>


                {/* Divider */}
                <div className="relative mb-6 h-px overflow-hidden rounded-full bg-white/10">
                  <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-transparent" />
                </div>


                {/* Price */}
                <div className="mb-8 flex h-16 items-end gap-1">
                  <span className="text-5xl font-bold text-white">
                    {offer.price}
                  </span>

                  <span className="mb-1 text-sm text-slate-400">
                    /project
                  </span>
                </div>


                {/* Features */}
                <ul className="flex-1">

                  {offer.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex min-h-[42px] items-start gap-3 text-sm text-slate-300"
                    >

                      <div
                        className="
                          mt-0.5 flex h-5 w-5 flex-shrink-0
                          items-center justify-center
                          rounded-full
                          bg-gradient-to-r
                          from-cyan-500
                          to-fuchsia-500
                        "
                      >
                        <span className="text-xs font-bold text-white">
                          ✓
                        </span>
                      </div>


                      <span
                        className={`leading-6 ${
                          feature.disabled
                            ? "text-slate-500 line-through"
                            : "text-slate-300"
                        }`}
                      >
                        {feature.name}
                      </span>

                    </li>
                  ))}

                </ul>


                {/* Checkout Button */}
                <button
                  onClick={() => handleCheckout(offer)}
                  className="
                    mt-8 w-full rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-fuchsia-500
                    px-6 py-4
                    font-bold text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:opacity-90
                  "
                >
                  Get Started Now
                </button>

              </div>

            </motion.div>
          ))}

        </div>


        {/* View Packages Button */}
        <div className="mt-12 flex justify-center">
          <HomeBrandButton href="/packages" variant="outline">
            View more packages
          </HomeBrandButton>
        </div>

      </div>
    </section>
  );
}