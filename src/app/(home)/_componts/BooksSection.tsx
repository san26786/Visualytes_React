"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import HomeSection from "./shared/HomeSection";
import { popIn, staggerContainer } from "./shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const certificates = [
  "/assets/jpg/0001-scaled.jpg",
  "/assets/jpg/0002-scaled.jpg",
];

type Resource = {
  image: string | null;
  alt: string;
  label: string;
  cta: string;
  /** File downloaded by the button (drop the PDF into /public at this path). */
  file?: string;
  fileName?: string;
  isSlider?: boolean;
};

const items: Resource[] = [
  {
    image: "/assets/png/corportae-profile.png",
    alt: "Corporate Profile",
    label: "Corporate Profile",
    cta: "Download Profile",
    file: "/assets/pdf/visualytes-corporate-profile.pdf",
    fileName: "Visualytes-Corporate-Profile.pdf",
  },
  {
    image: null,
    alt: "Certificates",
    label: "Our Certificates",
    cta: "Our Certificate",
    isSlider: true,
  },
  {
    image: "/assets/png/broucehr-profile.png",
    alt: "Brochure",
    label: "Company Brochure",
    cta: "Download Brochure",
    file: "/assets/pdf/visualytes-company-brochure.pdf",
    fileName: "Visualytes-Company-Brochure.pdf",
  },
];

/** Downloads the file in place (no new tab); tells the visitor if it is not available. */
async function downloadFile(file: string, fileName: string, label: string) {
  try {
    const response = await fetch(file, { method: "HEAD" });
    if (!response.ok) throw new Error(String(response.status));
    const link = document.createElement("a");
    link.href = file;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {
    toast.error(`The ${label.toLowerCase()} is not available right now. Please contact us and we will send it to you.`);
  }
}

function CertificateViewer({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const count = certificates.length;
  const go = useCallback((step: number) => setIndex((current) => (current + step + count) % count), [count]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const src = certificates[index];
  const control = "grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-slate-900/80 text-white transition-colors hover:border-cyan-300 hover:text-cyan-300";

  // Portalled to <body>: the animated (transformed) section would otherwise trap position: fixed.
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Our certificates" className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative flex max-h-full w-full max-w-2xl flex-col items-center gap-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex w-full items-center justify-between text-sm text-slate-300">
          <span>
            Certificate {index + 1} of {count}
          </span>
          <div className="flex gap-2">
            <a href={src} download={`Visualytes-Certificate-${index + 1}.jpg`} aria-label="Download certificate" className={control}>
              <Download size={18} />
            </a>
            <button type="button" onClick={onClose} aria-label="Close" className={control}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="relative h-[75vh] w-full">
          <Image src={src} alt={`Certificate ${index + 1}`} fill sizes="(max-width:768px) 100vw, 672px" className="rounded-xl object-contain" />
        </div>
        {count > 1 && (
          <div className="flex gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous certificate" className={control}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next certificate" className={control}>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function BooksSection() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const closeViewer = useCallback(() => setViewerOpen(false), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = autoplay();
    return cleanup;
  }, [autoplay]);

  return (
    <section className="relative overflow-hidden py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />

      <HomeSection
        eyebrow="Resources"
        title="Profiles &"
        highlight="Certifications"
        subtitle="Download our corporate profile, browse certifications, and explore our company brochure."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-8 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={popIn}
              className="flex flex-col items-center"
            >
              <div
                className={`group relative overflow-hidden rounded-2xl ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {item.isSlider ? (
                  <div className="relative h-[420px] w-[280px] overflow-hidden" ref={emblaRef}>
                    <div className="flex h-full">
                      {certificates.map((img, ci) => (
                        <div key={ci} className="min-w-full flex-[0_0_100%]">
                          <Image
                            src={img}
                            alt={`Certificate ${ci + 1}`}
                            width={280}
                            height={420}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-[420px] w-[280px] overflow-hidden">
                    <Image
                      src={item.image!}
                      alt={item.alt}
                      width={280}
                      height={420}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-cyan-300/80">
              </p>

              <button
                type="button"
                onClick={() =>
                  item.isSlider ? setViewerOpen(true) : item.file && downloadFile(item.file, item.fileName ?? item.file, item.label)
                }
                className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/5 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200 transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:bg-cyan-300/15"
              >
                {item.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
        {viewerOpen && <CertificateViewer onClose={closeViewer} />}
      </HomeSection>
    </section>
  );
}

