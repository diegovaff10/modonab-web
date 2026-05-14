"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const servicesData = [
  {
    id: "01",
    title: { es: "Estética Dental", en: "Dental Aesthetics" },
    desc: { 
      es: "Diseño de sonrisa digital y carillas de porcelana de ultra precisión.", 
      en: "Digital smile design and ultra-precision porcelain veneers." 
    },
    img: "/media/estetica_digital_02.jpg"
  },
  {
    id: "02",
    title: { es: "Implantología", en: "Implantology" },
    desc: { 
      es: "Sistemas de implantes de titanio y cirugía guiada por ordenador.", 
      en: "Titanium implant systems and computer-guided surgery." 
    },
    img: "/media/clinic_interior.jpg"
  },
  {
    id: "03",
    title: { es: "Ortodoncia Digital", en: "Digital Ortho" },
    desc: { 
      es: "Alineadores transparentes con escáner intraoral 3D para confort absoluto.", 
      en: "Clear aligners with 3D intraoral scanner for absolute comfort." 
    },
    img: "/media/estetica_digital_02.jpg"
  },
  {
    id: "04",
    title: { es: "Periodoncia", en: "Periodontics" },
    desc: { 
      es: "Microcirugía para restaurar la arquitectura natural de tus encías.", 
      en: "Microsurgery to restore the natural architecture of your gums." 
    },
    img: "/media/clinic_interior.jpg"
  }
];

export default function Services() {
  const { language } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.service-item') as HTMLElement[];

      items.forEach((item) => {
        const imgContainer = item.querySelector('.service-img-container');
        const img = item.querySelector('.service-img');
        const textContent = item.querySelector('.service-text');

        // Efecto Parallax Interno de la Imagen
        if (imgContainer && img) {
          gsap.fromTo(img, 
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: imgContainer,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }

        // Fade in suave para los textos al scrollear
        if (textContent) {
          gsap.from(textContent, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%", // cuando el item entra un 25% en pantalla
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-black py-32 md:py-48" ref={containerRef}>
      
      {/* Título de la Sección */}
      <div className="max-w-7xl mx-auto px-6 mb-32 md:mb-48 text-center md:text-left">
        <span className="font-sans text-accent uppercase tracking-[0.3em] text-xs font-bold">
          {language === 'es' ? 'Excelencia Clínica' : 'Clinical Excellence'}
        </span>
        <h2 className="font-instrument text-5xl md:text-8xl text-paper mt-4 leading-none tracking-tighter">
          {language === 'es' ? 'Especialidades' : 'Treatments'}
        </h2>
      </div>

      {/* Lista de Servicios Alternada */}
      <div className="flex flex-col gap-32 md:gap-64 px-6 max-w-7xl mx-auto">
        {servicesData.map((srv, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={srv.id} 
              className={`service-item flex flex-col gap-12 md:gap-24 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Bloque de Imagen */}
              <div className="service-img-container relative w-full md:w-[55%] h-[50vh] md:h-[85vh] overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl">
                <div className="absolute inset-0 bg-ink/20 z-10 mix-blend-multiply"></div>
                <Image 
                  src={srv.img}
                  alt={srv.title.es}
                  fill
                  // Scale up to allow space for the parallax movement (-15 to 15)
                  className="service-img object-cover scale-[1.3]"
                />
              </div>

              {/* Bloque de Texto */}
              <div className="service-text w-full md:w-[45%] flex flex-col justify-center px-4 md:px-12">
                <span className="font-instrument text-6xl md:text-8xl text-accent mb-2 opacity-80">
                  {srv.id}
                </span>
                <h3 className="font-instrument text-4xl md:text-6xl text-paper mb-6 leading-none">
                  {language === 'es' ? srv.title.es : srv.title.en}
                </h3>
                <p className="font-sans font-light text-paper/70 text-lg md:text-xl leading-relaxed mb-10 max-w-md">
                  {language === 'es' ? srv.desc.es : srv.desc.en}
                </p>
                
                <div>
                  <button className="group flex items-center gap-4 text-paper hover:text-accent transition-colors">
                    <span className="font-sans uppercase tracking-[0.2em] text-xs font-bold">
                      {language === 'es' ? 'Ver Detalles' : 'View Details'}
                    </span>
                    <span className="w-12 h-[1px] bg-paper group-hover:bg-accent transition-colors"></span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
