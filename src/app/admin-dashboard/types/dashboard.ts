import type { FormField } from "@/src/lib/forms/types";
import type { AdminPackage, AdminPurchase } from "@/src/lib/packages/types";

export const TABS = ["overview", "users", "forms", "packages", "social", "portfolio", "blogs", "services", "contact-page", "faqs", "clients", "process", "case-studies", "testimonials", "pages", "media", "seo", "settings"] as const;
export type Tab = (typeof TABS)[number];
export type User = { 
  id: number; 
  name: string; 
  email: string; 
  createdAt: string 
};

export type FormDefinition = { 
  id: number; 
  key: string; 
  title: string; 
  fields: FormField[];
  isActive: boolean 
};

export type Submission = { 
  id: number; 
  formKey: string; 
  name: string | null; 
  email: string | null; 
  data: Record<string, unknown>; 
  createdAt: string 
};

/** Package and order shapes come from the packages API; see src/lib/packages/types.ts. */
export type ManagedPackage = AdminPackage;
export type Purchase = AdminPurchase;

export type SocialLink = { 
  id: number; 
  platform: string; 
  url: string; 
  isActive: boolean; 
  sortOrder: number 
};

export type Portfolio = {
  id: string;
  title: string;
  category: string;
  image: string;
  createdAt: string;
};

export interface ContactPageContent {
  id?: string;
  slug: string;
  isPublished: boolean;

  hero: {
    titleNormal: string;      // "Let's"
    titleHighlight: string;   // "Talk"
    subtitle: string;
  };

  contactInfo: {
    call: {
      title: string;
      enquiryLabel: string;
      enquiryValue: string;
      supportLabel: string;
      supportValue: string;
    };
    write: {
      title: string;
      emails: string[];       // ["hello@visualytes.com", "support@visualytes.com"]
    };
    visit: {
      title: string;
      addresses: string[];    // ["Cumberland House, Southampton, SO15 2BG", ...]
    };
  };

  liveSupport: {
    badge: string;            // "REAL-TIME ASSISTANCE"
    titleNormal: string;      // "Live"
    titleHighlight: string;   // "Support"
    description: string;
    callLabel: string;        // "Call Us Now:"
    callNumber: string;
    whatsappButtonText: string;
    whatsappNote: string;
    image: string;            // uploaded image url
    availabilityLabel: string; // "AVAILABLE"
    availabilityValue: string; // "24/7"
    responseTimeLabel: string; // "RESPONSE TIME"
    responseTimeValue: string; // "< 2 min"
  };

  contactForm: {
    badge: string;            // "WE READ EVERY MESSAGE"
    titleNormal: string;      // "Send Your"
    titleHighlight: string;   // "Message"
    submitButtonText: string; // "Send Message"
    clearButtonText: string;  // "Clear"
  };

  officeMap: {
    badge: string;            // "VISIT OUR TEAM"
    title: string;            // "Our UK Office Locations"
    embedUrl: string;         // Google Maps iframe src
  };

  offices: {
    badge: string;            // "GLOBAL PRESENCE"
    title: string;            // "Offices Across Continents"
    groups: {
      title: string;          // "Delivery Centers"
      locations: string[];    // ["Southampton, United Kingdom", ...]
    }[];
  };
}

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type FAQForm = {
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
};


export interface Client {
  id: string;
  name: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientForm {
  name: string;
  image: string;
}
// }
// export interface ProcessStep {
//   id: string;
//   processId: string;

//   title: string;
//   description: string;
//   image: string;
//   color: string;

//   sortOrder: number;
//   isActive: boolean;

//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface ProcessSection {
//   id: string;
//   slug: string;

//   title: string;
//   subtitle: string;

//   backgroundColor: string;
//   isActive: boolean;

//   steps: ProcessStep[];

//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface ProcessStepForm {
//   title: string;
//   description: string;
//   image: string;
//   color: string;
//   sortOrder: number;
//   isActive: boolean;
// }

// export interface ProcessSectionForm {
//   title: string;
//   subtitle: string;
//   backgroundColor: string;
//   isActive: boolean;
// }

export interface ProcessStep {
  id: string;
  processId: string;
  title: string;
  description: string;
  image: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ProcessSection {
  id: string;
  title: string;
  subtitle: string | null;
  backgroundColor: string;
  isActive: boolean;
  steps: ProcessStep[];
}

export interface ProcessSectionForm {
  title: string;
  subtitle: string;
  backgroundColor: string;
  isActive: boolean;
}

export interface ProcessStepForm {
  title: string;
  description: string;
  image: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
  accent: string;
  tag: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CaseStudyForm {
  title: string;
  category: string;
  image: string;
  href: string;
  accent: string;
  tag: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}
export interface Testimonial {
  id: string;
  image: string;
  name: string;
  designation: string;
  company?: string | null;
  review: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialForm {
  image: string;
  name: string;
  designation: string;
  company: string;
  review: string;
  sortOrder: number;
  isActive: boolean;
}
