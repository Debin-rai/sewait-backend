import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import WidgetsGrid from "@/components/home/WidgetsGrid";
import TasksSection from "@/components/home/TasksSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 lg:px-10 py-16">
        <ServicesGrid />
        <WidgetsGrid />
        <div className="mt-8">
          <TasksSection />
        </div>
      </div>
    </div>
  );
}
