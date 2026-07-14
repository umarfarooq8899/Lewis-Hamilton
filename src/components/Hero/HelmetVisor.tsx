"use client";

import { forwardRef } from "react";

// ─────────────────────────────────────────
// PLACEHOLDER: This component will be replaced with a Rive animation
// loading the file: /public/helmet_visor.riv
// The Rive canvas should fill the same container div and expose a
// StateMachine input "mouseX" and "mouseY" (0–1 range).
//
// When swapping in Rive:
//   1. Remove this entire component
//   2. Add <RiveComponent /> inside the same outer div
//   3. Pass normalised mouseX/mouseY to the Rive state machine inputs
// ─────────────────────────────────────────

interface Props {
  /** Forwarded ref to the inner highlight overlay — parent drives it via direct style mutation in the RAF loop */
  highlightRef: React.RefObject<HTMLDivElement | null>;
}

const HelmetVisor = forwardRef<HTMLDivElement, Props>(function HelmetVisor(
  { highlightRef },
  ref
) {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0, // GSAP controls this
        willChange: "transform, opacity",
      }}
    >
      {/* Outer dark curved shape — helmet silhouette stand-in */}
      <div
        style={{
          position: "relative",
          width: "min(520px, 80vw)",
          height: "min(620px, 85vh)",
          borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
          background:
            "radial-gradient(ellipse at 50% 30%, #2a2926 0%, #1C1B18 60%, #131210 100%)",
          overflow: "hidden",
          boxShadow:
            "0 0 120px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Visor face plate */}
        <div
          style={{
            position: "absolute",
            inset: "12%",
            borderRadius: "50% 50% 35% 35% / 55% 55% 35% 35%",
            background:
              "radial-gradient(ellipse at 50% 40%, #1a1918 0%, #111010 80%)",
            overflow: "hidden",
          }}
        >
          {/*
            Cursor-tracked specular highlight.
            Parent Hero.tsx drives this element's background directly
            via the highlightRef in the RAF loop — zero React re-renders.
          */}
          <div
            ref={highlightRef}
            style={{
              position: "absolute",
              inset: 0,
              // Initial gradient — will be overwritten by RAF loop immediately
              background:
                "radial-gradient(ellipse 55% 35% at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(122,79,255,0.04) 30%, transparent 70%)",
            }}
          />
          {/* Static rim light at top of visor */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 60%, transparent)",
            }}
          />
        </div>

        {/* Helmet top rim highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "3px",
            borderRadius: "0 0 50% 50%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 50%, transparent)",
          }}
        />
      </div>
    </div>
  );
});

export default HelmetVisor;
