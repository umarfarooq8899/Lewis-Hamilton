export interface Moment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  statNumber: string; // e.g. "1st", "10", "103"
  statLabel: string;
  imagePath: string;  // local path e.g. "/images/moments/moment-01.jpg"
  isLowRes?: boolean; // true = temporary low-res placeholder, needs replacement
}

export interface EraConfig {
  id: string;
  title: string;
  years: string;
  accentColor: string; // e.g. "#FF8000" for McLaren papaya
  bgTint: string;       // subtle hex or rgb/rgba to shift bg toward (e.g. "rgba(255, 128, 0, 0.04)")
  moments: Moment[];
  muted?: boolean;     // desaturated/tonally muted (for Abu Dhabi 2021 and Drought eras)
}
