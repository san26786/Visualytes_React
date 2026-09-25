/**
 * The editable pages: for each one, its editor schema and the built-in default content (which is
 * exactly what the website showed before these pages became editable). Pure TypeScript.
 */
import { aboutPages, cards as aboutCards, features as aboutFeatures } from "@/src/app/about/_componets/data";
import { mediaNews } from "@/src/app/media-and-pr/_componets/mediaData";
import { sponsorContentById } from "@/src/app/we-sponsor/sponsor-content";
import { sponsorships } from "@/src/app/we-sponsor/sponsor-data";
import { directors, founder, team } from "@/src/app/team/_componets/data";

import { emptyValue, normalize, type Group, type Node, type SelectOption } from "./schema";
import type { AboutContent, AboutPagesContent, CareersContent, MediaContent, PageContentMap, PageKey, SponsorsContent, StoryContent, TeamContent } from "./types";

/* ------------------------------------------------------------------ */
/* Small builders                                                      */
/* ------------------------------------------------------------------ */

const text = (label: string, extra: Partial<Extract<Node, { kind: "text" }>> = {}): Node => ({ kind: "text", label, ...extra });
const area = (label: string, rows = 4, hint?: string): Node => ({ kind: "text", label, multiline: true, rows, hint });
const image = (label: string, hint?: string): Node => ({ kind: "image", label, hint });
const link = (label: string, hint?: string): Node => ({ kind: "link", label, hint });
const group = (label: string, fields: Record<string, Node>, hint?: string): Group => ({ kind: "group", label, fields, hint });
const strings = (label: string, itemLabel: string, multiline = true, hint?: string): Node => ({ kind: "strings", label, itemLabel, multiline, hint });
const list = (label: string, itemLabel: string, titleField: string, fields: Record<string, Node>, hint?: string): Node => ({ kind: "list", label, itemLabel, titleField, fields, hint });

const header = (label = "Page banner"): Group =>
  group(label, { title: text("Page title"), eyebrow: text("Small line above the title"), subtitle: area("Intro text under the title", 3) });

export const SPONSOR_COLORS: SelectOption[] = ["violet", "teal", "orange", "pink", "amber", "cyan", "emerald", "rose", "sky", "indigo"].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) }));

export const ABOUT_ICONS: SelectOption[] = [
  { value: "rt-icon2-user", label: "Person" },
  { value: "rt-icon2-diamond2", label: "Diamond" },
  { value: "rt-icon2-like", label: "Thumbs up" },
  { value: "rt-icon2-phone5", label: "Phone" },
  { value: "rt-icon2-pen", label: "Pen" },
  { value: "rt-icon2-location2", label: "Location" },
];

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

