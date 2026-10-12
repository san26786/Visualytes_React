"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import HomeSection from "./shared/HomeSection";
import HomeBrandButton from "./shared/HomeBrandButton";
import { useInView } from "./shared/useInView";
import { BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

export default function VideoSection() {
  const { ref, inView } = useInView<HTMLElement>("250px 0px");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  /** Once the visitor has used the controls, scrolling back into view must not restart a paused video. */
  const [userControlled, setUserControlled] = useState(false);

  useEffect(() => {
    if (!inView || !videoRef.current || userControlled) return;
    videoRef.current.play().catch(() => undefined);
  }, [inView, userControlled]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    setUserControlled(true);
    if (video.paused) {
      // A visitor who presses play wants to hear it.
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => undefined);
      });
    } else {
      video.pause();
    }
  };

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
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
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

              {ready && (
                <button
                  type="button"
                  onClick={togglePlayback}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className={`absolute inset-0 flex cursor-pointer items-center justify-center transition-opacity duration-300 focus-visible:opacity-100 focus-visible:outline-none ${
                    playing ? "opacity-0" : "bg-slate-950/20 opacity-100"
                  }`}
                >
                  {/* The play button is only shown while the video is paused; a playing video stays clear. */}
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    {playing ? (
                      <Pause size={30} className="text-white" fill="white" />
                    ) : (
                      <Play size={32} className="ml-1 text-white" fill="white" />
                    )}
                  </span>
                </button>
              )}
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
