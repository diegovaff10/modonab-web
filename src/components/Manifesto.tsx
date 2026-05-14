"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function Manifesto() {
  const { t } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  const phrases = [
    { main: t('manifestoMain'), second: t('manifestoSecond') },
    { main: "Odontología 100% Digital.", second: "Diseño. Precisión. Vanguardia." },
    { main: "Ingeniería en cada sonrisa.", second: "Precisión milimétrica. Estética perfecta." },
    { main: "Flujo digital total.", second: "La evolución del diseño de sonrisa." },
    { main: "Estética Digital Avanzada.", second: "Donde la tecnología diseña la perfección." },
    { main: "Precisión algorítmica.", second: "Arte clínico." }
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const currentPhrase = phrases[phraseIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current || !containerRef.current || !imagesRef.current) return;

    // Split text into lines for smooth mask reveal
    const split = new SplitType(textRef.current, { types: "lines" });
    
    // Wrap each line in a container with hidden overflow for the mask effect
    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const ctx = gsap.context(() => {
      // 1. Pinned Text Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Pins for 150% of the viewport height
          scrub: 1,
          pin: true,
        },
      });

      // Text lines reveal smoothly from the bottom
      tl.fromTo(
        split.lines,
        {
          y: "120%",
          opacity: 0,
          rotateZ: 2,
        },
        {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power3.out",
        }
      )
      // Slight fade out as we scroll further
      .to(split.lines, {
        opacity: 0.3,
        scale: 0.95,
        stagger: 0.05,
        duration: 1,
        ease: "power2.inOut",
      }, "+=0.5");

      // 2. Images Parallax & Clip-path Unveil Effect
      const imageWrappers = gsap.utils.toArray(".image-wrapper") as HTMLElement[];
      
      imageWrappers.forEach((wrapper, i) => {
        const img = wrapper.querySelector("img");
        
        // Speed variation for parallax
        const yOffset = i === 0 ? -150 : i === 1 ? -300 : -200;

        const imgTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });

        // The wrapper moves up at different speeds (Parallax)
        imgTl.to(wrapper, {
          y: yOffset,
          ease: "none",
        });

        // Reveal the image using clip-path (curtain effect)
        gsap.fromTo(wrapper,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%", // Starts revealing when wrapper enters viewport
              end: "top 40%",
              scrub: 1,
            }
          }
        );

        // The image itself scales down inside the wrapper to create depth
        if (img) {
          gsap.fromTo(img,
            { scale: 1.4 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => {
      split.revert();
      ctx.revert();
    };
  }, [t, phraseIndex]);

  return (
    <>
      {/* Botón temporal de testing */}
      <button 
        onClick={() => setPhraseIndex((prev) => (prev + 1) % phrases.length)}
        className="fixed bottom-8 right-8 z-50 bg-[#C8A97E] text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(200,169,126,0.3)]"
      >
        Cambiar Frase ({phraseIndex + 1}/{phrases.length})
      </button>

      <section 
        ref={containerRef}
        className="relative w-full h-screen bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background/Floating Images */}
        <div ref={imagesRef} className="absolute inset-0 pointer-events-none z-0">
          {/* Left floating image */}
          <div className="image-wrapper absolute top-[60%] left-[5%] w-[25vw] md:w-[18vw] aspect-[3/4] overflow-hidden grayscale brightness-75">
            <Image src="/media/estetica2.jpg" alt="Aesthetic" fill sizes="(max-width: 768px) 25vw, 18vw" className="object-cover" />
          </div>
          
          {/* Right high floating image */}
          <div className="image-wrapper absolute top-[80%] right-[8%] w-[28vw] md:w-[22vw] aspect-[4/5] overflow-hidden grayscale brightness-75">
            <Image src="/media/perfect_smile.png" alt="Perfect Smile" fill sizes="(max-width: 768px) 28vw, 22vw" className="object-cover" />
          </div>
          
          {/* Center-bottom subtle image */}
          <div className="image-wrapper absolute top-[110%] left-1/2 -translate-x-1/2 w-[40vw] md:w-[25vw] aspect-square overflow-hidden rounded-full opacity-60 grayscale brightness-50">
            <Image src="/media/estetica_digital_02.jpg" alt="Digital Aesthetics" fill sizes="(max-width: 768px) 40vw, 25vw" className="object-cover" />
          </div>
        </div>

        {/* Foreground Pinned Text */}
        <div ref={textContainerRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center">
          <p className="font-[family-name:var(--font-tenor)] text-xs md:text-sm uppercase tracking-[0.4em] text-brand-gold mb-10 opacity-70">
            Nuestra Visión
          </p>
          
          <h2 
            key={phraseIndex}
            ref={textRef}
            className="font-[family-name:var(--font-instrument-serif)] text-5xl md:text-7xl lg:text-9xl leading-[1.05] tracking-tight max-w-[90vw]"
          >
            {currentPhrase.main} <br />
            <span className="font-[family-name:var(--font-cormorant)] italic font-light text-brand-gold/90">
              {currentPhrase.second}
            </span>
          </h2>
        </div>
      </section>
    </>
  );
}
