"use client";

import ContactForm from "@/src/app/contact-us/_componets/ContactForm";
import type { PublicForm } from "@/src/lib/forms/types";
import type { AboutContent } from "@/src/lib/page-content/types";

/** Enquiry form at the bottom of the About Us page. Its questions are managed in Admin > Forms & Responses > About Us. */
export default function AboutForm({ form, content }: { form: PublicForm; content: AboutContent["form"] }) {
  return <ContactForm form={form} content={content} endpoint="/api/about-us" />;
}
