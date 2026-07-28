// ═══════════════════════════════════════════════════════════════════
//  LEWIS HAMILTON — LIVING STATS DASHBOARD CONFIG
//  src/components/Stats/statsConfig.ts
// ═══════════════════════════════════════════════════════════════════

export type CardSize = "hero" | "large" | "medium" | "small";
export type CardType = "countup" | "narrative";

export interface StatCard {
  id: string;
  type: CardType;
  size: CardSize;
  /** Numeric value for countup cards */
  value?: number;
  /** Suffix appended after the animated number, e.g. "+" or ".5" */
  suffix?: string;
  /** Short top label (e.g. "CAREER WINS") */
  label: string;
  /** Longer supporting description below the value */
  sublabel?: string;
  /** Narrative headline — used for narrative cards instead of a number */
  narrativeHeadline?: string;
  /** Narrative body text */
  narrativeBody?: string;
}

// ─────────────────────────────────────────
//  PRIMARY STATS  (numeric count-up cards)
// ─────────────────────────────────────────
export const primaryStats: StatCard[] = [
  {
    id: "career-wins",
    type: "countup",
    size: "hero",
    value: 104,
    label: "Career Wins",
    sublabel: "Formula 1 race victories, 2007–2024",
  },
  {
    id: "championships",
    type: "countup",
    size: "large",
    value: 7,
    label: "World Championships",
    sublabel: "2008 · 2014 · 2015 · 2017 · 2018 · 2019 · 2020",
  },
  {
    id: "pole-positions",
    type: "countup",
    size: "medium",
    value: 104,
    label: "Pole Positions",
    sublabel: "Grid-leading qualifying laps",
  },
  {
    id: "podiums",
    type: "countup",
    size: "medium",
    value: 201,
    label: "Podium Finishes",
    sublabel: "P1, P2 or P3 race results",
  },
  {
    id: "points-scored",
    type: "countup",
    size: "small",
    value: 4829,
    suffix: "+",
    label: "Points Scored",
    sublabel: "Career championship points",
  },
  {
    id: "fastest-laps",
    type: "countup",
    size: "small",
    value: 67,
    label: "Fastest Laps",
    sublabel: "Fastest lap in race",
  },
  {
    id: "grands-prix-entered",
    type: "countup",
    size: "small",
    value: 353,
    label: "Grands Prix",
    sublabel: "Race starts across full career",
  },
  {
    id: "years-active",
    type: "countup",
    size: "small",
    value: 18,
    label: "Seasons Active",
    sublabel: "2007 – 2024, F1 career span",
  },
];

// ─────────────────────────────────────────
//  COMPARATIVE / NARRATIVE CARDS
// ─────────────────────────────────────────
export const narrativeStats: StatCard[] = [
  {
    id: "youngest-champion",
    type: "narrative",
    size: "medium",
    narrativeHeadline: "Youngest World Champion",
    narrativeBody:
      "When Hamilton won the 2008 title at 23, he became the youngest F1 champion in history at that time — a record later broken by Sebastian Vettel in 2010.",
    label: "Historic Milestone",
  },
  {
    id: "most-poles-record",
    type: "narrative",
    size: "medium",
    narrativeHeadline: "Most Pole Positions in F1 History",
    narrativeBody:
      "Hamilton's pole tally surpassed Ayrton Senna's long-standing record and continued to grow throughout his Mercedes era.",
    label: "All-Time Record",
  },
  {
    id: "first-black-champion",
    type: "narrative",
    size: "medium",
    narrativeHeadline: "First Black F1 World Champion",
    narrativeBody:
      "A landmark in the sport's history — Hamilton broke a barrier that had stood since Formula 1's first season in 1950.",
    label: "Trailblazer",
  },
  {
    id: "most-wins-record",
    type: "narrative",
    size: "medium",
    narrativeHeadline: "Most Race Wins in F1 History",
    narrativeBody:
      "Hamilton holds the outright record for race victories, surpassing Michael Schumacher's previous benchmark of 91 wins in 2020.",
    label: "All-Time Record",
  },
];
