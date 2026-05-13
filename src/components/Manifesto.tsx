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
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "chars,words" });

    // Cinematic Scrubbing: Opacity + Tracking + Blur
    gsap.fromTo(
      split.chars,
      { 
        opacity: 0,
        filter: "blur(8px)",
        letterSpacing: "0.2em",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        letterSpacing: "0em",
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

    // Video Background Parallax & Zoom
    gsap.fromTo(videoRef.current,
      { scale: 1.2, opacity: 0.3 },
      { 
        scale: 1, 
        opacity: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // Soft overlay transition
    gsap.to(overlayRef.current, {
      backgroundColor: "rgba(0,0,0,0.85)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    });

    return () => {
      split.revert();
    };
  }, [t]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[150vh] flex flex-col items-center justify-center bg-[#070707] text-white px-6 py-64 overflow-hidden"
    >
      {/* LUXURY VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          ref={videoRef}
          src="/media/sonrrisa.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3]"
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black/60 z-10 transition-colors" />
      </div>

      {/* LIGHT LEAK EFFECT */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-gold/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-10" />

      <div className="max-w-6xl mx-auto w-full z-20 relative">
        <div className="flex flex-col gap-6 mb-12">
          <span className="font-[family-name:var(--font-tenor)] text-[10px] uppercase tracking-[0.5em] text-brand-gold/60 text-center">
            Filosofía Digital
          </span>
          <div className="w-12 h-[1px] bg-brand-gold/40 mx-auto" />
        </div>

        <h2 
          ref={textRef}
          className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-center balance-text"
        >
          {t('manifestoMain')} <br />
          <span className="font-[family-name:var(--font-cormorant)] italic font-light text-brand-gold/90">
            {t('manifestoSecond')}
          </span>
        </h2>
      </div>

      {/* SIDE IMAGES - INTEGRATED AS ART PIECES */}
      <div className="absolute left-10 bottom-20 w-[15vw] aspect-[4/5] z-20 overflow-hidden border border-white/10 hidden xl:block">
        <Image src="/media/estetica2.jpg" alt="Detail" fill className="object-cover opacity-40 grayscale" />
      </div>
      
      <div className="absolute right-10 top-20 w-[12vw] aspect-[3/4] z-20 overflow-hidden border border-white/10 hidden xl:block">
        <Image src="/media/perfect_smile.png" alt="Smile" fill className="object-cover opacity-40 grayscale" />
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-30">
        <span className="font-[family-name:var(--font-tenor)] text-[9px] uppercase tracking-[0.6em]">Explore</span>
        <div className="w-[1px] h-16 bg-white/20" />
      </div>
    </section>
  );
}
