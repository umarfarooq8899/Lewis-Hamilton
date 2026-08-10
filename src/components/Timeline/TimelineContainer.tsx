"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { erasConfig } from "./config";
import { COLOR_GRAPHITE, EASE_SCRUB } from "@/config/tokens";
import { Moment } from "./types";

gsap.registerPlugin(ScrollTrigger);

interface UnifiedMoment extends Moment {
  eraId: string;
  eraTitle: string;
  eraYears: string;
  accentColor: string;
  bgTint: string;
  muted?: boolean;
}

function getEraImageFilter(muted?: boolean, isLowRes?: boolean): string {
  const base = muted
    ? "grayscale(100%) contrast(1.15) brightness(0.7)"
    : "grayscale(100%) contrast(1.1) brightness(0.8)";
  if (isLowRes) {
    return `${base} blur(1.5px)`;
  }
  return base;
}

function getEraTintOverlay(accentColor: string, muted?: boolean): string {
  if (muted) {
    return "rgba(128, 128, 128, 0.12)";
  }
  return `${accentColor}1C`;
}

export default function TimelineContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const spineProgressFillRef = useRef<HTMLDivElement>(null);
  const momentsRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLSpanElement[]>([]);
  const activeEraIdRef = useRef<string>(erasConfig[0].id);

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

  // Flatten all moments across all eras into a single array
  const allMoments = useMemo<UnifiedMoment[]>(() => {
    return erasConfig.flatMap((era) =>
      era.moments.map((moment) => ({
        ...moment,
        eraId: era.id,
        eraTitle: era.title,
        eraYears: era.years,
        accentColor: era.accentColor,
        bgTint: era.bgTint,
        muted: era.muted,
      }))
    );
  }, []);

  // Track active era configuration locally to drive progress labels
  const [activeEra, setActiveEra] = useState({
    id: erasConfig[0].id,
    title: erasConfig[0].title,
    years: erasConfig[0].years,
    color: erasConfig[0].accentColor,
    progress: 0,
  });

  // Track whether the timeline container itself is active in the viewport
  const [isTimelineActive, setIsTimelineActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track spine visibility
    const activeTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      end: "bottom 25%",
      onToggle: (self) => {
        setIsTimelineActive(self.isActive);
      },
    });

    // 1. Total Scroll Progress indicator (Timeline Spine)
    const progressTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            scaleY: self.progress,
            transformOrigin: "top center",
          });
        }
      },
    });

    // Mobile fallback HUD tracking
    if (window.innerWidth < 768) {
      return () => {
        activeTrigger.kill();
        progressTrigger.kill();
      };
    }

    // ── DESKTOP UNIFIED PINNED SCROLL PERFORMANCE ──
    const momentsCount = allMoments.length;
    // Optimized scroll distance: ~480px per moment for snappy, energetic scrolling
    const scrollDistance = momentsCount * 480;

    // Master Timeline for continuous pinning and scrub transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 0.15, // Fast 0.15s scrub response (down from sluggish 0.5s)
        onUpdate: (self) => {
          // Direct DOM mutation for spine progress bar (0 re-renders per scroll frame)
          if (spineProgressFillRef.current) {
            spineProgressFillRef.current.style.transform = `scaleX(${self.progress})`;
          }

          const momentIdx = Math.min(
            Math.floor(self.progress * momentsCount),
            momentsCount - 1
          );
          const currentItem = allMoments[momentIdx];

          // Only trigger React state re-render when switching to a NEW era boundary
          if (currentItem && currentItem.eraId !== activeEraIdRef.current) {
            activeEraIdRef.current = currentItem.eraId;
            setActiveEra({
              id: currentItem.eraId,
              title: currentItem.eraTitle,
              years: currentItem.eraYears,
              color: currentItem.accentColor,
              progress: self.progress,
            });
          }
        },
      },
    });

    // Prepare initial states (all items except first are hidden)
    const extraMoments = momentsRef.current.slice(1).filter(Boolean);
    const extraImages = imagesRef.current.slice(1).filter(Boolean);
    if (extraMoments.length > 0) {
      gsap.set(extraMoments, { opacity: 0, y: 24, pointerEvents: "none" });
    }
    if (extraImages.length > 0) {
      gsap.set(extraImages, { opacity: 0, scale: 1.06, pointerEvents: "none" });
    }

    // Tightened multi-moment keyframe transitions
    allMoments.forEach((item, index) => {
      const startTime = index * 8;
      const isOrdinal = isNaN(Number(item.statNumber));
      const parsedStat = isOrdinal ? 0 : Number(item.statNumber);
      const counter = { val: 0 };

      // Transition Out Previous Moment
      if (index > 0) {
        tl.to(
          momentsRef.current[index - 1],
          { opacity: 0, y: -24, duration: 2.2, ease: EASE_SCRUB },
          startTime - 1.2
        );
        tl.to(
          imagesRef.current[index - 1],
          { opacity: 0, scale: 0.96, duration: 2.2, ease: EASE_SCRUB },
          startTime - 1.2
        );
      }

      // Transition In Current Moment
      if (index > 0) {
        tl.to(
          momentsRef.current[index],
          { opacity: 1, y: 0, duration: 2.5, ease: EASE_SCRUB },
          startTime + 0.3
        );
        tl.to(
          imagesRef.current[index],
          { opacity: 1, scale: 1, duration: 2.8, ease: EASE_SCRUB },
          startTime
        );
      } else {
        tl.to(
          imagesRef.current[0],
          { scale: 1, duration: 2.2, ease: EASE_SCRUB },
          0
        );
      }

      // Background Tint Interpolation
      tl.to(
        container,
        { backgroundColor: item.bgTint, ease: "none", duration: 2.5 },
        startTime
      );

      // Roll stat numbers
      if (!isOrdinal && parsedStat > 0) {
        tl.to(
          counter,
          {
            val: parsedStat,
            duration: 3.2,
            ease: "none",
            onUpdate: () => {
              const el = statsRef.current[index];
              if (el) el.textContent = String(Math.round(counter.val));
            },
          },
          startTime + 0.3
        );
      } else {
        tl.fromTo(
          statsRef.current[index],
          { opacity: 0 },
          { opacity: 1, duration: 1.5 },
          startTime + 0.3
        );
      }
    });

    return () => {
      activeTrigger.kill();
      progressTrigger.kill();
      tl.kill();
    };
  }, [allMoments]);

  return (
    <div
      ref={containerRef}
      className="w-full relative transition-colors duration-500 select-none"
      style={{
        backgroundColor: COLOR_GRAPHITE,
        willChange: "background-color",
      }}
    >
      {/* ── STICKY PROGRESS SPINE (Left margins) ── */}
      <div
        className="fixed left-6 md:left-12 lg:left-16 top-[25vh] h-[50vh] w-[2px] z-50 pointer-events-none hidden sm:flex flex-col items-center justify-between transition-opacity duration-500"
        style={{ opacity: isTimelineActive ? 1 : 0 }}
      >
        {/* Background track */}
        <div className="absolute inset-0 bg-white/10 rounded-full" />

        {/* Dynamic scroll-driven overlay track */}
        <div
          ref={progressBarRef}
          className="absolute inset-0 rounded-full transition-shadow duration-300"
          style={{
            background: "var(--color-offwhite)",
            boxShadow: `0 0 10px ${activeEra.color}`,
          }}
        />

        {/* Spine metadata HUD overlay */}
        <div
          className="absolute left-4 top-[10%] flex flex-col font-mono text-[9px] uppercase tracking-widest text-neutral-400 gap-1.5 select-none transition-all duration-300"
          style={{
            textShadow: `0 0 10px ${activeEra.color}2A`,
          }}
        >
          <span style={{ color: activeEra.color }} className="font-semibold transition-colors duration-500">
            {activeEra.years}
          </span>
          <span className="opacity-70 text-white truncate max-w-[120px] transition-all duration-500">
            {activeEra.title}
          </span>
          {/* Visual progress bar */}
          <div className="spine-progress-track">
            <div
              ref={spineProgressFillRef}
              className="spine-progress-fill"
              style={{
                transform: `scaleX(${activeEra.progress})`,
                backgroundColor: activeEra.color,
                willChange: "transform",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── DESKTOP UNIFIED SCROLL CONTAINER (md and up) ── */}
      <div className="hidden md:flex md:flex-row w-full h-screen relative overflow-hidden items-center">
        {/* Visual background radial glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-15 mix-blend-screen transition-colors duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeEra.color} 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* LEFT COLUMN: Visual Media (Image Stack) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden z-10 flex items-center justify-center p-6 md:py-12 md:pl-28 md:pr-12 lg:pl-36 lg:pr-16">
          <div className="glass-card relative w-full h-[90%] max-w-lg aspect-[3/4]">
            {allMoments.map((item, idx) => (
              <div
                key={item.id}
                ref={addToImagesRef}
                className="absolute inset-0 transition-opacity duration-150 ease-in-out"
                style={{
                  zIndex: idx + 1,
                  willChange: "transform, opacity",
                }}
              >
                {/* Grayscale + Tint duotone overlay */}
                <div
                  className="absolute inset-0 z-10 mix-blend-color pointer-events-none transition-all duration-500"
                  style={{
                    background: getEraTintOverlay(item.accentColor, item.muted),
                  }}
                />

                {/* Low-res grain overlay */}
                {item.isLowRes && (
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
                  src={item.imagePath}
                  alt={item.title}
                  fill
                  sizes="50vw"
                  style={{
                    objectFit: "cover",
                    filter: getEraImageFilter(item.muted, item.isLowRes),
                  }}
                  loading={idx === 0 ? undefined : "lazy"}
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18]/90 via-transparent to-transparent z-20" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Era Info & Unified Moments Stack */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative z-10 flex flex-col justify-center" style={{ paddingInline: 'var(--container-px)' }}>
          {/* Dynamically interpolating Era Header */}
          <div className="mb-6 md:mb-12 transition-all duration-500">
            <span
              className="font-mono tracking-widest uppercase transition-colors duration-500"
              style={{ fontSize: 'var(--text-eyebrow)', opacity: 'var(--text-tertiary)', color: activeEra.color }}
            >
              {activeEra.years}
            </span>
            <h2 className="font-ui font-semibold text-2xl md:text-4xl text-neutral-100 uppercase tracking-wider mt-1 transition-all duration-500">
              {activeEra.title}
            </h2>
          </div>

          <div className="relative w-full h-[60%] flex items-start">
            {allMoments.map((item, idx) => (
              <div
                key={item.id}
                ref={addToMomentsRef}
                className="absolute inset-0 flex flex-col justify-start pointer-events-none"
                style={{
                  willChange: "transform, opacity",
                }}
              >
                <div className="flex flex-col gap-3 md:gap-4 max-w-xl">
                  <div>
                    <h3 className="font-display font-medium text-lg md:text-2xl text-neutral-200 leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-mono tracking-wider uppercase mt-1" style={{ fontSize: 'var(--text-eyebrow)', opacity: 'var(--text-tertiary)' }}>
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="font-ui font-light" style={{ fontSize: 'var(--text-body)', lineHeight: '1.7', color: 'rgba(242, 237, 228, var(--text-secondary))' }}>
                    {item.description}
                  </p>

                  <div
                    className="glass-card flex items-center gap-4 mt-6 transition-colors duration-500"
                    style={{ padding: 'var(--card-padding)', cursor: 'default', borderLeft: `3px solid ${item.accentColor}` }}
                  >
                    <span
                      ref={addToStatsRef}
                      className="font-display text-4xl md:text-5xl font-black italic tracking-tighter text-neutral-100"
                    >
                      {item.statNumber}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono uppercase tracking-wider" style={{ fontSize: 'var(--text-eyebrow)', color: 'rgba(242, 237, 228, var(--text-tertiary))' }}>
                        Metric
                      </span>
                      <span className="font-ui font-medium" style={{ fontSize: 'var(--text-body)', color: 'rgba(242, 237, 228, var(--text-primary))' }}>
                        {item.statLabel}
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
        {erasConfig.map((era) => (
          <div key={era.id} className="flex flex-col gap-8 border-b border-white/5 pb-12 last:border-0 last:pb-0">
            {/* Era header */}
            <div>
              <span
                className="font-mono tracking-widest uppercase"
                style={{ fontSize: 'var(--text-eyebrow)', opacity: 'var(--text-tertiary)', color: era.accentColor }}
              >
                {era.years}
              </span>
              <h2 className="font-ui font-semibold text-2xl text-neutral-100 uppercase tracking-wider mt-1">
                {era.title}
              </h2>
            </div>

            {/* Moments vertical list */}
            <div className="flex flex-col gap-10">
              {era.moments.map((moment) => (
                <div
                  key={moment.id}
                  className="flex flex-col gap-4 border-b border-white/5 pb-8 last:border-0 last:pb-0"
                >
                  {/* Media card */}
                  <div className="glass-card relative w-full aspect-[4/3]">
                    <div
                      className="absolute inset-0 z-10 mix-blend-color pointer-events-none"
                      style={{
                        background: getEraTintOverlay(era.accentColor, era.muted),
                      }}
                    />

                    {moment.isLowRes && (
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
                        filter: getEraImageFilter(era.muted, moment.isLowRes),
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
                      <p className="font-mono tracking-wider uppercase mt-1" style={{ fontSize: 'var(--text-eyebrow)', opacity: 'var(--text-tertiary)' }}>
                        {moment.subtitle}
                      </p>
                    </div>

                    <p className="font-ui font-light" style={{ fontSize: 'var(--text-body)', lineHeight: '1.7', color: 'rgba(242, 237, 228, var(--text-secondary))' }}>
                      {moment.description}
                    </p>

                    {/* Metric Badge */}
                    <div
                      className="glass-card flex items-center gap-4 mt-3"
                      style={{ padding: 'var(--card-padding)', cursor: 'default', borderLeft: `3px solid ${era.accentColor}` }}
                    >
                      <span className="font-display text-3xl font-black italic tracking-tighter text-neutral-100">
                        {moment.statNumber}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-mono uppercase tracking-wider" style={{ fontSize: 'var(--text-eyebrow)', color: 'rgba(242, 237, 228, var(--text-tertiary))' }}>
                          Metric
                        </span>
                        <span className="font-ui font-medium" style={{ fontSize: 'var(--text-body)', color: 'rgba(242, 237, 228, var(--text-primary))' }}>
                          {moment.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
