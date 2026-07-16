// ═══════════════════════════════════════════════════════════════════
//  LEWIS HAMILTON — LIVING STATS DASHBOARD CONFIG
//  src/components/Stats/statsConfig.ts
// ═══════════════════════════════════════════════════════════════════
//
//  ⚠️  TODO — VERIFY BEFORE PUBLISHING ⚠️
//  The following stat values are placeholders and must be confirmed
//  against authoritative sources (e.g. official F1 records) before
//  going live:
//
//    • careerWins:       103 — confirm exact final tally through 2024
//    • championships:    7   — verified (2008, 2014–2015, 2017–2020)
//    • polePositions:    103 — TODO: confirm exact final count
//    • podiums:          197 — TODO: confirm exact final count
//    • pointsScored:     4639.5 — TODO: confirm exact career total
//    • fastestLaps:      62  — TODO: confirm exact count
//    • grandsPrixEntered: 332 — TODO: confirm exact count
//    • yearsActive:      17  — 2007–2024 = 18 seasons, verify count
//    • youngestChampion: "Age 23, 2008" — record since broken by
//                        Vettel (23) and Verstappen (24); status NOTE
//                        is already flagged in the card text
//    • mostPolesToday:   "103" — TODO: verify whether still the
//                        all-time record at time of publication
//    • consecutivePoles: "8" — TODO: verify exact streak & record context
//    • firstBlackChampion: narrative card — no number to verify
//
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
  /** Optional small badge text (e.g. "TODO: verify") */
  badge?: string;
}

// ─────────────────────────────────────────
//  PRIMARY STATS  (numeric count-up cards)
// ─────────────────────────────────────────
export const primaryStats: StatCard[] = [
  {
    id: "career-wins",
    type: "countup",
    size: "hero",
    // TODO: confirm exact final career win tally through end of 2024 season
    value: 103,
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
    // TODO: confirm exact pole position count through end of 2024 season
    value: 103,
    label: "Pole Positions",
    sublabel: "Grid-leading qualifying laps",
  },
  {
    id: "podiums",
    type: "countup",
    size: "medium",
    // TODO: confirm exact podium count through end of 2024 season
    value: 197,
    label: "Podium Finishes",
    sublabel: "P1, P2 or P3 race results",
  },
  {
    id: "points-scored",
    type: "countup",
    size: "small",
    // TODO: confirm exact career points total through end of 2024 season
    value: 4639,
    suffix: "+",
    label: "Points Scored",
    sublabel: "Career championship points",
  },
  {
    id: "fastest-laps",
    type: "countup",
    size: "small",
    // TODO: confirm exact fastest lap count through end of 2024 season
    value: 62,
    label: "Fastest Laps",
    sublabel: "Fastest lap in race",
  },
  {
    id: "grands-prix-entered",
    type: "countup",
    size: "small",
    // TODO: confirm exact Grands Prix entered count through end of 2024 season
    value: 332,
    label: "Grands Prix",
    sublabel: "Race starts across full career",
  },
  {
    id: "years-active",
    type: "countup",
    size: "small",
    // Seasons: 2007 through 2024 = 18 seasons.
    // TODO: verify whether "years active" is counted as 17 or 18 before publishing
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
      "When Hamilton won the 2008 title at 23, he became the youngest F1 champion in history at that time. (Note: this record has since been broken — verify current record-holder before publishing.)",
    badge: "TODO: verify current status",
    label: "Historic Milestone",
  },
  {
    id: "most-poles-record",
    type: "narrative",
    size: "medium",
    narrativeHeadline: "Most Pole Positions in F1 History",
    narrativeBody:
      "Hamilton's pole tally surpassed Ayrton Senna's long-standing record and continued to grow throughout his Mercedes era.",
    badge: "TODO: verify still current record",
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
    badge: "TODO: verify still current record",
    label: "All-Time Record",
  },
];
