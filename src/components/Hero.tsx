"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import { useAppContext } from "@/context/AppContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoWrapperRef.current || !titleRef.current) return;

    // Split text for animation
    const titleSplit = new SplitType(titleRef.current, { types: "lines,words,chars" });
    const subtitleSplit = new SplitType(subtitleRef.current!, { types: "lines,words" });

    // Ensure video is initially scaled up for the dramatic zoom out effect
    gsap.set(videoRef.current, { scale: 1.5 });

    // Initial typography state
    gsap.set(titleSplit.chars, { yPercent: 100, opacity: 0 });
    gsap.set(subtitleSplit.words, { yPercent: 100, opacity: 0 });

    // Initial state for alternate scrolling rows
    gsap.set([row2Ref.current, row4Ref.current], { xPercent: -15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1, // Smooth scrub
        anticipatePin: 1,
      },
    });

    // 1. Expand video to full width and zoom out the scale
    tl.to(videoWrapperRef.current, {
      width: "100%",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.inOut",
    }, 0)
      .to(videoRef.current, {
        scale: 1,
        ease: "power2.inOut",
      }, 0);

    // 2. Add an overlay darkness as video expands, to make text pop
    tl.to(videoWrapperRef.current, {
      backgroundColor: "rgba(0,0,0,0.4)",
      ease: "none"
    }, 0.2);

    // 3. Reveal Typography sequentially
    tl.to(titleSplit.chars, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 1,
      ease: "power4.out",
    }, 0.5)
      .to(subtitleSplit.words, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      }, 0.8);

    // 4. Background text parallax rows driven by scroll
    tl.to(row1Ref.current, { xPercent: -15, ease: "none" }, 0)
      .to(row2Ref.current, { xPercent: 15, ease: "none" }, 0)
      .to(row3Ref.current, { xPercent: -15, ease: "none" }, 0)
      .to(row4Ref.current, { xPercent: 15, ease: "none" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      titleSplit.revert();
      subtitleSplit.revert();
    };
  }, [t]); // Re-run if translations change

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* Background Scrolling Rows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] z-0 overflow-hidden pointer-events-none opacity-20 flex flex-col gap-2">
        <div ref={row1Ref} className="flex w-max">
          <span className="font-[family-name:var(--font-syne)] text-[10vw] text-brand-light uppercase whitespace-nowrap leading-none tracking-tighter">
            {t('row1')}
          </span>
        </div>
        <div ref={row2Ref} className="flex w-max">
          <span className="font-[family-name:var(--font-syne)] text-[10vw] text-brand-light uppercase whitespace-nowrap leading-none tracking-tighter">
            {t('row2')}
          </span>
        </div>
        <div ref={row3Ref} className="flex w-max">
          <span className="font-[family-name:var(--font-syne)] text-[10vw] text-brand-light uppercase whitespace-nowrap leading-none tracking-tighter">
            {t('row1')}
          </span>
        </div>
        <div ref={row4Ref} className="flex w-max">
          <span className="font-[family-name:var(--font-syne)] text-[10vw] text-brand-light uppercase whitespace-nowrap leading-none tracking-tighter">
            {t('row2')}
          </span>
        </div>
      </div>

      {/* Video Wrapper starts cropped */}
      <div
        ref={videoWrapperRef}
        className="relative w-[50vw] h-[60vh] overflow-hidden rounded-3xl z-10 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/20 z-10 transition-colors duration-1000"></div>
        <video
          ref={videoRef}
          src="/media/hero_v.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </div>

      {/* Overlay Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mt-24">
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="hero-title font-[family-name:var(--font-syne)] text-[18vw] md:text-[15vw] font-extrabold leading-[0.8] tracking-tighter text-white uppercase mix-blend-difference pointer-events-none">
            {t('heroTitle')}
          </h1>
          
          <div className="hero-description mt-8 md:mt-12 max-w-lg mx-auto md:mx-0">
            <p ref={subtitleRef} className="font-[family-name:var(--font-space-grotesk)] text-lg md:text-xl font-light text-white/80 leading-relaxed uppercase tracking-widest">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-[0.5em] text-white/40">
            {t('scrollDiscover')}
          </span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-gold origin-top animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
