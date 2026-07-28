"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  Layers,
  Mail,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";

import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import ProcessSection from "@/src/app/(home)/_componts/ProcessSection";
import Portfolio from "@/src/app/portfolio/_components/Portfolio";
import TestimonialsSection from "@/src/app/(home)/_componts/TestimonialsSection";
import AppointmentTalk from "@/src/app/(home)/_componts/AppointmentTalk";
import ClientSlider from "@/src/app/(home)/_componts/ClientSlider";
import AboveFooter from "@/src/common/components/layouts/AboveFooter";
import BlogCard from "@/src/app/blog/_compoents/BlogCard";
import { blogs } from "@/src/app/blog/_data/data";
import { useState } from "react";


// ----------------------------------------
// Animation
// ----------------------------------------

const reveal = {
  initial: {
    opacity: 0,
    y: 24,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    margin: "-80px",
  },
};


// ----------------------------------------
// Marketing Plans
// ----------------------------------------

type MarketingPlan = {
  name: string;
  price: string;
  audience: string;
  featured?: boolean;
};


const plans: MarketingPlan[] = [
  {
    name: "Basic",
    price: "£350",
    audience: "For Startup",
  },
  {
    name: "Standard",
    price: "£700",
    audience: "For Small Businesses",
  },
  {
    name: "Premium",
    price: "£1050",
    audience: "For Midsize Business",
  },
  {
    name: "Elite",
    price: "£1400",
    audience: "For Enterprise",
  },
];


// ----------------------------------------
// Outcomes
// ----------------------------------------

type Outcome = {
  title: string;
  description: string;
};


const outcomes: Outcome[] = [
  {
    title: "Supporting",
    description:
      "We support our client with the service-learning abilities, clear communication, Client suitable Timeframe adjustment, Simple examples for complex ideas, and educating them on risk free investment",
  },
  {
    title: "Years Of Experience",
    description:
      "With 15 years of Experience, we produce labour efficiency, Maintain High Standardization and Specialisation, Technology driven solution which is easy to understand for our customers",
  },
  {
    title: "Result Driven",
    description:
      "We create result driven strategies as we definitely know that digital marketing is one of the best kind. We recognize value, target outcomes, understand customers need, capture demands, and master their brand.",
  },
];
type Service = {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  description: string;
};


