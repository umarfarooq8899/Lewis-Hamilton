"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface HeroTextHandle {
  nameEl: HTMLSpanElement | null;
  labelEl: HTMLSpanElement | null;
  statEl: HTMLSpanElement | null;
  dividerEl: HTMLDivElement | null;
}

const HeroText = forwardRef<HeroTextHandle>(function HeroText(_, ref) {
  const nameRef    = useRef<HTMLSpanElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const statRef    = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get nameEl()    { return nameRef.current; },
    get labelEl()   { return labelRef.current; },
    get statEl()    { return statRef.current; },
    get dividerEl() { return dividerRef.current; },
  }));

  return (
    <div
      className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 w-full md:w-[46%] px-6 md:px-8 lg:px-10 z-10 flex flex-col items-center md:items-end gap-2 md:gap-3 pointer-events-none overflow-visible"
    >
      {/* Thin horizontal rule above eyebrow label */}
      <div
        ref={dividerRef}
        className="w-12 h-[1px] self-center md:self-end mb-1"
        style={{
          opacity: 0,
          willChange: "opacity, transform",
          background: "rgba(242, 237, 228, 0.4)",
        }}
      />

      {/* Eyebrow label */}
      <span
        ref={labelRef}
        className="font-mono tracking-[0.2em] uppercase text-center md:text-right"
        style={{
          fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)",
          color: "rgba(242, 237, 228, 0.75)",
          opacity: 0,
          willChange: "opacity, transform",
        }}
      >
        Formula 1 · 2008 – 2024
      </span>

      {/* Driver Name */}
      <span
        ref={nameRef}
        className="font-ui font-semibold tracking-[0.16em] uppercase text-[#F2EDE4] text-center md:text-right"
        style={{
          fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
          lineHeight: 1.2,
          opacity: 0,
          willChange: "opacity, transform",
        }}
      >
        Lewis Hamilton
      </span>

      {/* Large count-up stat block */}
      <div className="flex flex-col items-center md:items-end gap-1 mt-1 pr-2 md:pr-4">
        <span
          ref={statRef}
          className="font-display italic font-extrabold text-[#F2EDE4] text-center md:text-right inline-block"
          style={{
            fontSize: "clamp(4.5rem, 10vw, 9.5rem)",
            lineHeight: 0.85,
            paddingRight: "0.15em", // Prevents italic slant clipping on digit 4
            opacity: 0,
            willChange: "opacity, transform",
            textShadow: "0 0 80px rgba(122,79,255,0.35)",
          }}
        >
          0
        </span>
        <span
          className="font-mono tracking-[0.22em] uppercase text-center md:text-right"
          style={{
            fontSize: "clamp(0.7rem, 0.85vw, 0.825rem)",
            color: "rgba(242, 237, 228, 0.75)",
            opacity: 0,
            transition: "opacity var(--duration-fast) ease",
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
