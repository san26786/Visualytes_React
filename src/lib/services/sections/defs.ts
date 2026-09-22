/**
 * Section definitions: what every section is called, which fields it exposes in
 * the admin editor, and the default content (= the text/images the original
 * static pages shipped with). Renderers live in
 * src/app/archives/services/_sections/renderers.tsx.
 */
import {
  audienceSegments,
  bespokeTestimonials,
  caseStudies,
  heroHighlights,
  products,
  technologyContent,
} from "./seedBespoke.ts";
import {
  dmOutcomes,
  dmPlans,
  dmServices,
  mobileAwards,
  mobileClients,
  mobileFaqs,
  mobileReviewBadges,
  mobileServices,
  webCertifications,
  webClients,
  webExperienceCards,
  webPortfolioCategories,
  webPortfolioProjects,
  webStats,
  webTechnologies,
  webWhatWeDo,
} from "./seedData.ts";
import type { FieldDef, SectionDef, SelectOption } from "./types.ts";

/* ------------------------------------------------------------------ */
/* Option lists                                                        */
/* ------------------------------------------------------------------ */

export const ICON_NAMES = [
  "Activity", "Award", "BarChart3", "Briefcase", "Building2", "Cloud", "Code2", "Globe", "Heart",
  "Landmark", "Layers", "Lightbulb", "Mail", "Megaphone", "MessageCircle", "MonitorSmartphone",
  "MousePointerClick", "Palette", "PoundSterling", "Rocket", "Search", "Server", "Share2",
  "ShieldCheck", "Smartphone", "Sparkles", "Star", "Target", "TrendingUp", "Users", "Video",
  "Wrench", "Zap",
] as const;

export const ICON_OPTIONS: SelectOption[] = ICON_NAMES.map((name) => ({ value: name, label: name }));

/** Literal class strings so Tailwind keeps them. Keep in sync with renderers.tsx. */
export const ACCENT_OPTIONS: SelectOption[] = [
  { value: "from-cyan-400 to-cyan-600", label: "Cyan" },
  { value: "from-fuchsia-400 to-pink-500", label: "Fuchsia / Pink" },
  { value: "from-violet-400 to-indigo-500", label: "Violet / Indigo" },
  { value: "from-emerald-400 to-teal-500", label: "Emerald / Teal" },
  { value: "from-amber-400 to-orange-500", label: "Amber / Orange" },
  { value: "from-rose-400 to-red-500", label: "Rose / Red" },
];

/* ------------------------------------------------------------------ */
/* Tiny field builders                                                 */
/* ------------------------------------------------------------------ */

const text = (key: string, label: string, help?: string, placeholder?: string): FieldDef => ({ key, label, type: "text", help, placeholder });
const area = (key: string, label: string, help?: string): FieldDef => ({ key, label, type: "textarea", help });
const url = (key: string, label: string, help?: string): FieldDef => ({ key, label, type: "url", help });
const image = (key: string, label: string, help?: string): FieldDef => ({ key, label, type: "image", help });
const num = (key: string, label: string, help?: string): FieldDef => ({ key, label, type: "number", help });
const strings = (key: string, label: string, itemLabel = "Item", multiline = false, help?: string): FieldDef => ({ key, label, type: "strings", itemLabel, multiline, help });
const select = (key: string, label: string, options: SelectOption[], help?: string): FieldDef => ({ key, label, type: "select", options, help });
const list = (key: string, label: string, itemLabel: string, fields: FieldDef[], titleKey?: string, help?: string): FieldDef => ({ key, label, type: "list", itemLabel, fields, titleKey, help });

/* ------------------------------------------------------------------ */
/* Definitions                                                         */
/* ------------------------------------------------------------------ */

const HEADING_HELP = "The heading is written as: start text + coloured accent text + end text.";

