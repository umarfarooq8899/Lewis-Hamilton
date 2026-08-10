// ═══════════════════════════════════════════════════════════════════
//  LEWIS HAMILTON — LEGACY & OFF-TRACK CONFIG
//  src/components/Legacy/legacyConfig.ts
// ═══════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────
//  LEGACY / IMPACT
// ─────────────────────────────────────────

export interface LegacyItem {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  /** Short pull-quote or statement — will render in larger type */
  pullQuote?: string;
}

export const legacyItems: LegacyItem[] = [
  {
    id: "hamilton-commission",
    eyebrow: "Initiative",
    headline: "The Hamilton Commission",
    body:
      "In 2020, Hamilton established the Hamilton Commission — a research initiative examining the under-representation of Black people in UK motorsport. The Commission published its findings in the Accelerating Change report, with recommendations aimed at broadening access to careers in motorsport and STEM.",
    pullQuote:
      "\"We need to open the doors to motorsport for the next generation.\"",
  },
  {
    id: "mission-44",
    eyebrow: "Charitable Foundation",
    headline: "Mission 44",
    body:
      "Hamilton founded Mission 44, a charitable foundation dedicated to supporting young people from underrepresented backgrounds. The foundation focuses on education, employment, and wellbeing, working with schools, charities, and employers across the UK.",
  },
  {
    id: "sustainability",
    eyebrow: "Advocacy",
    headline: "Sustainability & Environmental Advocacy",
    body:
      "Hamilton has been publicly vocal about the environmental impact of Formula 1 and the motorsport industry more broadly — a position that placed him in tension with the sport he competes in. He has discussed his personal shift toward a plant-based diet and spoken about the need for the sport to accelerate its own decarbonisation commitments.",
  },
  {
    id: "blm-advocacy",
    eyebrow: "Civil Rights",
    headline: "Taking a Knee",
    body:
      "At a time when many in motorsport stood silent, Hamilton used his platform consistently and publicly during the 2020 season to advocate for racial justice — taking a knee before races, wearing cause-supporting gear, and speaking in press conferences. His advocacy sparked a broader but contested conversation within F1 about the sport's relationship with race.",
    pullQuote:
      "\"I will not be silenced.\"",
  },
];

// ─────────────────────────────────────────
//  OFF-TRACK
// ─────────────────────────────────────────

export interface OffTrackItem {
  id: string;
  category: "Fashion" | "Music" | "Brand" | "Culture";
  headline: string;
  body: string;
  /** Optional: path to image in /public */
  imageSrc?: string;
  /** Alt text if image is used */
  imageAlt?: string;
  /** Aspect ratio class hint: 'portrait' | 'landscape' | 'square' */
  imageAspect?: "portrait" | "landscape" | "square";
}

export const offTrackItems: OffTrackItem[] = [
  {
    id: "fashion-mets",
    category: "Fashion",
    headline: "A Presence on the Red Carpet",
    body:
      "Hamilton has attended the Met Gala multiple times, becoming one of the few active sportspeople with a genuine presence in the fashion world — not as a guest brand ambassador but as someone invited on creative terms. He has appeared on the covers of fashion publications and collaborated with designers.",
  },
  {
    id: "fashion-tommy",
    category: "Fashion",
    headline: "Tommy Hilfiger Collaboration",
    body:
      "Hamilton's multi-year collaboration with Tommy Hilfiger produced co-designed collections that reflected his personal aesthetic — mixing streetwear references with tailored silhouettes. The partnership was notable for its co-creative rather than purely endorsement-based structure.",
  },
  {
    id: "music",
    category: "Music",
    headline: "XNDA",
    body:
      "Hamilton has made music under the alias XNDA, releasing original tracks and collaborating with artists. The project reflects a longstanding interest in music that predates his public profile in fashion — a creative outlet kept at a deliberate distance from his Formula 1 identity.",
  },
  {
    id: "brand-ventures",
    category: "Brand",
    headline: "Personal Brand & Ownership Interests",
    body:
      "Beyond motorsport, Hamilton has developed business interests across creative industries. He is a co-owner of the Denver Broncos NFL franchise — a significant investment alongside a consortium of owners — and has spoken publicly about a desire to build ownership stakes in sport and entertainment.",
  },
  {
    id: "culture-voice",
    category: "Culture",
    headline: "The Athlete as Cultural Figure",
    body:
      "Hamilton's public persona has evolved into something that sits awkwardly within the traditional sports star framework — part athlete, part activist, part fashion figure, part entrepreneur. That expansion of identity has made him simultaneously more influential and more polarising within F1's more conservative fanbase.",
  },
];
