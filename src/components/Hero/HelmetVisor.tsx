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
    // Pure touch device check (devices with no mouse/hover capability at all)
    const isPureTouch = window.matchMedia("(pointer: coarse) and (hover: none)").matches;
    if (isPureTouch) {
      isTouchDevice.current = true;
    }

    const visorEl = visorContainerRef.current;
    const heroSection = visorEl?.closest("section") || window;

    const handleMouseMove = (e: Event) => {
      const mouseEvt = e as MouseEvent;
      if (!visorContainerRef.current) return;

      // On actual cursor movement, activate mouse tracking mode
      hasActiveMouse.current = true;
      isTouchDevice.current = false;

      const rect = visorContainerRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Convert cursor position to 0–1 range relative to visor container's bounding box
      const rawX = (mouseEvt.clientX - rect.left) / rect.width;
      const rawY = (mouseEvt.clientY - rect.top) / rect.height;

      // Clamp target to 0..1 range so the light remains contained on the visor faceplate
      targetPos.current.x = Math.max(0, Math.min(1, rawX));
      targetPos.current.y = Math.max(0, Math.min(1, rawY));
    };

    heroSection.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth LERP frame loop (updates CSS custom properties without triggering layout reflow)
    const tick = () => {
      if (isTouchDevice.current || !hasActiveMouse.current) {
        // Mobile / Touch or idle fallback: continuous ambient drift loop
        ambientTime.current += 0.012;
        targetPos.current.x = 0.5 + Math.sin(ambientTime.current * 0.7) * 0.25;
        targetPos.current.y = 0.45 + Math.cos(ambientTime.current * 0.5) * 0.2;
      }

      // Smooth interpolation (0.08 lerp factor)
      const lerpFactor = 0.08;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      const cx = currentPos.current.x;
      const cy = currentPos.current.y;

      // Map 0..1 range to percentage coordinates inside the visor faceplate (15%..85%)
      const ox = (15 + cx * 70).toFixed(2);
      const oy = (15 + cy * 70).toFixed(2);

      const secOx = (25 + cx * 50).toFixed(2);
      const secOy = (20 + cy * 60).toFixed(2);

      if (reflectionRef.current) {
        reflectionRef.current.style.setProperty("--reflection-x", `${ox}%`);
        reflectionRef.current.style.setProperty("--reflection-y", `${oy}%`);
      }

      if (secondaryReflectionRef.current) {
        secondaryReflectionRef.current.style.setProperty("--reflection-x", `${secOx}%`);
        secondaryReflectionRef.current.style.setProperty("--reflection-y", `${secOy}%`);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      heroSection.removeEventListener("mousemove", handleMouseMove);
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
        opacity: 0, // GSAP timeline controls opacity during sequence
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
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse 55% 35% at var(--reflection-x, 50%) var(--reflection-y, 50%), rgba(255,255,255,0.22) 0%, rgba(160,130,255,0.12) 30%, rgba(0,210,255,0.05) 55%, transparent 75%)",
              opacity: 0.95,
              pointerEvents: "none",
              willChange: "background",
            }}
          />

          {/* Secondary subtle sharp sheen layer for depth */}
          <div
            ref={secondaryReflectionRef}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse 35% 20% at var(--reflection-x, 50%) var(--reflection-y, 50%), rgba(255,255,255,0.15) 0%, transparent 65%)",
              opacity: 0.8,
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
