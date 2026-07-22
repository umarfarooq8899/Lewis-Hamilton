"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { primaryStats, narrativeStats, type StatCard } from "./statsConfig";
import { EASE_STANDARD, DURATION_FAST, DURATION_BASE, DURATION_COUNT } from "@/config/tokens";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────
//  SIZE → LAYOUT CLASS MAP
// ─────────────────────────────────────────
const sizeClasses: Record<StatCard["size"], string> = {
  hero:   "col-span-2 row-span-2 sm:col-span-4 lg:col-span-3",
  large:  "col-span-2 row-span-2 sm:col-span-2 lg:col-span-2",
  medium: "col-span-2 sm:col-span-2 lg:col-span-1",
  small:  "col-span-1 sm:col-span-1 lg:col-span-1",
};

// ─────────────────────────────────────────
//  HERO STAT CARD (career wins, matches hero section treatment)
// ─────────────────────────────────────────
function HeroStatCard({ stat }: { stat: StatCard }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const num  = numRef.current;
    if (!card || !num) return;

    // Entrance animation
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: DURATION_BASE, ease: EASE_STANDARD,
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
      }
    );

    // Count-up
    const counter = { val: 0 };
    gsap.to(counter, {
      val: stat.value ?? 0,
      duration: DURATION_COUNT,
      ease: "power2.out",
      delay: 0.3,
      onUpdate: () => { num.textContent = String(Math.round(counter.val)); },
      scrollTrigger: { trigger: card, start: "top 85%", once: true },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.trigger === card && t.kill());
  }, [stat.value]);

  return (
    <div
      ref={cardRef}
      className={`glass-card glass-card--hero stats-card--hero ${sizeClasses.hero} group`}
      style={{ opacity: 0 }}
    >
      {/* Glass highlight rim */}
      <div className="glass-card__highlight" />

      {/* Content */}
      <div className="stats-card__inner">
        <span className="stats-label">{stat.label}</span>
        <div className="stats-number-wrap">
          <span
            ref={numRef}
            className="stats-hero-number"
          >
            0
          </span>
          {stat.suffix && (
            <span className="stats-hero-suffix">{stat.suffix}</span>
          )}
        </div>
        {stat.sublabel && (
          <span className="stats-sublabel">{stat.sublabel}</span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  LARGE STAT CARD (championships)
// ─────────────────────────────────────────
function LargeStatCard({ stat, delay }: { stat: StatCard; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const num  = numRef.current;
    if (!card || !num) return;

    gsap.fromTo(card,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: DURATION_BASE, ease: EASE_STANDARD,
        delay,
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      }
    );

    const counter = { val: 0 };
    gsap.to(counter, {
      val: stat.value ?? 0,
      duration: DURATION_COUNT,
      ease: "power2.out",
      delay: delay + 0.2,
      onUpdate: () => { num.textContent = String(Math.round(counter.val)); },
      scrollTrigger: { trigger: card, start: "top 88%", once: true },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.trigger === card && t.kill());
  }, [stat.value, delay]);

  return (
    <div
      ref={cardRef}
      className={`glass-card stats-card--large ${sizeClasses.large} group`}
      style={{ opacity: 0 }}
    >
      <div className="glass-card__highlight" />
      <div className="stats-card__inner">
        <span className="stats-label">{stat.label}</span>
        <div className="stats-number-wrap">
          <span ref={numRef} className="stats-large-number">0</span>
          {stat.suffix && <span className="stats-large-suffix">{stat.suffix}</span>}
        </div>
        {stat.sublabel && (
          <span className="stats-sublabel stats-sublabel--spaced">{stat.sublabel}</span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  MEDIUM / SMALL COUNTUP CARD
// ─────────────────────────────────────────
function CountupCard({
  stat,
  delay,
}: {
  stat: StatCard;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLSpanElement>(null);

  const isSmall = stat.size === "small";

  useEffect(() => {
    const card = cardRef.current;
    const num  = numRef.current;
    if (!card || !num) return;

    gsap.fromTo(card,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: DURATION_FAST, ease: EASE_STANDARD,
        delay,
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      }
    );

    const counter = { val: 0 };
    gsap.to(counter, {
      val: stat.value ?? 0,
      duration: 1.5,
      ease: "power2.out",
      delay: delay + 0.15,
      onUpdate: () => { num.textContent = String(Math.round(counter.val)); },
      scrollTrigger: { trigger: card, start: "top 90%", once: true },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.trigger === card && t.kill());
  }, [stat.value, delay]);

  return (
    <div
      ref={cardRef}
      className={`glass-card ${isSmall ? "stats-card--small" : "stats-card--medium"} ${sizeClasses[stat.size]} group`}
      style={{ opacity: 0 }}
    >
      <div className="glass-card__highlight" />
      <div className="stats-card__inner">
        <span className="stats-label stats-label--small">{stat.label}</span>
        <div className="stats-number-wrap">
          <span ref={numRef} className={isSmall ? "stats-small-number" : "stats-medium-number"}>0</span>
          {stat.suffix && (
            <span className={isSmall ? "stats-small-suffix" : "stats-medium-suffix"}>{stat.suffix}</span>
          )}
        </div>
        {stat.sublabel && !isSmall && (
          <span className="stats-sublabel stats-sublabel--xs">{stat.sublabel}</span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  NARRATIVE CARD (no number, fade/slide in)
// ─────────────────────────────────────────
function NarrativeCard({ stat, delay }: { stat: StatCard; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card,
      { opacity: 0, x: 20 },
      {
        opacity: 1, x: 0, duration: DURATION_BASE, ease: "power2.out",
        delay,
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.trigger === card && t.kill());
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`glass-card stats-card--narrative ${sizeClasses.medium} group`}
      style={{ opacity: 0 }}
    >
      <div className="glass-card__highlight" />
      {/* Accent top border */}
      <div className="stats-narrative-accent" />
      <div className="stats-card__inner stats-card__inner--narrative">
        <span className="stats-label stats-label--small">{stat.label}</span>
        {stat.badge && (
          <span className="stats-todo-badge">{stat.badge}</span>
        )}
        <p className="stats-narrative-headline">{stat.narrativeHeadline}</p>
        {stat.narrativeBody && (
          <p className="stats-narrative-body">{stat.narrativeBody}</p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  SECTION HEADER
// ─────────────────────────────────────────
function SectionHeader() {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: DURATION_BASE, ease: EASE_STANDARD,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
  }, []);

  return (
    <div ref={headRef} className="stats-section-header" style={{ opacity: 0 }}>
      <span className="stats-section-eyebrow">By The Numbers</span>
      <h2 className="stats-section-title">
        A Career in Stats
      </h2>
      <p className="stats-section-sub">
        Raw numbers that define one of sport&apos;s most decorated careers.
        Figures marked with a badge require verification before publication.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────
//  MAIN EXPORT — StatsDashboard
// ─────────────────────────────────────────
export default function StatsDashboard() {
  // Pull out the hero (wins) and large (champs) cards; rest are medium/small
  const heroCard   = primaryStats.find(s => s.size === "hero")!;
  const largeCard  = primaryStats.find(s => s.size === "large")!;
  const mediumCards = primaryStats.filter(s => s.size === "medium");
  const smallCards  = primaryStats.filter(s => s.size === "small");

  return (
    <section className="stats-section" aria-label="Lewis Hamilton career statistics">
      <div className="stats-container">
        <SectionHeader />

        {/* ── PRIMARY STATS GRID ── */}
        <div className="stats-primary-grid">
          {/* Hero card — career wins */}
          <HeroStatCard stat={heroCard} />

          {/* Large card — championships */}
          <LargeStatCard stat={largeCard} delay={0.1} />

          {/* Medium cards — poles & podiums */}
          {mediumCards.map((s, i) => (
            <CountupCard key={s.id} stat={s} delay={0.12 * (i + 1)} />
          ))}

          {/* Small cards — points, fastest laps, GPs, seasons */}
          {smallCards.map((s, i) => (
            <CountupCard key={s.id} stat={s} delay={0.08 * (i + 1)} />
          ))}
        </div>

        {/* ── COMPARATIVE / NARRATIVE ROW ── */}
        <div className="stats-narrative-header">
          <span className="stats-section-eyebrow">Records &amp; Milestones</span>
          <p className="stats-narrative-intro">
            Beyond the numbers — context that frames the scale of the achievement.
          </p>
        </div>

        <div className="stats-narrative-grid">
          {narrativeStats.map((s, i) => (
            <NarrativeCard key={s.id} stat={s} delay={0.1 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}
