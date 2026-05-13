"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function Technology() {
  const { language } = useAppContext();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(imageRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 2,
      ease: "power2.out"
    })
    .from(contentRef.current?.children!, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out"
    }, "-=1.5");

    // Simple Parallax
    gsap.to(imageRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const features = [
    { es: "Cirugía Guiada", en: "Guided Surgery" },
    { es: "CAD/CAM / CEREC", en: "CAD/CAM / CEREC" },
    { es: "Scanner Virtuo Vivo", en: "Virtuo Vivo Scanner" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center py-48"
    >
      <div 
        ref={imageRef} 
        className="absolute inset-0 w-full h-full opacity-30"
      >
        <Image 
          src="/media/estetica_digital_02.jpg"
          alt="Advanced Digital Tech"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-16">
        <div className="space-y-6">
          <p className="font-[family-name:var(--font-tenor)] text-[10px] uppercase tracking-[0.5em] text-brand-gold/80">
            {language === 'es' ? "Infraestructura Digital" : "Digital Infrastructure"}
          </p>
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-5xl md:text-8xl text-white tracking-tighter leading-none uppercase">
            {language === 'es' ? "Tecnología sin Compromisos" : "Uncompromising Technology"}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-6">
              <span className="font-[family-name:var(--font-instrument-serif)] text-3xl text-white/90">
                0{i + 1}
              </span>
              <span className="font-[family-name:var(--font-tenor)] text-[10px] text-white/40 uppercase tracking-[0.4em] max-w-[120px]">
                {language === 'es' ? f.es : f.en}
              </span>
            </div>
          ))}
        </div>

        <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-4xl text-white/20 italic font-light max-w-3xl mx-auto">
          {language === 'es' 
            ? "Liderando la era digital de la odontología."
            : "Leading the digital era of dentistry."}
        </p>
      </div>
    </section>
  );
}
