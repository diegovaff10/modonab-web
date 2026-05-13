"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useAppContext } from "@/context/AppContext";

export default function Manifesto() {
  const { t } = useAppContext();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "chars,words" });

    // Premium Scrubbing: Smooth illumination on pure black
    gsap.fromTo(
      split.chars,
      { 
        opacity: 0.1,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      }
    );

    return () => {
      split.revert();
    };
  }, [t]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-48 md:py-80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full z-20 relative">
        <div className="flex flex-col gap-4 mb-16 items-center md:items-start">
          <span className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-[0.6em] text-brand-gold">
            Manifesto
          </span>
          <div className="w-16 h-[1px] bg-brand-gold/30" />
        </div>

        <h2 
          ref={textRef}
          className="font-[family-name:var(--font-syne)] text-4xl md:text-7xl lg:text-8xl font-extrabold leading-[1] tracking-tighter text-center md:text-left uppercase"
        >
          {t('manifestoMain')} <br />
          <span className="text-brand-gold opacity-90">
            {t('manifestoSecond')}
          </span>
        </h2>
      </div>

      {/* Modern Accents */}
      <div className="absolute right-12 bottom-12 font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-[0.4em] opacity-20 hidden md:block">
        MODONAB — Digital Excellence
      </div>
    </section>
  );
}
