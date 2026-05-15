"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function Footer() {
  const { language } = useAppContext();

  useEffect(() => {
    // Parallax or animations can be added here if needed
  }, []);

  return (
    <div className="relative w-full bg-[#1A1A1D]">
      
      {/* 1. Bridge Section: Imagen que se funde con el footer */}
      <div className="relative w-full h-[80vh] md:h-[100vh] overflow-hidden z-0 flex flex-col items-center justify-center">
        {/* Imagen del modelo/sonrisa */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/media/perfect_smile_cinematic.png')" }}
        />
        {/* Gradiente para fusión: Suave arriba, Funde a negro puro abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F5] via-[#1A1A1D]/50 to-[#1A1A1D]" />
        
        {/* Texto sobre la imagen */}
        <h2 className="relative z-10 font-instrument text-[4rem] md:text-[6rem] lg:text-[8rem] text-white leading-[0.9] tracking-tighter text-center max-w-5xl px-4 drop-shadow-2xl mt-16 md:mt-0">
          {language === 'es' 
            ? <>Dando Vida a <br/><span className="italic font-light">tu Sonrisa Perfecta</span></>
            : <>Bringing Your <br/><span className="italic font-light">Perfect Smile to Life</span></>}
        </h2>
      </div>

      {/* 2. Dark Footer: Fundido, sin curvas */}
      <footer className="relative z-10 w-full bg-[#1A1A1D] flex flex-col items-center pb-8 px-6 md:px-16 pt-16">
        
        {/* Sección del Formulario y Logo */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 md:gap-24 mb-32">
            
            {/* Izquierda: Logo Tipográfico Gigante */}
            <div className="flex flex-col gap-2 w-full lg:w-1/2">
               <h3 className="font-sans font-bold text-[18vw] md:text-8xl lg:text-9xl text-[#F5F5F5] leading-none tracking-tighter uppercase">
                 MODONAB
               </h3>
               <span className="font-instrument italic text-3xl md:text-5xl text-[#F5F5F5]/60 md:ml-2">Dental Arts</span>
            </div>

            {/* Derecha: Título Formulario y Campos */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
               <h3 className="font-instrument text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-tight tracking-tighter">
                 {language === 'es' ? '¿Listo para Transformar tu Sonrisa?' : 'Ready to Transform Your Smile?'} <br/>
                 <span className="italic font-light opacity-80">{language === 'es' ? 'Agenda una llamada.' : 'Book a call.'}</span>
               </h3>

               <form className="flex flex-col gap-4 w-full mt-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <input type="text" placeholder={language === 'es' ? 'Nombre' : 'Name'} className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors" />
                    <input type="tel" placeholder={language === 'es' ? 'Teléfono' : 'Phone number'} className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors" />
                  </div>
                  <div className="flex gap-4 items-center">
                    <input type="text" placeholder={language === 'es' ? 'Mensaje' : 'Message'} className="w-full bg-transparent border border-white/20 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors" />
                    <button type="button" className="w-14 h-14 shrink-0 bg-white rounded-full flex items-center justify-center hover:bg-[#FF7F50] transition-colors group">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1A1A1D] group-hover:text-white"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                    </button>
                  </div>
               </form>
            </div>
        </div>

        {/* Sección de Enlaces y Contacto */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 text-[#F5F5F5]">
            <div className="flex flex-col gap-4">
               <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-40 mb-2">{language === 'es' ? 'Servicios' : 'Services'}</span>
               <Link href="#" className="font-sans text-base md:text-lg hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Odontología Estética' : 'Esthetic Dentistry'}</Link>
               <Link href="#" className="font-sans text-base md:text-lg hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Odontología Restauradora' : 'Restorative Dentistry'}</Link>
               <Link href="#" className="font-sans text-base md:text-lg hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Cuidado Preventivo' : 'Preventive Care'}</Link>
            </div>
            
            <div className="flex flex-col gap-4">
               <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-40 mb-2">{language === 'es' ? 'Nuestra Clínica' : 'Our Clinic'}</span>
               <Link href="#" className="font-sans text-base md:text-lg hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Inicio' : 'Home'}</Link>
               <Link href="#" className="font-sans text-base md:text-lg hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Nosotros' : 'About us'}</Link>
               <Link href="#" className="font-sans text-base md:text-lg hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Tecnología' : 'Technology'}</Link>
               <Link href="#" className="font-sans text-base md:text-lg hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Contacto' : 'Contact'}</Link>
            </div>

            <div className="flex flex-col gap-4 md:col-span-2">
               <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-40 mb-2">{language === 'es' ? 'Ubicación' : 'Locations'}</span>
               <div className="flex flex-col gap-2">
                 <h4 className="font-sans text-xl border-b border-white/20 pb-2 inline-block w-max">Mendoza</h4>
                 <p className="font-sans text-sm opacity-80 mt-2">Pueyrredón 322, PB. Consultorio 2.<br/>Mendoza, Argentina</p>
                 <a href="tel:+542612748224" className="font-sans font-bold text-lg mt-2 hover:text-[#FF7F50] transition-colors">(261) 274-8224</a>
                 <div className="flex gap-4 font-sans text-xs opacity-60 mt-2">
                    <span className="w-12">Lu-Vi</span>
                    <span>8:30 am – 5:00 pm</span>
                 </div>
               </div>
            </div>
        </div>

        {/* Legales, Redes y AdFusion */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 opacity-40 font-sans text-[10px] md:text-xs uppercase tracking-widest text-[#F5F5F5] border-t border-white/10 pt-8 mt-auto">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <span>Copyright © 2026 Modonab Dental Arts</span>
              <span className="hidden sm:inline">•</span>
              
              {/* Instagram Button Moved Here */}
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#FF7F50] hover:border-transparent transition-colors group">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <Link href="#" className="hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</Link>
              <Link href="#" className="hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Accesibilidad' : 'Accessibility Statement'}</Link>
              <Link href="#" className="hover:text-[#FF7F50] transition-colors">{language === 'es' ? 'Términos' : 'Terms & Conditions'}</Link>
            </div>

            <div className="flex items-center gap-2 mt-4 lg:mt-0">
              <a href="https://adfusion.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF7F50] transition-colors font-medium flex items-center gap-2 opacity-100 text-white">
                {language === 'es' ? 'Desarrollado por AdFusion' : 'Developed by AdFusion'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-7 7L23 3"/></svg>
              </a>
            </div>
        </div>
      </footer>
    </div>
  );
}
