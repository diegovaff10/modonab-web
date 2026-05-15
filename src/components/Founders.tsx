"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function Founders() {
  const { language } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animación de los orbes de fondo en color CORAL
      gsap.to(".blob-1", {
        x: "10vw", y: "15vh", duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut"
      });
      gsap.to(".blob-2", {
        x: "-15vw", y: "-10vh", duration: 10, yoyo: true, repeat: -1, ease: "sine.inOut"
      });

      // Timeline del ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", 
          pin: true,
          scrub: 1
        }
      });

      // PANEL 1: Se achica, se hace un poco más transparente y se hunde hacia el fondo
      tl.to(panel1Ref.current, {
        scale: 0.85,
        opacity: 0.4,
        y: "-5vh",
        duration: 1,
        ease: "power1.inOut"
      }, 0);

      // PANEL 2: Sube desde abajo deslizando sobre el panel 1
      tl.fromTo(panel2Ref.current, {
        y: "100vh",
        rotationX: 10,
        opacity: 0
      }, {
        y: "0vh",
        rotationX: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#1A1A1D]">
      
      {/* TÍTULO ANTES DE LOS FUNDADORES */}
      <section className="w-full pt-32 pb-16 flex flex-col items-center justify-center text-center px-8 z-10 relative">
        <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#888] mb-6">
          {language === 'es' ? 'Dirección Clínica' : 'Clinical Direction'}
        </span>
        <h2 className="font-instrument text-[4rem] md:text-[6rem] lg:text-[8rem] text-[#F5F5F5] leading-none tracking-tighter">
          {language === 'es' ? 'Fundadores' : 'Founders'}
        </h2>
        <p className="mt-6 font-cormorant text-2xl text-[#888] italic max-w-2xl font-light">
          {language === 'es' 
            ? 'La visión y experiencia detrás de la excelencia de ModoNab.' 
            : 'The vision and expertise behind ModoNab\'s excellence.'}
        </p>
      </section>

      {/* ÁREA PINNEADA DE FUNDADORES (Glassmorphism) */}
      <section ref={containerRef} className="w-full h-screen relative bg-[#1A1A1D] overflow-hidden flex items-center justify-center perspective-[1000px]">
        
        {/* FONDOS ANIMADOS (Blobs color CORAL) */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="blob-1 absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#FF7F50] rounded-full mix-blend-screen filter blur-[120px] opacity-20" />
          <div className="blob-2 absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#FF6B6B] rounded-full mix-blend-screen filter blur-[150px] opacity-15" />
        </div>

        {/* CONTENEDOR ABSOLUTO PARA CENTRAR LAS TARJETAS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* TARJETA 1: Dra. Laura Bazán (Glass normal) */}
          <div 
            ref={panel1Ref} 
            className="absolute w-[min(calc(100vw-2rem),80rem)] h-[85vh] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl p-6 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 lg:gap-16 items-center origin-center z-10 pointer-events-auto"
          >
            {/* Foto Pequeña */}
            <div className="relative w-full md:w-2/5 h-64 md:h-[90%] lg:h-full rounded-2xl md:rounded-[2rem] overflow-hidden shrink-0 shadow-inner">
              <Image 
                src="/media/equipo_01.jpg" 
                fill 
                className="object-cover" 
                alt="Dra. Laura Bazán" 
              />
            </div>
            
            {/* Contenido */}
            <div className="w-full md:w-3/5 flex flex-col text-[#F5F5F5] h-full justify-center">
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#F5F5F5]/50 mb-4 block">
                {language === 'es' ? 'Fundadora y Directora Clínica' : 'Founder & Clinical Director'}
              </span>
              <h2 className="font-instrument text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-none tracking-tighter mb-8">
                Dra. Laura<br />
                <span className="italic font-cormorant font-light text-[#F5F5F5]/80">Bazán</span>
              </h2>
              
              <div className="font-sans text-xs md:text-sm text-[#F5F5F5]/70 leading-relaxed space-y-4 max-w-xl">
                <p>
                  {language === 'es'
                    ? 'Reconocida por su excelencia y dedicación en el cuidado bucal. Especializada en Cirugía Dentoalveolar, Odontología Estética y Rehabilitadora, ha ampliado su formación en instituciones de renombre internacional, incluyendo estética en Colombia y postgrado en implantología en New York University (NYU).'
                    : 'Recognized for her excellence and dedication to oral care. Specialized in Dentoalveolar Surgery, Aesthetic and Restorative Dentistry, she has expanded her training at internationally renowned institutions, including NYU.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Comparte su experiencia como docente en la cátedra de Odontología Digital de la Universidad de Mendoza. Su compromiso con la innovación se refleja en el uso de tecnologías CAD/CAM y su rol como trainer oficial de Scanner Virtuo Vivo STRAUMANN.'
                    : 'She shares her expertise as a professor of Digital Dentistry at the University of Mendoza. Her commitment to innovation is reflected in her use of CAD/CAM technologies and her role as an official Straumann trainer.'}
                </p>
              </div>
            </div>
          </div>

          {/* TARJETA 2: Dr. Gabriel Naigus (Glass normal, arranca oculta abajo) */}
          <div 
            ref={panel2Ref} 
            className="absolute w-[min(calc(100vw-2rem),80rem)] h-[85vh] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] p-6 md:p-12 lg:p-16 flex flex-col md:flex-row-reverse gap-8 lg:gap-16 items-center z-20 pointer-events-auto"
            style={{ transform: "translateY(100vh)" }}
          >
            {/* Foto Pequeña (Lado Inverso) */}
            <div className="relative w-full md:w-2/5 h-64 md:h-[90%] lg:h-full rounded-2xl md:rounded-[2rem] overflow-hidden shrink-0 shadow-inner">
              <Image 
                src="/media/manifesto_bg.jpg" 
                fill 
                className="object-cover grayscale mix-blend-luminosity opacity-80" 
                alt="Dr. Gabriel Naigus" 
              />
            </div>
            
            {/* Contenido */}
            <div className="w-full md:w-3/5 flex flex-col text-[#F5F5F5] h-full justify-center">
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#F5F5F5]/50 mb-4 block">
                {language === 'es' ? 'Fundador y Director Clínico' : 'Founder & Clinical Director'}
              </span>
              <h2 className="font-instrument text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-none tracking-tighter mb-8">
                Dr. Gabriel<br />
                <span className="italic font-cormorant font-light text-[#F5F5F5]/80">Naigus</span>
              </h2>
              
              <div className="font-sans text-xs md:text-sm text-[#F5F5F5]/70 leading-relaxed space-y-4 max-w-xl">
                <p>
                  {language === 'es'
                    ? 'Con una sólida formación y experiencia, es un profesional destacado en el campo de la periodoncia, la prótesis dentobucomaxilar y la odontología cosmética. Su dedicación a la excelencia incluye especializaciones en Argentina y postgrados en New York University (NYU).'
                    : 'With a solid background and experience, he is a leading professional in the field of periodontics, prosthodontics, and cosmetic dentistry. His dedication includes specializations in Argentina and postgraduates at NYU.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Docente adjunto en la cátedra de periodoncia y titular en odontología digital en la Universidad de Mendoza. Su compromiso con la innovación se evidencia en su uso de tecnología CAD/CAM, impresión 3D, cirugía guiada, y su rol como mentor de CEREC de Dentsply Sirona.'
                    : 'Adjunct professor of periodontics and head of digital dentistry at the University of Mendoza. His commitment to innovation is evidenced by his use of CAD/CAM, 3D printing, and his role as a CEREC mentor.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
