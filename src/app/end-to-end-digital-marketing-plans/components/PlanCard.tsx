import {motion} from "framer-motion";

import PlanHeader from "./PlanHeader";
import PlanFeatures from "./PlanFeatures";

import type {MarketingPlan} from "../types";



type Props={

plan:MarketingPlan;

index:number;

loading:string|null;

checkout:(plan:MarketingPlan)=>void;

}



export default function PlanCard({
plan,
index,
loading,
checkout

}:Props){


return (

<motion.article

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

whileHover={{
y:-8
}}

viewport={{
once:true
}}

transition={{
delay:index*.1
}}


className="
group
relative
flex
h-full
flex-col
overflow-hidden
rounded-3xl
border
border-white/10
bg-slate-900/80
max-w-9xl

hover:border-cyan-300/40
hover:shadow-[0_25px_80px_rgba(34,211,238,.25)]
"
>



<PlanHeader

plan={plan}

loading={loading}

checkout={checkout}

/>



<PlanFeatures

groups={plan.groups}

/>


</motion.article>


)

}
