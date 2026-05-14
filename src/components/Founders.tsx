"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function Founders() {
  const { language } = useAppContext();
  const sectionRef = useRef<HTMLDivElement>(null);

  const doctors = [
    {
      name: "Dra. Laura Bazán",
      title: language === 'es' ? "Fundadora y Experta en Estética" : "Founder & Aesthetics Expert",
      image: "/media/dra. laura bazan.avif",
      bio: language === 'es'
        ? "Especializada en Cirugía Dentoalveolar y Odontología Estética. Trainer oficial de Scanner Virtuo Vivo STRAUMANN y docente de Odontología Digital en la Universidad de Mendoza."
        : "Specialized in Dentoalveolar Surgery and Aesthetic Dentistry. Official Scanner Virtuo Vivo STRAUMANN trainer and Digital Dentistry professor at Universidad de Mendoza."
    },
    {
      name: "Dr. Gabriel Naigus",
      title: language === 'es' ? "Fundador y Especialista en Periodoncia" : "Founder & Periodontics Specialist",
      image: "/media/dr. gabriel naigus.avif",
      bio: language === 'es'
        ? "Especialista en Periodoncia y Prótesis Dentobucomaxilar (UBA). Mentor de CEREC Dentsply Sirona y titular de Odontología Digital."
        : "Specialist in Periodontics and Prosthodontics (UBA). CEREC Dentsply Sirona Mentor and Head of Digital Dentistry."
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray(".doctor-card").forEach((card: any) => {
        const imgContainer = card.querySelector(".img-container");
        const info = card.querySelector(".doctor-info");

        gsap.fromTo(imgContainer,
          { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          }
        );

        gsap.from(info.children, {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
          }
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-32 px-6 md:px-12 lg:px-24 border-t border-foreground/5"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-6xl mb-32 text-center md:text-left leading-none">
          {language === 'es' ? "Los Maestros Detrás de MODONAB" : "The Masters Behind MODONAB"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-16">
          {doctors.map((doc, idx) => (
            <div key={idx} className="doctor-card flex flex-col gap-10">
              <div className="img-container relative aspect-[3/4] w-full overflow-hidden bg-foreground/5">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
              </div>

              <div className="doctor-info space-y-6">
                <div>
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl mb-2">
                    {doc.name}
                  </h3>
                  <p className="font-[family-name:var(--font-tenor)] text-[10px] uppercase tracking-[0.3em] text-brand-gold">
                    {doc.title}
                  </p>
                </div>
                <p className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl font-light leading-relaxed text-foreground/70 max-w-lg">
                  {doc.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
