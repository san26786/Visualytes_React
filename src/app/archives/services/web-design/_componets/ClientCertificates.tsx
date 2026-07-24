import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ClientCertificates() {
   const clients = [
    { name: "TechCorp", logo: "/assets/jpg/logo-compassion1.jpg" },
    { name: "Innovate Ltd", logo: "/assets/jpg/logo2.png" },
    { name: "Global Services", logo: "/assets/jpg/logo3.jpg" },
    { name: "Future Tech", logo: "/assets/jpg/carewell-change-logo.jpg" },
    { name: "Digital Dreams", logo: "/assets/jpg/2-1.jpg" },
  ];

  const certifications = [
    { name: "ISO 9001", description: "Quality Management", icon: "/assets/jpg/logos-06.jpg" },
    { name: "Google Partner", description: "Digital Marketing", icon: "/assets/jpg/logos-05.jpg" },
    { name: "Microsoft Certified", description: "Cloud Solutions", icon: "/assets/jpg/logos-03.jpg" },
    { name: "AWS Certified", description: "Cloud Architecture", icon: "/assets/jpg/logos-04.jpg" },
    { name: "AWS Certified", description: "Cloud Architecture", icon: "/assets/jpg/logos-02.jpg" },
    { name: "AWS Certified", description: "Cloud Architecture", icon: "/assets/jpg/logos-01.jpg" },
  ];
  return (
  <>
      <section className="py-16 lg:py-20">
             <div className="mx-auto max-w-[1320px] px-6">
               <motion.div
                 {...sectionReveal}
                 className="mb-16 text-center"
               >
                 <span className="inline-block rounded-full border border-yellow-300/30 bg-yellow-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-yellow-300 mb-6">
                   Our Clients
                 </span>
                 <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
                   Trusted by <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Amazing Companies</span>
                 </h2>
               </motion.div>
   
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                 {clients.map((client, index) => (
                   <motion.div
                     key={index}
                     {...sectionReveal}
                     transition={{ delay: index * 0.05 }}
                     className="group flex flex-col items-center justify-center p-8   backdrop-blur-xl hover:border-yellow-400/40 transition-all h-40 w-60 mx-auto text-center mx-19 "
                   >
                     <Image
                         fill
                         src={client.logo}
                         alt="tech icon"
                         className="object-contain transition-transform duration-500 group-hover:scale-110"
                       />
                   </motion.div>
                 ))}
               </div>
             </div>
              <div className="mt-12 flex justify-center">
                                 <HomeBrandButton href="/clients" variant="outline">
                                  View our clients
                                 </HomeBrandButton>
                               </div>
           </section>
   
           {/* Our Certifications Section */}
           <section className="py-16 lg:py-20">
             <div className="mx-auto max-w-[1320px] px-6">
               <motion.div
                 {...sectionReveal}
                 className="mb-16 text-center"
               >
                 <span className="inline-block rounded-full border border-purple-300/30 bg-purple-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-purple-300 mb-6">
                   Certifications
                 </span>
                 <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
                   Our <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">Certifications</span>
                 </h2>
               </motion.div>
   
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mx-auto text-center items-center">
                 {certifications.map((cert, index) => (
                   <motion.div
                     key={index}
                     {...sectionReveal}
                     transition={{ delay: index * 0.1 }}
                     className="group flex flex-col items-center text-center p-8 bg-slate-900/80 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl hover:border-purple-400/40 transition-all h-50 w-40 gap-4"
                   >
                     <Image
                         fill
                         src={cert.icon}
                         alt="tech icon"
                         className="object-contain transition-transform duration-500 group-hover:scale-110"
                       />
                     <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                     <p className="text-slate-400 text-sm">{cert.description}</p>
                   </motion.div>
                 ))}
               </div>
             </div>
           </section>
   
        </>
        )
}