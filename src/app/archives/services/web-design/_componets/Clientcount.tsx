import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Clientcount() {
    const stats = [
    { number: 378, label: "Satisfied Clients" },
    { number: 12, label: "Awards Winning" },
    { number: 20, label: "Years Of Experience" }
  ];
  const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      if (!isInView) return;
  
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
  
      return () => clearInterval(timer);
    }, [isInView, target]);
  
    return (
      <span ref={ref} className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
        {count}{suffix}
      </span>
    );
  };
  return (
  <>
    <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-[1320px] px-6">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <motion.div {...sectionReveal}>
                  <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300 mb-6">
                    Why Us?
                  </span>
                  <h2 className="text-[40px] sm:text-[48px] font-bold text-white mb-6">
                    The approach to each new project is <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">individual</span>
                  </h2>
                  <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                    We treat equally every customer, regardless of the size of the company and its budget.
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    After delivery of the project we carry out the promotion and support of the site, helping the client to attract traffic from the Internet.
                  </p>
                </motion.div>
  
                <motion.div {...sectionReveal} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
                      <AnimatedCounter target={stat.number} />
                      <p className="text-slate-400 font-medium mt-2">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        </>
        )
}