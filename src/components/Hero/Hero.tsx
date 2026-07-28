"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { EASE_STANDARD, DURATION_FAST, DURATION_SLOW, DURATION_COUNT } from "@/config/tokens";
import HelmetVisor from "./HelmetVisor";
import HeroComposition, { type HeroCompositionRef } from "./HeroComposition";
import HeroText, { type HeroTextHandle } from "./HeroText";
import ScrollIndicator from "./ScrollIndicator";

// ─────────────────────────────────────────
// Timeline overview
//  0.0 – 1.5s  Phase 1: visor blob fades in (opacity 0→1)
//  1.5 – 2.5s  Phase 2: visor scales down (1.0→0.72) — reads as helmet silhouette
//  2.5 – 4.0s  Phase 3: crossfade visor→composition
//  4.0 – 4.8s  Phase 4a: divider, label, name slide/fade in
//  4.3 – 5.2s  Phase 4b: stat count-up 0→105
//  5.3s+       Phase 5: scroll indicator appears
// ─────────────────────────────────────────

export default function Hero() {
  const sectionRef     = useRef<HTMLElement>(null);
  const visorRef       = useRef<HTMLDivElement>(null);
  // The inner visor highlight overlay (for cursor tracking)
  const visorHighlightRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HeroCompositionRef>({
    fg: null, mid: null, bg: null, wrap: null,
  });
  const textRef        = useRef<HeroTextHandle>(null);
  const indicatorRef   = useRef<HTMLDivElement>(null);

  // Mouse tracking — raw ref, no re-renders
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const rafId = useRef<number | null>(null);
  const parallaxActive = useRef(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouse.current.x = e.clientX / innerWidth;
    mouse.current.y = e.clientY / innerHeight;
  }, []);

  // Single RAF loop handles both visor highlight AND parallax layers
  const startRAFLoop = useCallback(() => {
    parallaxActive.current = true;

    const tick = () => {
      if (!parallaxActive.current) return;

      const { x, y } = mouse.current;

      // ── Visor highlight (cursor-tracked radial gradient) ──
      if (visorHighlightRef.current) {
        const ox = 30 + x * 40; // 30–70%
        const oy = 30 + y * 40;
        visorHighlightRef.current.style.background =
          `radial-gradient(ellipse 55% 35% at ${ox}% ${oy}%, rgba(255,255,255,0.07) 0%, rgba(122,79,255,0.05) 30%, transparent 70%)`;
      }

      // ── Parallax layers (active after composition fades in) ──
      const c = compositionRef.current;
      if (c.fg)  gsap.set(c.fg,  { x: (x - 0.5) * -10, y: (y - 0.5) * -10 });
      if (c.mid) gsap.set(c.mid, { x: (x - 0.5) * -22, y: (y - 0.5) * -22 });
      if (c.bg)  gsap.set(c.bg,  { x: (x - 0.5) * -48, y: (y - 0.5) * -48 });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const visor = visorRef.current;
    const compWrap = compositionRef.current.wrap;
    const divider = textRef.current?.dividerEl;
    const label = textRef.current?.labelEl;
    const name = textRef.current?.nameEl;
    const stat = textRef.current?.statEl;
    const indicator = indicatorRef.current;

    if (!section || !visor || !compWrap || !divider || !label || !name || !stat || !indicator) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      startRAFLoop(); // Start immediately so visor highlight is live from Phase 1
    }

    // ── Stat count-up object ──
    const counter = { val: 0 };
    const updateCounter = () => {
      stat.textContent = String(Math.round(counter.val));
    };

    // ── Master GSAP Timeline ──
    const tl = gsap.timeline({ defaults: { ease: EASE_STANDARD } });

    // PHASE 1: Visor fades in (0 – 1.5s)
    tl.to(visor, {
      opacity: 1,
      duration: DURATION_SLOW,
      ease: "power2.inOut",
    }, 0);

    // PHASE 2: Pull-back scale (1.5 – 2.5s)
    tl.to(visor, {
      scale: 0.72,
      duration: DURATION_SLOW,
      ease: "power2.inOut",
    }, 1.5);

    // PHASE 3a: Visor fades out (2.5 – 3.5s)
    tl.to(visor, {
      opacity: 0,
      duration: DURATION_SLOW,
      ease: "power2.inOut",
    }, 2.5);

    // PHASE 3b: Composition crossfades in (2.5 – 4.0s)
    tl.to(compWrap, {
      opacity: 1,
      duration: DURATION_SLOW,
      ease: "power2.inOut",
    }, 2.5);

    // PHASE 4a: Divider line
    tl.fromTo(divider,
      { opacity: 0, scaleX: 0, transformOrigin: "right" },
      { opacity: 1, scaleX: 1, duration: DURATION_FAST, ease: EASE_STANDARD },
      4.0
    );

    // PHASE 4a: Label fades up
    tl.fromTo(label,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: DURATION_FAST },
      4.2
    );

    // PHASE 4a: Name slides up
    tl.fromTo(name,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: DURATION_FAST },
      4.35
    );

    // PHASE 4b: Stat fade/slide in
    tl.fromTo(stat,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: DURATION_FAST },
      4.3
    );

    // PHASE 4b: Count-up 0 → 104
    tl.to(counter, {
      val: 104,
      duration: DURATION_COUNT,
      ease: EASE_STANDARD,
      onUpdate: updateCounter,
    }, 4.3);

    // Reveal "career wins" sub-label
    tl.to(section.querySelector("[data-stat-label]"), {
      opacity: 1,
      duration: DURATION_FAST,
    }, 4.5);

    // PHASE 5: Scroll indicator
    tl.fromTo(indicator,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: DURATION_FAST },
      5.3
    );

    return () => {
      tl.kill();
      window.removeEventListener("mousemove", onMouseMove);
      parallaxActive.current = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [onMouseMove, startRAFLoop]);

  return (
    <section
      ref={sectionRef}
      aria-label="Lewis Hamilton hero introduction"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        background: "var(--color-graphite)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Phase 1 & 2 — Visor blob */}
      <HelmetVisor
        ref={visorRef}
        highlightRef={visorHighlightRef}
      />

      {/* Phase 3 — Parallax composition */}
      <HeroComposition ref={compositionRef} />

      {/* Phase 4 — Text overlay */}
      <HeroText ref={textRef} />

      {/* Phase 5 — Scroll indicator */}
      <ScrollIndicator ref={indicatorRef} />
    </section>
  );
}
