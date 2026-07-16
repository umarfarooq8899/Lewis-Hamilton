"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EraConfig } from "./types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  config: EraConfig;
  onActiveEraChange: (eraId: string, progress: number) => void;
}

/**
 * Returns CSS filter string for the era's duotone treatment.
 * Muted eras get heavier desaturation + lower brightness.
 */
function getEraImageFilter(config: EraConfig, isLowRes?: boolean): string {
  const base = config.muted
    ? "grayscale(100%) contrast(1.15) brightness(0.7)"
    : "grayscale(100%) contrast(1.1) brightness(0.8)";

  // Low-res images get additional blur to mask pixelation
  if (isLowRes) {
    return `${base} blur(1.5px)`;
  }
  return base;
}

/**
 * Returns the duotone tint overlay colour for the era.
 * Each era gets its accent colour at low opacity via mix-blend-mode: color.
 */
function getEraTintOverlay(config: EraConfig): string {
  if (config.muted) {
    return "rgba(128, 128, 128, 0.12)"; // desaturated overlay
  }
  // Extract hex and apply at 11% opacity (1C hex ≈ 11%)
  return `${config.accentColor}1C`;
}

export default function EraSection({ config, onActiveEraChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const momentsRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLSpanElement[]>([]);

  // Keep array references clear
  momentsRef.current = [];
  imagesRef.current = [];
  statsRef.current = [];

  const addToMomentsRef = (el: HTMLDivElement | null) => {
    if (el && !momentsRef.current.includes(el)) momentsRef.current.push(el);
  };

  const addToImagesRef = (el: HTMLDivElement | null) => {
    if (el && !imagesRef.current.includes(el)) imagesRef.current.push(el);
  };

  const addToStatsRef = (el: HTMLSpanElement | null) => {
    if (el && !statsRef.current.includes(el)) statsRef.current.push(el);
  };

  useEffect(() => {
    // Only run GSAP pinning and scroll transition effects on desktop (>= 768px)
    if (window.innerWidth < 768) {
      // Bubble up active state on mount for mobile
      onActiveEraChange(config.id, 0);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const momentsCount = config.moments.length;
    const scrollDistance = momentsCount * 1200;

    // Pinning configuration
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        onActiveEraChange(config.id, self.progress);
      },
    });

    // Master Scrub Timeline for internal content transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 0.5,
      },
    });

    // Prepare initial states (all moments except the first one are invisible)
    const extraMoments = momentsRef.current.slice(1).filter(Boolean);
    const extraImages = imagesRef.current.slice(1).filter(Boolean);
    if (extraMoments.length > 0) {
      gsap.set(extraMoments, { opacity: 0, y: 30, pointerEvents: "none" });
    }
    if (extraImages.length > 0) {
      gsap.set(extraImages, { opacity: 0, scale: 1.1, pointerEvents: "none" });
    }

    // Multi-moment transition logic
    config.moments.forEach((moment, index) => {
      const startTime = index * 10;
      const isOrdinal = isNaN(Number(moment.statNumber));
      const parsedStat = isOrdinal ? 0 : Number(moment.statNumber);
      const counter = { val: 0 };

      // Transition Out Previous Moment
      if (index > 0) {
        tl.to(
          momentsRef.current[index - 1],
          { opacity: 0, y: -30, duration: 3, ease: "power2.inOut" },
          startTime - 1.5
        );
        tl.to(
          imagesRef.current[index - 1],
          { opacity: 0, scale: 0.95, duration: 3, ease: "power2.inOut" },
          startTime - 1.5
        );
      }

      // Transition In Current Moment
      if (index > 0) {
        tl.to(
          momentsRef.current[index],
          { opacity: 1, y: 0, duration: 3.5, ease: "power2.out" },
          startTime + 0.5
        );
        tl.to(
          imagesRef.current[index],
          { opacity: 1, scale: 1, duration: 4, ease: "power2.out" },
          startTime
        );
      } else {
        tl.to(
          imagesRef.current[0],
          { scale: 1, duration: 3, ease: "none" },
          0
        );
      }

      // Roll stat numbers — only animate for pure numeric values
      if (!isOrdinal && parsedStat > 0) {
        tl.to(
          counter,
          {
            val: parsedStat,
            duration: 4.5,
            ease: "none",
            onUpdate: () => {
              const el = statsRef.current[index];
              if (el) el.textContent = String(Math.round(counter.val));
            },
          },
          startTime + 0.5
        );
      } else {
        // Ordinal/text stats: just fade in — never animate the number
        tl.fromTo(
          statsRef.current[index],
          { opacity: 0 },
          { opacity: 1, duration: 2 },
          startTime + 0.5
        );
      }
    });

    return () => {
      pinTrigger.kill();
      tl.kill();
    };
  }, [config, onActiveEraChange]);

  return (
    <div
      ref={containerRef}
      className="w-full relative select-none"
      style={{ background: "transparent" }}
    >
      {/* ── DESKTOP SCROLL-PINS LAYOUT (md and up) ── */}
      <div className="hidden md:flex md:flex-row w-full h-screen relative overflow-hidden items-center">
        {/* Visual background radial glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-15 mix-blend-screen transition-colors duration-1000 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${config.accentColor} 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* LEFT COLUMN: Visual Media (Parallax Driver / Car Portrait) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden z-10 flex items-center justify-center p-6 md:py-12 md:pl-28 md:pr-12 lg:pl-36 lg:pr-16">
          <div className="relative w-full h-[90%] max-w-lg aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900/60 border border-white/5 shadow-2xl">
            {config.moments.map((moment, idx) => (
              <div
                key={moment.id}
                ref={addToImagesRef}
                className="absolute inset-0 transition-opacity duration-150 ease-in-out"
                style={{
                  zIndex: idx + 1,
                  willChange: "transform, opacity",
                }}
              >
                {/* Grayscale + Tint duotone overlay */}
                <div
                  className="absolute inset-0 z-10 mix-blend-color pointer-events-none transition-all"
                  style={{
                    background: getEraTintOverlay(config),
                  }}
                />

                {/* Low-res grain overlay */}
                {moment.isLowRes && (
                  /* TODO: replace with licensed high-res image - current source is low-res placeholder */
                  <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                      opacity: 0.08,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      backgroundSize: "150px 150px",
                      backgroundRepeat: "repeat",
                    }}
                  />
                )}

                <Image
                  src={moment.imagePath}
                  alt={moment.title}
                  fill
                  sizes="50vw"
                  style={{
                    objectFit: "cover",
                    filter: getEraImageFilter(config, moment.isLowRes),
                  }}
                  loading={idx === 0 ? undefined : "lazy"}
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18]/90 via-transparent to-transparent z-20" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Era Info & Moments */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <div className="mb-6 md:mb-12">
            <span
              className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-40 transition-colors"
              style={{ color: config.accentColor }}
            >
              {config.years}
            </span>
            <h2 className="font-ui font-semibold text-2xl md:text-4xl text-neutral-100 uppercase tracking-wider mt-1">
              {config.title}
            </h2>
          </div>

          <div className="relative w-full h-[60%] flex items-start">
            {config.moments.map((moment, idx) => (
              <div
                key={moment.id}
                ref={addToMomentsRef}
                className="absolute inset-0 flex flex-col justify-start pointer-events-none"
                style={{
                  willChange: "transform, opacity",
                }}
              >
                <div className="flex flex-col gap-3 md:gap-4 max-w-xl">
                  <div>
                    <h3 className="font-display font-medium text-lg md:text-2xl text-neutral-200 leading-tight">
                      {moment.title}
                    </h3>
                    <p className="font-mono text-[10px] md:text-xs tracking-wider uppercase opacity-40 mt-1">
                      {moment.subtitle}
                    </p>
                  </div>

                  <p className="font-ui text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                    {moment.description}
                  </p>

                  <div
                    className="flex items-center gap-4 mt-6 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                    style={{
                      borderLeft: `3px solid ${config.accentColor}`,
                    }}
                  >
                    <span
                      ref={addToStatsRef}
                      className="font-display text-4xl md:text-5xl font-black italic tracking-tighter text-neutral-100"
                    >
                      {moment.statNumber}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-neutral-500">
                        Metric
                      </span>
                      <span className="font-ui text-xs md:text-sm text-neutral-300 font-medium">
                        {moment.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE STATIC SCROLL LAYOUT (below md) ── */}
      <div className="flex flex-col md:hidden w-full px-6 py-12 gap-12 border-b border-white/5 bg-neutral-950/20">
        {/* Era header */}
        <div>
          <span
            className="font-mono text-[11px] tracking-widest uppercase opacity-45"
            style={{ color: config.accentColor }}
          >
            {config.years}
          </span>
          <h2 className="font-ui font-semibold text-2xl text-neutral-100 uppercase tracking-wider mt-1">
            {config.title}
          </h2>
        </div>

        {/* Moments vertical list */}
        <div className="flex flex-col gap-10">
          {config.moments.map((moment) => (
            <div
              key={moment.id}
              className="flex flex-col gap-4 border-b border-white/5 pb-8 last:border-0 last:pb-0"
            >
              {/* Media card */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900/60 border border-white/5 shadow-lg">
                <div
                  className="absolute inset-0 z-10 mix-blend-color pointer-events-none"
                  style={{
                    background: getEraTintOverlay(config),
                  }}
                />

                {moment.isLowRes && (
                  /* TODO: replace with licensed high-res image - current source is low-res placeholder */
                  <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                      opacity: 0.08,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      backgroundSize: "150px 150px",
                      backgroundRepeat: "repeat",
                    }}
                  />
                )}

                <Image
                  src={moment.imagePath}
                  alt={moment.title}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    filter: getEraImageFilter(config, moment.isLowRes),
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18]/90 via-transparent to-transparent z-20" />
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="font-display font-medium text-lg text-neutral-200 leading-tight">
                    {moment.title}
                  </h3>
                  <p className="font-mono text-[9px] tracking-wider uppercase opacity-45 mt-1">
                    {moment.subtitle}
                  </p>
                </div>

                <p className="font-ui text-sm text-neutral-400 leading-relaxed font-light">
                  {moment.description}
                </p>

                {/* Metric Badge */}
                <div
                  className="flex items-center gap-4 mt-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                  style={{
                    borderLeft: `3px solid ${config.accentColor}`,
                  }}
                >
                  <span className="font-display text-3xl font-black italic tracking-tighter text-neutral-100">
                    {moment.statNumber}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">
                      Metric
                    </span>
                    <span className="font-ui text-xs text-neutral-300 font-medium">
                      {moment.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