const services: Service[] = [
  {
    id: "seo",
    title: "Search Engine Optimisation",
    shortTitle: "SEO",
    icon: Search,
    description:
      "Search Engine Optimisation is all about getting on that first Google page and another search engine like Yahoo and Bing, staying top of the list and top of mind. We develop keyword strategies, understand the kind of content that attracts users, optimise rankings and then convert visitors to customers. As our agency has grown, and the digital landscape has evolved, we’ve developed our Digital Marketing offerings, but SEO is still very much the foundations to our champion campaigns. From making sure your website is technically sound, to understanding Google’s ranking factors, we pull all the collated data into one place to produce a search strategy that’s right for you. Whether that’s achieving more #1 positions than The Beatles, or staying one step ahead of your competitors.",
  },

  {
    id: "social-media",
    title: "Social Media Marketing",
    shortTitle: "Social",
    icon: Share2,
    description:
      "We bring your brand story to life on all the right social media platforms such as Facebook, Twitter, Linkedin, Instagram, Google My Business. We will grow and engage a community around your offering. We will define your audience and give them more to care about. There is so much to ‘like’.",
  },

  {
    id: "ppc",
    title: "PPC and Adwords Management",
    shortTitle: "PPC",
    icon: MousePointerClick,
    description:
      "We develop strategies for Pay-Per Click and Adwords using Google Ads, bid auctions and build your targeting audience. Optimise campaigns, track conversions, and measure your ROI. As a trusted Google partner, we put our money where our mouth is and promise to maximise your ROI and increase your conversions. With the perfect combination of industry leading tools, and forward thinking brains, we structure all of our PPC campaigns around audits, audiences and analysis. From exploring your current campaigns, to crafting new ones, we use data to find the best places to spend your PPC budget, whether that be on search engines, across display networks or on social media.",
  },

  {
    id: "content-marketing",
    title: "Content Marketing",
    shortTitle: "Content",
    icon: Layers,
    description:
      "We create content that speaks to people, at the right time and via the right channels. Understand what works for you by tracking and measuring performance. Understanding your audience’s intentions when searching for a service or product is integral to a content strategy, which is why we not only carry out comprehensive research, but combine it with UX design. We then turn this knowledge into words, creating content that is loved by Google and users alike. Whether it’s establishing you as a thought leader in your industry, or reeling in long tail traffic, we create content that sparks engagement, and inspires communities.",
  },

  {
    id: "video-marketing",
    title: "Video marketing",
    shortTitle: "Video",
    icon: Video,
    description:
      "We will set up, manage and optimise your YouTube channel. Target, test and develop your use of the Google Display Network and get creative with visual formats. We create best of the best video so that your audience can connect with you instantly. Script writing, Story boarding, Animation, Image selection, Video creation leave it all with us.",
  },

  {
    id: "email-marketing",
    title: "Email Marketing",
    shortTitle: "Email",
    icon: Mail,
    description:
      "Your email list is one of your most powerful assets. We will manage and segment your data, test headlines and maximise open rates and ROI. We also cover marketing automation and the importance of data management regulations. E-mails have become a part of everyday life, everyone expects them, however not everyone opens them. But with a well-thought out email roadmap, we can help you achieve your aims, and ensure your emails are getting opened with the right message, at the right time of day and week. By pairing not-to-be-missed subject lines, with a cracking design we can deliver results and help shape your future campaigns by analysing the data, segmenting your email database and creating an implementation plan.",
  },

  {
    id: "text-marketing",
    title: "Text Marketing",
    shortTitle: "Messaging",
    icon: MessageCircle,
    description:
      "We deliver your messages to your right audience, customers and subscribers using Mobile SMS or Whatsapp messages. We use text marketing to generate sales, but it can also improve brand awareness, educate subscribers, increase website traffic, or promote a charity or nonprofit organization.",
  },

  {
    id: "website-optimisation",
    title: "Website Optimisation",
    shortTitle: "Optimise",
    icon: Activity,
    description:
      "What makes a winning website? You have just got 3 sec to engage your customer. We will give your website the edge that is, well-designed, optimised, better performance that not only looks good but also delivers for your business.",
  },

  {
    id: "cro",
    title: "Conversion Rate Optimisation",
    shortTitle: "CRO",
    icon: TrendingUp,
    description:
      "It can be frustrating when you’ve pushed all the right buttons but your campaign isn’t taking off. You can create what you think is the best looking e-mail newsletter, or the most engaging landing page, but that doesn’t guarantee your audience members will love it just as much as you do. But there is a solution. By mixing together some A/B testing, Multivariate testing and analysis we can provide you with the recipe to success.",
  },

  {
    id: "digital-pr",
    title: "Digital PR and Magazine",
    shortTitle: "Digital PR",
    icon: Megaphone,
    description:
      "No longer is PR about having the local town crier announce the latest news, being mentioned on the radio, or getting onto page 3 of the national newspaper or getting into a national Magazine. It’s about the relationships you have with influential stakeholders, the media and, your target audience, and if there’s one thing we’re good at, it’s building relationships. By knocking some creative minds together we produce campaigns that shake up ideas, capture attention, and produce results.",
  },
];



export default function DigitalMarketingPage() {
  const [loading, setLoading] = useState<string | null>(null);


  async function checkout(plan: MarketingPlan) {
  try {

    setLoading(plan.name);


    const response = await fetch(
      "/api/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: plan.name,
        }),
      }
    );


    const data = await response.json();


    if (!response.ok || !data.url) {
      throw new Error(
        data.error || "Checkout failed"
      );
    }


    window.location.assign(data.url);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(null);

  }

}
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BrandPageBackdrop />
      <div className="relative z-10">
        {/* Hero Section */}
       {/* Hero Section */}
