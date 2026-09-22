// "use client";

// import { useState } from "react";
// import {
//   Check,
//   LoaderCircle,
//   ShieldCheck,
//   Sparkles,
// } from "lucide-react";
// import { motion } from "framer-motion";

// import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
// import {
//   marketingPlans,
//   type MarketingPlan,
// } from "./data";


// export default function MarketingPlansClient() {

//   const [loading, setLoading] = useState<string | null>(null);
//   const [error, setError] = useState("");


//   async function checkout(plan: MarketingPlan) {

//     try {

//       setError("");
//       setLoading(plan.name);


//       const response = await fetch(
//         "/api/checkout",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: plan.name,
//           }),
//         }
//       );


//       const data = await response.json();


//       if (!response.ok || !data.url) {
//         throw new Error(
//           data.error || "Checkout failed"
//         );
//       }


//       window.location.href = data.url;


//     } catch (err) {

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong"
//       );

//       setLoading(null);

//     }

//   }



//   return (

//     <main
//       className="
//       relative
//       min-h-screen
//       overflow-hidden
//       bg-slate-950
//       pb-24
//       pt-32
//       text-white
//       "
//     >

//       <BrandPageBackdrop />


//       <div
//         className="
//         relative
//         z-10
//         mx-auto
//         max-w-9xl
//         px-6
//         lg:px-10
//         hover:border-cyan-300/50 bg-gradient-to-b from-cyan-300/15 to-slate-900 shadow-[0_20px_60px_rgba(34,211,238,.12)]
//         "
//       >


//         {/* HERO */}

//         <header
//           className="
//           mx-auto
//           max-w-6xl
//           text-center
//           "
//         >

//           <div
//             className="
//             inline-flex
//             items-center
//             gap-2
//             rounded-full
//             border
//             border-white/10
//             bg-white/5
//             px-5
//             py-2
//             text-xs
//             uppercase
//             tracking-widest
//             text-cyan-300
//             "
//           >

//             <Sparkles size={14}/>

//             Visualytes Marketing Plans

//           </div>



//           <h1
//             className="
//             mt-8
//             text-4xl
//             font-black
//             sm:text-6xl
//             "
//           >

//             End To End Digital

//             <span
//               className="
//               block
//               bg-gradient-to-r
//               from-cyan-300
//               to-fuchsia-300
//               bg-clip-text
//               text-transparent
//               "
//             >
//               Marketing Plans
//             </span>

//           </h1>



//           <p
//             className="
//             mx-auto
//             mt-6
//             max-w-2xl
//             text-lg
//             text-slate-300
//             "
//           >
//             Complete SEO, social media,
//             advertising and digital growth
//             solutions designed for businesses.
//           </p>



//           <div
//             className="
//             mt-8
//             inline-flex
//             items-center
//             gap-2
//             rounded-full
//             border
//             border-white/10
//             bg-white/5
//             px-5
//             py-3
//             text-sm
//             text-slate-300
//             "
//           >

//             <ShieldCheck
//               size={18}
//               className="text-cyan-300"
//             />

//             Secure checkout powered by Stripe

//           </div>


//         </header>




//         {
//           error && (

//             <div
//               className="
//               mx-auto
//               mt-8
//               max-w-xl
//               rounded-xl
//               border
//               border-red-400/30
//               bg-red-500/10
//               p-4
//               text-center
//               text-red-200
//               "
//             >

//               {error}

//             </div>

//           )
//         }

//         <section
//         className="
//         mt-16
//         grid
//         grid-cols-1
//         gap-6
//         xl:grid-cols-4
//         "
//         >
//           {
//             marketingPlans.map(
//               (plan,index)=>(

//                 <motion.article

//                 key={plan.name}
              
//                 initial={{
//                   opacity:0,
//                   y:30
//                 }}
              
//                 whileInView={{
//                   opacity:1,
//                   y:0
//                 }}
              
//                 whileHover={{
//                   scale: 1.03,
//                   y: -8
//                 }}
              
//                 viewport={{
//                   once:true
//                 }}
              
//                 transition={{
//                   delay:index * 0.1,
//                   duration:0.4
//                 }}
              
//                 className="
//                   group
//                   relative
//                   flex
//                   flex-col
//                   overflow-hidden
//                   rounded-3xl
//                   border
//                   border-white/10
//                   bg-slate-900/80
//                   min-w-0
              
//                   transition-all
//                   duration-500
//                   ease-out
              
//                   hover:border-cyan-300/40
//                   hover:shadow-[0_25px_80px_rgba(34,211,238,0.25)]
//                 "
              
//               >
//                 <div
//                   className="
//                   pointer-events-none
//                   absolute
//                   inset-0
//                   opacity-0
//                   transition-opacity
//                   duration-500
//                   group-hover:opacity-100
//                   bg-gradient-to-br
//                   from-cyan-400/10
//                   via-transparent
//                   to-fuchsia-400/10
//                   "
//                 />
//                   {/* HEADER */}


