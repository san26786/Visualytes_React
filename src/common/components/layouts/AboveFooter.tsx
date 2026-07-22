// "use client";

// import Link from "next/link";
// import { Phone, Mail, MapPin } from "lucide-react";
// import { motion } from "framer-motion";
// import { cn } from "@/src/common/utils/cn";
// import Image from "next/image";

// export const items = [
//   {
//     title: "Call Us",
//     icon: "rt-icon2-phone5",
//     color: "#A0CE4E",
//     content: (
//       <>
//         <p>
//           <strong>Enquiry:</strong> 023 8097 0305
//         </p>
//         <p>
//           <strong>Support:</strong> 023 8097 0305
//         </p>
//       </>
//     ),
//   },
//   {
//     title: "Write Us",
//     icon: "rt-icon2-pen",
//     color: "#00bea3",
//     content: (
//       <>
// <p>
// <a
//   href="mailto:hello@visualytes.com"
//   className="text-[#7f7f7f] hover:text-[var(--primaryPink)] transition-colors duration-300"
// >
//   hello@visualytes.com
// </a>
// </p>

// <p>
// <a
//   href="mailto:support@visualytes.com"
//   className="text-[#7f7f7f] hover:text-[var(--primaryPink)] transition-colors duration-300"
// >
//   support@visualytes.com
// </a>
// </p>
//       </>
//     ),
//   },
//   {
//     title: "Visit Us",
//     icon: "rt-icon2-location2",
//     color: "#F57C00",
//     content: (
//       <>
//         <p>
//           Cumberland House, Southampton,
//           SO15 2BG
//         </p>

//         <p>
//           12 Shirley Road, Southampton,
//           SO15 3EU
//         </p>
//       </>
//     ),
//   },
// ];

// export default function AboveFooter() {
//   return (
//     <section
//       className="relative overflow-hidden"
//       style={{
//         backgroundColor: "#0f172a",
//         backgroundImage:
//           "radial-gradient(circle at top left, rgba(6,182,212,.12), transparent 40%), radial-gradient(circle at bottom right, rgba(236,72,153,.12), transparent 40%), url('/assets/png/texture_2.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Background Effects */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
//         <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-pink-500/10 blur-[120px]" />
//       </div>

//       <div className="relative z-10 flex justify-center">
//         <Image
//           src="/assets/png/vertical_line3.png"
//           alt=""
//           width={20}
//           height={120}
//           className="h-[94px] w-[4px]"
//         />
//       </div>

//       <div className="relative z-10 mx-auto max-w-[1170px] px-[15px] py-[85px]">
//         <div className="grid grid-cols-1 gap-y-16 md:grid-cols-3">
//           {items.map((item, index) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.15 }}
//               className="group text-center"
//             >
//               <div className="mx-auto flex h-[163px] w-[163px] items-center justify-center rounded-full border-[4px] border-white/10 bg-white/5 p-[4px] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:border-[var(--primaryPink)]/40">
//                 <div className="flex h-full w-full items-center justify-center rounded-full bg-[#131d2a]/90 transition-all duration-500 group-hover:bg-[#182434]">
//                   <i
//                     className={item.icon}
//                     style={{
//                       fontSize: "65px",
//                       color: item.color,
//                       lineHeight: 1,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   />
//                 </div>
//               </div>

//               <h3 className="mt-[29px] mb-[17px] text-[24px] font-medium text-white">
//                 {item.title}
//               </h3>

//               <div className="text-[15px] leading-[30px] font-light text-slate-300">
//                 {item.content}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-[60px] flex justify-center">
//           <Image
//             src="/assets/png/vertical_line3.png"
//             alt=""
//             width={20}
//             height={120}
//             className="h-[94px] w-[4px]"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";

export const items = [
    {
      title: "Call Us",
      icon: "rt-icon2-phone5",
      color: "#A0CE4E",
      content: (
        <>
          <p>
            <strong>Enquiry:</strong> 023 8097 0305
          </p>
          <p>
            <strong>Support:</strong> 023 8097 0305
          </p>
        </>
      ),
    },
    {
      title: "Write Us",
      icon: "rt-icon2-pen",
      color: "#00bea3",
      content: (
        <>
<p>
  <a
    href="mailto:hello@visualytes.com"
    className=" hover:text-[var(--primaryPink)] transition-colors duration-300"
  >
    hello@visualytes.com
  </a>
</p>

<p>
  <a
    href="mailto:support@visualytes.com"
    className=" hover:text-[var(--primaryPink)] transition-colors duration-300"
  >
    support@visualytes.com
  </a>
</p>
        </>
      ),
    },
    {
      title: "Visit Us",
      icon: "rt-icon2-location2",
      color: "#F57C00",
      content: (
        <>
          <p>
            Cumberland House, Southampton,
            SO15 2BG
          </p>
  
          <p>
            12 Shirley Road, Southampton,
            SO15 3EU
          </p>
        </>
      ),
    },
  ];
  
  export default function AboveFooter() {
    return (
      <section
        className="relative overflow-visible"
       
      >
        <div className="flex justify-center">
            
        <Image
  src="/assets/png/vertical_line3.png"
  alt=""
  width={20}      // Use the actual image width
  height={120}    // Use the actual image height
  className="h-auto h-[94px] w-[4px]"
/>
        </div>
        
        <div className="mx-auto max-w-[1170px] px-[15px] py-[85px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
            {items.map((item) => (
              <div key={item.title} className="teaser-card text-center">
                {/* Icon Circle */}
                <div className="teaser-icon mx-auto flex h-[163px] w-[163px] items-center justify-center rounded-full border-[4px] border-white bg-transparent p-[4px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white transition-all duration-500 ease-in-out">
                    
                    <i
                      className={item.icon}
                      style={{
                        fontSize: "65px",
                        color: item.color,
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
  
                  </div>
                </div>
  
                {/* Title */}
              <h3 className="mt-[29px] mb-[17px] text-[24px] font-medium text-white">
                  {item.title}
                </h3>
  
                {/* Content */}
                             <div className="text-[15px] leading-[30px] font-light text-slate-300">
                {item.content}
                </div>
              </div>
            ))}
          </div>
  
          {/* Vertical Decoration */}
          <div className="mt-[60px] flex justify-center">
          <Image
  src="/assets/png/vertical_line3.png"
  alt=""
  width={20}      // Use the actual image width
  height={120}    // Use the actual image height
  className="h-auto h-[94px] w-[4px]"
/>
          </div>
        </div>
      </section>
    );
  }
  
