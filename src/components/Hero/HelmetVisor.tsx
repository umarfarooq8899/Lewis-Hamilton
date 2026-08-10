"use client";

import { forwardRef, useEffect, useRef } from "react";

// ─────────────────────────────────────────
// HelmetVisor — abstract dark visor silhouette with a
// mouse-reactive specular light reflection.
//
// Visible during Phase 1 (fade-in) and Phase 2 (scale-down).
// GSAP in Hero.tsx controls opacity on the outer wrapper via
// the forwarded ref. This component owns its own internal
// mousemove listener and rAF LERP loop.
// ─────────────────────────────────────────

const HelmetVisor = forwardRef<HTMLDivElement>(function HelmetVisor(
  _props,
  ref
) {
  const visorContainerRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const secondaryReflectionRef = useRef<HTMLDivElement>(null);

  // Animation & position tracking refs (raw refs = 0 React re-renders)
  const targetPos = useRef({ x: 0.5, y: 0.5 });
  const currentPos = useRef({ x: 0.5, y: 0.5 });
  const hasActiveMouse = useRef(false);
  const rafId = useRef<number | null>(null);
  const ambientTime = useRef(0);

  useEffect(() => {
    // Detect pure touch devices (no hover capability at all)
    const isPureTouch = window.matchMedia("(hover: none)").matches;

    // Listen on window so mouse movement anywhere on the page
    // drives the visor reflection — not just over the visor itself
    const handleMouseMove = (e: MouseEvent) => {
      hasActiveMouse.current = true;

      // Normalise cursor to 0–1 across the full viewport
      targetPos.current.x = e.clientX / window.innerWidth;
      targetPos.current.y = e.clientY / window.innerHeight;
    };

    if (!isPureTouch) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // ── Smooth LERP frame loop ──
    // Updates gradient position on the reflection divs in real-time.
    const tick = () => {
      if (!hasActiveMouse.current) {
        // Idle / mobile fallback: gentle ambient drift
        ambientTime.current += 0.012;
        targetPos.current.x = 0.5 + Math.sin(ambientTime.current * 0.7) * 0.25;
        targetPos.current.y = 0.45 + Math.cos(ambientTime.current * 0.5) * 0.2;
      }

      // LERP: smoothly chase target position
      const lerpFactor = 0.08;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      const cx = currentPos.current.x;
      const cy = currentPos.current.y;

      // Map 0..1 → 15%..85% gradient center (keeps highlight within visor bounds)
      const px = (15 + cx * 70).toFixed(1);
      const py = (15 + cy * 70).toFixed(1);

      // Secondary reflection drifts slightly less for parallax depth feel
      const sx = (25 + cx * 50).toFixed(1);
      const sy = (20 + cy * 60).toFixed(1);

      if (reflectionRef.current) {
        reflectionRef.current.style.background =
          `radial-gradient(ellipse 55% 35% at ${px}% ${py}%, rgba(255,255,255,0.45) 0%, rgba(160,130,255,0.22) 30%, rgba(0,200,255,0.1) 55%, transparent 75%)`;
      }

      if (secondaryReflectionRef.current) {
        secondaryReflectionRef.current.style.background =
          `radial-gradient(ellipse 30% 18% at ${sx}% ${sy}%, rgba(255,255,255,0.3) 0%, transparent 65%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0, // GSAP controls this — Phase 1 fades to 1, Phase 3 back to 0
        willChange: "transform, opacity",
      }}
    >
      {/* Outer dark curved shape — helmet silhouette */}
      <div
        ref={visorContainerRef}
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
          {/* Primary cursor-tracked specular highlight */}
          <div
            ref={reflectionRef}
            style={{
              position: "absolute",
              inset: 0,
              // Initial gradient — overwritten by rAF loop on first frame
              background:
                "radial-gradient(ellipse 55% 35% at 50% 50%, rgba(255,255,255,0.45) 0%, rgba(160,130,255,0.22) 30%, rgba(0,200,255,0.1) 55%, transparent 75%)",
              pointerEvents: "none",
              willChange: "background",
            }}
          />

          {/* Secondary sharp sheen — slightly offset for glass depth */}
          <div
            ref={secondaryReflectionRef}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 30% 18% at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 65%)",
              pointerEvents: "none",
              willChange: "background",
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
