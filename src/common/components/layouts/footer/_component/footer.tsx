
"use client";

import Image from "next/image";
import { useSiteData } from "../../SiteDataProvider";
import Copyright from "./Copyright";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const { settings } = useSiteData();
  const footer = settings.footer;

  return (
    <footer className="relative  overflow-visible">
      {/* Left skew shape */}
      <div
        className="absolute left-0 -top-[20px] h-[70px] w-1/2 bg-[#075783] z-[1] sm:-top-[55px] sm:h-[120px]"
        style={{
          transform: "skewY(3deg)",
          transformOrigin: "top left",
        }}
      />

      {/* Right skew shape */}
      <div
        className="absolute right-0 -top-[20px] h-[70px] w-1/2 bg-[#075783] z-[1] sm:-top-[55px] sm:h-[120px]"
        style={{
          transform: "skewY(-3deg)",
          transformOrigin: "top right",
        }}
      />

      {/* Main Footer */}
      <div
        className="relative z-[2] text-[#7f7f7f]"
        style={{
          backgroundImage: "url(/assets/png/footer_bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#191f28",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#075783]" />

        {/* Content */}
        <div className="relative z-10 max-w-[970px] mx-auto px-6 pt-[40px] pb-[30px] text-center">
          {/* Logo */}
          <div className="flex justify-center -mt-[30px] sm:-mt-[80px]">
            <Image
              src="/assets/png/footer_logo2.png"
              alt={settings.general.siteName}
              width={255}
              height={174}
              priority
              className="h-auto w-[160px] sm:w-[255px]"
            />
          </div>

          {/* Social Icons (Admin > Social Links) */}
          <SocialLinks />

          {/* Footer Text (Admin > Settings) */}
          <div className="text-[15px] leading-[30px] text-white ">
            <p className="mb-1">
              {footer.registrationText}
              {footer.companyNumber && (
                <>
                  {" "}
                  {footer.companyNumberUrl ? (
                    <a
                      href={footer.companyNumberUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#bdbdbd] hover:text-white transition-colors"
                    >
                      {footer.companyNumber}
                    </a>
                  ) : (
                    footer.companyNumber
                  )}
                </>
              )}
            </p>

            <p>
              {footer.officeAddress}
              {footer.icoText && (
                <>
                  <br />
                  {footer.icoText}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <Copyright/>
    </footer>

  );
}