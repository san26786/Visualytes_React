
import Image from "next/image";
import Copyright from "./Copyright";

export default function Footer() {
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
              alt="Visualytes"
              width={255}
              height={174}
              priority
              className="h-auto w-[160px] sm:w-[255px]"
            />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 m-4">
            <a
              href="https://www.facebook.com/visualyteslimited"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-facebook hover:text-white"
            />
            <a
              href="https://twitter.com/visualytes"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="social-icon text-white hover:text-slate-300"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" className="inline-block align-middle">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.google.com/search?q=Visualytes+Limited"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-google"
            />
            <a
              href="https://www.youtube.com/channel/UCVV3R4Ye2162x8BrCuUY40Q"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-youtube"
            />
            <a
              href="https://www.linkedin.com/company/visualytes-limited/about/"
              target="_blank"
              rel="noreferrer"
              className="social-icon soc-linkedin"
            />
          </div>

          {/* Footer Text */}
          <div className="text-[15px] leading-[30px] text-white ">
            <p className="mb-1">
              Visualytes Limited is registered in England and Wales, Company
              number{" "}
              <a
                href="https://find-and-update.company-information.service.gov.uk/company/10287043"
                target="_blank"
                rel="noreferrer"
                className="text-[#bdbdbd] hover:text-white transition-colors"
              >
                10287043
              </a>
            </p>

            <p>
              Registered office address is 71-75 Shelton Street, London,
              Greater London, United Kingdom, WC2H 9JQ
              <br />
              ICO Registration number: ZB049666
            </p>
          </div>
        </div>
      </div>
      <Copyright/>
    </footer>

  );
}