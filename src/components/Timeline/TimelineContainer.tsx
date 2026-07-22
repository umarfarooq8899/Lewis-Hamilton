"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { erasConfig } from "./config";
import { COLOR_GRAPHITE } from "@/config/tokens";
import EraSection from "./EraSection";

gsap.registerPlugin(ScrollTrigger);

export default function TimelineContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
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
 
  const handleActiveEraChange = useCallback((eraId: string, progress: number) => {
    const era = erasConfig.find((e) => e.id === eraId);
    if (era) {
      setActiveEra({
        id: era.id,
        title: era.title,
        years: era.years,
        color: era.accentColor,
        progress: progress,
      });
    }
  }, []);
 
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Trigger to track timeline container activation for progress spine visibility
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

    // 2. Background Color interpolation across Eras
    const wrapperSections = container.querySelectorAll(".era-section-wrapper");
    const cleanupTweens: { kill: () => void }[] = [];

    wrapperSections.forEach((section, index) => {
      const era = erasConfig[index];
      
      // Interpolate background to subtle era tint as it rolls into the viewport
      const tintTween = gsap.fromTo(
        container,
        { backgroundColor: COLOR_GRAPHITE },
        {
          backgroundColor: era.bgTint,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      // Restore base graphite as it rolls out of the viewport
      const resetTween = gsap.fromTo(
        container,
        { backgroundColor: era.bgTint },
        {
          backgroundColor: COLOR_GRAPHITE,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      // Track HUD active state & progress for mobile viewport scrolls
      const hudTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) {
            handleActiveEraChange(era.id, self.progress);
          }
        },
        onUpdate: (self) => {
          if (self.isActive && window.innerWidth < 768) {
            handleActiveEraChange(era.id, self.progress);
          }
        },
      });

      cleanupTweens.push(tintTween, resetTween, hudTrigger);
    });

    return () => {
      progressTrigger.kill();
      activeTrigger.kill();
      cleanupTweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative transition-colors duration-300"
      style={{
        backgroundColor: COLOR_GRAPHITE,
        // Smooth hardware-accelerated transitions
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
          className="absolute left-4 top-[10%] flex flex-col font-mono text-[9px] uppercase tracking-widest text-neutral-400 gap-1 select-none transition-all duration-300"
          style={{
            textShadow: `0 0 10px ${activeEra.color}2A`,
          }}
        >
          <span style={{ color: activeEra.color }} className="font-semibold transition-colors duration-500">
            {activeEra.years}
          </span>
          <span className="opacity-60 text-white truncate max-w-[120px]">
            {activeEra.title}
          </span>
          <span className="opacity-40 text-neutral-500">
            Progress: {Math.round(activeEra.progress * 100)}%
          </span>
        </div>
      </div>

      {/* ── ERAS LIST ── */}
      <div className="w-full flex flex-col relative z-10">
        {erasConfig.map((era) => (
          <div
            key={era.id}
            className="era-section-wrapper w-full relative"
          >
            <EraSection
              config={era}
              onActiveEraChange={handleActiveEraChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
