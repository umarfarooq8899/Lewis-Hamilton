"use client";

import { forwardRef, useEffect, useRef } from "react";

interface Props {
  /** Optional forwarded ref for backwards compatibility */
  highlightRef?: React.RefObject<HTMLDivElement | null>;
}

const HelmetVisor = forwardRef<HTMLDivElement, Props>(function HelmetVisor(
  _props,
  ref
) {
  const visorContainerRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const secondaryReflectionRef = useRef<HTMLDivElement>(null);

  // Animation & position tracking refs (raw refs = 0 React re-renders)
  const targetPos = useRef({ x: 0.5, y: 0.5 });
  const currentPos = useRef({ x: 0.5, y: 0.5 });
  const isTouchDevice = useRef(false);
  const hasActiveMouse = useRef(false);
  const rafId = useRef<number | null>(null);
  const ambientTime = useRef(0);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const touchQuery = window.matchMedia("(pointer: coarse)");
    isTouchDevice.current = touchQuery.matches || "ontouchstart" in window;

    // Scope mouse tracking listener to the hero section container
    const visorEl = visorContainerRef.current;
    const heroSection = visorEl?.closest("section") || window;

    const handleMouseMove = (e: Event) => {
      const mouseEvt = e as MouseEvent;
      if (isTouchDevice.current || !visorContainerRef.current) return;
      hasActiveMouse.current = true;

      const rect = visorContainerRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // 0–1 range relative to visor container's bounding box
      const rawX = (mouseEvt.clientX - rect.left) / rect.width;
      const rawY = (mouseEvt.clientY - rect.top) / rect.height;

      // Allow soft extension past borders (-0.1 to 1.1) for fluid movement near edges
      targetPos.current.x = Math.max(-0.1, Math.min(1.1, rawX));
      targetPos.current.y = Math.max(-0.1, Math.min(1.1, rawY));
    };

    heroSection.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    // Handle touch device state changes dynamically
    const handleTouchChange = (evt: MediaQueryListEvent) => {
      isTouchDevice.current = evt.matches;
    };
    touchQuery.addEventListener("change", handleTouchChange);

    // Smooth LERP frame loop
    const tick = () => {
      if (isTouchDevice.current || !hasActiveMouse.current) {
        // Mobile / Touch or idle fallback: ambient drift loop
        ambientTime.current += 0.014;
        targetPos.current.x = 0.5 + Math.sin(ambientTime.current * 0.7) * 0.22;
        targetPos.current.y = 0.45 + Math.cos(ambientTime.current * 0.5) * 0.18;
      }

      // Smooth interpolation towards target
      const lerpFactor = 0.08;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      const cx = currentPos.current.x;
      const cy = currentPos.current.y;

      // Update CSS custom properties (no layout/reflow triggered)
      if (reflectionRef.current) {
        reflectionRef.current.style.setProperty(
          "--reflection-x",
          `${(cx - 0.5) * 110}%`
        );
        reflectionRef.current.style.setProperty(
          "--reflection-y",
          `${(cy - 0.5) * 90}%`
        );
      }

      if (secondaryReflectionRef.current) {
        secondaryReflectionRef.current.style.setProperty(
          "--reflection-x",
          `${(cx - 0.5) * 60}%`
        );
        secondaryReflectionRef.current.style.setProperty(
          "--reflection-y",
          `${(cy - 0.5) * 50}%`
        );
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      heroSection.removeEventListener("mousemove", handleMouseMove);
      touchQuery.removeEventListener("change", handleTouchChange);
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
        opacity: 0, // GSAP controls this opacity in Phase 1 & 3
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
          {/* Primary soft blurred specular light reflection */}
          <div
            ref={reflectionRef}
            style={{
              position: "absolute",
              inset: "-15%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(150,110,255,0.09) 35%, rgba(0,210,255,0.04) 65%, transparent 85%)",
              filter: "blur(18px)",
              opacity: 0.9,
              pointerEvents: "none",
              willChange: "transform",
              transform:
                "translate3d(var(--reflection-x, 0%), var(--reflection-y, 0%), 0)",
            }}
          />

          {/* Secondary subtle sharp sheen layer for extra realistic depth */}
          <div
            ref={secondaryReflectionRef}
            style={{
              position: "absolute",
              inset: "10%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse 40% 25% at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)",
              filter: "blur(6px)",
              opacity: 0.7,
              pointerEvents: "none",
              willChange: "transform",
              transform:
                "translate3d(var(--reflection-x, 0%), var(--reflection-y, 0%), 0)",
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
