"use client";

import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Services from "@/components/Services";
import Technology from "@/components/Technology";
import Courses from "@/components/Courses";
import Founders from "@/components/Founders";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    // Force scroll to top on reload
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

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
      <Services />
      <Technology />
      <Courses />
      <Founders />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
