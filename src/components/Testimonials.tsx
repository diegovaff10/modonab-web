"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "@/context/AppContext";

const testimonials = [
  {
    name: "María Fernández",
    textEs: "La atención de la Dra. Laura fue excepcional. Logró diseñar la sonrisa que siempre soñé con una precisión increíble.",
    textEn: "Dr. Laura's care was exceptional. She managed to design the smile I always dreamed of with incredible precision."
  },
  {
    name: "Carlos Ruiz",
    textEs: "El Dr. Gabriel me realizó una cirugía de implantes sin ningún dolor. La tecnología 3D que usan te da muchísima seguridad.",
    textEn: "Dr. Gabriel performed an implant surgery on me without any pain. The 3D technology they use gives you a lot of confidence."
  },
  {
    name: "Ana Gómez",
    textEs: "El mejor consultorio dental de Mendoza. No solo por el lujo de las instalaciones, sino por el nivel humano y profesional de todo el equipo.",
    textEn: "The best dental clinic in Mendoza. Not only for the luxury of the facilities, but for the human and professional level."
  },
  {
    name: "Martín Sosa",
    textEs: "Desde que entré me sentí en buenas manos. Recomiendo totalmente sus cursos y tratamientos estéticos, están a otro nivel.",
    textEn: "From the moment I walked in I felt in good hands. I totally recommend their courses and aesthetic treatments."
  }
];

export default function Testimonials() {
  const { language } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Movimiento atado al scroll (efecto Parallax Horizontal estilo Awwwards)
      const marquees = gsap.utils.toArray(".marquee-track");
      
      marquees.forEach((track: any, i) => {
        const direction = i % 2 === 0 ? -1 : 1; // Fila 1 a la izq, Fila 2 a la der
        
        gsap.fromTo(track, 
          // Estado inicial
          { xPercent: direction === 1 ? -15 : 0 },
          // Animación ligada al scroll
          {
            xPercent: direction === 1 ? 0 : -15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom", // Inicia cuando la sección entra por abajo
              end: "bottom top",   // Termina cuando la sección sale por arriba
              scrub: 1.5           // Scrub suave
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Duplicamos varias veces para asegurar que nunca se acabe el contenido al hacer scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section ref={containerRef} className="w-full py-32 bg-[#1A1A1D] flex flex-col justify-center overflow-hidden relative">
      
      {/* Título de la sección */}
      <div className="px-8 md:px-16 z-10 mb-20 text-center md:text-left">
        <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#F5F5F5]/50 mb-4 block">
          {language === 'es' ? 'Testimonios' : 'Testimonials'}
        </span>
        <h2 className="font-instrument text-[3rem] md:text-[5rem] lg:text-[6rem] text-[#F5F5F5] leading-none tracking-tighter">
          {language === 'es' ? 'Historias de' : 'Stories of'} <br/>
          <span className="italic font-cormorant font-light text-[#FF7F50]">{language === 'es' ? 'Transformación' : 'Transformation'}</span>
        </h2>
      </div>

      {/* Contenedor de Marquee Row 1 */}
      <div className="w-[200vw] md:w-[150vw] mb-8 relative">
        <div className="marquee-track flex gap-8 w-[200%]">
          {duplicatedTestimonials.map((t, i) => (
            <div key={`top-${i}`} className="w-[80vw] md:w-[400px] bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] flex flex-col shrink-0">
              <p className="font-cormorant italic text-xl md:text-2xl text-[#F5F5F5]/90 leading-relaxed mb-6">
                "{language === 'es' ? t.textEs : t.textEn}"
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF7F50]/20 flex items-center justify-center font-instrument text-xl text-[#FF7F50]">
                  {t.name.charAt(0)}
                </div>
                <span className="font-sans text-xs text-[#F5F5F5]/80 uppercase tracking-widest">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor de Marquee Row 2 (Reverse) */}
      <div className="w-[200vw] md:w-[150vw] relative left-[-50vw]">
        <div className="marquee-track flex gap-8 w-[200%]">
          {[...duplicatedTestimonials].reverse().map((t, i) => (
            <div key={`bottom-${i}`} className="w-[80vw] md:w-[400px] bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] flex flex-col shrink-0">
              <p className="font-cormorant italic text-xl md:text-2xl text-[#F5F5F5]/90 leading-relaxed mb-6">
                "{language === 'es' ? t.textEs : t.textEn}"
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF7F50]/20 flex items-center justify-center font-instrument text-xl text-[#FF7F50]">
                  {t.name.charAt(0)}
                </div>
                <span className="font-sans text-xs text-[#F5F5F5]/80 uppercase tracking-widest">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
