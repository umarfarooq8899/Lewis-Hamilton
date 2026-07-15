import { EraConfig } from "./types";

export const erasConfig: EraConfig[] = [
  {
    id: "mclaren",
    title: "McLaren Debut",
    years: "2007 – 2009",
    accentColor: "#FF8000", // McLaren Papaya
    bgTint: "rgba(255, 128, 0, 0.04)",
    moments: [
      {
        id: "mclaren-debut",
        title: "The Arrival",
        subtitle: "2007 Debut Season",
        description: "Lewis Hamilton shocks the motorsport world as a rookie, matching defending 2-time champion teammate Fernando Alonso and staging one of the most stunning debut campaigns in F1 history.",
        statNumber: "9",
        statLabel: "Consecutive podiums from debut",
        imagePath: "/images/low-res/lowres-08.jpg",
        isLowRes: true,
      },
      {
        id: "2008-silverstone",
        title: "Silverstone Rain Masterclass",
        subtitle: "2008 British Grand Prix",
        description: "In torrential rain that spun off seasoned world champions, Hamilton puts on a wet-weather clinic, winning by over 68 seconds—a margin of dominance rarely seen in modern racing history.",
        statNumber: "68",
        statLabel: "Seconds victory margin in rain",
        imagePath: "/images/low-res/lowres-07.jpg",
        isLowRes: true,
      },
      {
        id: "2008-brazil",
        title: "Is That Glock?",
        subtitle: "2008 Title Decider, Interlagos",
        description: "Needing fifth place on the final lap, Hamilton overtakes Timo Glock in the final corner of the final lap in Brazil to secure his maiden World Championship, breaking local hearts and making history.",
        statNumber: "1st",
        statLabel: "World Championship title clinched",
        imagePath: "/images/low-res/lowres-06.jpg",
        isLowRes: true,
      },
    ],
  },
  {
    id: "mercedes",
    title: "Mercedes Dominance",
    years: "2014 – 2020",
    accentColor: "#00A19C", // Mercedes Teal
    bgTint: "rgba(0, 161, 156, 0.04)",
    moments: [
      {
        id: "2014-abu-dhabi",
        title: "The Silver Dawn",
        subtitle: "2014 Abu Dhabi Grand Prix",
        description: "Switching to Mercedes was deemed a gamble, but the hybrid era proves otherwise. Hamilton wins the title-deciding duel under the desert stars to claim his first championship with the Silver Arrows.",
        statNumber: "2nd",
        statLabel: "World Championship title won",
        imagePath: "/images/moments/moment-04.jpg",
      },
      {
        id: "2020-istanbul",
        title: "Equalling the Giant",
        subtitle: "2020 Turkish Grand Prix",
        description: "On a treacherous, slippery surface, Hamilton delivers a masterful drive to win from 6th on the grid, clinching his 7th World Championship to equal Michael Schumacher's record.",
        statNumber: "7",
        statLabel: "World Championship titles total",
        imagePath: "/images/moments/moment-07.jpg",
      },
    ],
  },
  {
    id: "abu-dhabi-2021",
    title: "Abu Dhabi 2021",
    years: "2021",
    accentColor: "#808080", // Muted grey accent
    bgTint: "rgba(128, 128, 128, 0.02)",
    muted: true, // Muted visual styling, minimal accent
    moments: [
      {
        id: "2021-finale",
        title: "The Unravelling",
        subtitle: "2021 Abu Dhabi Finale",
        description: "A controversial safety car restart protocol on the final lap strips Hamilton of an unprecedented 8th title. Hamilton displays dignified restraint under immense emotional weight, defining a career inflection point.",
        statNumber: "58",
        statLabel: "Laps led of the title race",
        imagePath: "/images/moments/moment-02.jpg",
      },
      {
        id: "2021-aftermath",
        title: "Dignified in Defeat",
        subtitle: "Post-Race Grace",
        description: "Despite the massive disappointment under controversial circumstances, Hamilton shows immense class by congratulating Max Verstappen and his team, showing his character on the world stage.",
        statNumber: "8",
        statLabel: "Titles missed by one lap",
        imagePath: "/images/moments/moment-08.jpg",
      },
    ],
  },
  {
    id: "drought",
    title: "The Drought",
    years: "2022 – 2024",
    accentColor: "#7A4FFF", // Lewis purple accent, desaturated context
    bgTint: "rgba(122, 79, 255, 0.02)",
    muted: true, // Quieter visual treatment, desaturated layout
    moments: [
      {
        id: "drought-struggle",
        title: "Wrestling the W13",
        subtitle: "2022 – 2023 Hardship",
        description: "Mercedes struggles with aerodynamic porpoising. Hamilton goes two seasons without a victory, focusing instead on internal team motivation, setups, and engineering problem-solving.",
        statNumber: "0",
        statLabel: "Grand Prix victories in 2022/2023",
        imagePath: "/images/moments/moment-03.jpg",
      },
      {
        id: "2024-silverstone",
        title: "Redemption at Home",
        subtitle: "2024 British Grand Prix",
        description: "After 945 days of waiting, Hamilton holds off challengers in changing conditions to claim an emotional 9th victory at Silverstone, weeping on the team radio in a beautiful release of tension.",
        statNumber: "104",
        statLabel: "Record-extending career wins",
        imagePath: "/images/moments/moment-09.jpg",
      },
    ],
  },
  {
    id: "ferrari",
    title: "The Next Chapter",
    years: "2025 – Present",
    accentColor: "#DC0000", // Ferrari Scuderia Red
    bgTint: "rgba(220, 0, 0, 0.04)",
    moments: [
      {
        id: "ferrari-announcement",
        title: "A Seismic Announcement",
        subtitle: "Ferrari Signing",
        description: "In February 2024, Hamilton shocks the sporting world by announcing he will join Scuderia Ferrari for the 2025 season, ending an historic 11-year run with Mercedes in search of a new legacy.",
        statNumber: "1st",
        statLabel: "F1 Driver contract with Ferrari",
        imagePath: "/images/moments/moment-06.jpg",
      },
      {
        id: "ferrari-transition",
        title: "Maranello Red",
        subtitle: "The Red Suit",
        description: "The most successful driver in Formula 1 history makes a seismic move to the sport's most legendary team, seeking an elusive eighth title under the Scuderia Ferrari banner. The story remains ongoing.",
        statNumber: "8th",
        statLabel: "Quest for the record title",
        imagePath: "/images/moments/moment-12.jpg",
      },
    ],
  },
];
