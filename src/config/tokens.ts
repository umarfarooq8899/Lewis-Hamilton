// ═══════════════════════════════════════════════════════════════════
//  DESIGN TOKENS — SINGLE SOURCE OF TRUTH
//  src/config/tokens.ts
// ═══════════════════════════════════════════════════════════════════
//
//  CSS-consumable values (spacing, radius, typography) live in
//  globals.css :root. This file exports values that GSAP and
//  component JS need natively without getComputedStyle overhead.
//
// ═══════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
//  MOTION
// ─────────────────────────────────────────

/** Standard easing for all discrete entrance/exit animations */
export const EASE_STANDARD = "power3.out";

/** Durations (seconds) */
export const DURATION_FAST  = 0.5;
export const DURATION_BASE  = 0.85;
export const DURATION_SLOW  = 1.2;
/** Count-up animations specifically */
export const DURATION_COUNT = 1.8;

/**
 * Scrubbed ScrollTrigger animations use ease "none" and
 * durations tied to scroll distance — not the tokens above.
 */
export const EASE_SCRUB = "none";

// ─────────────────────────────────────────
//  COLORS
// ─────────────────────────────────────────

/** The ONLY background color used site-wide */
export const COLOR_GRAPHITE = "#1C1B18";
export const COLOR_OFFWHITE = "#F2EDE4";
export const COLOR_ACCENT   = "#7A4FFF";

/** Text opacity scale (applied to --color-offwhite) */
export const TEXT_PRIMARY   = 0.75;
export const TEXT_SECONDARY = 0.55;
export const TEXT_TERTIARY  = 0.40;
export const TEXT_DISABLED  = 0.25;

/** Border / subtle-bg opacity scale (applied to --color-offwhite) */
export const BORDER_VISIBLE = 0.08;
export const BORDER_SUBTLE  = 0.05;
export const BORDER_IDLE    = 0.03;

// ─────────────────────────────────────────
//  ERA ACCENT COLORS
//  (moved from hardcoded hex in config.ts)
// ─────────────────────────────────────────

export const ERA_COLORS = {
  mclaren:  "#FF8000",
  mercedes: "#00A19C",
  abuDhabi: "#808080",
  drought:  "#7A4FFF",
  ferrari:  "#DC0000",
} as const;

// ─────────────────────────────────────────
//  OFF-TRACK CATEGORY COLORS
//  (moved from hardcoded hex in LegacySection / globals.css)
// ─────────────────────────────────────────

export const CATEGORY_COLORS = {
  fashion: { text: "rgba(255, 195, 120, 0.85)", bg: "rgba(255, 180, 80, 0.1)",  border: "rgba(255, 180, 80, 0.18)" },
  music:   { text: "rgba(160, 200, 255, 0.85)", bg: "rgba(100, 160, 255, 0.08)", border: "rgba(100, 160, 255, 0.15)" },
  brand:   { text: "rgba(160, 255, 180, 0.75)", bg: "rgba(100, 220, 130, 0.07)", border: "rgba(100, 220, 130, 0.14)" },
  culture: { text: "rgba(200, 160, 255, 0.8)",  bg: "rgba(160, 100, 255, 0.08)", border: "rgba(160, 100, 255, 0.15)" },
} as const;
