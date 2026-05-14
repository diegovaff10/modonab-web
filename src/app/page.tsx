"use client";

import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Manifesto from "@/components/Manifesto";
import Technology from "@/components/Technology";
import Founders from "@/components/Founders";

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
      <Manifesto />
      <Technology />
    </main>
  );
}
