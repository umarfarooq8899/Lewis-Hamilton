import Hero from "@/components/Hero/Hero";
import TimelineContainer from "@/components/Timeline/TimelineContainer";
import StatsDashboard from "@/components/Stats/StatsDashboard";
import LegacySection from "@/components/Legacy/LegacySection";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <TimelineContainer />
      <StatsDashboard />
      <LegacySection />
    </main>
  );
}
