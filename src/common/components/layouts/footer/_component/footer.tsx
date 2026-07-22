"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Copyright from "./Copyright";

export default function Footer() {
  const socialLinks = [
    {
      iconClass: "soc-facebook",
      href: "https://www.facebook.com/visualyteslimited",
      label: "Facebook",
    },
    {
      iconClass: "soc-twitter",
      href: "https://twitter.com/visualytes",
      label: "Twitter",
    },
    {
      iconClass: "soc-google",
      href: "https://www.google.com/search?q=Visualytes+Limited",
      label: "Google",
    },
    {
      iconClass: "soc-youtube",
      href: "https://www.youtube.com/channel/UCVV3R4Ye2162x8BrCuUY40Q",
      label: "YouTube",
    },
    {
      iconClass: "soc-linkedin",
      href: "https://www.linkedin.com/company/visualytes-limited/about/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#075783]">
      {/* Decorative background blobs - consistent with other pages */}
      <div className="pointer-events-none absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6 pb-8">
        {/* Divider with Visualytes branding */}
     

        {/* Logo section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="mb-2">
            <Image
              src="/assets/png/footer_logo2.png"
              alt="Visualytes"
              width={140}
              height={95}
              priority
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 ">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="group"
              >
                <i className={`social-icon ${social.iconClass}`} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Company info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <p className="text-slate-300 text-[15px] leading-[30px] font-light max-w-2xl mx-auto mb-2">
            Visualytes Limited is registered in England and Wales, Company
            number{" "}
            <a
              href="https://find-and-update.company-information.service.gov.uk/company/10287043"
              className="text-cyan-300 hover:text-cyan-200 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              10287043
            </a>
          </p>
          <p className="text-slate-400 text-[15px] leading-[30px] font-light max-w-2xl mx-auto">
            Registered office address is 71-75 Shelton Street, London,
            Greater London, United Kingdom, WC2H 9JQ
            <br />
            ICO Registration number: ZB049666
          </p>
        </motion.div>
      </div>

      {/* Copyright */}
      <Copyright />
    </footer>
  );
}
