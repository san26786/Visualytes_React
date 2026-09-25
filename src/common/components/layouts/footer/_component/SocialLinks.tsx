"use client";

import { Link2 } from "lucide-react";

import { useSiteData } from "../../SiteDataProvider";

// Brand icons come from the site's icon font (see .soc-* in globals.css).
const ICON_CLASS: Record<string, string> = {
  facebook: "soc-facebook hover:text-white",
  google: "soc-google",
  youtube: "soc-youtube",
  linkedin: "soc-linkedin",
  instagram: "soc-instagram",
};

const isX = (platform: string) => /^(x|twitter|x \(twitter\)|twitter \(x\))$/i.test(platform.trim());

/** Footer icons: exactly the active links in Admin > Social Links, in their sort order. */
export default function SocialLinks() {
  const { socialLinks } = useSiteData();
  if (socialLinks.length === 0) return null;

  return (
    <div className="flex justify-center gap-4 m-4">
      {socialLinks.map((link) => {
        const key = link.platform.trim().toLowerCase();
        if (isX(link.platform)) {
          return (
            <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="social-icon text-white hover:text-slate-300">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" className="inline-block align-middle">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          );
        }
        if (ICON_CLASS[key]) {
          return <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" aria-label={link.platform} className={`social-icon ${ICON_CLASS[key]}`} />;
        }
        // A platform without a brand icon in the font: show a generic link icon.
        return (
          <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" aria-label={link.platform} title={link.platform} className="social-icon text-white hover:text-slate-300">
            <Link2 size={16} className="inline-block align-middle" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
