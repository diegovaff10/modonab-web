"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "@/context/AppContext";

export default function Manifesto() {
  const { language } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current && textRef.current) {
      // Efecto de aparición
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );

      // El Pin para hacer la "pausa"
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", // Se queda enganchado por el equivalente a una pantalla
        pin: true,
        pinSpacing: true, // Deja el espacio para que respire
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black text-paper flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center h-full">
        <p className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-accent mb-8 opacity-80">
          {language === 'es' ? 'Nuestra Visión' : 'Our Vision'}
        </p>
        
        <h2 
          ref={textRef}
          className="font-instrument text-4xl md:text-6xl lg:text-8xl leading-[1.1] tracking-tight"
        >
          {language === 'es' ? (
            <>
              Con décadas de experiencia combinada, nuestro objetivo es brindar cuidado estético y dental de 
              <span className="font-cormorant italic text-accent"> clase mundial </span> 
              a través de técnicas avanzadas y un servicio a medida.
            </>
          ) : (
            <>
              With decades of combined experience, our goal is to deliver 
              <span className="font-cormorant italic text-accent"> world-class </span> 
              dental and aesthetic care through advanced techniques and a bespoke level of service.
            </>
          )}
        </h2>
      </div>
    </section>
  );
}