<section className="relative isolate overflow-hidden pb-20 pt-36 lg:pb-28 lg:pt-48">
  <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />

  <div className="pointer-events-none absolute right-[-10%] top-1/3 -z-10 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[120px]" />

  <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-10">

    {/* Content */}
    <motion.div
      {...reveal}
      transition={{
        duration: 0.55,
      }}
    >
      <nav
        aria-label="Breadcrumb"
        className="mb-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400"
      >
        <Link
          href="/"
          className="transition hover:text-cyan-300"
        >
          Home
        </Link>

        <ChevronRight size={13} />

        <Link
          href="/our-services"
          className="transition hover:text-cyan-300"
        >
          Services
        </Link>

        <ChevronRight size={13} />

        <span className="text-cyan-200">
          Digital marketing
        </span>
      </nav>


      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
        <Sparkles size={14} />
        Digital
      </div>


      <h1 className="max-w-3xl text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
        Marketing{" "}
        <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 bg-clip-text text-transparent">
          Agency
        </span>
      </h1>


      <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
        Visualytes is a digital marketing agency based in South of England.
        We offer an array of different digital marketing strategies, such as
        SEO, SMM, PPC, PR, Video, Content, Email, Text, and WhatsApp.
        Digital marketing has blossomed in the past few years into something
        big and beautiful; it’s at the core of everything we do.

        By working with you, we can create an integrated digital marketing
        strategy that aligns with your business goals, and furthermore,
        puts your target audience at centre stage.
      </p>


      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
        Through discovery and research, we will create a campaign that spans
        across multiple channels that promise to add value to your brand and
        therefore, generate remarkable results.
      </p>


      <div className="mt-9 flex flex-wrap gap-4">

        <HomeBrandButton href="/contact-us">
          Get Started Now!
          <ArrowRight size={16} />
        </HomeBrandButton>


        <HomeBrandButton
          href="#portfolio"
          variant="outline"
        >
          Our Projects
        </HomeBrandButton>

      </div>

    </motion.div>



    {/* Orbit Graphic */}
    <motion.div
      {...reveal}
      transition={{
        duration: 0.65,
        delay: 0.12,
      }}
      className="relative mx-auto w-full max-w-xl"
    >

      <div className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-cyan-400/25 via-transparent to-fuchsia-500/25 blur-2xl" />


      <div
        aria-hidden="true"
        className="relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/85 shadow-[0_30px_90px_rgba(2,6,23,.65)] backdrop-blur-xl"
      >

        <div className="absolute h-48 w-48 rounded-full border border-cyan-300/30" />

        <div className="absolute h-80 w-80 rounded-full border border-fuchsia-300/20" />

        <div className="absolute h-[29rem] w-[29rem] rounded-full border border-white/10" />


        <div className="relative grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-cyan-300 to-fuchsia-400 text-slate-950 shadow-[0_0_70px_rgba(34,211,238,.45)]">

          <Sparkles size={38} />

        </div>



        {[
          Search,
          Share2,
          MousePointerClick,
          Layers,
          Video,
          Mail,
          MessageCircle,
          TrendingUp,
        ].map((Icon, index) => (

          <div
            key={`orbit-icon-${index}`}
            className="absolute grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-slate-950/90 text-cyan-200 shadow-xl"
            style={{
              transform: `
                rotate(${index * 45}deg)
                translateY(-142px)
                rotate(-${index * 45}deg)
              `,
            }}
          >

            <Icon size={20} />

          </div>

        ))}


      </div>


    </motion.div>


  </div>
</section>

        {/* Services Section */}
        {/* Services Section */}
<section
  id="services"
  className="border-y border-white/10 bg-slate-900/35 py-20 lg:py-28"
>
  <div className="mx-auto max-w-7xl px-6 lg:px-10">

    <motion.div
      {...reveal}
      className="max-w-3xl"
    >
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
        Full Service Digital Agency
      </p>

      <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Our Services
      </h2>
    </motion.div>



    <div className="mt-12 grid gap-4 md:grid-cols-2">

      {services.map((service, index) => {

        const Icon = service.icon;


        return (
          <motion.article
            key={service.id}
            {...reveal}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.04, 0.2),
            }}
            className="
              group rounded-3xl
              border border-white/10
              bg-slate-950/60
              p-6
              transition
              hover:-translate-y-1
              hover:border-cyan-300/35
              hover:bg-slate-900
            "
          >

            <div className="flex gap-4">

              {/* Icon */}
              <div
                className="
                  grid h-12 w-12 shrink-0
                  place-items-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-300/20
                  to-fuchsia-300/20
                  text-cyan-200
                "
              >
                <Icon size={22} />
              </div>



              {/* Title */}
              <div>

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-fuchsia-300
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                  {" · "}
                  {service.shortTitle}
                </p>


                <h3 className="mt-1 text-xl font-bold text-white">
                  {service.title}
                </h3>

              </div>


            </div>



            {/* Description */}
            <p
              className="
                mt-5
                text-sm
                leading-7
                text-slate-300
              "
            >
              {service.description}
            </p>


          </motion.article>
        );

      })}

    </div>

  </div>
</section>

        {/* Be Responsive & Outcomes Section */}
       {/* Be Responsive & Outcomes Section */}
<section className="py-20 lg:py-28">

