"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Make the Lenis instance accessible globally for other components
let globalLenis: Lenis | null = null;
export const getLenis = () => globalLenis;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    globalLenis = lenis;
    lenisRef.current = lenis;

    // Sync Lenis RAF with GSAP ticker so ScrollTrigger stays in lock-step
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lagSmoothing so Lenis owns timing
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return <>{children}</>;
}
