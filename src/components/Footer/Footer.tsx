"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    // Animate the progress line vertical scaling as we scroll into the footer
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 95%",
      end: "bottom 95%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(line, {
          scaleY: self.progress,
          transformOrigin: "top center",
        });
        
        // Trigger the completion dot when we've reached near completion
        if (self.progress > 0.98) {
          setIsComplete(true);
        } else {
          setIsComplete(false);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      className="footer-root"
      aria-label="Site Footer"
    >
      {/* ── Vertical Line Motif End ── */}
      <div className="footer-line-container">
        <div className="footer-line-track">
          <div ref={lineRef} className="footer-line-progress" />
        </div>
        <div className={`footer-line-endpoint ${isComplete ? "is-complete" : ""}`} />
      </div>

      {/* ── Closing Quote ── */}
      <div className="footer-quote-wrap">
        <blockquote className="footer-quote">
          "It's about changing the industry, it's about shifting the narrative, and it's about leaving it in a better state than I found it."
        </blockquote>
        <cite className="footer-quote-author">— Sir Lewis Hamilton</cite>
      </div>

      {/* ── Credits & Info ── */}
      <div className="footer-credits-wrap">
        {/* Fan Disclaimer */}
        <div className="footer-credits-left">
          <span className="footer-section-title">Disclaimer</span>
          <p className="footer-disclaimer">
            This is a non-commercial fan tribute project. It uses Sir Lewis Hamilton's name, likeness, and statistics under fair use for educational and informational purposes. It is not affiliated with, authorized, or endorsed by Sir Lewis Hamilton, his representatives, or Formula 1.
          </p>
        </div>

        {/* Social Links (TODO) */}
        <div className="footer-credits-links">
          <span className="footer-section-title">Connect</span>
          <a
            href="https://twitter.com/LewisHamilton"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-item"
          >
            Twitter / X <span className="footer-todo-tag">TODO: Verify</span>
          </a>
          <a
            href="https://www.instagram.com/lewishamilton/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-item"
          >
            Instagram <span className="footer-todo-tag">TODO: Verify</span>
          </a>
          <a
            href="https://www.lewishamilton.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-item"
          >
            Official Website <span className="footer-todo-tag">TODO: Verify</span>
          </a>
        </div>

        {/* Project Credits */}
        <div className="footer-credits-meta">
          <span className="footer-section-title">Credits</span>
          <p className="footer-meta-item">
            Design &amp; Development Tribute
          </p>
          <p className="footer-meta-item text-neutral-500 text-[11px] font-mono">
            © {new Date().getFullYear()} Fan Tribute Project
          </p>
        </div>
      </div>
    </footer>
  );
}
