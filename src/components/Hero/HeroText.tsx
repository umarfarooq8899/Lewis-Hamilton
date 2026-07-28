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
      className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[44%] px-8 md:px-10 lg:px-14 z-10 flex flex-col items-center md:items-end gap-2 md:gap-3 pointer-events-none overflow-hidden"
    >
      {/* Thin horizontal rule above name */}
      <div
        ref={dividerRef}
        className="w-10 h-[1px] self-center md:self-end"
        style={{
          opacity: 0,
          willChange: "opacity, transform",
          background: "rgba(242, 237, 228, var(--text-tertiary))",
        }}
      />

      {/* Label line */}
      <span
        ref={labelRef}
        className="font-mono tracking-[0.2em] uppercase text-center md:text-right"
        style={{
          fontSize: "var(--text-eyebrow)",
          color: "rgba(242, 237, 228, var(--text-secondary))",
          opacity: 0,
          willChange: "opacity, transform",
        }}
      >
        Formula 1 · 2008 – 2024
      </span>

      {/* Name */}
      <span
        ref={nameRef}
        className="font-ui font-semibold tracking-[0.14em] uppercase text-[#F2EDE4] text-center md:text-right"
        style={{
          fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
          lineHeight: 1.1,
          opacity: 0,
          willChange: "opacity, transform",
        }}
      >
        Lewis Hamilton
      </span>

      {/* Large count-up stat */}
      <div className="flex flex-col items-center md:items-end gap-[0.1rem] mt-2">
        <span
          ref={statRef}
          className="font-display italic font-extrabold text-[#F2EDE4] text-center md:text-right"
          style={{
            fontSize: "clamp(5rem, 11vw, 10rem)",
            lineHeight: 0.85,
            opacity: 0,
            willChange: "opacity, transform",
            textShadow: "0 0 80px rgba(122,79,255,0.25)",
          }}
        >
          0
        </span>
        <span
          className="font-mono tracking-[0.2em] uppercase text-center md:text-right"
          style={{
            fontSize: "var(--text-eyebrow)",
            color: "rgba(242, 237, 228, var(--text-secondary))",
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
