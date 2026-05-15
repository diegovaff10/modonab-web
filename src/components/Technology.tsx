"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const techData = [
  {
    title: { es: "Impresiones digitales de iTero", en: "iTero Digital Impressions" },
    img: "/media/estetica_digital_02.jpg"
  },
  {
    title: { es: "Láser Solea", en: "Solea Laser" },
    img: "/media/manifesto_bg.jpg" // placeholders
  },
  {
    title: { es: "Cámara intraoral", en: "Intraoral Camera" },
    img: "/media/hero_video_poster.jpg"
  },
  {
    title: { es: "Imágenes digitales", en: "Digital Imaging" },
    img: "/media/estetica_digital_02.jpg"
  }
];

export default function Technology() {
  const { language } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set iniciales de la Fase 2
      techData.forEach((_, i) => {
        if (i === 0) {
          gsap.set(`.tech-img-${i}`, { autoAlpha: 1, scale: 1 });
          gsap.set(`.tech-label-${i}`, { autoAlpha: 1, height: "auto" });
          gsap.set(`.tech-title-${i}`, { color: "#333", fontSize: "2rem" });
          gsap.set(`.tech-line-${i}`, { width: "30%" });
        } else {
          gsap.set(`.tech-img-${i}`, { autoAlpha: 0, scale: 0.95 });
          gsap.set(`.tech-label-${i}`, { autoAlpha: 0, height: 0 });
          gsap.set(`.tech-title-${i}`, { color: "#AAA", fontSize: "1.2rem" });
          gsap.set(`.tech-line-${i}`, { width: "0%" });
        }
      });

      // Master Timeline que controla ambas fases sin espacios en blanco
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${3000 + techData.length * 1000}`,
          pin: true,
          scrub: 1
        }
      });

      // ==========================================
      // FASE 1: REVEAL (Impulsado por la tecnología)
      // ==========================================
      masterTl.to('.image-panel', { yPercent: -100, duration: 4, ease: "none" }, "step1")
              .to('.bottom-subtitles', { opacity: 0, duration: 1 }, "step1");
      
      masterTl.to('.title-part-1', { top: "35%", duration: 4, ease: "none" }, "step1")
              .to('.title-part-2', { top: "60%", duration: 4, ease: "none" }, "step1");

      masterTl.to({}, { duration: 1.5 }); // Pausa para leer

      // Transición fluida: Los textos se esfuman hacia arriba mientras la lista entra desde abajo
      masterTl.to(['.title-part-1', '.title-part-2'], { yPercent: -100, opacity: 0, duration: 2, ease: "power2.inOut" }, "transition")
              .to('.list-phase', { yPercent: -100, duration: 2, ease: "power2.inOut" }, "transition");

      // ==========================================
      // FASE 2: TECH LIST
      // ==========================================
      techData.forEach((_, i) => {
        if (i === 0) return;
        
        masterTl.to({}, { duration: 0.5 }); // Pausa de lectura
        
        // Sale el anterior
        masterTl.to(`.tech-img-${i-1}`, { autoAlpha: 0, scale: 0.95, duration: 1, ease: "power2.inOut" }, `swap${i}`);
        masterTl.to(`.tech-title-${i-1}`, { color: "#AAA", fontSize: "1.2rem", duration: 1, ease: "power2.inOut" }, `swap${i}`);
        masterTl.to(`.tech-label-${i-1}`, { autoAlpha: 0, height: 0, duration: 1, ease: "power2.inOut" }, `swap${i}`);
        masterTl.to(`.tech-line-${i-1}`, { width: "0%", duration: 1, ease: "power2.inOut" }, `swap${i}`);
        
        // Entra el nuevo
        masterTl.to(`.tech-img-${i}`, { autoAlpha: 1, scale: 1, duration: 1, ease: "power2.inOut" }, `swap${i}`);
        masterTl.to(`.tech-title-${i}`, { color: "#333", fontSize: "2rem", duration: 1, ease: "power2.inOut" }, `swap${i}`);
        masterTl.to(`.tech-label-${i}`, { autoAlpha: 1, height: "auto", duration: 1, ease: "power2.inOut" }, `swap${i}`);
        masterTl.to(`.tech-line-${i}`, { width: "30%", duration: 1, ease: "power2.inOut" }, `swap${i}`);
        
        // Animamos el track de números
        masterTl.to('.tech-number-track', { yPercent: -(100 / techData.length) * i, duration: 1, ease: "power2.inOut" }, `swap${i}`);
      });
      
      masterTl.to({}, { duration: 1 }); // Pausa final antes de soltar el pin
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#EAEAEA] relative overflow-hidden">
      
      {/* =========================================
          CONTENEDOR FASE 1 (Se queda estático, la list-phase le pasa por encima)
          ========================================= */}
      <div className="reveal-phase absolute inset-0 z-10 bg-[#EAEAEA]">
        
        {/* Textos con Mix-Blend Difference */}
        <div className="absolute inset-0 z-30 pointer-events-none mix-blend-difference text-[#e8e8e8]">
          <h2 className="title-part-1 font-instrument text-[3rem] md:text-[6rem] lg:text-[8.5rem] leading-none tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
            {language === 'es' ? 'Impulsado por la tecnología' : 'Driven by technology'}
          </h2>
          
          <div className="title-part-2 absolute top-[100vh] left-1/2 -translate-x-1/2 flex flex-col items-center font-instrument leading-none tracking-tighter whitespace-nowrap">
            <div className="flex items-center gap-4 text-[3rem] md:text-[6rem] lg:text-[8.5rem]">
              <span>{language === 'es' ? 'Odontología' : 'Dentistry'}</span>
              <span className="italic font-light font-cormorant mt-[-2rem] text-[2.5rem] md:text-[5rem] lg:text-[7rem] px-2">
                {language === 'es' ? 'para' : 'for'}
              </span>
              <span>{language === 'es' ? 'excepcionales' : 'exceptional'}</span>
            </div>
            <div className="text-[3rem] md:text-[6rem] lg:text-[8.5rem]">
              {language === 'es' ? 'Resultados' : 'Results'}
            </div>
          </div>
        </div>

        {/* Panel de imagen que sube (z-20) */}
        <div className="image-panel absolute top-0 left-0 w-full h-screen z-20 overflow-hidden bg-black">
          <Image
            src="/media/estetica_digital_02.jpg"
            alt="Technology at Modonab"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
          
          <div className="bottom-subtitles absolute bottom-8 left-0 w-full px-8 md:px-16 flex justify-between items-end text-white/90 font-sans text-[10px] md:text-sm tracking-widest uppercase">
            <div className="flex-1 text-left font-semibold">
              {language === 'es' ? 'Más rápido' : 'Faster'}
            </div>
            <div className="flex-1 text-center flex flex-col gap-1">
              <span className="text-white/60">{language === 'es' ? 'Odontología moderna:' : 'Modern dentistry:'}</span>
              <span className="font-semibold text-white">{language === 'es' ? 'Más inteligente' : 'Smarter'}</span>
            </div>
            <div className="flex-1 text-right font-semibold">
              {language === 'es' ? 'Sin dolor' : 'Pain free'}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          CONTENEDOR FASE 2 (Arranca 100vh abajo y sube empujando lo demás)
          ========================================= */}
      <div className="list-phase absolute top-full left-0 w-full h-screen flex flex-col md:flex-row items-center px-8 md:px-24 bg-[#EAEAEA] z-40">
        
        {/* IZQUIERDA: Numerador */}
        <div className="w-full md:w-1/4 h-24 md:h-full flex items-center justify-start md:justify-center">
          <div className="flex items-end text-[#333]">
            <div className="h-[5rem] md:h-[8rem] overflow-hidden">
              <div className="tech-number-track flex flex-col">
                {techData.map((_, i) => (
                  <div key={i} className="h-[5rem] md:h-[8rem] flex items-center font-instrument text-[4rem] md:text-[7rem] leading-none">
                    0{i+1}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs md:text-sm font-sans text-[#888] ml-2 mb-2 md:mb-6">
              / 0{techData.length}
            </div>
          </div>
        </div>

        {/* CENTRO: Imágenes */}
        <div className="hidden md:flex w-2/4 h-full items-center justify-center relative">
          {techData.map((tech, i) => (
            <div key={i} className={`tech-img-${i} absolute w-[40vw] xl:w-[28vw] aspect-[4/5] overflow-hidden rounded-sm shadow-2xl`}>
              <Image src={tech.img} fill className="object-cover" alt={tech.title.es} />
            </div>
          ))}
        </div>

        {/* DERECHA: Lista interactiva */}
        <div className="w-full md:w-[35%] xl:w-1/4 flex flex-col justify-center gap-0 z-10 md:pl-12">
          {techData.map((tech, i) => (
            <div key={i} className={`tech-item-${i} flex flex-col justify-center py-6 border-b border-[#ccc] relative`}>
              
              <div className={`tech-label-${i} overflow-hidden mb-1`}>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#888]">
                  Tecnología
                </span>
              </div>
              
              <div className="flex items-center justify-between w-full relative">
                <h3 className={`tech-title-${i} font-instrument text-[#333] leading-none whitespace-nowrap pr-8`}>
                  {language === 'es' ? tech.title.es : tech.title.en}
                </h3>
                
                {/* Línea extendida para el item activo */}
                <div className={`tech-line-${i} absolute -right-24 top-1/2 -translate-y-1/2 h-[1px] bg-[#333] hidden xl:block`}></div>
              </div>
              
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
