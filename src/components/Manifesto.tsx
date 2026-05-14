"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function Manifesto() {
  const { t } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current) return;

    // Split text into lines for the "Drop" effect
    const split = new SplitType(textRef.current, { types: "lines" });
    
    // Wrap each line in a container with perspective
    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.perspective = "1000px";
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // 3D Drop Animation
    tl.fromTo(
      split.lines,
      {
        opacity: 0,
        rotateX: -90,
        y: 100,
        scale: 0.8,
        transformOrigin: "top center",
      },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        scale: 1,
        stagger: 0.2,
        ease: "power2.out",
      }
    );

    // Parallax images reveal
    const images = parallaxRef.current?.querySelectorAll(".parallax-img");
    images?.forEach((img, i) => {
      gsap.fromTo(img, 
        { y: 200 * (i + 1), opacity: 0 },
        { 
          y: -100 * (i + 1), 
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    return () => {
      split.revert();
    };
  }, [t]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[150vh] bg-[#050505] text-white flex flex-col items-center justify-center px-6 py-64 overflow-hidden"
    >
      {/* Background Parallax Elements */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <div className="parallax-img absolute top-[20%] left-[10%] w-[15vw] aspect-[3/4] overflow-hidden opacity-0 grayscale">
          <Image src="/media/estetica2.jpg" alt="Detail" fill className="object-cover" />
        </div>
        <div className="parallax-img absolute bottom-[20%] right-[10%] w-[20vw] aspect-[4/5] overflow-hidden opacity-0 grayscale">
          <Image src="/media/perfect_smile.png" alt="Smile" fill className="object-cover" />
        </div>
        <div className="parallax-img absolute top-[40%] right-[20%] w-[10vw] aspect-square overflow-hidden opacity-0 grayscale rounded-full">
          <Image src="/media/estetica_digital_02.jpg" alt="Digital" fill className="object-cover" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full z-10 text-center">
        <p className="font-[family-name:var(--font-tenor)] text-[10px] uppercase tracking-[0.6em] text-brand-gold mb-12 opacity-60">
          Our Vision — Nuestra Visión
        </p>
        
        <h2 
          ref={textRef}
          className="font-[family-name:var(--font-instrument-serif)] text-5xl md:text-8xl leading-[1] tracking-tighter"
        >
          {t('manifestoMain')} <br />
          <span className="font-[family-name:var(--font-cormorant)] italic font-light text-brand-gold/80">
            {t('manifestoSecond')}
          </span>
        </h2>
      </div>

      {/* Modern Scroll Guide */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-20">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </section>
  );
}
