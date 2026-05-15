"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "@/context/AppContext";

const statsData = [
  { value: "+15", labelEs: "Años de Experiencia", labelEn: "Years of Experience", size: "w-32 h-32 md:w-40 md:h-40", top: "15%", left: "12%" },
  { value: "+5k", labelEs: "Pacientes Felices", labelEn: "Happy Patients", size: "w-40 h-40 md:w-48 md:h-48", top: "50%", left: "8%" },
  { value: "100%", labelEs: "Tecnología Digital", labelEn: "Digital Technology", size: "w-48 h-48 md:w-56 md:h-56", top: "30%", left: "38%" },
  { value: "2", labelEs: "Directores Clínicos", labelEn: "Clinical Directors", size: "w-24 h-24 md:w-32 md:h-32", top: "68%", left: "65%" },
  { value: "3D", labelEs: "Laboratorio Propio", labelEn: "In-house Lab", size: "w-36 h-36 md:w-44 md:h-44", top: "12%", left: "62%" },
];

export default function Stats() {
  const { language } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // La esfera gigante aparece escalando suavemente
      gsap.from(".big-sphere", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      // Las esferas pequeñas caen rebotando desde arriba
      gsap.from(".stat-sphere", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: -1000, // Caen desde muy arriba
        rotation: 45,
        opacity: 0,
        duration: 2,
        stagger: 0.15,
        ease: "bounce.out" // Efecto de rebote al caer
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-[#1A1A1D] flex flex-col items-center justify-center py-24 md:py-32 relative overflow-hidden">
      
      {/* Fondo estilo iOS con desenfoque extremo */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] bg-[#FF7F50]/15 rounded-full mix-blend-screen filter blur-[150px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] bg-[#FF6B6B]/15 rounded-full mix-blend-screen filter blur-[150px]" />
      </div>

      {/* Título de la sección */}
      <div className="text-center z-10 mb-16 md:mb-24 px-4">
        <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#F5F5F5]/50 mb-4 block">
          {language === 'es' ? 'Nuestra Trayectoria' : 'Our Trajectory'}
        </span>
        <h2 className="font-instrument text-[3rem] md:text-[5rem] lg:text-[6rem] text-[#F5F5F5] leading-none tracking-tighter">
          {language === 'es' ? 'Números que' : 'Numbers that'} <br/>
          <span className="italic font-cormorant font-light text-[#FF7F50]">{language === 'es' ? 'Hablan' : 'Speak'}</span>
        </h2>
      </div>

      {/* Contenedor Esfera Gigante */}
      <div className="big-sphere relative w-[95vw] h-[95vw] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full flex items-center justify-center z-10">
        
        {/* Borde visual de la esfera gigante (Glass) */}
        <div className="absolute inset-0 border border-white/10 rounded-full bg-white/5 backdrop-blur-2xl shadow-[inset_0_-20px_80px_rgba(255,255,255,0.05)]" />

        {/* Esferas de estadísticas (Glass iOS) */}
        {statsData.map((stat, i) => (
          <div 
            key={i} 
            className={`stat-sphere absolute rounded-full bg-white/10 backdrop-blur-[40px] border border-white/20 text-[#F5F5F5] flex flex-col items-center justify-center p-4 md:p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.3)] z-20 ${stat.size}`}
            style={{ top: stat.top, left: stat.left }}
          >
            <span className="font-instrument text-[2rem] md:text-[3rem] lg:text-[4rem] leading-none mb-1 md:mb-2 text-[#F5F5F5] drop-shadow-[0_0_15px_rgba(255,127,80,0.4)]">
              {stat.value}
            </span>
            <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-widest opacity-80 leading-tight">
              {language === 'es' ? stat.labelEs : stat.labelEn}
            </span>
          </div>
        ))}

        {/* Esferas decorativas Coral */}
        <div className="stat-sphere absolute rounded-full bg-gradient-to-tr from-[#FF7F50] to-[#FF6B6B] w-12 h-12 md:w-20 md:h-20 top-[80%] left-[25%] opacity-90 shadow-[0_0_30px_rgba(255,127,80,0.5)] z-10" />
        <div className="stat-sphere absolute rounded-full bg-gradient-to-bl from-[#FF7F50] to-[#FF6B6B] w-16 h-16 md:w-24 md:h-24 top-[20%] left-[85%] opacity-90 shadow-[0_0_30px_rgba(255,127,80,0.5)] z-10" />
        
      </div>
    </section>
  );
}