export const SECTION_DEFS: SectionDef[] = [
  /* ---------------------------- HEROES ---------------------------- */
  {
    type: "hero.centered",
    label: "Hero - Centered",
    description: "Big centered title with breadcrumb, subtitle, optional tagline, scrolling logo strip and button.",
    group: "Hero",
    wire: "hero",
    fields: [
      text("breadcrumbLabel", "Breadcrumb label", "Last item in the Home ● … trail"),
      text("title", "Title"),
      text("titleAccent", "Title accent", "Shown after the title in the brand gradient"),
      area("subtitle", "Subtitle"),
      text("tagline", "Tagline (optional)", "Bold cyan line shown under the divider"),
      list("logos", "Scrolling logos (optional)", "Logo", [text("name", "Name"), image("image", "Logo image")], "name"),
      text("ctaText", "Button text (optional)"),
      url("ctaLink", "Button link"),
    ],
    defaults: {
      breadcrumbLabel: "Web Services",
      title: "Software Development &",
      titleAccent: "Web Development",
      subtitle: "Your trusted partner for exceptional web solutions in London, UK.",
      tagline: "",
      logos: [],
      ctaText: "",
      ctaLink: "",
    },
  },
  {
    type: "hero.split",
    label: "Hero - Split with image",
    description: "Title, text and two buttons on the left, framed image on the right.",
    group: "Hero",
    wire: "hero-split",
    fields: [
      text("breadcrumbLabel", "Breadcrumb label"),
      text("title", "Title"),
      text("titleAccent", "Title accent"),
      area("subtitle", "Subtitle"),
      text("primaryCtaText", "Primary button text"),
      url("primaryCtaLink", "Primary button link"),
      text("secondaryCtaText", "Secondary button text"),
      url("secondaryCtaLink", "Secondary button link"),
      image("image", "Hero image"),
      text("imageAlt", "Image alt text"),
    ],
    defaults: {
      breadcrumbLabel: "Bespoke Software",
      title: "Bespoke Software Development and Digital Transformation from",
      titleAccent: "Conception to Delivery",
      subtitle:
        "By sharing our expertise and passion we empower and digitally transform organisations whilst continuously providing value",
      primaryCtaText: "Estimate Project",
      primaryCtaLink: "/estimate-project",
      secondaryCtaText: "Free Consultation",
      secondaryCtaLink: "/contact-us",
      image: "/assets/png/services/Bespoke-Software-Development.png",
      imageAlt: "Bespoke Software Development",
    },
  },
  {
    type: "hero.orbit",
    label: "Hero - Orbit graphic",
    description: "Left text with badge and two buttons, animated icon-orbit graphic on the right.",
    group: "Hero",
    wire: "hero-split",
    fields: [
      text("breadcrumbLabel", "Breadcrumb label"),
      text("badge", "Badge text"),
      text("title", "Title"),
      text("titleAccent", "Title accent"),
      area("paragraph1", "Main paragraph"),
      area("paragraph2", "Second paragraph"),
      text("primaryCtaText", "Primary button text"),
      url("primaryCtaLink", "Primary button link"),
      text("secondaryCtaText", "Secondary button text"),
      url("secondaryCtaLink", "Secondary button link", "Use #portfolio to scroll to the portfolio section"),
    ],
    defaults: {
      breadcrumbLabel: "Digital marketing",
      badge: "Digital",
      title: "Marketing",
      titleAccent: "Agency",
      paragraph1:
        "Visualytes is a digital marketing agency based in South of England. We offer an array of different digital marketing strategies, such as SEO, SMM, PPC, PR, Video, Content, Email, Text, and WhatsApp. Digital marketing has blossomed in the past few years into something big and beautiful; it’s at the core of everything we do. By working with you, we can create an integrated digital marketing strategy that aligns with your business goals, and furthermore, puts your target audience at centre stage.",
      paragraph2:
        "Through discovery and research, we will create a campaign that spans across multiple channels that promise to add value to your brand and therefore, generate remarkable results.",
      primaryCtaText: "Get Started Now!",
      primaryCtaLink: "/contact-us",
      secondaryCtaText: "Our Projects",
      secondaryCtaLink: "#portfolio",
    },
  },
  {
    type: "hero.archive",
    label: "Hero - Page banner",
    description: "Standard inner-page banner: breadcrumb, eyebrow, title with accent and subtitle.",
    group: "Hero",
    wire: "hero",
    fields: [
      text("eyebrow", "Eyebrow", "Small label above the title"),
      text("title", "Title"),
      text("titleAccent", "Title accent"),
      area("subtitle", "Subtitle"),
      text("breadcrumbLabel", "Breadcrumb label"),
    ],
    defaults: {
      eyebrow: "Services",
      title: "Our",
      titleAccent: "Service",
      subtitle: "Enterprise-grade digital solutions tailored to accelerate your growth.",
      breadcrumbLabel: "Our Service",
    },
  },

  /* ------------------------ CONTENT / ARTICLE ---------------------- */
  {
    type: "article.standard",
    label: "Article with image",
    description: "Title and paragraphs beside a framed image, then extra paragraphs, numbered cards and bullet points.",
    group: "Content",
    wire: "split",
    fields: [
      text("pillLabel", "Small label", "Pill above the title"),
      text("title", "Section title"),
      area("intro", "Intro (optional)"),
      strings("description", "Paragraphs beside the image", "Paragraph", true),
      image("image", "Image"),
      strings(
        "topDescription",
        "Extra paragraphs",
        "Paragraph",
        true,
        "A paragraph that starts with a number and a dot (e.g. '1. Strategy') becomes a card heading; the paragraphs after it become that card's text."
      ),
      text("bottomTitle", "Bullet list heading (optional)"),
      strings("bullets", "Bullet points", "Bullet"),
      area("bottomDescription", "Closing paragraph (optional)"),
    ],
    defaults: {
      pillLabel: "Our Expertise",
      title: "Our Service",
      intro: "",
      description: ["Describe your service here."],
      image: "/assets/png/services/Website-designing-600x600.png",
      topDescription: [],
      bottomTitle: "",
      bullets: [],
      bottomDescription: "",
    },
  },
  {
    type: "about.video",
    label: "About with video",
    description: "Heading, sub-heading and paragraph beside an autoplaying looped video.",
    group: "Content",
    wire: "video",
    fields: [
      text("heading", "Heading"),
      text("subheading", "Sub-heading"),
      area("description", "Description"),
      { key: "videoPath", label: "Video file", type: "video", help: "MP4, muted, autoplays and loops" },
    ],
    defaults: {
      heading: "About Mobile & Web App Development with Visualytes",
      subheading: "Don’t spend time building your own team. Start working on your app right away",
      description:
        "Visualytes is an iOS and Android mobile & web app development company based in London. The company has been established in 2011. The company offer full-stack mobile, web, and backend development services. Being a 100% office-based team of 60+ talented professionals, we serve clients throughout the world, mostly in the US, UK, and European Union. Visualytes has worked on over 130 digital products and apps. The company cooperate with start-ups and enterprise companies. Over 30 000 apps like Facebook or WhatsApp use our open source libraries in their famous products.",
      videoPath: "/assets/mp4/high.mp4",
    },
  },
  {
    type: "text.highlight",
    label: "Centered highlight text",
    description: "A big heading with one bold cyan line underneath.",
    group: "Content",
    wire: "text",
    fields: [text("heading", "Heading"), text("subheading", "Highlight line")],
    defaults: {
      heading: "Open Source",
      subheading: "+30 000 apps use our Open Source Code to Improve Their Products",
    },
  },
  {
    type: "split.bestDesign",
    label: "Two-colour split banner",
    description: "Full-width banner split into a blue left panel and a light right panel, each with a title and text.",
    group: "Content",
    wire: "split",
    fields: [
      text("leftTitle", "Left title"),
      area("leftText", "Left text"),
      text("rightTitle", "Right title"),
      area("rightText", "Right text"),
    ],
    defaults: {
      leftTitle: "Best Design",
      leftText:
        "Design begins from research of needs of your target audience. The second step is prototyping and testing. This ensures that you get not just a pretty picture, but the finished product which fulfills your purposes.",
      rightTitle: "Best Codes",
      rightText:
        "Our lead engineer will develop an individual structure of your project, which will serve you for many years and support scalability and your future needs. Our code is a high quality and safety standards.",
    },
  },
  {
    type: "text.responsive",
    label: "Text + numbered outcome cards",
    description: "Left column with heading, paragraphs and a quote line; three numbered cards on the right.",
    group: "Content",
    wire: "cards-3",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading"),
      area("paragraph1", "Paragraph 1"),
      area("paragraph2", "Paragraph 2"),
      area("quote", "Highlighted line", "Shown with a pink left border"),
      list("outcomes", "Numbered cards", "Card", [text("title", "Title"), area("description", "Description")], "title"),
    ],
    defaults: {
      eyebrow: "Be Responsive",
      heading: "Be Responsive",
      paragraph1:
        "Your website always needs to looks great over every device which you can accomplish through responsive web design. It fulfills you in every aspects to compete in your sector with rivals. Not only that, increasing the user experience it promotes your business and helps to establish your company in this competitive market.",
      paragraph2:
        "Responsive websites are easy to maintain and needs comparatively low maintenance budget. Moreover as Google also suggest responsive design, it will be beneficial for ranking of your site. Mobile visitors to your site get encouraged which will in turn add positive result into company goodwill.",
      quote:
        "Our Clients Love our Transparency, Valued Partnership, Scalable Support, Active Listening, Royal Treatment, Authenticity, Expectation Management from the day before they start with us.",
      outcomes: dmOutcomes,
    },
  },
  {
    type: "partner.segments",
    label: "Partner story + audience cards",
    description: "Heading, paragraph and image, followed by a grid of icon cards for who you serve.",
    group: "Content",
    wire: "split",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading"),
      area("description", "Paragraph"),
      image("image", "Image"),
      text("imageAlt", "Image alt text"),
      text("whoEyebrow", "Cards eyebrow"),
      text("whoTitle", "Cards title"),
      text("whoHighlight", "Cards title accent"),
      area("whoSubtitle", "Cards subtitle"),
      list(
        "segments",
        "Cards",
        "Card",
        [text("title", "Title"), select("icon", "Icon", ICON_OPTIONS), select("accent", "Colour", ACCENT_OPTIONS)],
        "title"
      ),
    ],
    defaults: {
      eyebrow: "Your Partner",
      heading:
        "As your Digital Transformation partner, we will be with you every step of the way – from initial planning to delivery, and beyond.",
      description:
        "Our multi-award winning 250+ team of expert software developers create bespoke software products, apps and operational systems for SMEs, enterprise, not-for-profit, government and funded start-ups using a choice of Microsoft and Javascript technologies across our UK and mainland European delivery centres.",
      image: "/assets/png/unity-1.png",
      imageAlt: "Digital transformation team",
      whoEyebrow: "Who We Serve",
      whoTitle: "Solutions Tailored for",
      whoHighlight: "Every Stage",
      whoSubtitle:
        "From enterprise digital transformation to funded start-ups — we build software that fits your organisation.",
      segments: audienceSegments,
    },
  },
  {
    type: "technology.split",
    label: "Technology split",
    description: "Image with three tech chips on the left; title, text and button on the right.",
    group: "Content",
    wire: "split",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("title", "Title"),
      area("description", "Description"),
      image("image", "Image"),
      text("imageAlt", "Image alt text"),
      list("stack", "Tech chips", "Chip", [text("label", "Label"), select("icon", "Icon", ICON_OPTIONS)], "label"),
      text("buttonText", "Button text"),
      url("buttonLink", "Button link"),
    ],
    defaults: {
      eyebrow: "Technology",
      title: technologyContent.title,
      description: technologyContent.description,
      image: technologyContent.image,
      imageAlt: "Bespoke software technology stack",
      stack: [
        { label: ".NET Core & Azure", icon: "Cloud" },
        { label: "MEAN / Node.js & AWS", icon: "Code2" },
        { label: "React & Xamarin", icon: "Smartphone" },
      ],
      buttonText: "Discuss Your Stack",
      buttonLink: "/contact-us",
    },
  },

  /* ------------------------- CARDS & LISTS ------------------------- */
  {
    type: "cards.imageTriple",
    label: "Three image cards",
    description: "Three large cards with image, title, cyan sub-title and description.",
    group: "Cards & Lists",
    wire: "cards-3",
    fields: [
      list(
        "items",
        "Cards",
        "Card",
        [text("title", "Title"), text("subtitle", "Sub-title"), area("description", "Description"), image("icon", "Image")],
        "title"
      ),
    ],
    defaults: { items: webExperienceCards },
  },
  {
    type: "grid.imageCards",
    label: "Image card grid (4 per row)",
    description: "Heading and a grid of picture cards with a short description.",
    group: "Cards & Lists",
    wire: "grid",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading (start)", HEADING_HELP),
      text("accent", "Heading accent"),
      text("headingEnd", "Heading (end)"),
      list("items", "Cards", "Card", [text("title", "Title", "Used as the image alt text"), area("description", "Description"), image("icon", "Image")], "title"),
    ],
    defaults: {
      eyebrow: "What We Do",
      heading: "We create websites and applications that",
      accent: "provide effective solutions",
      headingEnd: "for your goals",
      items: webWhatWeDo,
    },
  },
  {
    type: "services.imageGrid",
    label: "Service image grid (3 per row)",
    description: "Heading with sub-heading and a grid of cards with tall image, title and text.",
    group: "Cards & Lists",
    wire: "cards-3",
    fields: [
      text("heading", "Heading"),
      text("subheading", "Sub-heading"),
      list("items", "Cards", "Card", [text("title", "Title"), area("description", "Description"), image("image", "Image")], "title"),
    ],
    defaults: {
      heading: "Services",
      subheading: "Everything your Custom App needs in one place",
      items: mobileServices,
    },
  },
  {
    type: "services.cards",
    label: "Numbered service list (2 columns)",
    description: "Heading and numbered service cards with an icon, short label, title and a long description.",
    group: "Cards & Lists",
    wire: "list",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading"),
      list(
        "items",
        "Services",
        "Service",
        [
          text("title", "Title"),
          text("shortTitle", "Short label", "Shown next to the number, e.g. 01 · SEO"),
          select("icon", "Icon", ICON_OPTIONS),
          area("description", "Description"),
          text("id", "Anchor id", "Unique, lowercase, no spaces"),
        ],
        "title"
      ),
    ],
    defaults: {
      eyebrow: "Full Service Digital Agency",
      heading: "Our Services",
      items: dmServices,
    },
  },
  {
    type: "highlights.icons",
    label: "Highlight tiles",
    description: "A grid of icon tiles, each with one line of text (icons and colours cycle automatically).",
    group: "Cards & Lists",
    wire: "cards-3",
    fields: [strings("items", "Highlights", "Highlight")],
    defaults: { items: heroHighlights },
  },
  {
    type: "cases.grid",
    label: "Case study cards",
    description: "Section heading and a grid of image cards with label, title and text.",
    group: "Cards & Lists",
    wire: "grid",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("title", "Title"),
      text("highlight", "Title accent"),
      area("subtitle", "Subtitle"),
      list(
        "items",
        "Case studies",
        "Case study",
        [text("title", "Title"), text("subtitle", "Label chip"), area("description", "Description"), image("image", "Image"), url("href", "Link")],
        "title"
      ),
    ],
    defaults: {
      eyebrow: "Case Studies",
      title: "Real Projects,",
      highlight: "Real Impact",
      subtitle:
        "Explore how we've helped businesses across industries with bespoke software, web platforms, and digital transformation.",
      items: caseStudies,
    },
  },
  {
    type: "products.grid",
    label: "Product cards",
    description: "Section heading and a grid of product cards with image, title and text.",
    group: "Cards & Lists",
    wire: "grid",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("title", "Title"),
      text("highlight", "Title accent"),
      area("subtitle", "Subtitle"),
      list("items", "Products", "Product", [text("title", "Title"), area("description", "Description"), image("image", "Image")], "title"),
    ],
    defaults: {
      eyebrow: "Our Products",
      title: "Built by Visualytes,",
      highlight: "Ready to Scale",
      subtitle:
        "In-house products and platforms we've developed — from HR tools to document signing and beyond.",
      items: products,
    },
  },
  {
    type: "awards.grid",
    label: "Awards / rankings",
    description: "Heading and a grid of trophy cards with a title and optional rank.",
    group: "Cards & Lists",
    wire: "cards-3",
    fields: [
      text("heading", "Heading"),
      text("subheading", "Sub-heading"),
      list("items", "Awards", "Award", [text("title", "Title"), text("rank", "Rank (optional)")], "title"),
    ],
    defaults: {
      heading: "Proven experience and reviews",
      subheading: "Visualytes is listed among world's top software development companies",
      items: mobileAwards,
    },
  },
  {
    type: "cards.certifications",
    label: "Certifications",
    description: "Heading and a row of certification cards (logo, name, description).",
    group: "Cards & Lists",
    wire: "cards-4",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading (start)", HEADING_HELP),
      text("accent", "Heading accent"),
      list("items", "Certifications", "Certification", [text("name", "Name"), text("description", "Description"), image("icon", "Logo")], "name"),
    ],
    defaults: {
      eyebrow: "Certifications",
      heading: "Our",
      accent: "Certifications",
      items: webCertifications,
    },
  },
  {
    type: "clients.showcase",
    label: "Client showcase (alternating)",
    description: "Review-site badges, heading and big alternating case rows with image, text and responsibilities.",
    group: "Cards & Lists",
    wire: "list",
    fields: [
      list("badges", "Review badges", "Badge", [text("name", "Name"), image("image", "Badge image")], "name"),
      text("heading", "Heading"),
      text("subheading", "Sub-heading"),
      text("chipLabel", "Chip label", "Small pill above each client name"),
      list(
        "items",
        "Clients",
        "Client",
        [
          text("name", "Name"),
          area("description", "Description"),
          strings("responsibilities", "What we did", "Responsibility"),
          image("image", "Image"),
        ],
        "name"
      ),
    ],
    defaults: {
      badges: mobileReviewBadges,
      heading: "Clients",
      subheading: "Work with groundbreakers who create top-notch mobile and web apps on time & on budget",
      chipLabel: "Mobile Application",
      items: mobileClients,
    },
  },

  /* ------------------------ LOGOS & PROOF ------------------------- */
  {
    type: "portfolio.filter",
    label: "Filterable portfolio",
    description: "Heading, category filter buttons and an image grid that filters live.",
    group: "Logos & Proof",
    wire: "grid",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading (start)", HEADING_HELP),
      text("accent", "Heading accent"),
      strings("categories", "Filter buttons", "Category", false, "Keep 'All' first. A project shows under a filter when its categories contain that exact word."),
      list(
        "projects",
        "Projects",
        "Project",
        [text("title", "Title"), strings("categories", "Categories", "Category"), image("image", "Image")],
        "title"
      ),
      text("buttonText", "Button text"),
      url("buttonLink", "Button link"),
    ],
    defaults: {
      eyebrow: "Our Portfolio",
      heading: "Our Latest & Greatest",
      accent: "Projects",
      categories: webPortfolioCategories,
      projects: webPortfolioProjects,
      buttonText: "View all projects",
      buttonLink: "/portfolio",
    },
  },
  {
    type: "logos.techGrid",
    label: "Technology logo grid",
    description: "Heading and a white grid of technology logos with names.",
    group: "Logos & Proof",
    wire: "logos",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading (start)", HEADING_HELP),
      text("accent", "Heading accent"),
      list("items", "Technologies", "Technology", [text("title", "Name"), image("image", "Logo")], "title"),
    ],
    defaults: {
      eyebrow: "Technologies",
      heading: "Technologies We",
      accent: "Work On",
      items: webTechnologies,
    },
  },
  {
    type: "logos.clients",
    label: "Client logos",
    description: "Heading, a row of client logos and a button.",
    group: "Logos & Proof",
    wire: "logos",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading (start)", HEADING_HELP),
      text("accent", "Heading accent"),
      list("items", "Clients", "Client", [text("name", "Name"), image("logo", "Logo")], "name"),
      text("buttonText", "Button text"),
      url("buttonLink", "Button link"),
    ],
    defaults: {
      eyebrow: "Our Clients",
      heading: "Trusted by",
      accent: "Amazing Companies",
      items: webClients,
      buttonText: "View our clients",
      buttonLink: "/clients",
    },
  },
  {
    type: "stats.whyUs",
    label: "Why us + animated counters",
    description: "Heading and two paragraphs on the left, animated number counters on the right.",
    group: "Logos & Proof",
    wire: "stats",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading (start)", HEADING_HELP),
      text("accent", "Heading accent"),
      text("headingEnd", "Heading (end)"),
      area("paragraph1", "Paragraph 1"),
      area("paragraph2", "Paragraph 2"),
      list("stats", "Counters", "Counter", [num("number", "Number"), text("label", "Label")], "label"),
    ],
    defaults: {
      eyebrow: "Why Us?",
      heading: "The approach to each new project is",
      accent: "individual",
      headingEnd: "",
      paragraph1: "We treat equally every customer, regardless of the size of the company and its budget.",
      paragraph2:
        "After delivery of the project we carry out the promotion and support of the site, helping the client to attract traffic from the Internet.",
      stats: webStats,
    },
  },
  {
    type: "testimonials.quotes",
    label: "Testimonial quotes",
    description: "Heading and three quote cards with name and role.",
    group: "Logos & Proof",
    wire: "quotes",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("title", "Title"),
      text("highlight", "Title accent"),
      area("subtitle", "Subtitle"),
      list("items", "Quotes", "Quote", [area("quote", "Quote"), text("name", "Name"), text("role", "Role")], "name"),
    ],
    defaults: {
      eyebrow: "Client Stories",
      title: "Trusted by",
      highlight: "Leaders",
      subtitle:
        "Partners who've experienced our technical excellence, flexibility, and end-to-end delivery.",
      items: bespokeTestimonials,
    },
  },

  /* --------------------------- CONVERSION --------------------------- */
  {
    type: "pricing.offers",
    label: "Website packages (live)",
    description: "Pricing cards pulled live from the Packages admin tab (first cards by order).",
    group: "Conversion",
    wire: "pricing",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading (start)", HEADING_HELP),
      text("accent", "Heading accent"),
      text("headingEnd", "Heading (end)"),
      num("limit", "How many packages to show"),
      text("priceSuffix", "Price suffix", "Small text after the price, e.g. /project"),
      text("buttonText", "Card button text"),
      text("moreText", "Bottom button text"),
      url("moreLink", "Bottom button link"),
    ],
    defaults: {
      eyebrow: "Our Offers",
      heading: "Choose the perfect",
      accent: "package",
      headingEnd: "for your needs",
      limit: 4,
      priceSuffix: "/project",
      buttonText: "Get Started Now",
      moreText: "View more packages",
      moreLink: "/packages",
    },
  },
  {
    type: "pricing.plans",
    label: "Marketing plan cards",
    description: "Heading and price cards, each with a 'what you get' link and a Purchase button.",
    group: "Conversion",
    wire: "pricing",
    fields: [
      text("heading", "Heading"),
      list("items", "Plans", "Plan", [text("name", "Name"), text("price", "Price", "Include the currency, e.g. £350"), text("audience", "Audience")], "name"),
      text("detailsText", "Details link text"),
      url("detailsLink", "Details link"),
      text("purchaseText", "Purchase button text"),
    ],
    defaults: {
      heading: "Our End To End Marketing Plans",
      items: dmPlans,
      detailsText: "What You Get",
      detailsLink: "/end-to-end-digital-marketing-plans",
      purchaseText: "Purchase",
    },
  },
  {
    type: "cta.gradient",
    label: "Gradient call-to-action",
    description: "Full-width gradient banner with badge, heading, text and two buttons.",
    group: "Conversion",
    wire: "cta",
    fields: [
      text("badge", "Badge"),
      text("heading", "Heading"),
      text("textBefore", "Text (start)", "Written as: start text + bold highlight + end text"),
      text("highlightText", "Text highlight"),
      text("textAfter", "Text (end)"),
      text("primaryText", "Primary button text"),
      url("primaryLink", "Primary button link"),
      text("secondaryText", "Secondary button text"),
      url("secondaryLink", "Secondary button link", "e.g. mailto:info@visualytes.com"),
    ],
    defaults: {
      badge: "Let's Build Together",
      heading: "Start working on your app right away!",
      textBefore: "Receive your first working demo within",
      highlightText: "7 days",
      textAfter: "from the project kick-off.",
      primaryText: "ESTIMATE PROJECT →",
      primaryLink: "/estimate-project",
      secondaryText: "or just write an email",
      secondaryLink: "mailto:info@visualytes.com",
    },
  },
  {
    type: "cta.e2e",
    label: "Centered call-to-action",
    description: "Eyebrow, paragraph and one button on a tinted band.",
    group: "Conversion",
    wire: "cta",
    fields: [
      text("eyebrow", "Eyebrow"),
      area("text", "Text"),
      text("buttonText", "Button text"),
      url("buttonLink", "Button link"),
    ],
    defaults: {
      eyebrow: "End To End Digital Marketing",
      text: "Underneath your digital activity, you need solid objectives and plan. We help you to build a clear vision of your strategy, and makes it actionable with budget, channel and media plans, KPIs and more.",
      buttonText: "E2E Marketing",
      buttonLink: "/end-to-end-digital-marketing-plans",
    },
  },
  {
    type: "faq.accordion",
    label: "FAQ accordion",
    description: "Heading and an expandable list of questions and answers.",
    group: "Conversion",
    wire: "faq",
    fields: [
      text("heading", "Heading"),
      list("items", "Questions", "Question", [text("question", "Question"), area("answer", "Answer")], "question"),
    ],
    defaults: { heading: "Frequently Asked Questions", items: mobileFaqs },
  },

  /* ---------------------------- LIVE DATA --------------------------- */
  {
    type: "blog.cards",
    label: "Latest blog posts (grid)",
    description: "Heading and the newest blog posts (managed in the Blog tab).",
    group: "Live data",
    wire: "grid",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("title", "Title"),
      text("highlight", "Title accent"),
      area("subtitle", "Subtitle"),
      num("limit", "How many posts"),
      text("buttonText", "Button text"),
      url("buttonLink", "Button link"),
    ],
    defaults: {
      eyebrow: "From Our Blog",
      title: "Latest",
      highlight: "Blog Posts",
      subtitle: "Insights on mobile apps, hosting, social media, and the technologies shaping bespoke software.",
      limit: 4,
      buttonText: "View All Blogs",
      buttonLink: "/blog",
    },
  },
  {
    type: "blog.section",
    label: "Latest blog posts (row)",
    description: "Left-aligned heading with button and the newest posts (managed in the Blog tab).",
    group: "Live data",
    wire: "grid",
    fields: [
      text("eyebrow", "Eyebrow"),
      text("heading", "Heading"),
      num("limit", "How many posts"),
      text("buttonText", "Button text"),
      url("buttonLink", "Button link"),
    ],
    defaults: { eyebrow: "From Our Blog", heading: "From Our Blog", limit: 3, buttonText: "Go To Blog", buttonLink: "/blog" },
  },
  {
    type: "embed.process",
    label: "Our process (live)",
    description: "The process steps managed in the Process admin tab.",
    group: "Live data",
    wire: "embed",
    fields: [],
    defaults: {},
  },
  {
    type: "embed.portfolio",
    label: "Portfolio (live)",
    description: "The portfolio slider managed in the Portfolio admin tab.",
    group: "Live data",
    wire: "embed",
    fields: [],
    defaults: {},
  },
  {
    type: "embed.testimonials",
    label: "Testimonials (live)",
    description: "The testimonials slider managed in the Testimonials admin tab.",
    group: "Live data",
    wire: "embed",
    fields: [],
    defaults: {},
  },
  {
    type: "embed.appointment",
    label: "Appointment / talk block",
    description: "The 'book a talk' block used across the site.",
    group: "Live data",
    wire: "embed",
    fields: [],
    defaults: {},
  },
  {
    type: "embed.clients",
    label: "Client logo slider (live)",
    description: "The client logo slider managed in the Clients admin tab.",
    group: "Live data",
    wire: "embed",
    fields: [],
    defaults: {},
  },
  {
    type: "embed.aboveFooter",
    label: "Above-footer block",
    description: "The closing contact block shown above the footer.",
    group: "Live data",
    wire: "embed",
    fields: [],
    defaults: {},
  },
];

export const SECTION_DEF_MAP: Record<string, SectionDef> = Object.fromEntries(
  SECTION_DEFS.map((def) => [def.type, def])
);

export function getSectionDef(type: string): SectionDef | undefined {
  return SECTION_DEF_MAP[type];
}