//                   <div
//                     className="
//                     p-8
//                     "
//                   >
//                     <h2
//                       className="
//                       mt-3
//                       text-3xl
//                       font-black
//                       "
//                     >
//                       {plan.name}
//                     </h2>



//                     <div className="mt-5">
//                       <p
//                         className="
//                         mt-2
//                         text-5xl
//                         font-black
//                         "
//                       >
//                         £{plan.price}
//                       </p>
//                     </div>

//                     <button

//                       onClick={() => checkout(plan)}

//                       disabled={loading !== null}

//                       className="
//                       mt-8
//                       flex
//                       w-full
//                       items-center
//                       justify-center
//                       gap-2
//                       rounded-xl
//                       bg-gradient-to-r
//                       from-cyan-400
//                       to-fuchsia-400
//                       px-6
//                       py-4
//                       font-bold
//                       text-black
//                       transition
//                       hover:scale-[1.02]
//                       disabled:opacity-50
//                       "
//                     >

//                       {
//                         loading === plan.name
//                         ?
//                         <LoaderCircle
//                           className="animate-spin"
//                         />
//                         :
//                         "Start Plan"
//                       }

//                     </button>



//                     <div
//                       className="
//                       mt-8
//                       grid
//                       gap-3
//                       "
//                     >

// {
//   plan.keywords.map(item => (
//     <div
//       key={item.name}
//       className="
//       rounded-xl
//       border
//       border-white/10
//       bg-white/[0.04]
//       p-3
//       text-sm
//       text-slate-300
//       "
//     >
//       {item.name}
//     </div>
//   ))
// }

//                     </div>


//                   </div>





//                   {/* ALL SERVICES ALWAYS VISIBLE */}


//                   <div
//                     className="
//                     space-y-8
// border-t
// border-white/10
// p-6
// max-h-[900px]
// overflow-y-auto
// custom-scrollbar
//                     "
//                   >


//                     {
//                       plan.groups.map(
//                         group=>(


//                           <section
//                             key={group.title}
//                           >


//                             <div
//                               className="
//                               mb-5
//                               flex
//                               items-center
//                               justify-between
//                               "
//                             >

//                               <h3
//                                 className="
//                                 text-sm
//                                 font-bold
//                                 uppercase
//                                 tracking-wider
//                                 text-fuchsia-300
//                                 "
//                               >

//                                 {group.title}

//                               </h3>


//                               <span
//                                 className="
//                                 rounded-full
//                                 bg-white/10
//                                 px-3
//                                 py-1
//                                 text-xs
//                                 text-slate-300
//                                 "
//                               >

//                                 {group.items.length}
//                                 services

//                               </span>


//                             </div>





//                             <ul
//                               className="
//                               grid
//                               gap-3
//                               "
//                             >

//                               {
//                                 group.items.map(
//                                   item=>(

                                   

//                                     <li
//                                     key={item.name}                                    
//                                     className="
//                                     flex
//                                     items-start
//                                     gap-3
//                                     rounded-xl
//                                     border
//                                     border-white/10
//                                     bg-white/[0.03]
//                                     p-3
//                                     text-sm
//                                     leading-6
//                                     text-slate-300
//                                     "
                                    
//                                     >
                                    
//                                     <Check
//                                     size={15}
//                                     className="
//                                     mt-1
//                                     shrink-0
//                                     text-cyan-300
//                                     "
//                                     />
                                    
                                    
//                                     <span
//   className={`
//     leading-6
//     ${
//       item.disabled
//         ? "text-slate-500 line-through"
//         : "text-slate-300"
//     }
//   `}
// >
//   {item.name}
// </span>
                                    
                                    
//                                     </li>

//                                   )
//                                 )
//                               }


//                             </ul>


//                           </section>


//                         )
//                       )
//                     }


//                   </div>



//                 </motion.article>

//               )
//             )
//           }


//         </section>


//       </div>


//     </main>

//   );

// }
"use client";

import { useState } from "react";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";

import type { MarketingPlan } from "./types";

import MarketingHero from "./components/MarketingHero";
import PlanCard from "./components/PlanCard";

export default function MarketingPlansClient({ plans }: { plans: MarketingPlan[] }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function checkout(plan: MarketingPlan) {
    try {
      setError("");
      setLoading(plan.name);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: plan.id,
          name: plan.name,
          productId: plan.productId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.assign(data.url);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-slate-950
      pt-32
      pb-24
      text-white
      "
    >
      <BrandPageBackdrop />

      <div
        className="
        relative
        z-10
        mx-auto
        max-w-8xl
        px-6
        lg:px-10
        "
      >
        <MarketingHero />

        {error && (
          <div
            className="
            mt-8
            rounded-xl
            border
            border-red-400/30
            bg-red-500/10
            p-4
            text-center
            text-red-200
            "
          >
            {error}
          </div>
        )}

        <section
          className="
          mt-16
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-4
          items-stretch
          "
        >
          {plans.map((plan: MarketingPlan, index: number) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              index={index}
              loading={loading}
              checkout={checkout}
            />
          ))}
        </section>
      </div>
    </main>
  );
}