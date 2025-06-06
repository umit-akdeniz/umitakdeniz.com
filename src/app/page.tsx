import { Hero } from "@/components/sections/hero";
import { SpinningBox } from "@/components/3d/spinning-box";
import { Suspense } from "react";
import { TechStack } from "@/components/sections/tech-stack";
import { FeaturedProjects } from "@/components/sections/featured-projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechStack />
      <FeaturedProjects />
      
      <section className="container text-center py-20 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          İnteraktif 3D Deneyimi
        </h2>
        <Suspense fallback={<div className="h-[400px] w-full bg-secondary rounded-lg animate-pulse" />}>
          <SpinningBox />
        </Suspense>
      </section>
      
      <div className="h-40"></div> {/* Geçici boşluk */}
    </>
  );
}