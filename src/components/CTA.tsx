"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "@/context/AppContext";

export default function CTA() {
  const { language } = useAppContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin del CTA principal
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=100%", // Pin duration
        pin: true,
        pinSpacing: true
      });

      // Animación de entrada de texto
      gsap.from(".cta-word", {
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      });

      // Animación del botón: Rodando desde la derecha
      gsap.from(".cta-btn", {
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 70%", // Starts earlier
        },
        x: "50vw",
        rotation: 360,
        opacity: 0,
        duration: 1.0, // Much faster
        ease: "power3.out",
        delay: 0.1 // Less delay
      });

      // Marquesina cruzada que se mueve DURANTE el scroll, incluso en el pin
      gsap.to(".marquee-left", {
        x: "-30vw",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "+=200%", // Sigue animándose durante el pin
          scrub: 1
        }
      });
      gsap.to(".marquee-right", {
        x: "30vw",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "+=200%",
          scrub: 1
        }
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="w-full h-screen bg-[#F5F5F5] flex flex-col justify-between py-12 relative overflow-hidden">
      
      {/* Fondo luminoso y elegante */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-gradient-to-br from-[#ffffff] to-[#EAEAEA] rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF7F50]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-12 md:gap-24 px-8 mx-auto mt-16 md:mt-24">
        
        {/* Lado Izquierdo: Tipografía Gigante */}
        <div className="w-full lg:w-3/5 text-center lg:text-left flex flex-col">
          <div className="overflow-hidden mb-6">
            <span className="cta-word inline-block font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#888]">
              {language === 'es' ? 'El Primer Paso' : 'The First Step'}
            </span>
          </div>
          
          <h2 className="font-instrument text-[4rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] text-[#1A1A1D] leading-[0.9] tracking-tighter flex flex-wrap justify-center lg:justify-start gap-x-4 md:gap-x-6">
            <div className="overflow-hidden"><span className="cta-word inline-block">{language === 'es' ? 'Transforma' : 'Transform'}</span></div>
            <div className="overflow-hidden"><span className="cta-word inline-block">{language === 'es' ? 'tu' : 'your'}</span></div>
            <div className="overflow-hidden"><span className="cta-word inline-block italic font-cormorant font-light text-[#FF7F50]">{language === 'es' ? 'Sonrisa' : 'Smile'}</span></div>
          </h2>

          <div className="overflow-hidden mt-8 md:mt-12">
            <p className="cta-word inline-block font-sans text-sm md:text-base text-[#1A1A1D]/60 max-w-lg leading-relaxed">
              {language === 'es' 
                ? 'Agenda una consulta con nuestros especialistas y descubre cómo la tecnología digital y la experiencia clínica pueden cambiar tu vida.' 
                : 'Book a consultation with our specialists and discover how digital technology and clinical expertise can change your life.'}
            </p>
          </div>
        </div>

        {/* Lado Derecho: Botón Circular Gigante */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <button className="cta-btn group relative w-48 h-48 md:w-64 md:h-64 lg:w-[280px] lg:h-[280px] bg-[#1A1A1D] rounded-full flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105 shadow-[0_20px_50px_rgba(26,26,29,0.2)]">
            <div className="absolute inset-0 bg-[#FF7F50] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />
            
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="font-sans text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] font-medium text-[#F5F5F5] text-center px-4">
                {language === 'es' ? 'Agendar' : 'Book'}
              </span>
              <span className="font-cormorant italic text-xl md:text-2xl text-[#F5F5F5]/80">
                {language === 'es' ? 'Consulta' : 'Consultation'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Guarda / Marquesina Cruzada al fondo del CTA */}
      <div className="w-full flex flex-col gap-2 md:gap-4 mt-auto mb-4 opacity-80 pointer-events-none z-10 relative">
        <div className="w-[200vw] -ml-[20vw] whitespace-nowrap overflow-hidden flex">
          <div className="marquee-left flex gap-8">
             {Array.from({length: 12}).map((_, i) => (
                <span key={`l-${i}`} className="font-instrument text-5xl md:text-6xl lg:text-[6rem] text-[#1A1A1D] uppercase leading-none tracking-tighter">
                  {language === 'es' ? 'ODONTOLOGÍA DE EXCELENCIA' : 'EXCELLENCE IN DENTISTRY'} <span className="text-[#FF7F50] mx-4 md:mx-8">•</span>
                </span>
             ))}
          </div>
        </div>
        <div className="w-[200vw] -ml-[50vw] whitespace-nowrap overflow-hidden flex justify-end">
          <div className="marquee-right flex gap-8">
             {Array.from({length: 12}).map((_, i) => (
                <span key={`r-${i}`} className="font-instrument text-5xl md:text-6xl lg:text-[6rem] text-[#1A1A1D] uppercase leading-none tracking-tighter">
                  {language === 'es' ? 'DISEÑO DE SONRISA AVANZADO' : 'ADVANCED SMILE DESIGN'} <span className="text-[#FF7F50] mx-4 md:mx-8">•</span>
                </span>
             ))}
          </div>
        </div>
      </div>

    </section>
  );
}
