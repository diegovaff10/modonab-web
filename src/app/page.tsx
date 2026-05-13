"use client";

import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";

import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenis = useLenis();
  const { t } = useAppContext();

  useEffect(() => {
    // Stop scrolling while loading
    if (!isLoaded && lenis) {
      lenis.stop();
    } else if (isLoaded && lenis) {
      lenis.start();
    }
  }, [isLoaded, lenis]);

  return (
    <main className="w-full bg-background min-h-[300vh]">
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      
      {/* 
        The Hero section has a ScrollTrigger pin that lasts for 200% of its height.
        The layout uses a 300vh min-height to provide scrollable space to test it out.
      */}
      <Hero />
      
      {/* Subsequent cinematic section to transition out of the hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-brand-light dark:bg-brand-dark text-brand-dark dark:text-brand-light px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-5xl md:text-7xl font-normal text-brand-teal dark:text-brand-gold">
            {t('heroSubtitle')}
          </h2>
          <p className="font-sans text-xl font-light leading-relaxed opacity-80">
            {t('row2')}
          </p>
        </div>
      </section>
    </main>
  );
}
