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

    // Scrubbing animation: Faster and more responsive
    gsap.fromTo(
      split.chars,
      { 
        opacity: 0.1,
        color: "rgba(128,128,128,0.2)" 
      },
      {
        opacity: 1,
        color: "var(--foreground)",
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Starts earlier
          end: "top 20%",   // Finishes faster
          scrub: 0.5,
        },
      }
    );

    // Floating images reveal and parallax
    [imgLeftRef.current, imgRightRef.current].forEach((img, i) => {
      gsap.fromTo(img, 
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.8,
          clipPath: "inset(100% 0% 0% 0%)"
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax for the images
      gsap.to(img, {
        y: i === 0 ? -100 : -150,
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
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 py-32 md:py-64 overflow-hidden"
    >
      {/* FLOATING IMAGES */}
      <div 
        ref={imgLeftRef}
        className="absolute left-[-5%] top-[20%] w-[20vw] aspect-[3/4] z-0 opacity-40 hidden lg:block"
      >
        <Image 
          src="/media/estetica2.jpg"
          alt="Dental Detail"
          fill
          className="object-cover grayscale"
        />
      </div>

      <div 
        ref={imgRightRef}
        className="absolute right-[-2%] bottom-[15%] w-[25vw] aspect-[4/5] z-0 opacity-40 hidden lg:block"
      >
        <Image 
          src="/media/perfect_smile.png"
          alt="Smile Perfect"
          fill
          className="object-cover grayscale"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <h2 
          ref={textRef}
          className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-center md:text-left"
        >
          {t('manifestoMain')} {t('manifestoSecond')}
        </h2>
      </div>

      {/* Subtle visual guide */}
      <div className="absolute left-1/2 bottom-12 -translate-x-1/2 w-[1px] h-24 bg-foreground/10" />
    </section>
  );
}
