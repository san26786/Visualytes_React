/** Shapes of the editable page content (see registry.ts for the matching editor schemas and defaults). */

export type PageHeader = { title: string; eyebrow: string; subtitle: string };
export type HeadingParts = { eyebrow: string; titleNormal: string; titleHighlight: string };

/* ---------------------------------- Team ---------------------------------- */
export type TeamPerson = { image: string; role: string };
export type TeamContent = {
  header: PageHeader;
  founder: { name: string; role: string; image: string; description: string };
  directors: HeadingParts & { items: TeamPerson[] };
  team: HeadingParts & { items: TeamPerson[] };
};

/* ---------------------------------- About --------------------------------- */
export type AboutContent = {
  intro: {
    eyebrow: string;
    titleNormal: string;
    titleHighlight: string;
    statementTitle: string;
    statement: string;
    welcomeTitle: string;
    welcomeParagraphs: string[];
    signOff: string;
    signName: string;
    signRole: string;
  };
  details: { items: { title: string; icon: string; text: string }[] };
  history: { title: string; paragraphs: string[] };
  milestone: {
    title: string;
    image: string;
    whyTitle: string;
    stats: { value: number; suffix: string; label: string }[];
    separatesTitle: string;
    separatesText: string;
    statementBefore: string;
    statementHighlight1: string;
    statementMiddle: string;
    statementHighlight2: string;
    statementAfter: string;
  };
  strengths: HeadingParts & { subtitle: string; features: { title: string; image: string; description: string }[]; narrative: string[] };
  help: HeadingParts & { description: string; cards: { image: string; title: string; description: string; link: string }[] };
  maps: { clientTitle: string; clientMapUrl: string; presenceTitle: string; presenceMapUrl: string };
  form: { badge: string; titleNormal: string; titleHighlight: string; intro: string; submitButtonText: string; clearButtonText: string };
};

export type AboutPageItem = {
  slug: string;
  bannerTitle: string;
  title: string;
  intro: string;
  description: string[];
  image: string;
  topDescription: string[];
  bullets: string[];
  bottomTitle: string;
  bottomDescription: string;
};
export type AboutPagesContent = { pages: AboutPageItem[] };

/* -------------------------------- Our Story -------------------------------- */
export type StoryContent = {
  header: PageHeader;
  welcome: {
    image: string;
    eyebrow: string;
    titleNormal: string;
    titleHighlight: string;
    paragraphs: string[];
    buttonText: string;
    buttonLink: string;
    signature: string;
  };
  timeline: HeadingParts & { items: { year: string; text: string }[] };
};

/* -------------------------------- Media & PR ------------------------------- */
export type MediaItem = {
  image: string;
  title: string;
  link: string;
  content: string[];
  quote: string[];
  publisher: string;
  publishDate: string;
};
export type MediaContent = {
  header: PageHeader;
  heading: { normal: string; highlight: string };
  items: MediaItem[];
};

/* --------------------------------- Sponsors -------------------------------- */
export type SponsorItem = {
  id: string;
  title: string;
  dateLabel: string;
  sortDate: string;
  detail: string;
  image: string;
  featured: boolean;
  color: string;
  content: string;
};
export type SponsorsContent = { header: PageHeader; hint: string; items: SponsorItem[] };

/* --------------------------------- Careers --------------------------------- */
export type CareersContent = {
  header: PageHeader;
  jobs: { icon: string; title: string; desc: string }[];
  notice: string;
  formTitle: string;
  formIntro: string;
};

export type PageContentMap = {
  team: TeamContent;
  about: AboutContent;
  "about-pages": AboutPagesContent;
  "our-story": StoryContent;
  "media-and-pr": MediaContent;
  sponsors: SponsorsContent;
  careers: CareersContent;
};
export type PageKey = keyof PageContentMap;
