"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function Courses() {
  const { language } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          pin: true,
          start: "top top",
          end: "+=150%"
        }
      });

      // El título principal sube a la parte superior y se achica un poco, sin desaparecer
      tl.to(".courses-title", {
        y: "-35vh",
        scale: 0.7,
        duration: 1.5,
        ease: "power3.out"
      }, "start");

      // La tarjeta izquierda (Curso 1) entra desde la izquierda
      tl.to(".course-left", {
        xPercent: 100, // Estaba en -100%, la movemos 100% hacia la derecha para que quede en 0
        duration: 1.5,
        ease: "power3.out"
      }, "start");

      // La tarjeta derecha (Curso 2) entra desde la derecha
      tl.to(".course-right", {
        xPercent: -100, // Estaba en 100%, la movemos 100% hacia la izquierda para que quede en 0
        duration: 1.5,
        ease: "power3.out"
      }, "start");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen overflow-hidden bg-[#F5F5F5] relative flex items-center justify-center">
      
      {/* TÍTULO CENTRAL (Estado Inicial) -> Se convierte en Header con mix-blend-difference */}
      <div className="courses-title absolute z-50 flex flex-col items-center text-center px-8 mix-blend-difference pointer-events-none text-[#F5F5F5] w-full">
        <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 md:mb-6">
          {language === 'es' ? 'Educación & Formación' : 'Education & Training'}
        </span>
        <h2 className="font-instrument text-[4rem] md:text-[6rem] lg:text-[9rem] leading-none tracking-tighter">
          {language === 'es' ? 'Nuestros Cursos' : 'Our Courses'}
        </h2>
        <p className="mt-4 md:mt-6 font-cormorant text-xl md:text-2xl italic max-w-2xl font-light">
          {language === 'es' 
            ? 'Compartiendo nuestra experiencia. Elevando el estándar de la odontología.' 
            : 'Sharing our expertise. Elevating the standard of dentistry.'}
        </p>
      </div>

      {/* CURSO 1 (Viene desde la Izquierda) */}
      <div 
        className="course-left absolute left-0 top-0 w-1/2 h-full z-20 flex flex-col justify-end p-8 md:p-16 overflow-hidden"
        style={{ transform: 'translateX(-100%)' }} // Empieza fuera de la pantalla a la izquierda
      >
        <Image src="/media/manifesto_bg.jpg" fill className="object-cover" alt="Curso Odontología Estética" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1D] via-[#1A1A1D]/40 to-transparent" />
        
        <div className="relative z-30 text-[#F5F5F5]">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4 block text-[#F5F5F5]/70">
            {language === 'es' ? 'Curso Intensivo' : 'Intensive Course'}
          </span>
          <h3 className="font-instrument text-[3rem] md:text-[4rem] lg:text-[5rem] leading-none tracking-tighter">
            {language === 'es' ? 'Odontología' : 'Aesthetic'}
            <br />
            <span className="italic font-light font-cormorant">{language === 'es' ? 'Estética' : 'Dentistry'}</span>
          </h3>
          <p className="mt-6 font-sans text-xs md:text-sm max-w-sm text-[#F5F5F5]/80 leading-relaxed">
            {language === 'es' 
              ? 'Descubre las últimas técnicas en odontología estética. Desde la planificación digital hasta la ejecución de tratamientos avanzados en 5 días.' 
              : 'Discover the latest techniques in aesthetic dentistry. From digital planning to the execution of advanced treatments in 5 days.'}
          </p>
          <a href="https://drive.google.com/file/d/1qhUrldOOs7DluFHQmqxuOiYoc_HPBB9M/view?usp=drive_link" target="_blank" rel="noreferrer" className="mt-8 inline-block px-8 py-3 border border-[#F5F5F5]/40 rounded-full font-sans text-[10px] uppercase tracking-widest hover:bg-[#F5F5F5] hover:text-[#1A1A1D] transition-colors">
            {language === 'es' ? 'Ver Presentación' : 'View Presentation'}
          </a>
        </div>
      </div>

      {/* CURSO 2 (Viene desde la Derecha) */}
      <div 
        className="course-right absolute right-0 top-0 w-1/2 h-full z-20 flex flex-col justify-end p-8 md:p-16 overflow-hidden"
        style={{ transform: 'translateX(100%)' }} // Empieza fuera de la pantalla a la derecha
      >
        <Image src="/media/estetica_digital_02.jpg" fill className="object-cover" alt="Curso Cirugía Guiada" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1D] via-[#1A1A1D]/40 to-transparent" />
        
        <div className="relative z-30 text-[#F5F5F5]">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4 block text-[#F5F5F5]/70">
            {language === 'es' ? 'Workshop' : 'Workshop'}
          </span>
          <h3 className="font-instrument text-[3rem] md:text-[4rem] lg:text-[5rem] leading-none tracking-tighter">
            {language === 'es' ? 'Cirugía' : 'Guided'}
            <br />
            <span className="italic font-light font-cormorant">{language === 'es' ? 'Guiada' : 'Surgery'}</span>
          </h3>
          <p className="mt-6 font-sans text-xs md:text-sm max-w-sm text-[#F5F5F5]/80 leading-relaxed">
            {language === 'es' 
              ? 'Aprende a utilizar tecnologías de vanguardia como escáneres dentales, impresoras 3D y software de diseño para resultados precisos.' 
              : 'Learn to use cutting-edge technologies like dental scanners, 3D printers, and design software for precise results.'}
          </p>
          <button className="mt-8 inline-block px-8 py-3 border border-[#F5F5F5]/40 rounded-full font-sans text-[10px] uppercase tracking-widest hover:bg-[#F5F5F5] hover:text-[#1A1A1D] transition-colors">
            {language === 'es' ? 'Próximamente' : 'Coming Soon'}
          </button>
        </div>
      </div>

    </section>
  );
}
