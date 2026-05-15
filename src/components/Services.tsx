import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

gsap.registerPlugin(ScrollTrigger);

const TextFill = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} className="relative inline-block mr-[0.25em]">
          <span className="absolute top-0 left-0 w-full h-full text-[#333333] teleprompter-char" style={{ color: "transparent" }}>
            {word}
          </span>
          <span className="text-[#c0c0c0]">
            {word}
          </span>
        </span>
      ))}
    </>
  );
};

const servicesData = [
  {
    title: { es: "Odontología Estética", en: "Aesthetic Dentistry" },
    desc: { es: "Diseño de sonrisas de alta gama utilizando carillas de porcelana ultrafinas y blanqueamiento clínico para resultados naturales.", en: "High-end smile design using ultra-thin porcelain veneers and clinical whitening for natural results." },
    img: "/media/perfect_smile.png",
    list: [
      { es: "Carillas de Porcelana", en: "Porcelain Veneers" },
      { es: "Diseño de Sonrisa 3D", en: "3D Smile Design" },
      { es: "Blanqueamiento Láser", en: "Laser Whitening" }
    ]
  },
  {
    title: { es: "Cirugía Guiada", en: "Guided Surgery" },
    desc: { es: "Implantes dentales colocados con precisión milimétrica mediante planificación 3D y tecnología robótica.", en: "Dental implants placed with pinpoint accuracy using 3D planning and robotic technology." },
    img: "/media/clinic_luxury.png",
    list: [
      { es: "Implantes de Carga Inmediata", en: "Immediate Load Implants" },
      { es: "Elevación de Seno Maxilar", en: "Sinus Lift" },
      { es: "Regeneración Ósea", en: "Bone Regeneration" }
    ]
  },
  {
    title: { es: "Odontología Digital", en: "Digital Dentistry" },
    desc: { es: "Restauraciones en una sola visita y escáneres intraorales que eliminan la necesidad de impresiones tradicionales.", en: "Single-visit restorations and intraoral scanners that eliminate the need for traditional impressions." },
    img: "/media/tech_macro.png",
    list: [
      { es: "Coronas CEREC (1 Visita)", en: "CEREC Crowns (1 Visit)" },
      { es: "Alineadores Invisibles", en: "Invisible Aligners" },
      { es: "Impresión 3D Dental", en: "Dental 3D Printing" }
    ]
  },
  {
    title: { es: "Periodoncia Experta", en: "Expert Periodontics" },
    desc: { es: "Tratamientos especializados para la salud de las encías, asegurando una base sólida para todas las restauraciones.", en: "Specialized treatments for gum health, ensuring a solid foundation for all restorations." },
    img: "/media/dental_tools.png",
    list: [
      { es: "Tratamiento Periodontal", en: "Periodontal Treatment" },
      { es: "Injertos de Encía", en: "Gum Grafts" },
      { es: "Prevención Avanzada", en: "Advanced Prevention" }
    ]
  }
];

