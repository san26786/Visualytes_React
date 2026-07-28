import {
    Sparkles,
    ShieldCheck
    } from "lucide-react";
    
    
    export default function MarketingHero(){
    
    
    return (
    
    <header
    className="
    mx-auto
    max-w-4xl
    text-center
    "
    >
    
    
    <div
    className="
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-white/10
    bg-white/5
    px-5
    py-2
    text-xs
    tracking-widest
    text-cyan-300
    "
    >
    
    <Sparkles size={14}/>
    
    Visualytes Marketing Plans
    
    </div>
    
    
    
    <h1
    className="
    mt-8
    text-5xl
    font-black
    sm:text-7xl
    "
    >
    
    End To End Digital
    
    <span
    className="
    block
    bg-gradient-to-r
    from-cyan-300
    to-fuchsia-300
    bg-clip-text
    text-transparent
    "
    >
    Marketing Plans
    </span>
    
    
    </h1>
    
    
    <p
    className="
    mx-auto
    mt-6
    max-w-2xl
    text-lg
    text-slate-300
    "
    >
    
    Complete SEO, social media,
    advertising and digital growth
    solutions designed for businesses.
    
    </p>
    
    
    
    <div
    className="
    mt-8
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-white/10
    bg-white/5
    px-5
    py-3
    text-sm
    text-slate-300
    "
    >
    
    <ShieldCheck
    size={18}
    className="text-cyan-300"
    />
    
    Secure checkout powered by Stripe
    
    
    </div>
    
    
    </header>
    
    )
    
    }
