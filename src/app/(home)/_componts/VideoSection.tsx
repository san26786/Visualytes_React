"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import HomeSection from "./shared/HomeSection";
import HomeBrandButton from "./shared/HomeBrandButton";
import { useInView } from "./shared/useInView";
import { BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

export default function VideoSection() {
  const { ref, inView } = useInView<HTMLElement>("250px 0px");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView || !videoRef.current) return;
    videoRef.current.play().catch(() => undefined);
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden py-10">
      <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

      <HomeSection
        eyebrow="About Us"
        title="Watch Our"
        highlight="2 Min Video"
        subtitle="Learn about Visualytes — our team, our approach, and why clients trust us."
      >
        <div className="group relative mx-auto max-w-5xl">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 opacity-50 blur-sm transition-opacity duration-500 group-hover:opacity-80" />

          <div
            className={`relative overflow-hidden rounded-3xl ${BRAND_SURFACE.glassCard}`}
          >
            <div className="relative aspect-video w-full bg-slate-900/60">
              {inView ? (
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onCanPlay={() => setReady(true)}
                >
                  <source
                    src="/assets/mp4/Visualytes_AV_highres_1080_v2-1.mp4"
                    type="video/mp4"
                  />
                </video>
              ) : null}

              {!ready && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <Play size={32} className="ml-1 text-white" fill="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <HomeBrandButton
            href="/assets/mp4/Visualytes_AV_highres_1080_v2-1.mp4"
            target="_blank"
            variant="outline"
          >
            View in Full Screen
          </HomeBrandButton>
        </div>
      </HomeSection>
    </section>
  );
}
