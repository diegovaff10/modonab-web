"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function Manifesto() {
  const { t } = useAppContext();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "chars,words" });

    // Premium Scrubbing: Smooth gradient-like illumination
    gsap.fromTo(
      split.chars,
      { 
        opacity: 0.05,
        filter: "blur(4px)",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 15%",
          scrub: 0.8,
        },
      }
    );

    // Refined Image Reveals: Smooth scale and fade
    const images = [imgLeftRef.current, imgRightRef.current];
    images.forEach((img, i) => {
      gsap.fromTo(img, 
        { 
          y: 60, 
          opacity: 0, 
          scale: 1.1,
        },
        {
          y: 0,
          opacity: 0.5, // Subtle presence
          scale: 1,
          duration: 2.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Slow, surgical parallax
      gsap.to(img, {
        y: i === 0 ? -60 : -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      split.revert();
    };
  }, [t]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 py-48 md:py-80 overflow-hidden"
    >
      {/* FLOATING IMAGES - More Integrated & Subtle */}
      <div 
        ref={imgLeftRef}
        className="absolute left-[5%] top-[15%] w-[18vw] aspect-[4/5] z-0 overflow-hidden rounded-sm hidden lg:block"
      >
        <Image 
          src="/media/estetica2.jpg"
          alt="Precision"
          fill
          className="object-cover grayscale brightness-75"
        />
      </div>

      <div 
        ref={imgRightRef}
        className="absolute right-[8%] bottom-[20%] w-[22vw] aspect-[3/4] z-0 overflow-hidden rounded-sm hidden lg:block"
      >
        <Image 
          src="/media/perfect_smile.png"
          alt="Craftsmanship"
          fill
          className="object-cover grayscale brightness-75"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        <h2 
          ref={textRef}
          className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-center md:text-left balance-text"
        >
          {t('manifestoMain')} <br className="hidden md:block" />
          <span className="font-[family-name:var(--font-cormorant)] italic font-light opacity-80">
            {t('manifestoSecond')}
          </span>
        </h2>
      </div>

      {/* Editorial Marker */}
      <div className="absolute left-12 bottom-12 font-[family-name:var(--font-tenor)] text-[10px] uppercase tracking-[0.4em] opacity-30 hidden md:block">
        Modonab — Sequence 01
      </div>
    </section>
  );
}
