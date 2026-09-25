import type { ReactNode } from "react";

import type { ContactInfo } from "@/src/lib/site/types";

export type ContactCard = { title: string; icon: string; color: string; content: ReactNode };

/** The three "Call Us / Write Us / Visit Us" cards, built from the Contact Content admin tab. */
export function buildContactCards(info: ContactInfo): ContactCard[] {
  return [
    {
      title: info.call.title,
      icon: "rt-icon2-phone5",
      color: "#A0CE4E",
      content: (
        <>
          {info.call.enquiryValue && (
            <p>
              <strong>{info.call.enquiryLabel}</strong> {info.call.enquiryValue}
            </p>
          )}
          {info.call.supportValue && (
            <p>
              <strong>{info.call.supportLabel}</strong> {info.call.supportValue}
            </p>
          )}
        </>
      ),
    },
    {
      title: info.write.title,
      icon: "rt-icon2-pen",
      color: "#00bea3",
      content: (
        <>
          {info.write.emails.filter(Boolean).map((email) => (
            <p key={email}>
              <a href={`mailto:${email}`} className=" hover:text-[var(--primaryPink)] transition-colors duration-300">
                {email}
              </a>
            </p>
          ))}
        </>
      ),
    },
    {
      title: info.visit.title,
      icon: "rt-icon2-location2",
      color: "#F57C00",
      content: (
        <>
          {info.visit.addresses.filter(Boolean).map((address) => (
            <p key={address}>{address}</p>
          ))}
        </>
      ),
    },
  ];
}
