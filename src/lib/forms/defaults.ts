import type { FormField } from "./types";

/** Keys of the DB-driven public forms. `contact` keeps the key it already had in FormDefinition. */
export const CONTACT_FORM_KEY = "contact";
export const ESTIMATE_FORM_KEY = "estimate-project";
export const ABOUT_FORM_KEY = "about-us";

/** Forms whose email field the mail templates (reply-to) depend on. */
export const EMAIL_REQUIRED_FORMS = [CONTACT_FORM_KEY, ESTIMATE_FORM_KEY, ABOUT_FORM_KEY];

const f = (field: Omit<FormField, "enabled" | "width" | "locked"> & Partial<FormField>): FormField => ({
  enabled: true,
  width: "half",
  locked: true,
  ...field,
});

export const DEFAULT_FORMS: Record<string, { title: string; fields: FormField[] }> = {
  [CONTACT_FORM_KEY]: {
    title: "Contact Us",
    fields: [
      f({ name: "name", label: "Full Name", type: "text", placeholder: "Full Name", required: true, maxLength: 120 }),
      f({ name: "email", label: "Email Address", type: "email", placeholder: "Email Address", required: true }),
      f({ name: "phone", label: "Phone Number", type: "tel", placeholder: "Phone Number", required: true, maxLength: 40 }),
      f({ name: "topic", label: "Your Topic", type: "text", placeholder: "Your Topic", required: true, maxLength: 160 }),
      f({ name: "message", label: "Your Message", type: "textarea", placeholder: "Your Message", required: true, width: "full", maxLength: 5000 }),
    ],
  },
  [ABOUT_FORM_KEY]: {
    title: "About Us",
    fields: [
      f({ name: "name", label: "Full Name", type: "text", placeholder: "Full Name", required: true, maxLength: 120 }),
      f({ name: "email", label: "Email Address", type: "email", placeholder: "Email Address", required: true }),
      f({ name: "phone", label: "Phone Number", type: "tel", placeholder: "Phone Number", required: false, maxLength: 40 }),
      f({ name: "message", label: "Your Message", type: "textarea", placeholder: "How can we help you?", required: true, width: "full", maxLength: 5000 }),
    ],
  },
  [ESTIMATE_FORM_KEY]: {
    title: "Estimate Project",
    fields: [
      f({ name: "firstName", label: "First Name", type: "text", required: true, maxLength: 120 }),
      f({ name: "lastName", label: "Last Name", type: "text", required: true, maxLength: 120 }),
      f({ name: "companyName", label: "Company Name", type: "text", required: true, maxLength: 200 }),
      f({ name: "companyPersonnel", label: "Company Personnel Name", type: "text", required: false, maxLength: 160 }),
      f({ name: "email", label: "Email", type: "email", required: true }),
      f({ name: "phone", label: "Phone Number", type: "tel", required: true, maxLength: 40 }),
      f({
        name: "mobileType",
        label: "Type of Mobile Application",
        type: "select",
        placeholder: "Select Option",
        required: true,
        options: ["iOS Application", "Android Application", "Hybrid Application"],
      }),
      f({ name: "budget", label: "Your Estimated Budget", type: "text", required: true, maxLength: 120 }),
      f({ name: "projectDetails", label: "Project Details", type: "textarea", required: true, width: "full", minLength: 10, maxLength: 5000 }),
      f({
        name: "timeline",
        label: "What timeline you have in hand ?",
        type: "select",
        placeholder: "Select Option",
        required: true,
        options: ["1 Month", "3 Months", "6 Months", "More than 6 Months"],
      }),
      f({
        name: "marketing",
        label: "I Agree to Receive Marketing Communication from Visualytes",
        type: "checkbox",
        required: false,
        width: "full",
      }),
    ],
  },
};
