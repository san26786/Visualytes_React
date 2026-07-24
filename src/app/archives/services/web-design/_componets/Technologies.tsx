import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Technologies() {
    const technologies = 
    [
      {
        "title": "WordPress",
        "image": "/assets/jpg/logos-07.jpg"
      },
      {
        "title": "Magento",
        "image": "/assets/jpg/magento.png"
      },
      {
        "title": "CodeIgniter",
        "image": "/assets/jpg/ci.png"
      },
      {
        "title": "Android Studio",
        "image": "/assets/jpg/logos-08.jpg"
      },
      {
        "title": "Drupal",
        "image": "/assets/jpg/drupal.png"
      },
      {
        "title": "PHP",
        "image": "/assets/jpg/php.png"
      },
      {
        "title": "React JS",
        "image": "/assets/jpg/logo1-05.jpg"
      },
      {
        "title": "Swift",
        "image": "/assets/jpg/logo1-10.jpg"
      },
      {
        "title": "Node.js",
        "image": "/assets/jpg/node.png"
      },
      {
        "title": "Vue.js",
        "image": "/assets/jpg/vue.png"
      },
      {
        "title": "Laravel",
        "image": "/assets/jpg/logo1-11.jpg"
      },
      {
        "title": "MySQL",
        "image": "/assets/jpg/mysql.png"
      },
      {
        "title": "Java",
        "image": "/assets/jpg/java.png"
      },
      {
        "title": "ASP.NET",
        "image": "/assets/jpg/ASP.png"
      },
      {
        "title": "jQuery JS & AJAX",
        "image": "/assets/jpg/jqajax.png"
      },
    
  ];
  return (
  <>
     <section className="py-16 lg:py-20">
             <div className="mx-auto max-w-9xl px-6">
               <motion.div
                 {...sectionReveal}
                 className="mb-16 text-center"
               >
                 <span className="inline-block rounded-full border border-green-300/30 bg-green-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-green-300 mb-6">
                   Technologies
                 </span>
                 <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
                   Technologies We <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">Work On</span>
                 </h2>
               </motion.div>
   
               <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 bg-white  max-w-6xl mx-auto p-8">
                 {technologies.map((tech, index) => (
                   <motion.div
                     key={index}
                     {...sectionReveal}
                     transition={{ delay: index * 0.05 }}
                     className="group flex flex-col items-center justify-center p-9   bg-white backdrop-blur-xl hover:border-cyan-400/40 hover:bg-white transition-all"
                   >
                                       <div>
   
                     <Image
                         fill
                         src={tech.image}
                         alt="tech icon"
                         className="object-contain transition-transform duration-500 group-hover:scale-110"
                       />
                       </div>
                     <span className="text-slate-300 font-semibold mt-9">{tech.title}</span>
                   </motion.div>
                 ))}
               </div>
             </div>
           </section>
        </>
        )
}