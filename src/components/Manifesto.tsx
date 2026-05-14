"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function Manifesto() {
  const { t } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const phrases = [
    { main: t('manifestoMain'), second: t('manifestoSecond') },
    { main: "Odontología 100% Digital.", second: "Diseño. Precisión. Vanguardia." },
    { main: "Ingeniería en cada sonrisa.", second: "Precisión milimétrica. Estética perfecta." },
    { main: "Flujo digital total.", second: "La evolución del diseño de sonrisa." },
    { main: "Estética Digital Avanzada.", second: "Donde la tecnología diseña la perfección." },
    { main: "Precisión algorítmica.", second: "Arte clínico." }
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const currentPhrase = phrases[phraseIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !imageWrapperRef.current || !overlayRef.current || !textContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Fase 1: La imagen crece de pequeña a pantalla completa
      tl.to(imageWrapperRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        ease: "power2.inOut",
        duration: 1
      }, 0);

      // Fase 2: El overlay se oscurece cuando la imagen ya casi es completa
      tl.to(overlayRef.current, {
        opacity: 0.7,
        duration: 0.6,
        ease: "none"
      }, 0.6);

      // Fase 3: El texto emerge con efecto de desenfoque
      tl.fromTo(textContainerRef.current, {
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)"
      }, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out"
      }, 0.8);

    }, containerRef);

    return () => ctx.revert();
  }, [t, phraseIndex]);

  return (
    <>
      <button 
        onClick={() => setPhraseIndex((prev) => (prev + 1) % phrases.length)}
        className="fixed bottom-8 right-8 z-50 bg-accent text-paper px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,51,0,0.4)]"
      >
        Cambiar Frase ({phraseIndex + 1}/{phrases.length})
      </button>

      {/* Altura de 300vh para permitir un scroll largo y pausado */}
      <section ref={containerRef} className="relative w-full h-[300vh] bg-black text-paper">
        
        {/* Contenedor pegajoso que se mantiene en pantalla mientras scrolleas los 300vh */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          
          {/* Contenedor de la imagen que se va a expandir */}
          <div 
            ref={imageWrapperRef} 
            className="relative w-[30vw] h-[40vh] md:w-[20vw] md:h-[35vh] overflow-hidden rounded-md z-0 will-change-auto"
          >
            <Image 
              src="/media/clinic_luxury.png" 
              alt="Modonab Clinic" 
              fill 
              className="object-cover" 
              sizes="100vw"
            />
            {/* Capa oscura para dar contraste al texto */}
            <div ref={overlayRef} className="absolute inset-0 bg-ink opacity-0"></div>
          </div>

          {/* Contenedor del texto (es invisible al inicio) */}
          <div ref={textContainerRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-6">
            <p className="font-tenor text-xs md:text-sm uppercase tracking-[0.4em] text-accent mb-10 opacity-70">
              Nuestra Visión
            </p>
            
            <h2 
              key={phraseIndex}
              className="font-instrument text-5xl md:text-7xl lg:text-9xl leading-[1.05] tracking-tight max-w-[90vw] text-center"
            >
              {currentPhrase.main} <br />
              <span className="font-cormorant italic font-light text-accent/90">
                {currentPhrase.second}
              </span>
            </h2>
          </div>

        </div>
      </section>
    </>
  );
}
