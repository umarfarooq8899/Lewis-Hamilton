import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lewis Hamilton — Seven-Time World Champion",
  description:
    "A scroll-driven tribute to Lewis Hamilton, Formula 1's most decorated driver. 105 wins, 7 world championships.",
  keywords: ["Lewis Hamilton", "Formula 1", "F1", "World Champion", "tribute"],
  openGraph: {
    title: "Lewis Hamilton — Seven-Time World Champion",
    description:
      "A scroll-driven tribute to Lewis Hamilton, Formula 1's most decorated driver.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
