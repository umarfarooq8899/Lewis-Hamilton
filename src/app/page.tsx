import Hero from "@/components/Hero/Hero";
import TimelineContainer from "@/components/Timeline/TimelineContainer";
import StatsDashboard from "@/components/Stats/StatsDashboard";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <TimelineContainer />
      <StatsDashboard />
    </main>
  );
}
