# Sir Lewis Hamilton — Living Digital Tribute

A high-performance, scroll-driven interactive web experience built to celebrate the career, milestones, and legacy of **Sir Lewis Hamilton**.

Designed with cinematic editorial aesthetics, smooth scroll-linked physics, and GPU-accelerated motion engineering.

---

## Key Features

- **Hero Experience**: 5-phase master animation sequence featuring interactive helmet visor lighting, custom parallax depth composition, and real-time cursor tracking without React re-renders.
- **Interactive Career Timeline**: Multi-era journey covering key career inflection points from his 2007 McLaren debut through his historic Mercedes dominance, 2024 Silverstone victory, and 2025 Ferrari transition. Includes scroll-pinned presentation and desktop background tint interpolation.
- **Living Stats Dashboard**: Animated count-up counters and narrative cards displaying verified career metrics (104 Wins, 7 World Championships, 104 Poles, 201 Podiums, 4,829+ Points).
- **Legacy & Off-Track Section**: Highlighting Hamilton's impact beyond motorsport — including the Hamilton Commission, Mission 44, civil rights advocacy, fashion, music (XNDA), and venture investments.
- **Accessibility & Contrast**: Built with strict WCAG AA contrast standards, dark mode graphite color palettes, and responsive layouts across all device viewports.

---

## Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Design Tokens
- **Animation**: [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform) + `ScrollTrigger`
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) smooth scrolling integrated directly with the GSAP animation ticker
- **Performance Architecture**: High-frequency mouse interactions operate directly on DOM element refs via a single `requestAnimationFrame` loop, bypassing the React render pipeline for 60fps responsiveness.

---

## Project Structure

```
d:\projects\Lewis-Hamilton\
├── public/                # Static assets (moments, hero images, fonts)
├── src/
│   ├── app/
│   │   ├── globals.css    # Central CSS design tokens & glassmorphism utilities
│   │   ├── layout.tsx     # Root layout & Google Fonts integration
│   │   └── page.tsx       # Main page assembling sections
│   ├── components/
│   │   ├── Hero/          # Hero visor, parallax composition, text overlay
│   │   ├── Timeline/      # Scroll-pinned era sections & spine HUD
│   │   ├── Stats/         # Animated count-up dashboard & narrative cards
│   │   ├── Legacy/        # Beyond the Car & Off-Track grid
│   │   └── Footer/        # Footer quotes, disclaimer, & scroll progress motif
│   └── config/
│       ├── tokens.ts      # Design tokens for GSAP & JS consumption
│       └── imageConfig.ts # Central image manifest & low-res fallback metadata
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/umarfarooq8899/Lewis-Hamilton.git
   cd Lewis-Hamilton
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View in browser**: Open [http://localhost:3000](http://localhost:3000).

---

## Production Build

To build the application for production deployment:

```bash
npm run build
npm run start
```

---

## Production Asset Swap Guide

The project utilizes a modular image manifest in [`src/config/imageConfig.ts`](file:///d:/projects/Lewis-Hamilton/src/config/imageConfig.ts).

### 1. Custom Photography & Hero Images
- High-resolution moment photography can be updated directly inside [`src/components/Timeline/config.ts`](file:///d:/projects/Lewis-Hamilton/src/components/Timeline/config.ts) and [`src/config/imageConfig.ts`](file:///d:/projects/Lewis-Hamilton/src/config/imageConfig.ts).

---

## Disclaimer

This is a non-commercial fan tribute project created for educational and design demonstration purposes. It is not affiliated with, authorized, or endorsed by Sir Lewis Hamilton, his representatives, or Formula 1.
