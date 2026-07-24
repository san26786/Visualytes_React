"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Share2,
  Layers,
  Mail,
  MessageSquare,
  Video,
  TrendingUp,
  Activity,
  Users,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import HomeSection from "@/src/app/(home)/_componts/shared/HomeSection";
import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import ProcessSection from "@/src/app/(home)/_componts/ProcessSection";
import Portfolio from "@/src/app/(home)/_componts/Portfolio";
import TestimonialsSection from "@/src/app/(home)/_componts/TestimonialsSection";
import AppointmentTalk from "@/src/app/(home)/_componts/AppointmentTalk";
import ClientSlider from "@/src/app/(home)/_componts/ClientSlider";
import AboveFooter from "@/src/common/components/layouts/AboveFooter";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";
import BlogCard from "@/src/app/blog/_compoents/BlogCard";
import { blogs } from "@/src/app/blog/_data/data";

const highlights = [
  {
    title: "Supporting",
    body: "We support our client with the service-learning abilities, clear communication, Client suitable Timeframe adjustment, Simple examples for complex ideas, and educating them on risk free investment",
    accent: "from-cyan-400 to-cyan-600",
  },
  {
    title: "Years of Experience",
    body: "With 15 years of Experience, we produce labour efficiency, Maintain High Standardization and Specialization, Technology driven solution which is easy to understand for our customers",
    accent: "from-fuchsia-400 to-pink-500",
  },
  {
    title: "Result Driven",
    body: "We create result driven strategies as we definitely know that digital marketing is one of the best kind. We recognize value, target outcomes, understand customers need, capture demands, and master their brand.",
    accent: "from-violet-400 to-indigo-500",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "£350",
    period: "For Startup",
    features: [
      "SEO Audit",
      "Social Media Setup",
      "Monthly Reports",
      "Email Support",
    ],
  },
  {
    name: "Standard",
    price: "£700",
    period: "For Small Businesses",
    features: [
      "Basic Plan Features",
      "PPC Management",
      "Content Creation",
      "Weekly Calls",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "£1,050",
    period: "For Midsize Business",
    features: [
      "Standard Plan Features",
      "Video Marketing",
      "Conversion Optimization",
      "Dedicated Manager",
    ],
  },
  {
    name: "Elite",
    price: "£1,400",
    period: "For Enterprise",
    features: [
      "Premium Plan Features",
      "Digital PR",
      "Custom Strategies",
      "Priority Support",
    ],
  },
];

const digitalServices = [
  {
    title: "Search Engine Optimisation (SEO)",
    icon: <Search size={32} />,
    description:
      "Search Engine Optimisation is all about getting on that first Google page and other search engines like Yahoo and Bing, staying top of the list and top of mind. We develop keyword strategies, understand the kind of content that attracts users, optimise rankings and then convert visitors to customers. As our agency has grown, and the digital landscape has evolved, we’ve developed our Digital Marketing offerings, but SEO is still very much the foundations to our champion campaigns. From making sure your website is technically sound, to understanding Google’s ranking factors, we pull all the collated data into one place to produce a search strategy that’s right for you. Whether that’s achieving more #1 positions than The Beatles, or staying one step ahead of your competitors.",
  },
  {
    title: "Social Media Marketing",
    icon: <Share2 size={32} />,
    description:
      "We bring your brand story to life on all the right social media platforms such as Facebook, Twitter, Linkedin, Instagram, Google My Business. We will grow and engage a community around your offering. We will define your audience and give them more to care about. There is so much to 'like'.",
  },
  {
    title: "PPC and Adwords Management",
    icon: <TrendingUp size={32} />,
    description:
      "We develop strategies for Pay-Per Click and Adwords using Google Ads, bid auctions and build your targeting audience. Optimise campaigns, track conversions, and measure your ROI. As a trusted Google partner, we put our money where our mouth is and promise to maximise your ROI and increase your conversions. With the perfect combination of industry leading tools, and forward thinking brains, we structure all of our PPC campaigns around audits, audiences and analysis. From exploring your current campaigns, to crafting new ones, we use data to find the best places to spend your PPC budget, whether that be on search engines, across display networks or on social media.",
  },
  {
    title: "Content Marketing",
    icon: <Layers size={32} />,
    description:
      "We create content that speaks to people, at the right time and via the right channels. Understand what works for you by tracking and measuring performance.Understanding your audience's intentions when searching for a service or product is integral to a content strategy, which is why we not only carry out comprehensive research, but combine it with UX design. We then turn this knowledge into words, creating content that is loved by Google and users alike. Whether it's establishing you as a thought leader in your industry, or reeling in long tail traffic, we create content that sparks engagement, and inspires communities.",
  },
  {
    title: "Video Marketing",
    icon: <Video size={32} />,
    description:
      "We will set up, manage and optimise your YouTube channel. Target, test and develop your use of the Google Display Network and get creative with visual formats. We create best of the best video so that your audience can connect with you instantly. Script writing, Story boarding, Animation, Image selection, Video creation leave it all with us.",
  },
  {
    title: "Email Marketing",
    icon: <Mail size={32} />,
    description:
      "Your email list is one of your most powerful assets. We will manage and segment your data, test headlines and maximise open rates and ROI. We also cover marketing automation and the importance of data management regulations. E-mails have become a part of everyday life, everyone expects them, however not everyone opens them. But with a well-thought out email roadmap, we can help you achieve your aims, and ensure your emails are getting opened with the right message, at the right time of day and week. By pairing not-to-be-missed subject lines, with a cracking design we can deliver results and help shape your future campaigns by analysing the data, segmenting your email database and creating an implementation plan.",
  },
  {
    title: "Text Marketing",
    icon: <MessageSquare size={32} />,
    description:
      "We deliver your messages to your right audience, customers and subscribers using Mobile SMS or Whatsapp messages. We use text marketing to generate sales, but it can also improve brand awareness, educate subscribers, increase website traffic, or promote a charity or nonprofit organization.",
  },
  {
    title: "Website Optimisation",
    icon: <Activity size={32} />,
    description:
      "What makes a winning website? You have just got 3 sec to engage your customer. We will give your website the edge that is, well-designed, optimised, better performance that not only looks good but also delivers for your business.",
  },
  {
    title: "Conversion Rate Optimisation",
    icon: <Users size={32} />,
    description:
      "It can be frustrating when you've pushed all the right buttons but your campaign isn't taking off. You can create what you think is the best looking e-mail newsletter, or the most engaging landing page, but that doesn't guarantee your audience members will love it just as much as you do. But there is a solution. By mixing together some A/B testing, Multivariate testing and analysis we can provide you with the recipe to success.",
  },
  {
    title: "Digital PR and Magazine",
    icon: <Smartphone size={32} />,
    description:
      "No longer is PR about having the local town crier announce the latest news, being mentioned on the radio, or getting onto page 3 of the national newspaper or getting into a national Magazine. It's about the relationships you have with influential stakeholders, the media and, your target audience, and if there's one thing we're good at, it's building relationships. By knocking some creative minds together we produce campaigns that shake up ideas, capture attention, and produce results.",
  },
];

const Page = () => {
  return (
    <main className="relative overflow-hidden bg-slate-950 min-h-screen">
      <BrandPageBackdrop />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative mt-[130px] overflow-hidden">
          <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-pink-500/25 blur-[100px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[80px]" />
          
          <div className="relative flex min-h-[440px] flex-col items-center justify-center px-4 pb-36 pt-20 text-center">
            {/* Breadcrumbs */}
            <ol className="relative z-10 mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <li>
                <Link href="/" className="text-cyan-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li>
                <Link href="/our-services" className="text-cyan-300 hover:text-white transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li className="text-white/60">Digital Marketing</li>
            </ol>

            {/* Heading */}
            <h1 className="relative z-10 max-w-3xl text-[52px] font-bold leading-[1.1] tracking-tight text-white sm:text-[64px] lg:text-[76px]">
              Full Service{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Digital Agency
              </span>
            </h1>

            <p className="relative z-10 mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-300">
              Our Services - Data-driven campaigns that deliver measurable results and grow your business.
            </p>

            {/* Decorative line */}
            <div className="relative z-10 mt-10 flex items-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300/80" />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full border border-pink-300/30 bg-pink-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-pink-300 mb-4">
                What We Offer
              </span>
              <h2 className="text-[38px] font-bold text-white sm:text-[46px]">
                Our Digital Marketing{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {digitalServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="p-8 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-cyan-300">
                        {service.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-300">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Be Responsive Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300 mb-6">
                  Be Responsive
                </span>
                <h2 className="text-[38px] font-bold text-white sm:text-[46px] mb-6">
                  Responsive Web Design
                </h2>
                <p className="text-lg leading-relaxed text-slate-300 mb-4">
                  Your website always needs to looks great over every device which you can accomplish through responsive web design. It fulfills you in every aspects to compete in your sector with rivals. Not only that, increasing the user experience it promotes your business and helps to establish your company in this competitive market.
                </p>
                <p className="text-lg leading-relaxed text-slate-300">
                  Responsive websites are easy to maintain and needs comparatively low maintenance budget. Moreover as Google also suggest responsive design, it will be beneficial for ranking of your site. Mobile visitors to your site get encouraged which will in turn add positive result into company goodwill.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-pink-500/10 to-purple-500/20 blur-2xl" />
                <div className="relative rounded-[28px] border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src="/assets/png/services/website-hosting-services-min.png"
                      alt="Responsive Web Design"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Clients Love Highlights Section */}
        <section className="relative overflow-hidden py-10">
          <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/8 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/8 blur-[90px]" />

          <HomeSection
            eyebrow="Clients Love"
            title="Our Clients"
            highlight="Love"
            subtitle="Our Clients Love our Transparency, Valued Partnership, Scalable Support, Active Listening, Royal Treatment, Authenticity, Expectation Management from the day before they start with us."
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {highlights.map((item, i) => (
                <motion.article
                  key={item.title}
                  custom={i}
                  variants={popIn}
                  className={`group relative overflow-hidden p-8 text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                  />
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-lg font-bold text-white shadow-lg`}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
                </motion.article>
              ))}
            </motion.div>
          </HomeSection>
        </section>

        {/* End to End Digital Marketing Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 lg:py-24 bg-slate-900/30"
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
            <span className="inline-block rounded-full border border-purple-300/30 bg-purple-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-purple-300 mb-6">
              End to End
            </span>
            <h2 className="text-[38px] font-bold text-white sm:text-[46px] mb-6">
              End to End Digital Marketing
            </h2>
            <p className="text-lg leading-relaxed text-slate-300 mb-8">
              Underneath your digital activity, you need solid objectives and plan. We help you to build a clear vision of your strategy, and makes it actionable with budget, channel and media plans, KPIs and more
            </p>
            <HomeBrandButton href="/contact-us">
              E2E Marketing
            </HomeBrandButton>
          </div>
        </motion.section>

        {/* Our Marketing Process Section */}
        <ProcessSection />

        {/* Pricing Plans Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-fuchsia-300 mb-4">
                Our End To End Marketing Plans
              </span>
              <h2 className="text-[38px] font-bold text-white sm:text-[46px]">
                Choose Your Plan
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {pricingPlans.map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 ${plan.featured ? "border-cyan-400/30 shadow-[0_22px_60px_rgba(6,182,212,0.15)]" : ""}`}
                >
                  {plan.featured && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 text-center text-xs font-bold uppercase tracking-widest text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 pt-12">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">{plan.period}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">{plan.price}</span>
                    </div>
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <HomeBrandButton href="/contact-us" variant="outline" className="w-full">
                      Get Started
                    </HomeBrandButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Latest Projects Section */}
        <Portfolio />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* From Our Blog Section */}
        <section className="py-16 lg:py-24 bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full border border-pink-300/30 bg-pink-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-pink-300 mb-4">
                From Our Blog
              </span>
              <h2 className="text-[38px] font-bold text-white sm:text-[46px]">
                Latest Articles
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.slice(0, 3).map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <HomeBrandButton href="/blog" variant="outline">
                View All Blogs
              </HomeBrandButton>
            </div>
          </div>
        </section>

        {/* Do You Want to Work With Us? */}
        <AppointmentTalk />

        <ClientSlider />

        <AboveFooter />
      </div>
    </main>
  );
};

export default Page;
