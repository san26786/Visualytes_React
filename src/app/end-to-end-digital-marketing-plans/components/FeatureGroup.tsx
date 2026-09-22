import { Check, X } from "lucide-react";

import type { MarketingFeature } from "../types";


type FeatureGroupProps = {
  group: {
    title: string;
    items: MarketingFeature[];
  };
};



export default function FeatureGroup({
  group,
}: FeatureGroupProps) {


  return (

    <section>


      <h3
        className="
        mb-5
        text-sm
        font-bold
        uppercase
        tracking-wider
        text-fuchsia-300
        "
      >
        {group.title}
      </h3>
      <ul
        className="
        grid
        grid-cols-1
        gap-3
        "
      >
        {
          group.items?.map((item) => (
            <li
              key={item.name}
              className={`
              flex
              items-start
              gap-3
              rounded-xl
              border
              p-3
              text-sm
              leading-6
              transition-all
              duration-300

              ${ 
                item.enabled

                ?

                `
                border-white/5
                bg-white/[0.02]
                text-slate-500
                `

                :

                `
                border-white/10
                bg-white/[0.03]
                text-slate-300
                hover:border-cyan-300/30
                hover:bg-white/[0.06]
                `
              }
              `}
            >



{!item.enabled ? 

                <X
                  size={16}
                  className="
                  mt-1
                  shrink-0
                  text-slate-600
                  "
                />

                :

                <Check
                  size={16}
                  className="
                  mt-1
                  shrink-0
                  text-cyan-300
                  "
                />

              }



<span
  className={`
    leading-6
    ${
      !item.enabled
        ? "text-slate-500 line-through"
        : "text-slate-300"
    }
  `}
>
  {item.name}
</span>



            </li>

          ))
        }


      </ul>


    </section>

  );

}
