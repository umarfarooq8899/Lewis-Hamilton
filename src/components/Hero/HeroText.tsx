"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface HeroTextHandle {
  nameEl: HTMLSpanElement | null;
  labelEl: HTMLSpanElement | null;
  statEl: HTMLSpanElement | null;
  dividerEl: HTMLDivElement | null;
}

const HeroText = forwardRef<HeroTextHandle>(function HeroText(_, ref) {
  const nameRef   = useRef<HTMLSpanElement>(null);
  const labelRef  = useRef<HTMLSpanElement>(null);
  const statRef   = useRef<HTMLSpanElement>(null);
  const dividerRef= useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get nameEl()   { return nameRef.current; },
    get labelEl()  { return labelRef.current; },
    get statEl()   { return statRef.current; },
    get dividerEl(){ return dividerRef.current; },
  }));

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: "42%",
        paddingRight: "5vw",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.6rem",
        pointerEvents: "none",
      }}
    >
      {/* Thin horizontal rule above name */}
      <div
        ref={dividerRef}
        style={{
          width: "2.5rem",
          height: "1px",
          background: "rgba(242,237,228,0.3)",
          alignSelf: "flex-end",
          opacity: 0,
          willChange: "opacity, transform",
        }}
      />

      {/* Label line */}
      <span
        ref={labelRef}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.55rem, 0.8vw, 0.75rem)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(242,237,228,0.45)",
          opacity: 0,
          willChange: "opacity, transform",
        }}
      >
        {/* PLACEHOLDER TEXT — replace with official tagline if desired */}
        Formula 1 · 2008 – 2024
      </span>

      {/* Name */}
      <span
        ref={nameRef}
        style={{
          fontFamily: "var(--font-ui)",
          fontWeight: 600,
          fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-offwhite)",
          textAlign: "right",
          lineHeight: 1.1,
          opacity: 0,
          willChange: "opacity, transform",
        }}
      >
        Lewis Hamilton
      </span>

      {/* Large count-up stat */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.1rem",
          marginTop: "0.5rem",
        }}
      >
        <span
          ref={statRef}
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 800,
            fontSize: "clamp(5rem, 11vw, 10rem)",
            lineHeight: 0.85,
            color: "var(--color-offwhite)",
            opacity: 0,
            willChange: "opacity, transform",
            // Very subtle accent shadow
            textShadow: "0 0 80px rgba(122,79,255,0.25)",
          }}
        >
          0
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.5rem, 0.7vw, 0.65rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(242,237,228,0.35)",
            opacity: 0,
            // Shares GSAP timeline with statRef (same tween)
            // Not exposed via ref because it enters with the stat
            transition: "opacity 0.6s ease",
          }}
          data-stat-label
        >
          Career wins
        </span>
      </div>
    </div>
  );
});

export default HeroText;
