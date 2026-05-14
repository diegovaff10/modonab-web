"use client";

import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Manifesto from "@/components/Manifesto";
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
    <main className="w-full bg-background min-h-[150vh]">
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      <Hero />
      <Manifesto />
    </main>
  );
}
