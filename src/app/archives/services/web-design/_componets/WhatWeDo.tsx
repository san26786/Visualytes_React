import { motion } from "framer-motion";
import Image from "next/image";
import {  sectionReveal } from "@/src/common/components/ui/brand/page-effects";
  const websiteTypes = [
    {
      title: "Blog Websites",
      description: "Typically managed by an individual or a small group, a blog can cover any topic. Create your website now.",
      icon: "/assets/png/01_blog.png"
    },
    {
      title: "Corporate Websites",
      description: "You may not sell directly through a corporate website, but you can use these sites to provide information about your business.",
      icon: "/assets/png/02_corporate.png"
    },
    {
      title: "Ecommerce Websites",
      description: "An ecommerce site, otherwise known as an online store, allows you to take online payments for products or services.",
      icon: "/assets/png/03_ecommerce.png"
    },
    {
      title: "Portfolio Websites",
      description: "Just like a physical portfolio, these types of websites are used to display and promote examples of previous work.",
      icon: "/assets/png/04_portfolio.png"
    },
    {
      title: "Brochure Websites",
      description: "Brochure websites are like digital business cards. These types of websites are used to advertise services, and to display contact information, with just a few pages.",
      icon: "/assets/png/05_brochure.png"
    },
    {
      title: "Crowdfunding Websites",
      description: "Crowdfunding is the practice of funding a project or venture by raising small amounts of money from lots of different people.",
      icon: "/assets/png/06_crowdfunding.png"
    },
    {
      title: "News/Magazine Websites",
      description: "The purpose of a news website is to keep its readers up to date on current affairs, whereas online magazines will focus more on entertainment.",
      icon: "/assets/png/07_news.png"
    },
    {
      title: "Community Websites",
      description: "These sites are usually created to let people share thoughts, images or ideas, or simply connect with other people in relation to a certain topic.",
      icon: "/assets/png/08_community.png"
    },
    {
      title: "TV / Video Streaming Websites",
      description: "Video streaming sites have seen their popularity soar in recent years, with catch-up sites like Netflix, iPlayer examples of this particular website theme.",
      icon: "/assets/png/09_streaming.png"
    },
    {
      title: "Web Portals",
      description: "These websites often involve a login process, allowing students to access the school website, or granting employees access to their emails, alerts, and files all in one place.",
      icon: "/assets/png/10_portal.png"
    },
    {
      title: "Wiki / Directory Websites",
      description: "This website allows people to collaborate online and write content together. Which allows anyone to amend, add to, and assess the content of each article.",
      icon: "/assets/png/11_wiki.png"
    },
    {
      title: "Educational Websites",
      description: "These websites are designed to display information on certain topics, either using interactive games or engaging designs to keep the user hooked and quite self explanatory.",
      icon: "/assets/png/12_education.png"
    }
  ];
export default function WhatWeDo() {
  return (
  <>
    <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-[1820px] px-6">
              <motion.div
                {...sectionReveal}
                className="mb-16 text-center"
              >
                <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300 mb-6">
                  What We Do
                </span>
                <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
                  We create websites and applications that <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">provide effective solutions</span> for your goals
                </h2>
              </motion.div>
  
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {websiteTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    {...sectionReveal}
                    transition={{ delay: index * 0.05 }}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-cyan-400/40 transition-all`}
                  >
                    <div className="relative h-84 w-full">
                  <Image
                    fill
                    src={type.icon}
                    alt="what we do"
                    className="object-cover pb-4"
                  />
                </div>
                    <p className="text-slate-400 text-lg leading-relaxed">{type.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
        )
}