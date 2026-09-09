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
    // Only initialize Lenis smooth-scroll on desktop / non-touch devices.
    // Native momentum scrolling on mobile devices is hardware-accelerated and handles touch natively.
    const isMobileOrTouch =
      window.innerWidth < 768 ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;

    if (isMobileOrTouch) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      autoRaf: false,
    });

    globalLenis = lenis;
    lenisRef.current = lenis;

    // Sync Lenis RAF with GSAP ticker so ScrollTrigger stays in lock-step
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    // Disable GSAP's lagSmoothing so Lenis owns timing
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return <>{children}</>;
}
