// import Image from "next/image";
// // import {
// //   Facebook,
// //   Twitter,
// //   Youtube,
// //   Linkedin,
// //   Globe,
// // } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer
//       className="relative w-full overflow-hidden text-[#7f7f7f] mt-[5px]"
//       style={{
//         backgroundImage: "url(/assets/png/footer_bg.png)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Top skewed sections */}
//       <div
//         className="absolute left-0 top-[-30px] h-[150px] w-1/2 z-[1]"
//         style={{
//           backgroundImage: "url(/assets/png/footer_bg.png)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//           transform: "skewY(3deg)",
//           backgroundColor: "#191f28",
//         }}
//       />

//       <div
//         className="absolute right-0 top-[-30px] h-[150px] w-1/2 z-[1]"
//         style={{
//           backgroundImage: "url(/assets/png/footer_bg.png)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//           transform: "skewY(-3deg)",
//           backgroundColor: "#191f28",
//         }}
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#191f28]/90 z-[2]" />

//       <div className="relative z-[3] max-w-[970px] mx-auto px-4 pt-[50px] pb-[65px] text-center">
//         {/* Logo */}
//         <div className="flex justify-center mb-5 -mt-8">
//           <Image
//             src="/assets/png/footer_logo2.png"
//             alt="Visualytes"
//             width={140}
//             height={140}
//             priority
//           />
//         </div>

//         {/* Social Icons */}
//         <div className="flex justify-center gap-7 mb-8">
//           <a
//             href="https://www.facebook.com/visualyteslimited"
//             target="_blank"
//             className="social-icon soc-facebook"
//           />
//           <a
//             href="https://twitter.com/visualytes"
//             target="_blank"
//             className="social-icon soc-twitter"
//           />
//           <a
//             href="https://www.google.com/search?q=Visualytes+Limited"
//             target="_blank"
//             className="social-icon soc-google"
//           />
//           <a
//             href="https://www.youtube.com/channel/UCVV3R4Ye2162x8BrCuUY40Q"
//             target="_blank"
//             className="social-icon soc-youtube"
//           />
//           <a
//             href="https://www.linkedin.com/company/visualytes-limited/about/"
//             target="_blank"
//             className="social-icon soc-linkedin"
//           />
//         </div>

//         {/* Text */}
//         <div className="text-[15px] font-light leading-[30px]">
//           <p className="mb-1">
//             Visualytes Limited is registered in England and Wales, Company
//             number{" "}
//             <a
//               href="https://find-and-update.company-information.service.gov.uk/company/10287043"
//               className="hover:text-white transition"
//               target="_blank"
//             >
//               10287043
//             </a>
//           </p>

//           <p>
//             Registered office address is 71-75 Shelton Street, London, Greater
//             London, United Kingdom, WC2H 9JQ
//             <br />
//             ICO Registration number: ZB049666
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }


import Image from "next/image";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="relative  overflow-visible">
      {/* Left skew shape */}
      <div
        className="absolute left-0 -top-[55px] h-[120px] w-1/2 bg-[#191f28] z-[1]"
        style={{
          transform: "skewY(3deg)",
          transformOrigin: "top left",
        }}
      />

      {/* Right skew shape */}
      <div
        className="absolute right-0 -top-[55px] h-[120px] w-1/2 bg-[#191f28] z-[1]"
        style={{
          transform: "skewY(-3deg)",
          transformOrigin: "top right",
        }}
      />

      {/* Main Footer */}
      <div
        className="relative z-[2] text-[#7f7f7f]"
        style={{
          backgroundImage: "url(/assets/png/footer_bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#191f28",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#191f28]/90" />

        {/* Content */}
        <div className="relative z-10 max-w-[970px] mx-auto pt-[40px] pb-[30px] text-center">
          {/* Logo */}
          <div className="flex justify-center -mt-[80px]">
            <Image
              src="/assets/png/footer_logo2.png"
              alt="Visualytes"
              width={255}
              height={174}
              priority
            />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 m-4">
            <a
              href="https://www.facebook.com/visualyteslimited"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-facebook hover:text-white"
            />
            <a
              href="https://twitter.com/visualytes"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-twitter"
            />
            <a
              href="https://www.google.com/search?q=Visualytes+Limited"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-google"
            />
            <a
              href="https://www.youtube.com/channel/UCVV3R4Ye2162x8BrCuUY40Q"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-youtube"
            />
            <a
              href="https://www.linkedin.com/company/visualytes-limited/about/"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-linkedin"
            />
          </div>

          {/* Footer Text */}
          <div className="text-[15px] leading-[30px] ">
            <p className="mb-1">
              Visualytes Limited is registered in England and Wales, Company
              number{" "}
              <a
                href="https://find-and-update.company-information.service.gov.uk/company/10287043"
                target="_blank"
                rel="noreferrer"
                className="text-[#bdbdbd] hover:text-white transition-colors"
              >
                10287043
              </a>
            </p>

            <p>
              Registered office address is 71-75 Shelton Street, London,
              Greater London, United Kingdom, WC2H 9JQ
              <br />
              ICO Registration number: ZB049666
            </p>
          </div>
        </div>
      </div>
      <Copyright/>
    </footer>

  );
}