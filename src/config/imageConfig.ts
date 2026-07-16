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
  // ── McLaren (3 moments - now mapped to high-quality moments folder images) ──
  "mclaren-debut": {
    path: "/images/moments/mclaren-debut.jpg",
    isLowRes: false,
    width: 736,
    height: 847,
  },
  "2008-silverstone": {
    path: "/images/moments/mclaren-silverstone.jpg",
    isLowRes: false,
    width: 1024,
    height: 1024,
  },
  "2008-brazil": {
    path: "/images/moments/mclaren-brazil.jpg",
    isLowRes: false,
    width: 1024,
    height: 1024,
  },

  // ── Mercedes (5 moments) ──
  "2014-abu-dhabi": {
    path: "/images/moments/moment-04.jpg",
    isLowRes: false,
    width: 736,
    height: 1308,
  },
  "2017-dominance": {
    path: "/images/moments/moment-02.jpg",
    isLowRes: false,
    width: 736,
    height: 1472,
  },
  "2018-pitlane": {
    path: "/images/moments/moment-01.jpg",
    isLowRes: false,
    width: 736,
    height: 1308,
  },
  "2019-podium": {
    path: "/images/moments/moment-10.jpg",
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

  // ── Abu Dhabi 2021 (2 moments - somber and sportsmanship photography) ──
  "2021-finale": {
    path: "/images/moments/abudhabi-somber.jpg",
    isLowRes: false,
    width: 1024,
    height: 1024,
  },
  "2021-aftermath": {
    path: "/images/moments/abudhabi-congratulation.jpg",
    isLowRes: false,
    width: 1024,
    height: 1024,
  },

  // ── The Drought (3 moments) ──
  "drought-struggle": {
    path: "/images/moments/moment-03.jpg",
    isLowRes: false,
    width: 736,
    height: 1472,
  },
  "drought-reflection": {
    path: "/images/moments/moment-14.jpg",
    isLowRes: false,
    width: 736,
    height: 1595,
  },
  "2024-silverstone": {
    path: "/images/moments/moment-09.jpg",
    isLowRes: false,
    width: 736,
    height: 1595,
  },

  // ── Ferrari (3 moments) ──
  "ferrari-announcement": {
    path: "/images/moments/moment-06.jpg",
    isLowRes: false,
    width: 736,
    height: 1472,
  },
  "ferrari-transition": {
    path: "/images/moments/moment-05.jpg",
    isLowRes: false,
    width: 736,
    height: 1308,
  },
  "ferrari-reflection": {
    path: "/images/moments/moment-13.jpg",
    isLowRes: false,
    width: 736,
    height: 1308,
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
