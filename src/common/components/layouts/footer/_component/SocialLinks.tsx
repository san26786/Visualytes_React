"use client";

import { useEffect, useState } from "react";

const classNames: Record<string, string> = {
  Facebook: "soc-facebook hover:text-white",
  Twitter: "soc-twitter",
  Google: "soc-google",
  YouTube: "soc-youtube",
  LinkedIn: "soc-linkedin",
  Instagram: "soc-instagram",
};

type SocialLink = { platform: string; url: string };

export default function SocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  useEffect(() => { fetch("/api/social-links").then((response) => response.ok ? response.json() : []).then(setLinks).catch(() => setLinks([])); }, []);
  return <div className="flex justify-center gap-4 m-4">{links.map((link) => <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" aria-label={link.platform} className={`social-icon ${classNames[link.platform] ?? "hover:text-white"}`} />)}</div>;
}