export default function Services() {
  const { language } = useAppContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const stickySectionRef = useRef<HTMLDivElement>(null);

  // Capas
  const lightBgRef = useRef<HTMLDivElement>(null);
  const darkBgRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const lightTextTopRef = useRef<HTMLDivElement>(null);
  const lightTextBottomLeftRef = useRef<HTMLDivElement>(null);
  const lightTextBottomRightRef = useRef<HTMLDivElement>(null);

  // Elementos oscuros
  const rightContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Obtener los elementos DOM vivos
      const bgImgs = gsap.utils.toArray('.bg-img-slide');
      const serviceGroups = gsap.utils.toArray('.service-group-slide');

      // Estado inicial de las diapositivas de servicios (ocultas salvo la primera)
      gsap.set(serviceGroups[0] as Element, { autoAlpha: 1 });
      gsap.set('.stagger-item-0', { autoAlpha: 1, y: 0 });
      gsap.set(bgImgs[0] as Element, { autoAlpha: 1, scale: 1 });
      gsap.set('.giant-char-0', { yPercent: 0 });

      for (let i = 1; i < servicesData.length; i++) {
        gsap.set(serviceGroups[i] as Element, { autoAlpha: 0 });
        gsap.set(`.stagger-item-${i}`, { autoAlpha: 0, y: 50 });
        gsap.set(bgImgs[i] as Element, { autoAlpha: 1, top: "100%", scale: 1 });
        gsap.set(`.giant-char-${i}`, { yPercent: 120 });
      }

      const mm = gsap.matchMedia();

      // ============================================
      // TIMELINE DESKTOP
      // ============================================
      mm.add("(min-width: 768px)", () => {
        gsap.set(imageContainerRef.current, { width: "22vw", height: "30vw", left: "12vw", top: "15vh", opacity: 1 });
        gsap.set(darkBgRef.current, { top: "100vh" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: stickySectionRef.current, start: "top top", end: "+=10000", pin: true, scrub: 1 }
        });

        // FASE 1: Textos del manifiesto suben, imagen baja y crece ligeramente
        tl.to([lightTextTopRef.current, lightTextBottomLeftRef.current, lightTextBottomRightRef.current], { y: -500, duration: 4, ease: "none" }, "phase1")
          .to(".teleprompter-char", { color: "#333333", duration: 0.5, stagger: 0.15, ease: "power1.inOut" }, "phase1")
          .to(imageContainerRef.current, { top: "25vh", width: "26vw", height: "35vw", duration: 4, ease: "none" }, "phase1");

        // FASE 2: Entra el fondo oscuro desde abajo
        tl.add("phase2", "phase1+=4")
          .to(darkBgRef.current, { top: "0vh", duration: 3, ease: "power2.inOut" }, "phase2")
          .to(imageContainerRef.current, { top: "0vh", left: "0vw", width: "50vw", height: "100vh", opacity: 1, duration: 3, ease: "power2.inOut" }, "phase2");

        // FASE 4: Aparecen los primeros textos del servicio derecho
        tl.to(rightContainerRef.current, { opacity: 1, duration: 1.5 }, "-=0.5");

        // FASE 5: Secuencia de los servicios
        gsap.set(serviceGroups[0] as Element, { autoAlpha: 1, y: 0 });
        gsap.set(bgImgs[0] as Element, { autoAlpha: 1 });
        servicesData.forEach((_, i) => {
          if (i === 0) return;
          gsap.set(serviceGroups[i] as Element, { autoAlpha: 0, y: 30 });
          gsap.set(bgImgs[i] as Element, { top: "100%" });
        });

        servicesData.forEach((_, i) => {
          if (i === 0) return;
          tl.to({}, { duration: 0.5 }); // Pausa muy breve para lectura

          // El texto desaparece al instante de scrollear y las letras viejas caen
          tl.to(serviceGroups[i - 1] as Element, { autoAlpha: 0, duration: 1.5 }, `swap${i}`);
          tl.to(`.stagger-item-${i - 1}`, { y: -30, duration: 1.5, ease: "power2.in" }, `swap${i}`);
          tl.to(`.giant-char-${i - 1}`, { yPercent: 120, stagger: 0.02, duration: 1, ease: "power2.in" }, `swap${i}`);

          // Entra el nuevo
          tl.to(serviceGroups[i] as Element, { autoAlpha: 1, duration: 2.5 }, `swap${i}+=1.5`);
          tl.to(`.stagger-item-${i}`, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 2, ease: "power2.out" }, `swap${i}+=1.5`);

          // Entran las letras nuevas en cascada tipo líquido
          tl.to(`.giant-char-${i}`, { yPercent: 0, stagger: 0.05, duration: 2, ease: "power3.out" }, `swap${i}+=1.5`);

          // La imagen sube lentamente y sin aceleración para sentirse amarrada al mouse
          tl.to(bgImgs[i] as Element, { top: "0%", duration: 4, ease: "none" }, `swap${i}`);
        });

        tl.to({}, { duration: 1 });
      });

      // ============================================
      // TIMELINE MÓVIL
      // ============================================
      mm.add("(max-width: 767px)", () => {
        gsap.set(imageContainerRef.current, { width: "80vw", height: "40vh", left: "10vw", top: "10vh", opacity: 1 });
        gsap.set(darkBgRef.current, { top: "100vh" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: stickySectionRef.current, start: "top top", end: "+=8000", pin: true, scrub: 1 }
        });

        // FASE 1: Baja la imagen, el texto sube
        tl.to([lightTextTopRef.current, lightTextBottomLeftRef.current, lightTextBottomRightRef.current], { y: -300, duration: 4, ease: "none" }, "phase1")
          .to(".teleprompter-char", { color: "#333333", duration: 0.5, stagger: 0.15, ease: "power1.inOut" }, "phase1")
          .to(imageContainerRef.current, { top: "30vh", duration: 4, ease: "none" }, "phase1");

        // FASE 2: Entra el fondo oscuro (fundido)
        tl.add("phase2", "phase1+=4")
          .to(darkBgRef.current, { top: "0vh", duration: 3, ease: "power2.inOut" }, "phase2")
          .to(imageContainerRef.current, { top: "0vh", left: "0vw", width: "100vw", height: "100vh", opacity: 0.2, duration: 3, ease: "power2.inOut" }, "phase2");

        tl.to(rightContainerRef.current, { opacity: 1, duration: 1 });

        servicesData.forEach((_, i) => {
          if (i === 0) return;
          tl.to({}, { duration: 0.5 });

          // Desaparece rápido
          tl.to(serviceGroups[i - 1] as Element, { autoAlpha: 0, duration: 1 }, `swap${i}`);
          tl.to(`.stagger-item-${i - 1}`, { y: -20, duration: 1, ease: "power2.in" }, `swap${i}`);
          tl.to(`.giant-char-${i - 1}`, { yPercent: 120, stagger: 0.02, duration: 0.5, ease: "power2.in" }, `swap${i}`);

          // Aparece después
          tl.to(serviceGroups[i] as Element, { autoAlpha: 1, duration: 1.5 }, `swap${i}+=1`);
          tl.to(`.stagger-item-${i}`, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1.5, ease: "power2.out" }, `swap${i}+=1`);
          tl.to(`.giant-char-${i}`, { yPercent: 0, stagger: 0.05, duration: 1.5, ease: "power3.out" }, `swap${i}+=1`);

          // La imagen sube durante todo el scroll
          tl.to(bgImgs[i] as Element, { top: "0%", duration: 2.5, ease: "none" }, `swap${i}`);
        });

        tl.to({}, { duration: 1 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full relative bg-[#EBEBEB]">

      <div ref={stickySectionRef} className="sticky top-0 w-full h-screen overflow-hidden z-0">

        {/* ============================== */}
        {/* FONDO CLARO (MANIFIESTO) */}
        {/* ============================== */}
        <div ref={lightBgRef} className="absolute inset-0 bg-[#EFEFEF] w-full h-full z-10 flex flex-col justify-between pt-16 pb-12 px-8 md:px-16 lg:px-24">

          {/* Fila Superior */}
          <div className="flex w-full">
            <div className="w-[40%]"></div> {/* Espacio para la foto flotante izquierda */}

            <div ref={lightTextTopRef} className="w-[60%] flex items-start justify-end gap-12 pr-12">
              <p className="font-sans text-[0.85rem] text-[#555] leading-relaxed w-[240px]">
                {language === 'es' ? (
                  <>Con décadas de experiencia combinada y educación avanzada continua, nuestro equipo brinda atención basada en el conocimiento, precisión y una dedicación inquebrantable a la excelencia.</>
                ) : (
                  <>With decades of combined experience and continuous advanced education, our team provides care based on knowledge, precision, and an unwavering dedication to excellence.</>
                )}
              </p>

              {/* Avatares */}
              <div className="flex -space-x-3">
                <div className="w-14 h-14 rounded-full bg-gray-400 border border-[#EFEFEF] overflow-hidden relative"><Image src="/media/clinic_interior.jpg" fill className="object-cover" alt="Dr" /></div>
                <div className="w-14 h-14 rounded-full bg-gray-500 border border-[#EFEFEF] overflow-hidden relative"><Image src="/media/clinic_interior.jpg" fill className="object-cover" alt="Dr" /></div>
                <div className="w-14 h-14 rounded-full bg-gray-600 border border-[#EFEFEF] overflow-hidden relative"><Image src="/media/clinic_interior.jpg" fill className="object-cover" alt="Dr" /></div>
                <div className="w-14 h-14 rounded-full bg-[#E0E0E0] border border-[#EFEFEF] flex items-center justify-center relative z-10">
                  <span className="font-instrument text-xl text-[#333]">+20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fila Inferior (Alineada con un margen superior para quedar debajo de la foto pero no hasta abajo) */}
          <div className="flex items-start gap-8 lg:gap-16 w-full pt-8">
            <div ref={lightTextBottomLeftRef} className="w-[40%] mt-[50vh]">
              <h2 className="font-instrument text-[#c0c0c0] text-5xl md:text-6xl lg:text-[5.5rem] tracking-tighter leading-none">
                {language === 'es'
                  ? <TextFill text="Nuestro objetivo es" />
                  : <TextFill text="Our goal is" />}
              </h2>
            </div>
            <div ref={lightTextBottomRightRef} className="w-[60%] flex flex-col">
              <h2 className="font-instrument text-[#c0c0c0] text-5xl md:text-[5.5rem] lg:text-[6rem] leading-[0.9] tracking-tighter">
                {language === 'es' ? (
                  <>
                    <TextFill text="a entregar clase mundial" /><br />
                    <TextFill text="dental y estético cuidado" /><br />
                    <TextFill text="a través de avanzado" /><br />
                    <TextFill text="técnicas, personalizado" /><br />
                    <TextFill text="tratamientos, y a hablar" /><br />
                    <TextFill text="nivel de servicio eso" /><br />
                    <TextFill text="hace cada paciente" /><br />
                    <TextFill text="sentir valorado." />
                  </>
                ) : (
                  <>
                    <TextFill text="to deliver world-class" /><br />
                    <TextFill text="dental and aesthetic care" /><br />
                    <TextFill text="through advanced" /><br />
                    <TextFill text="techniques, customized" /><br />
                    <TextFill text="treatments, and a bespoke" /><br />
                    <TextFill text="level of service that" /><br />
                    <TextFill text="makes every patient" /><br />
                    <TextFill text="feel valued." />
                  </>
                )}
              </h2>

              <div className="mt-8 md:mt-12">
                <button className="bg-[#151515] text-[#F5F5F5] font-sans text-sm tracking-wide rounded-full px-8 py-3.5 flex items-center gap-3 hover:bg-[#333] transition-colors">
                  {language === 'es' ? 'Sobre nosotros' : 'About us'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ============================== */}
        {/* FONDO OSCURO (SERVICIOS) */}
        {/* ============================== */}
        <div ref={darkBgRef} className="absolute left-0 w-full h-full bg-[#1A1A1D] z-20 overflow-hidden">
        </div>

        {/* ============================== */}
        {/* LA IMAGEN PUENTE (Z-index 30) */}
        {/* ============================== */}
        <div ref={imageContainerRef} className="absolute z-30 overflow-hidden shadow-2xl bg-[#1A1A1D]">
          {servicesData.map((srv, i) => (
            <div
              key={`bg-${i}`}
              className={`bg-img-slide absolute inset-0 w-full h-full`}
              style={{ zIndex: i + 1 }}
            >
              <Image
                src={srv.img}
                alt={language === 'es' ? srv.title.es : srv.title.en}
                fill
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* ============================== */}
        {/* CONTENIDO DE SERVICIOS (Z-index 40) */}
        {/* ============================== */}
        <div
          ref={rightContainerRef}
          className="absolute inset-0 w-full h-full z-40 opacity-0 pointer-events-none"
        >
          {servicesData.map((srv, i) => (
            <div
              key={`srv-${i}`}
              className={`service-group-slide absolute inset-0 w-full h-full flex pointer-events-auto ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
            >

              {/* LADO IZQUIERDO (Overlay sobre la imagen flotante) */}
              <div className="w-full md:w-[50vw] h-full relative flex flex-col justify-end pb-12 px-8 md:px-16 lg:px-24">
                <p className="font-sans text-xs text-white/70 mb-4">
                  {language === 'es' ? 'Servicios:' : 'Services:'}
                </p>
                <div className="flex flex-col gap-1 z-50">
                  {servicesData.map((navItem, navIdx) => (
                    <span key={`nav-${navIdx}`} className={`font-sans text-sm tracking-wide cursor-pointer transition-colors ${navIdx === i ? 'text-white font-medium' : 'text-white/40 hover:text-white/70'}`}>
                      {language === 'es' ? navItem.title.es : navItem.title.en}
                    </span>
                  ))}
                </div>
              </div>

              {/* LADO DERECHO (Contenido descriptivo) */}
              <div className="hidden md:flex w-[50vw] h-full flex-col justify-center px-8 lg:px-16 xl:px-24 relative z-40">
                <p className={`font-sans text-xs text-white/70 mb-6 mt-16 stagger-item-${i}`}>
                  {language === 'es' ? 'Nuestras soluciones:' : 'Our solutions:'}
                </p>

                <p className={`font-sans font-normal text-white text-lg lg:text-[1.3rem] xl:text-[1.5rem] leading-snug mb-16 w-[95%] stagger-item-${i}`}>
                  {language === 'es' ? srv.desc.es : srv.desc.en}
                </p>

                <div className="flex gap-8 xl:gap-12 w-full items-start">
                  {/* Imagen pequeña */}
                  <div className={`w-[35%] xl:w-[30%] relative aspect-[3/4] overflow-hidden rounded-sm stagger-item-${i}`}>
                    <Image src={srv.img} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Service Detail" />
                  </div>

                  {/* Acordeón y botón */}
                  <div className="w-[65%] xl:w-[70%] flex flex-col justify-between h-full">
                    <div className="flex flex-col border-t border-white/10">
                      {srv.list.map((item, idx) => (
                        <div key={idx} className={`flex justify-between items-center border-b border-white/10 py-4 group cursor-pointer hover:border-white/40 transition-colors stagger-item-${i}`}>
                          <span className="font-sans text-sm md:text-base text-white/80 group-hover:text-white transition-colors">{language === 'es' ? item.es : item.en}</span>
                          <svg className="w-4 h-4 text-white/50 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 19L20 5M20 5v10M20 5H10"></path></svg>
                        </div>
                      ))}
                    </div>

                    <div className={`flex justify-end mt-12 stagger-item-${i}`}>
                      <button className="bg-[#EAEAEA] text-[#1A1A1D] rounded-full px-6 py-2.5 flex items-center gap-2 font-sans text-sm font-medium hover:bg-white transition-colors">
                        {language === 'es' ? 'Más información' : 'More info'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Título gigante superpuesto (ARRIBA DE TODO EN Z-INDEX) */}
              <h3 className="font-instrument italic text-[4.5rem] md:text-[7.5rem] lg:text-[9.5rem] text-[#F5F5F5] leading-[0.85] tracking-tighter absolute bottom-12 left-8 md:left-[15vw] drop-shadow-2xl pointer-events-none w-[150vw] md:w-[90vw] z-50 flex flex-col gap-2">
                {language === 'es'
                  ? srv.title.es.split(' ').map((word, wIdx) => (
                    <div key={wIdx} className="overflow-hidden pb-4">
                      {word.split('').map((char, cIdx) => (
                        <span key={cIdx} className={`inline-block giant-char-${i}`}>{char}</span>
                      ))}
                    </div>
                  ))
                  : srv.title.en.split(' ').map((word, wIdx) => (
                    <div key={wIdx} className="overflow-hidden pb-4">
                      {word.split('').map((char, cIdx) => (
                        <span key={cIdx} className={`inline-block giant-char-${i}`}>{char}</span>
                      ))}
                    </div>
                  ))}
              </h3>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
