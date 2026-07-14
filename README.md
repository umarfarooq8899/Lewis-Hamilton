# Lewis Hamilton Tribute Website — Hero Section

This is a Next.js (App Router) scroll-driven tribute website for Lewis Hamilton. Currently, only the **Hero Section** has been implemented and polished to establish the visual and motion identity.

## Tech Stack & Architecture
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Smooth Scroll**: Lenis (configured globally in `SmoothScroll.tsx`, integrated with the GSAP ticker)
- **Animation**: GSAP (GreenSock Animation Platform) for timeline coordination
- **Performance**: Layer drift and opacity shifts are run exclusively on GPU-accelerated attributes (`transform` & `opacity`) with zero React re-renders during mouse interactions.

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Production Asset Swap Guide

Below is the inventory of placeholder assets currently used in the codebase and instructions on how to swap them for final production assets:

### 1. Helmet Visor Animation (Phase 1 & 2)
- **Current Stand-in**: CSS radial-gradient blob with simulated pointer-tracked glare effect inside [HelmetVisor.tsx](file:///d:/projects/Lewis-Hamilton/src/components/Hero/HelmetVisor.tsx).
- **Target Asset**: A Rive animation file (`helmet_visor.riv`).
- **How to Swap**:
  1. Place the `.riv` asset inside the `/public` folder.
  2. Install `@rive-app/react-canvas` (already in `package.json`).
  3. Replace the placeholder structure in [HelmetVisor.tsx](file:///d:/projects/Lewis-Hamilton/src/components/Hero/HelmetVisor.tsx) with:
     ```tsx
     import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

     // inside the component:
     const { rive, RiveComponent } = useRive({
       src: '/helmet_visor.riv',
       stateMachines: 'State Machine 1',
       autoplay: true,
     });
     ```
  4. Track mouse movement coordinates normalized (0 to 1) and feed them to the Rive input controls (e.g., `mouseX` and `mouseY` inputs) on the state machine inside [Hero.tsx](file:///d:/projects/Lewis-Hamilton/src/components/Hero/Hero.tsx).

### 2. Driver Portrait Parallax (Phase 3)
- **Current Stand-in**: `https://picsum.photos/seed/hamilton/900/1200` loaded with Next.js dynamic image loader, treated with CSS duotone gradients.
- **Target Assets**: Three separate layered image assets to produce a realistic 3D parallax depth:
  - **Background Layer**: Blur/abstract environment (e.g., race track bokeh, team garage lights).
  - **Midground Layer**: Secondary elements (e.g., car silhouette, halo structure).
  - **Foreground Layer**: Main high-contrast portrait of Lewis Hamilton (cut out/isolated, weighted on the left-third).
- **How to Swap**:
  1. Save images as `/public/hero-bg.png`, `/public/hero-mid.png`, and `/public/hero-fg.png` (using transparent PNGs for foreground/midground).
  2. Open [HeroComposition.tsx](file:///d:/projects/Lewis-Hamilton/src/components/Hero/HeroComposition.tsx).
  3. Replace `PLACEHOLDER_IMG` references with their respective paths:
     - Foreground `Image` -> `/hero-fg.png`
     - Midground `Image` -> `/hero-mid.png`
     - Background `Image` -> `/hero-bg.png`
  4. Adjust scale, crop alignments, or blur strengths directly via CSS custom variables/styles in [HeroComposition.tsx](file:///d:/projects/Lewis-Hamilton/src/components/Hero/HeroComposition.tsx).

### 3. Display Font (Serif)
- **Current Stand-in**: `Fraunces` via `next/font/google`.
- **Target Asset**: Editorial high-contrast serif font (e.g., custom web font or licensed serif).
- **How to Swap**:
  - Update imports and configuration in [layout.tsx](file:///d:/projects/Lewis-Hamilton/src/app/layout.tsx) and the CSS custom variable `--font-display` in [globals.css](file:///d:/projects/Lewis-Hamilton/src/app/globals.css).

### 4. UI/Data Font (Grotesk/Mono)
- **Current Stand-in**: `Space Grotesk` and `IBM Plex Mono` via `next/font/google`.
- **Target Asset**: Clean grotesque/neo-grotesque font (e.g., Neue Montreal).
- **How to Swap**:
  - Update imports and configuration in [layout.tsx](file:///d:/projects/Lewis-Hamilton/src/app/layout.tsx) and the CSS custom variables `--font-ui` and `--font-mono` in [globals.css](file:///d:/projects/Lewis-Hamilton/src/app/globals.css).
