"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { HERO_IMAGE } from "@/config/imageConfig";

// ─────────────────────────────────────────
// Three-layer parallax using a SINGLE real photo.
// Depth separation is faked via CSS blur/brightness/masks:
//   bg layer:  heavy blur + dark + purple duotone → atmospheric environment
//   mid layer: medium blur + mid brightness + softer tint → transitional depth
//   fg layer:  sharp + contrast + duotone highlight → subject "foreground"
// ─────────────────────────────────────────

export interface HeroCompositionRef {
  fg: HTMLDivElement | null;
  mid: HTMLDivElement | null;
  bg: HTMLDivElement | null;
  wrap: HTMLDivElement | null;
}

const HeroComposition = forwardRef<HeroCompositionRef, {}>(
  function HeroComposition(_, ref) {
    // Expose individual layer refs to parent (Hero) via callback ref
    const setRef = (el: HTMLDivElement | null, key: keyof HeroCompositionRef) => {
      if (ref && typeof ref === "object" && ref.current !== undefined) {
        (ref as React.MutableRefObject<HeroCompositionRef>).current[key] = el;
      }
    };

    return (
      <div
        ref={(el) => setRef(el, "wrap")}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0, // GSAP controls this
          willChange: "opacity",
          overflow: "hidden",
        }}
      >
        {/* ── BACKGROUND LAYER — most parallax drift ── */}
        <div
          ref={(el) => setRef(el, "bg")}
          style={{
            position: "absolute",
            inset: "-8%", // extra bleed so parallax doesn't expose edges
            willChange: "transform",
            filter: "blur(18px) grayscale(100%) brightness(0.45)",
          }}
        >
          {/* Duotone colour overlay — purple cast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(122, 79, 255, 0.22)",
              mixBlendMode: "color",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          {/* Radial mask to darken edges — simulate depth/environment */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 70% at 35% 40%, transparent 20%, rgba(28,27,24,0.7) 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            sizes="120vw"
            style={{ objectFit: "cover", objectPosition: "center center", filter: "grayscale(100%)" }}
            priority={false}
            aria-hidden
          />
        </div>

        {/* ── MIDGROUND LAYER — medium parallax drift ── */}
        <div
          ref={(el) => setRef(el, "mid")}
          style={{
            position: "absolute",
            inset: "-6%",
            willChange: "transform",
            filter: "blur(5px) grayscale(100%) brightness(0.65)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(122, 79, 255, 0.12)",
              mixBlendMode: "color",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          {/* Edge darkening mask — pushes periphery into the "background" */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 55% 65% at 35% 40%, transparent 30%, rgba(28,27,24,0.55) 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            sizes="120vw"
            style={{ objectFit: "cover", objectPosition: "center center", filter: "grayscale(100%)" }}
            priority={false}
            aria-hidden
          />
        </div>

        {/* ── FOREGROUND LAYER — sharpest, least parallax ── */}
        <div
          ref={(el) => setRef(el, "fg")}
          style={{
            position: "absolute",
            inset: "-4%",
            willChange: "transform",
            filter: "grayscale(100%)",
          }}
        >
          {/* Duotone highlight overlay — purple gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(122,79,255,0.22) 0%, rgba(122,79,255,0.05) 60%, transparent 100%)",
              mixBlendMode: "screen",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Image
            src={HERO_IMAGE}
            alt="Lewis Hamilton — Formula 1 driver portrait"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center center", // subject centered, slightly above middle
              filter: "grayscale(100%) contrast(1.1) brightness(0.9)",
            }}
            priority
          />
        </div>

        {/* Vignette & right-side fade to create negative space for text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent 20%, rgba(28,27,24,0.55) 55%, rgba(28,27,24,0.88) 80%, rgba(28,27,24,0.97) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Bottom bleed fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background:
              "linear-gradient(to bottom, transparent, rgba(28,27,24,0.6) 70%, rgba(28,27,24,0.9) 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }
);

export default HeroComposition;