const TEAM: { schema: Group; defaults: TeamContent } = {
  schema: group("Team page", {
    header: header(),
    founder: group("Founder", { name: text("Name"), role: text("Role"), image: image("Photo"), description: area("About the founder", 4) }),
    directors: group("Directors section", {
      eyebrow: text("Small label"),
      titleNormal: text("Title - first part"),
      titleHighlight: text("Title - coloured part"),
      items: list("Directors", "Director", "role", { image: image("Photo"), role: text("Role / caption") }),
    }),
    team: group("Team section", {
      eyebrow: text("Small label"),
      titleNormal: text("Title - first part"),
      titleHighlight: text("Title - coloured part"),
      items: list("Team members", "Team member", "role", { image: image("Photo"), role: text("Role / caption") }),
    }),
  }),
  defaults: {
    header: {
      title: "Our Team",
      eyebrow: "The People Behind Visualytes",
      subtitle: "Meet the talented professionals who bring creativity, expertise and dedication to every project.",
    },
    founder: { ...founder },
    directors: { eyebrow: "Leadership", titleNormal: "Meet the", titleHighlight: "Directors", items: directors.map((d) => ({ ...d })) },
    team: { eyebrow: "Our People", titleNormal: "The", titleHighlight: "Team", items: team.map((t) => ({ ...t })) },
  },
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

const ABOUT: { schema: Group; defaults: AboutContent } = {
  schema: group("About page", {
    intro: group("Introduction & MD message", {
      eyebrow: text("Small line above the title"),
      titleNormal: text("Title - first part"),
      titleHighlight: text("Title - coloured part"),
      statementTitle: text("Brand statement heading"),
      statement: area("Brand statement", 4),
      welcomeTitle: text("Welcome message heading"),
      welcomeParagraphs: strings("Welcome message paragraphs", "Paragraph"),
      signOff: text("Sign-off line"),
      signName: text("Signed by"),
      signRole: text("Role"),
    }),
    details: group("Who we are / What we do / Why", {
      items: list("Cards", "Card", "title", { title: text("Title"), icon: { kind: "select", label: "Icon", options: ABOUT_ICONS }, text: area("Text", 4) }),
    }),
    history: group("Our history", { title: text("Heading"), paragraphs: strings("Paragraphs", "Paragraph") }),
    milestone: group("Milestone & why choose us", {
      title: text("Milestone heading"),
      image: image("Milestone picture"),
      whyTitle: text("Why choose us heading"),
      stats: list("Figures", "Figure", "label", { value: { kind: "number", label: "Number" }, suffix: text("After the number (+, %)"), label: text("Label") }),
      separatesTitle: text("What separates us - heading"),
      separatesText: area("What separates us - text", 4),
      statementBefore: text("Highlight sentence - start"),
      statementHighlight1: text("First highlighted words"),
      statementMiddle: text("Text between"),
      statementHighlight2: text("Second highlighted words"),
      statementAfter: text("Text at the end"),
    }),
    strengths: group("Our strengths", {
      eyebrow: text("Small label"),
      titleNormal: text("Title - first part"),
      titleHighlight: text("Title - coloured part"),
      subtitle: area("Intro text", 3),
      features: list("Four pillars", "Pillar", "title", { title: text("Title"), image: image("Picture"), description: area("Text", 3) }),
      narrative: strings("Closing paragraphs", "Paragraph", true, "The last one is shown as a quote."),
    }),
    help: group("How can we help you (cards)", {
      eyebrow: text("Small label"),
      titleNormal: text("Title - first part"),
      titleHighlight: text("Title - coloured part"),
      description: area("Intro text", 3),
      cards: list("Cards", "Card", "title", { image: image("Picture"), title: text("Title"), description: area("Short text", 3), link: link("Link", "e.g. /about/how-can-our-products-help-you") }),
    }),
    maps: group("Maps", {
      clientTitle: text("Worldwide clients - heading"),
      clientMapUrl: link("Worldwide clients - Google map embed link"),
      presenceTitle: text("Global presence - heading"),
      presenceMapUrl: link("Global presence - Google map embed link"),
    }),
    form: group(
      "Enquiry form (bottom of the page)",
      {
        badge: text("Small label"),
        titleNormal: text("Title - first part"),
        titleHighlight: text("Title - coloured part"),
        intro: area("Text under the title", 2),
        submitButtonText: text("Send button text"),
        clearButtonText: text("Clear button text"),
      },
      "The form's questions are edited in Forms & Responses > About Us.",
    ),
  }),
  defaults: {
    intro: {
      eyebrow: "Your Visualisation Is Our Reality",
      titleNormal: "About",
      titleHighlight: "Visualytes",
      statementTitle: "Our Brand Statement",
      statement:
        "Visualytes brings perfection, high quality deliveries and premium level service to web-apps, computer software and digital marketing while helping clients to fulfill all their IT needs under one roof.",
      welcomeTitle: "Welcome Message From Our MD",
      welcomeParagraphs: [
        "Welcome to Visualytes. We are a group of highly dynamic, creative and talented skill set of people, who are one hundred percent ready to go that extra mile in order to create premium value for our clients. It’s this skill set of creativity that make Visualytes so great and one of the top reasons our clients choose to work with us on their required projects. This is the foundation on which our successful and innovative reputation is based.",
        "We have created Visualytes to reinvent existing business models and industry standards, developing first-class solutions for our clients, partners, employees, and shareholders. Today we are proud to say that we have surpassed this optimistic goal in so many areas with optimal effectiveness.",
        "When we say we are your partner for total technical care, we mean it! With many years of experience and expertise, we are one of the industry leaders in integrated IT solutions, which are not only the backbone of our business but also the trigger of our growth into new innovation and strategic expansion. Owing to such forward thinking mindset, we have confidently marched towards new market and service growth areas and successfully positioned ourselves in both software solution and whole lifecycle of software development. We are your one-stop shop for all your IT needs. Our client growth and satisfaction has resulted in us globalizing and differentiating ourselves from competitors in a very short time.",
        "Please feel free to explore our website, learn more about us and what we do.",
        "We very much look forward to working with you.",
      ],
      signOff: "Sincerely,",
      signName: "Nagendra Mishra",
      signRole: "Managing Director",
    },
    details: {
      items: [
        {
          title: "Who We Are",
          icon: "rt-icon2-user",
          text: "We are a team of San Diego web design and development professionals who love partnering with good people and businesses to help them achieve online success.",
        },
        {
          title: "What We Do",
          icon: "rt-icon2-diamond2",
          text: "We’re focused on honing our crafts and bringing everything we have to the table for our clients. We create custom, functional websites focused on converting your users into customers.",
        },
        {
          title: "Why We Do It",
          icon: "rt-icon2-like",
          text: "Each of us loves what we do and we feel that spirit helps translate into the quality of our work. Working with clients who love their work combines into a fun, wonderful partnership for everyone involved.",
        },
      ],
    },
    history: {
      title: "Our History",
      paragraphs: [
        "Although Visualytes Ltd is a new name, that doesn’t mean we’re new to web design and IT services. Visualytes Ltd is a rebranding of Geeconsys, which itself developed out of Geecon Systems Direct Ltd.",
        "Geecon Systems Private Ltd, founded in 2011, operated successfully for nearly six years from the UK and India. It specialised in working with large, prestigious companies, including banks and other financial institutions, as well as charities and large, multi-chain retail companies. Specialities, among others, included data warehousing and migration.",
        "In June 2016, we decided to diversity as Geeconsys. This was motivated largely by the growing realisation that, though we enjoyed working with giant organisation, our real passion was to help SMEs.",
        "Why wouldn’t we want this? SMEs make up 80% of all companies, and that only seems likely to grow. The development of automation and cloud technology is creating a flexible approach to working that suits smaller companies more than the giants, and it seems likely that SMEs will prove to be a large part of business’s future.",
        "Our biggest problem, though, as Geeconsys was the very obvious connection with Geecon Systems Direct Ltd. The original company had become synonymous working at the high end of the market, and our cost-conscious customers often mistakenly assumed our prices would be out of their range.",
        "Hence our rebranding in 2018. Visualytes Ltd offers the same premium service targeted specifically at SMEs as Geeconsys, but with an identity unconnected with expensive services for industry giants — even though we bring you our wealth of experience from that background. We’re driven above all by our enthusiasm and our commitment to a long-term relationship with our clients",
        "And we’re eager to find out what we can do for you.",
      ],
    },
    milestone: {
      title: "Our Milestone",
      image: "/assets/png/our_milestone.png",
      whyTitle: "Why Choose Us?",
      stats: [
        { value: 7, suffix: "+", label: "Countries" },
        { value: 1000, suffix: "+", label: "Projects Done" },
        { value: 13, suffix: "+", label: "Years Experience" },
        { value: 98, suffix: "%", label: "Client Satisfaction" },
      ],
      separatesTitle: "What Separates Us From Our Competition?",
      separatesText:
        "Visualytes brings perfection, high quality deliveries and premium level service to web‑apps, computer software and digital marketing while helping clients to fulfill all their IT needs under one roof.",
      statementBefore: "Visualytes Limited is the renowned IT company, which has marked its flagship in",
      statementHighlight1: "7 countries",
      statementMiddle: "with",
      statementHighlight2: "1000+ projects",
      statementAfter: "successfully accomplished.",
    },
    strengths: {
      eyebrow: "Our Strengths",
      titleNormal: "What Makes Us",
      titleHighlight: "Different",
      subtitle: "Four pillars that define how we partner with businesses and deliver lasting value.",
      features: aboutFeatures.map(({ title, image: img, description }) => ({ title, image: img, description })),
      narrative: [
        "There are many website and IT companies out there, but Visualytes Ltd is in a unique position: a company that in a previous incarnation has been trusted by some of the largest banks, charities and retail businesses in the world, which is now focusing that experience solely on the needs and interests of SMEs.",
        "With extensive contacts throughout the world, we have backing which ensures the stability of our services. We're not going anywhere (except forwards), and you can rely on us to offer a stable, long-lasting service for as long as you need us.",
        "We offer all the services you'll require under one roof, and what we have now is just the start. Every day, we're searching, experimenting, innovating and learning in our quest to develop more and better solutions for SMEs.",
        "\"All innovation begins with creative ideas.\" We at Visualytes Ltd are brimming over with creative ideas, and we're dedicated to applying those ideas to providing ongoing services for SMEs at a reasonable cost — so you can concentrate on what you do best.",
      ],
    },
    help: {
      eyebrow: "Our Services",
      titleNormal: "How Can We",
      titleHighlight: "Help You?",
      description: "From websites to bespoke software, hardware and marketing — we cover every aspect of your digital journey under one roof.",
      cards: aboutCards.map((c) => ({ ...c })),
    },
    maps: {
      clientTitle: "Our Worldwide Client",
      clientMapUrl: "https://www.google.com/maps/d/embed?mid=15qxFWocQB9ofmfG6kdLbdek8_OhOxDc&ehbc=2E312F&ll=19.216640857924432,66.18511710000004&z=3",
      presenceTitle: "Our Global Presence",
      presenceMapUrl: "https://www.google.com/maps/d/embed?mid=1LGI3xDqlFI294WYO_3PCn1rm8JYmsTJj",
    },
    form: {
      badge: "GET IN TOUCH",
      titleNormal: "Ask Us",
      titleHighlight: "Anything",
      intro: "Have a question about Visualytes or how we can help your business? Send us a message and we will get back to you.",
      submitButtonText: "Send Message",
      clearButtonText: "Clear",
    },
  },
};

const ABOUT_PAGES: { schema: Group; defaults: AboutPagesContent } = {
  schema: group("About detail pages", {
    pages: list(
      "Pages",
      "Page",
      "title",
      {
        slug: text("Address ending", { hint: "The page is /about/<this>. Use lowercase letters, numbers and dashes." }),
        bannerTitle: text("Banner title"),
        title: text("Heading"),
        intro: area("Intro line", 2),
        description: strings("First paragraphs (next to the picture)", "Paragraph"),
        image: image("Picture"),
        topDescription: strings("Paragraphs under the picture", "Paragraph"),
        bullets: strings("Bullet points", "Bullet", false),
        bottomTitle: text("Heading above the closing text"),
        bottomDescription: area("Closing text", 3),
      },
      "Each page is linked from the cards on the About page - keep the address in step with the card links.",
    ),
  }),
  defaults: {
    pages: Object.entries(aboutPages).map(([slug, page]) => ({
      slug,
      bannerTitle: page.bannerTitle,
      title: page.title,
      intro: page.intro,
      description: [...page.description],
      image: page.image,
      topDescription: [...page.topDescription],
      bullets: [...page.bullets],
      bottomTitle: page.bottomTitle ?? "",
      bottomDescription: page.bottomDescription,
    })),
  },
};

/* ------------------------------------------------------------------ */
/* Our Story                                                           */
/* ------------------------------------------------------------------ */

const STORY: { schema: Group; defaults: StoryContent } = {
  schema: group("Our Story page", {
    header: header(),
    welcome: group("Welcome block", {
      image: image("Picture"),
      eyebrow: text("Small label"),
      titleNormal: text("Title - first part"),
      titleHighlight: text("Title - coloured part"),
      paragraphs: strings("Paragraphs", "Paragraph"),
      buttonText: text("Button text"),
      buttonLink: link("Button link"),
      signature: image("Signature picture"),
    }),
    timeline: group("Timeline", {
      eyebrow: text("Small label"),
      titleNormal: text("Title - first part"),
      titleHighlight: text("Title - coloured part"),
      items: list("Milestones", "Milestone", "year", { year: text("Year"), text: area("What happened", 3) }),
    }),
  }),
  defaults: {
    header: {
      title: "Our Story",
      eyebrow: "Since 2009",
      subtitle: "From a small UK startup to a global IT partner — discover the journey that shaped Visualytes.",
    },
    welcome: {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=700&fit=crop&q=80",
      eyebrow: "Welcome to Visualytes",
      titleNormal: "Your Vision,",
      titleHighlight: "Our Reality",
      paragraphs: [
        "Visualytes brings perfection, high quality deliveries and premium level service to web-apps, computer software and digital marketing while helping clients fulfill all their IT needs under one roof.",
        "We are a group of highly dynamic, creative and talented people, ready to go the extra mile to create premium value for our clients. This creativity is the foundation on which our successful and innovative reputation is built.",
      ],
      buttonText: "Read More",
      buttonLink: "/about",
      signature: "/assets/png/signature_6.png",
    },
    timeline: {
      eyebrow: "Milestones",
      titleNormal: "Our",
      titleHighlight: "Timeline",
      items: [
        { year: "2009", text: "Founded our first proprietary company Geecon Global in UK" },
        { year: "2011", text: "Registered Geecon Systems as a Private Limited Company in India as a first Delivery Center with Team Size of 6" },
        { year: "2012", text: "Registered Geecon Global as a Private Limited Company in UK and launched our flagship in the Middle East." },
        { year: "2013", text: "Global Team Strength reached 100." },
        { year: "2015", text: "Launched our flagship in Australia, Canada and the United States. Team Strength reached 200." },
        { year: "2016", text: "Registered Geeconsys Limited as the UK subsidiary of Geecon Systems." },
        { year: "2017", text: "Launched our flagship in Ireland." },
        { year: "2018", text: "Rebranded Geeconsys Limited as Visualytes Limited. Team Strength reached 250." },
        { year: "2019", text: "Acquired i-Wood Inc Limited and crossed 300 clients with over 500 successful projects." },
      ],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Media & PR                                                          */
/* ------------------------------------------------------------------ */

const MEDIA: { schema: Group; defaults: MediaContent } = {
  schema: group("Media & PR page", {
    header: header(),
    heading: group("Section heading", { normal: text("Title - first part"), highlight: text("Title - coloured part") }),
    items: list("Articles", "Article", "title", {
      image: image("Picture"),
      title: text("Headline"),
      link: link("Link to the original article"),
      publisher: text("Publisher"),
      publishDate: text("Date shown"),
      content: strings("Article text (first 4 paragraphs are shown)", "Paragraph"),
      quote: strings("Quotes", "Quote"),
    }),
  }),
  defaults: {
    header: { title: "Media & PR", eyebrow: "", subtitle: "Stories and features highlighting Visualytes' community impact and digital innovation." },
    heading: { normal: "Visualytes", highlight: "In The News" },
    items: mediaNews.map(({ image: img, title, link: url, content, quote, publisher, publishDate }) => ({ image: img, title, link: url, content: [...content], quote: [...quote], publisher, publishDate })),
  },
};

/* ------------------------------------------------------------------ */
/* We Sponsor                                                          */
/* ------------------------------------------------------------------ */

const COLOR_OF_CLASS: Record<string, string> = { violet: "violet", teal: "teal", orange: "orange", pink: "pink", amber: "amber" };
const colorOf = (classes: string) => COLOR_OF_CLASS[classes.match(/bg-([a-z]+)-50/)?.[1] ?? ""] ?? "violet";

const SPONSORS: { schema: Group; defaults: SponsorsContent } = {
  schema: group("We Sponsor page", {
    header: header(),
    hint: text("Line above the cards"),
    items: list(
      "Sponsorships",
      "Sponsorship",
      "title",
      {
        id: text("Address ending", { hint: "The page is /we-sponsor/<this>. Lowercase letters, numbers and dashes." }),
        title: text("Title"),
        dateLabel: text("Date shown"),
        sortDate: text("Date for sorting (YYYY-MM-DD)"),
        detail: area("Short description", 2),
        image: image("Picture"),
        featured: { kind: "bool", label: "Show as a featured (most recent) card" },
        color: { kind: "select", label: "Card back colour", options: SPONSOR_COLORS },
        content: { kind: "html", label: "Full story (HTML)", hint: "Shown on the sponsorship's own page. Basic HTML such as <p>, <h4>, <br> is allowed." },
      },
      "Cards appear in this order. Featured ones are shown in the larger row below the others.",
    ),
  }),
  defaults: {
    header: {
      title: "We Sponsored",
      eyebrow: "Our Partnerships",
      subtitle: "Visualytes proudly supports community events, cultural celebrations, and initiatives that bring people together.",
    },
    hint: "Hover, or focus with tab, any card to see the details.",
    items: sponsorships.map((s) => ({
      id: s.id,
      title: s.title,
      dateLabel: s.dateLabel,
      sortDate: s.sortDate,
      detail: s.detail,
      image: s.image,
      featured: !!s.featured,
      color: colorOf(s.colorClasses),
      content: sponsorContentById[s.postId] ?? "",
    })),
  },
};

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

const CAREERS: { schema: Group; defaults: CareersContent } = {
  schema: group("Careers page", {
    header: header(),
    jobs: list("Job openings", "Job", "title", { icon: image("Icon"), title: text("Job title"), desc: area("Short description", 2) }, "These are the role cards. The application form's role suggestions come from this list."),
    notice: area("Scrolling notice above the form", 2, "e.g. \"Currently we do not have any vacancies…\". Leave empty to hide it."),
    formTitle: text("Form heading"),
    formIntro: area("Text under the form heading", 2),
  }),
  defaults: {
    header: {
      title: "Careers",
      eyebrow: "Join Our Team",
      subtitle: "Build meaningful digital products with a passionate team. Submit your application and we'll be in touch when a role opens up.",
    },
    jobs: [
      { icon: "/assets/png/info_icon_1.png", title: "Lead Developer", desc: "A passionate leader and team player" },
      { icon: "/assets/png/info_icon_2.png", title: "Mobile Developer", desc: "Self-motivated with a strong sense of ownership" },
      { icon: "/assets/png/info_icon_3.png", title: "Team Leader", desc: "A QA Team leader with at least 5 years' experience" },
      { icon: "/assets/png/info_icon_4.png", title: "Product Designer", desc: "Designer with 3 years' experience in UX" },
      { icon: "/assets/png/info_icon_5.png", title: "Head of Marketing", desc: "Close-to-numbers individual with a passion for products" },
      { icon: "/assets/png/info_icon_6.png", title: "Office Manager", desc: "A service-oriented go-getter with 3+ years' experience" },
    ],
    notice: "Currently we do not have any vacancies. Please fill out the form below — we'll update you when roles become available.",
    formTitle: "Apply Now",
    formIntro: "Share your details and we'll keep your profile on file for future opportunities.",
  },
};

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

export type PageDef<K extends PageKey = PageKey> = {
  key: K;
  title: string;
  description: string;
  /** Public address(es) the content appears on. */
  path: string;
  schema: Group;
  defaults: PageContentMap[K];
};

export const PAGE_DEFS: { [K in PageKey]: PageDef<K> } = {
  team: { key: "team", title: "Team", description: "Founder, directors and team photos", path: "/team", ...TEAM },
  about: { key: "about", title: "About Us", description: "MD message, history, milestones, strengths and maps", path: "/about", ...ABOUT },
  "about-pages": { key: "about-pages", title: "About detail pages", description: "The six “How can we…” pages under /about/…", path: "/about/…", ...ABOUT_PAGES },
  "our-story": { key: "our-story", title: "Our Story", description: "Welcome block and the milestone timeline", path: "/our-story", ...STORY },
  "media-and-pr": { key: "media-and-pr", title: "Media & PR", description: "Press articles and features", path: "/media-and-pr", ...MEDIA },
  sponsors: { key: "sponsors", title: "We Sponsor", description: "Sponsored events, list and detail pages", path: "/we-sponsor", ...SPONSORS },
  careers: { key: "careers", title: "Careers", description: "Job openings and the application page text", path: "/careers", ...CAREERS },
};

export const PAGE_KEYS = Object.keys(PAGE_DEFS) as PageKey[];
export const isPageKey = (value: string): value is PageKey => value in PAGE_DEFS;

/** Stored content merged over the defaults and cleaned to the page's schema. */
export function resolveContent<K extends PageKey>(key: K, stored: unknown): PageContentMap[K] {
  const def = PAGE_DEFS[key];
  return normalize(def.schema, stored, def.defaults) as PageContentMap[K];
}

/** A blank item for a list (used by the editor's "Add" button). */
export const blankItem = (fields: Record<string, Node>) => emptyValue({ kind: "group", label: "", fields });
