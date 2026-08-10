"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { legacyItems, offTrackItems, type LegacyItem, type OffTrackItem } from "./legacyConfig";
import { EASE_STANDARD, DURATION_BASE, CATEGORY_COLORS } from "@/config/tokens";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────
//  HELPER: fade-in on scroll
// ─────────────────────────────────────────
function useFadeIn(
  ref: React.RefObject<HTMLElement | null>,
  { delay = 0, y = 30, x = 0 }: { delay?: number; y?: number; x?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y, x });
    gsap.to(el, {
      opacity: 1, y: 0, x: 0,
      duration: DURATION_BASE,
      delay,
      ease: EASE_STANDARD,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => ScrollTrigger.getAll().forEach(t => t.trigger === el && t.kill());
  }, [ref, delay, y, x]);
}

// ─────────────────────────────────────────
//  LEGACY ITEM CARD
// ─────────────────────────────────────────
function LegacyCard({ item, index }: { item: LegacyItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useFadeIn(ref as React.RefObject<HTMLElement>, { delay: index * 0.12, y: 24 });

  return (
    <div ref={ref} className="legacy-card" style={{ opacity: 0 }}>
      {/* Left accent line */}
      <div className="legacy-card__line" />

      <div className="legacy-card__content">
        <div className="legacy-card__meta">
          <span className="legacy-eyebrow">{item.eyebrow}</span>
        </div>

        <h3 className="legacy-headline">{item.headline}</h3>

        {item.pullQuote && (
          <blockquote className="legacy-pullquote">{item.pullQuote}</blockquote>
        )}

        <p className="legacy-body">{item.body}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  LEGACY SECTION HEADER
// ─────────────────────────────────────────
function LegacySectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  useFadeIn(ref as React.RefObject<HTMLElement>, { y: 20 });

  return (
    <div ref={ref} className="legacy-section-header" style={{ opacity: 0 }}>
      <span className="legacy-section-eyebrow">Beyond the Car</span>
      <h2 className="legacy-section-title">Legacy & Impact</h2>
      <p className="legacy-section-sub">
        Hamilton&apos;s influence extends well beyond race results. This section covers his
        advocacy work and the initiatives he has built or supported.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────
//  OFF-TRACK CARD
// ─────────────────────────────────────────
function OffTrackCard({
  item,
  index,
}: {
  item: OffTrackItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLarge = index === 0 || index === 4; // first and last span wider

  useFadeIn(ref as React.RefObject<HTMLElement>, {
    delay: (index % 3) * 0.1,
    y: index % 2 === 0 ? 32 : 20,
  });

  const categoryStyle = CATEGORY_COLORS[item.category.toLowerCase() as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.culture;

  return (
    <div
      ref={ref}
      className={`glass-card offtrack-card ${isLarge ? "glass-card--hero offtrack-card--wide" : ""}`}
      style={{ opacity: 0 }}
    >
      <div className="glass-card__highlight" />

      {/* Colour-coded category tag */}
      <span
        className="offtrack-category-tag"
        style={{
          color: categoryStyle.text,
          backgroundColor: categoryStyle.bg,
          borderColor: categoryStyle.border,
        }}
      >
        {item.category}
      </span>

      {/* Decorative gradient fallback when no image is available */}
      {!item.imageSrc && (
        <div className="offtrack-image-fallback" />
      )}

      {item.imageSrc && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio:
              item.imageAspect === "portrait"
                ? "3/4"
                : item.imageAspect === "square"
                ? "1/1"
                : "16/9",
          }}
        >
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? item.headline}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="offtrack-image"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      )}

      <div className="offtrack-card__body">
        <h3 className="offtrack-headline">{item.headline}</h3>
        <p className="offtrack-body">{item.body}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  OFF-TRACK SECTION HEADER
// ─────────────────────────────────────────
function OffTrackSectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  useFadeIn(ref as React.RefObject<HTMLElement>, { y: 20 });

  return (
    <div ref={ref} className="offtrack-section-header" style={{ opacity: 0 }}>
      <span className="offtrack-section-eyebrow">Outside the Paddock</span>
      <h2 className="offtrack-section-title">Off-Track</h2>
      <p className="offtrack-section-sub">
        Fashion, music, personal brand — the parts of Hamilton that have nothing to do with lap times.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────
//  DIVIDER LINE
// ─────────────────────────────────────────
function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  useFadeIn(ref as React.RefObject<HTMLElement>, { y: 0 });
  return (
    <div ref={ref} className="legacy-section-divider" style={{ opacity: 0 }} />
  );
}

// ─────────────────────────────────────────
//  MAIN EXPORT
// ─────────────────────────────────────────
export default function LegacySection() {
  return (
    <div className="legacy-root">
      {/* ── SUB-SECTION 1: LEGACY / IMPACT ── */}
      <section
        className="legacy-section"
        aria-label="Lewis Hamilton legacy and impact"
      >
        <div className="legacy-container">
          <LegacySectionHeader />

          <div className="legacy-cards-stack">
            {legacyItems.map((item, i) => (
              <LegacyCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── SUB-SECTION 2: OFF-TRACK ── */}
      <section
        className="offtrack-section"
        aria-label="Lewis Hamilton off-track interests"
      >
        <div className="offtrack-container">
          <OffTrackSectionHeader />

          <div className="offtrack-grid">
            {offTrackItems.map((item, i) => (
              <OffTrackCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
