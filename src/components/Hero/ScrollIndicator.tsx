"use client";

import { forwardRef } from "react";

// Thin vertical pulsing line — scroll indicator + design motif
const ScrollIndicator = forwardRef<HTMLDivElement>(function ScrollIndicator(_, ref) {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        bottom: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        opacity: 0, // GSAP controls initial appear
        willChange: "opacity",
        zIndex: 10,
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(242,237,228,0.3)",
          writingMode: "horizontal-tb",
        }}
      >
        Scroll
      </span>

      {/* Pulsing vertical line */}
      <div
        style={{
          width: "1px",
          height: "60px",
          position: "relative",
          overflow: "hidden",
          background: "rgba(242,237,228,0.12)",
          borderRadius: "1px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, transparent, var(--color-accent) 50%, transparent)",
            animation: "scroll-pulse 2.2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scroll-pulse {
          0%   { transform: translateY(-100%); opacity: 0.3; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
});

export default ScrollIndicator;
