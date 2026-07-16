// ═══════════════════════════════════════════════════════════════════
//  LEWIS HAMILTON — LEGACY & OFF-TRACK CONFIG
//  src/components/Legacy/legacyConfig.ts
// ═══════════════════════════════════════════════════════════════════
//
//  ⚠️  PLACEHOLDER / TODO COPY — VERIFY BEFORE PUBLISHING ⚠️
//  Items marked [TODO] contain placeholder or approximate detail.
//  Verified structural facts (Hamilton Commission exists, BLM
//  advocacy, fashion involvement) are stated plainly; specifics
//  (dates, exact quotes, initiative outcomes) are flagged.
//
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
  /** If true, this item has placeholder copy that needs verification */
  hasPlaceholder?: boolean;
  placeholderNote?: string;
}

export const legacyItems: LegacyItem[] = [
  {
    id: "hamilton-commission",
    eyebrow: "Initiative",
    headline: "The Hamilton Commission",
    body:
      "In 2020, Hamilton established the Hamilton Commission — a research initiative examining the under-representation of Black people in UK motorsport. The Commission published its first report, Accelerating Change, with a set of recommendations aimed at broadening access to careers in motorsport and STEM.",
    pullQuote:
      "\"We need to open the doors to motorsport for the next generation.\"",
    hasPlaceholder: true,
    placeholderNote:
      "TODO: Confirm exact publication date of Accelerating Change report, specific number of recommendations, and any measurable outcomes since launch. Quote above is paraphrased — verify exact wording or replace with confirmed attributed quote.",
  },
  {
    id: "mission-44",
    eyebrow: "Charitable Foundation",
    headline: "Mission 44",
    body:
      "Hamilton founded Mission 44, a charitable foundation dedicated to supporting young people from underrepresented backgrounds. The foundation focuses on education, employment, and wellbeing, working with schools, charities, and employers across the UK.",
    pullQuote: undefined,
    hasPlaceholder: true,
    placeholderNote:
      "TODO: Confirm mission statement, founding year, current scope of programmes, and any headline figures (people reached, grants awarded, partner organisations).",
  },
  {
    id: "sustainability",
    eyebrow: "Advocacy",
    headline: "Sustainability & Environmental Advocacy",
    body:
      "Hamilton has been publicly vocal about the environmental impact of Formula 1 and the motorsport industry more broadly — a position that placed him in tension with the sport he competes in. He has discussed his personal shift toward a plant-based diet and spoken about the need for the sport to accelerate its own decarbonisation commitments.",
    pullQuote: undefined,
    hasPlaceholder: true,
    placeholderNote:
      "TODO: Source specific interviews, speeches, or public statements where Hamilton addresses sustainability or F1's environmental footprint. Avoid attributing specific claims without a verified source.",
  },
  {
    id: "blm-advocacy",
    eyebrow: "Civil Rights",
    headline: "Taking a Knee",
    body:
      "At a time when many in motorsport stood silent, Hamilton used his platform consistently and publicly during the 2020 season to advocate for racial justice — taking a knee before races, wearing cause-supporting gear, and speaking in press conferences. His advocacy sparked a broader but contested conversation within F1 about the sport's relationship with race.",
    pullQuote:
      "\"I will not be silenced.\"",
    hasPlaceholder: true,
    placeholderNote:
      "TODO: Verify the exact quote attribution and source. Confirm whether Hamilton wore a 'Black Lives Matter' T-shirt at specific race events and which races. Review the FIA's formal response, if any.",
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
  hasPlaceholder?: boolean;
  placeholderNote?: string;
}

export const offTrackItems: OffTrackItem[] = [
  {
    id: "fashion-mets",
    category: "Fashion",
    headline: "A Presence on the Red Carpet",
    body:
      "Hamilton has attended the Met Gala multiple times, becoming one of the few active sportspeople with a genuine presence in the fashion world — not as a guest brand ambassador but as someone invited on creative terms. He has appeared on the covers of fashion publications and collaborated with designers.",
    hasPlaceholder: true,
    placeholderNote:
      "TODO: Confirm specific Met Gala years attended, any named designer collaborations, and specific magazine covers — do not publish without verifying. Replace this placeholder with confirmed publication/event names.",
  },
  {
    id: "fashion-tommy",
    category: "Fashion",
    headline: "Tommy Hilfiger Collaboration",
    body:
      "Hamilton's multi-year collaboration with Tommy Hilfiger produced co-designed collections that reflected his personal aesthetic — mixing streetwear references with tailored silhouettes. The partnership was notable for its co-creative rather than purely endorsement-based structure.",
    hasPlaceholder: true,
    placeholderNote:
      "TODO: Confirm exact years of the Tommy Hilfiger collaboration, specific collection names, and the nature of the creative arrangement. Verify whether the collaboration is still active as of publication date.",
  },
  {
    id: "music",
    category: "Music",
    headline: "XNDA",
    body:
      "Hamilton has made music under the alias XNDA, releasing original tracks and collaborating with artists. The project reflects a longstanding interest in music that predates his public profile in fashion — a creative outlet kept at a deliberate distance from his Formula 1 identity.",
    hasPlaceholder: true,
    placeholderNote:
      "TODO: Confirm the XNDA alias is publicly attributed (it has been reported but verify). List any specific tracks or collaborations that are publicly confirmed and sourced.",
  },
  {
    id: "brand-ventures",
    category: "Brand",
    headline: "Personal Brand & Ownership Interests",
    body:
      "Beyond motorsport, Hamilton has developed business interests across creative industries. He is a co-owner of the Denver Broncos NFL franchise — a significant investment alongside a consortium of owners — and has spoken publicly about a desire to build ownership stakes in sport and entertainment.",
    hasPlaceholder: true,
    placeholderNote:
      "TODO: Verify Denver Broncos ownership stake — confirm the exact consortium, the scale of his investment, and current status. List any other confirmed ownership or investment positions.",
  },
  {
    id: "culture-voice",
    category: "Culture",
    headline: "The Athlete as Cultural Figure",
    body:
      "Hamilton's public persona has evolved into something that sits awkwardly within the traditional sports star framework — part athlete, part activist, part fashion figure, part entrepreneur. That expansion of identity has made him simultaneously more influential and more polarising within F1's more conservative fanbase.",
    hasPlaceholder: false,
  },
];
