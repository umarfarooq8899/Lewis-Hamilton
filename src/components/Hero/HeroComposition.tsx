"use client";

import { forwardRef } from "react";
import Image from "next/image";

// ─────────────────────────────────────────
// PLACEHOLDER: The three layer images are all using the same
// picsum placeholder. Replace with:
//   bg layer:  /public/hero-bg.jpg        (blurred/abstract environment)
//   mid layer: /public/hero-mid.jpg       (soft secondary element)
//   fg layer:  /public/hero-portrait.jpg  (main driver portrait, left-weighted)
//
// Apply duotone via CSS: grayscale() + a colour overlay blend.
// ─────────────────────────────────────────

const PLACEHOLDER_IMG = "https://picsum.photos/seed/hamilton/900/1200";

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
            filter: "blur(18px) grayscale(100%)",
          }}
        >
          {/* Duotone colour overlay — purple cast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(122, 79, 255, 0.18)",
              mixBlendMode: "color",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Image
            src={PLACEHOLDER_IMG}
            alt=""
            fill
            sizes="120vw"
            style={{ objectFit: "cover", objectPosition: "center 20%", filter: "grayscale(100%)" }}
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
            filter: "blur(5px) grayscale(100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(122, 79, 255, 0.10)",
              mixBlendMode: "color",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Image
            src={PLACEHOLDER_IMG}
            alt=""
            fill
            sizes="120vw"
            style={{ objectFit: "cover", objectPosition: "30% 15%", filter: "grayscale(100%)" }}
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
          {/* Duotone highlight overlay */}
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
            src={PLACEHOLDER_IMG}
            alt="Lewis Hamilton — Formula 1 driver portrait"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "30% top", // subject weighted to left third
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