<div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">


  {/* Left Content */}
  <motion.div
    {...reveal}
  >

    <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
      Be Responsive
    </p>


    <h2 className="mt-4 text-4xl font-bold tracking-tight">
      Be Responsive
    </h2>


    <p className="mt-6 text-lg leading-8 text-slate-300">

      Your website always needs to looks great over every device which you
      can accomplish through responsive web design. It fulfills you in
      every aspects to compete in your sector with rivals. Not only that,
      increasing the user experience it promotes your business and helps
      to establish your company in this competitive market.

    </p>



    <p className="mt-4 leading-7 text-slate-400">

      Responsive websites are easy to maintain and needs comparatively low
      maintenance budget. Moreover as Google also suggest responsive
      design, it will be beneficial for ranking of your site. Mobile
      visitors to your site get encouraged which will in turn add positive
      result into company goodwill.

    </p>



    <p
      className="
        mt-6
        border-l-2
        border-fuchsia-300/60
        pl-4
        text-sm
        leading-7
        text-slate-300
      "
    >

      Our Clients Love our Transparency, Valued Partnership, Scalable
      Support, Active Listening, Royal Treatment, Authenticity,
      Expectation Management from the day before they start with us.

    </p>


  </motion.div>




  {/* Outcome Cards */}
  <motion.div
    {...reveal}
    transition={{
      delay: 0.1,
    }}
    className="grid gap-4 sm:grid-cols-3"
  >

    {outcomes.map((item, index) => (

      <motion.div
        key={item.title}
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.4,
          delay: index * 0.08,
        }}
        className="
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-b
          from-white/[.06]
          to-white/[.02]
          p-6
        "
      >

        <div
          className="
            mb-10
            text-4xl
            font-bold
            text-cyan-300/80
          "
        >
          {String(index + 1).padStart(2, "0")}
        </div>



        <h3 className="text-lg font-bold">
          {item.title}
        </h3>



        <p
          className="
            mt-3
            text-sm
            leading-6
            text-slate-400
          "
        >
          {item.description}
        </p>


      </motion.div>

    ))}


  </motion.div>


</div>

</section>

  
<section className="bg-slate-900/35 py-20 lg:py-28">

<div className="mx-auto max-w-5xl px-6 text-center lg:px-10">

  <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
    End To End Digital Marketing
  </p>


  <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">

    Underneath your digital activity, you need solid objectives and plan.
    We help you to build a clear vision of your strategy, and makes it
    actionable with budget, channel and media plans, KPIs and more.

  </p>


  <div className="mt-9">

    <HomeBrandButton href="/end-to-end-digital-marketing-plans">

      E2E Marketing

      <ArrowRight size={16} />

    </HomeBrandButton>

  </div>


</div>

</section>



<ProcessSection />





{/* Pricing Plans Section */}
<section className="py-20 lg:py-28">

<div className="mx-auto max-w-7xl px-6 lg:px-10">


  <motion.div
    {...reveal}
    className="text-center"
  >

    <h2 className="mt-4 text-4xl font-bold tracking-tight">

      Our End To End Marketing Plans

    </h2>

  </motion.div>



  <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">


    {plans.map((plan, index) => (

      <motion.article

        key={plan.name}

        {...reveal}

        transition={{
          duration: 0.4,
          delay: index * 0.08,
        }}

        className={`relative rounded-3xl border p-6 ${
          plan.featured
            ? "border-cyan-300/50 bg-gradient-to-b from-cyan-300/15 to-slate-900"
            : "border-white/10 bg-slate-900/60 hover:border-cyan-300/50 bg-gradient-to-b from-cyan-300/15 to-slate-900 shadow-[0_20px_60px_rgba(34,211,238,.12)]"
        }`}

      >

      



        <p className="text-sm font-bold text-slate-300">

          {plan.name}

        </p>



        <p className="mt-5 text-4xl font-bold">

          {plan.price}

        </p>



        <p className="mt-2 text-sm text-slate-400">

          {plan.audience}

        </p>



        <div className="my-7 h-px bg-white/10" />



        <div className="flex flex-wrap gap-4">


          <Link

            href="/end-to-end-digital-marketing-plans"

            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-slate-300
              transition
              hover:text-white
            "

          >

            What You Get

            <ArrowRight size={15} />

          </Link>



          <button

onClick={() => checkout(plan)}

disabled={loading === plan.name}

className="
  inline-flex
  items-center
  gap-2
  text-sm
  font-bold
  text-cyan-300
  transition
  hover:text-white
  disabled:opacity-50
"

>

{loading === plan.name
  ? "Processing..."
  : "Purchase"
}

<ArrowRight size={15} />

</button>


        </div>


      </motion.article>

    ))}


  </div>


</div>

</section>





{/* Portfolio */}
<Portfolio />



{/* Testimonials */}
<TestimonialsSection />





{/* Blog Section */}
<section className="bg-slate-900/35 py-20 lg:py-28">

<div className="mx-auto max-w-7xl px-6 lg:px-10">


  <div className="flex flex-wrap items-end justify-between gap-6">


    <div>

      <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">

        From Our Blog

      </p>


      <h2 className="mt-3 text-4xl font-bold tracking-tight">

        From Our Blog

      </h2>


    </div>



    <HomeBrandButton
      href="/blog"
      variant="outline"
    >

      Go To Blog

    </HomeBrandButton>


  </div>




  <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">


    {blogs.slice(0, 3).map((blog) => (

      <BlogCard
        key={blog.id}
        {...blog}
      />

    ))}


  </div>


</div>

</section>





{/* Closing Layout Components */}

<AppointmentTalk />

<ClientSlider />

<AboveFooter />

        {/* Closing Layout Components */}
       
      </div>
    </main>
  );
}