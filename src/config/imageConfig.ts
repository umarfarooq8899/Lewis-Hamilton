/**
 * Central image manifest for the Lewis Hamilton site.
 * Maps every image to its metadata, resolution tier, and placeholder status.
 *
 * LOW-RES images are TEMPORARY stand-ins. Each is flagged with isLowRes: true
 * and should be replaced with licensed high-res imagery as soon as available.
 */

// ─────────────────────────────────────────
// Hero Images (736px wide — all need 2000px+ replacements)
// ─────────────────────────────────────────

export const heroImages = {
  flagCelebration: "/images/hero/hero-flag-celebration.jpg",     // Arms raised, Union Jack flag
  armsCrossed:     "/images/hero/hero-arms-crossed.jpg",         // Arms crossed, BLM helmet
  ferrariHelmet:   "/images/hero/hero-ferrari-helmet.jpg",       // Ferrari suit, gold helmet
  trophySilverstone: "/images/hero/hero-trophy-silverstone.jpg", // Holding Silverstone trophy
  cockpitTopdown:  "/images/hero/hero-cockpit-topdown.jpg",      // Cockpit top-down, #44 helmet
} as const;

/** The selected hero image — "arms raised celebration" composition */
export const HERO_IMAGE = heroImages.flagCelebration;

// ─────────────────────────────────────────
// Moments Images (736px wide, medium-res tier)
// Assigned to eras based on chronological historical accuracy
// ─────────────────────────────────────────

export interface MomentImageEntry {
  path: string;
  isLowRes: boolean;
  width: number;
  height: number;
}

/** Moment images keyed by the moment ID from config.ts */
export const momentImages: Record<string, MomentImageEntry> = {
  // ── McLaren (3 moments - mapped to low-res placeholders since no McLaren images are available yet) ──
  "mclaren-debut": {
    path: "/images/low-res/lowres-08.jpg",
    isLowRes: true,
    width: 736,
    height: 847,
  },
  "2008-silverstone": {
    path: "/images/low-res/lowres-07.jpg",
    isLowRes: true,
    width: 676,
    height: 1200,
  },
  "2008-brazil": {
    path: "/images/low-res/lowres-06.jpg",
    isLowRes: true,
    width: 736,
    height: 920,
  },

  // ── Mercedes (2 moments) ──
  "2014-abu-dhabi": {
    path: "/images/moments/moment-04.jpg",
    isLowRes: false,
    width: 736,
    height: 1308,
  },
  "2020-istanbul": {
    path: "/images/moments/moment-07.jpg",
    isLowRes: false,
    width: 736,
    height: 1593,
  },

  // ── Abu Dhabi 2021 (2 moments) ──
  "2021-finale": {
    path: "/images/moments/moment-02.jpg",
    isLowRes: false,
    width: 736,
    height: 1472,
  },
  "2021-aftermath": {
    path: "/images/moments/moment-08.jpg",
    isLowRes: false,
    width: 736,
    height: 1308,
  },

  // ── The Drought (2 moments) ──
  "drought-struggle": {
    path: "/images/moments/moment-03.jpg",
    isLowRes: false,
    width: 736,
    height: 1472,
  },
  "2024-silverstone": {
    path: "/images/moments/moment-09.jpg",
    isLowRes: false,
    width: 736,
    height: 1595,
  },

  // ── Ferrari (2 moments) ──
  "ferrari-announcement": {
    path: "/images/moments/moment-06.jpg",
    isLowRes: false,
    width: 736,
    height: 1472,
  },
  "ferrari-transition": {
    path: "/images/moments/moment-12.jpg",
    isLowRes: false,
    width: 675,
    height: 1200,
  },
};

// ─────────────────────────────────────────
// Low-Res Placeholder Images
// ─────────────────────────────────────────

export const lowResImages = [
  { path: "/images/low-res/lowres-01.jpg", width: 736, height: 1278 },
  { path: "/images/low-res/lowres-02.jpg", width: 736, height: 1308 },
  { path: "/images/low-res/lowres-03.jpg", width: 735, height: 904 },
  { path: "/images/low-res/lowres-04.jpg", width: 736, height: 1308 },
  { path: "/images/low-res/lowres-05.jpg", width: 736, height: 1308 },
  { path: "/images/low-res/lowres-06.jpg", width: 736, height: 920 },
  { path: "/images/low-res/lowres-07.jpg", width: 676, height: 1200 },
  { path: "/images/low-res/lowres-08.jpg", width: 736, height: 847 },
  { path: "/images/low-res/lowres-09.jpg", width: 736, height: 1595 },
  { path: "/images/low-res/lowres-10.jpg", width: 736, height: 1308 },
] as const;

/**
 * Utility: look up image info for a moment ID.
 * Returns the moment image if available, otherwise null.
 */
export function getMomentImage(momentId: string): MomentImageEntry | null {
  return momentImages[momentId] ?? null;
}
