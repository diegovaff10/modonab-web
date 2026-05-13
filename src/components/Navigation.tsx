"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
// removed unused useLenis import
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function Navigation() {
  const { language, setLanguage, theme, toggleTheme, t } = useAppContext();
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Removed lenis.stop() logic to prevent GSAP ScrollTrigger conflicts and layout jumps.
  // The fixed menu overlay will naturally sit on top, and background scrolling is perfectly acceptable for this aesthetic.

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!headerRef.current) return;

    let isHidden = false;
    let mouseY = 0;
    
    // Animation to hide/show the navbar
    const hideNav = () => {
      if (!isHidden && !isMenuOpen) {
        gsap.to(headerRef.current, { yPercent: -100, duration: 0.6, ease: "power3.inOut" });
        isHidden = true;
      }
    };

    const showNav = () => {
      if (isHidden) {
        gsap.to(headerRef.current, { yPercent: 0, duration: 0.6, ease: "power3.out" });
        isHidden = false;
      }
    };

    // Scroll trigger for hide/show based on scroll direction
    const st = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // If we are at the very top, always show
        if (self.scroll() < 50) {
          showNav();
          return;
        }

        // If menu is open, don't hide it
        if (isMenuOpen) {
          showNav();
          return;
        }
        
        // Hide on scroll down, show on scroll up (unless mouse is near top)
        if (self.direction === 1 && mouseY > 100) {
          hideNav();
        } else if (self.direction === -1) {
          showNav();
        }
      },
    });

    // Mouse move event to detect if near top
    const handleMouseMove = (e: MouseEvent) => {
      mouseY = e.clientY;
      if (mouseY < 80) {
        showNav();
      } else {
        if (window.scrollY > 50 && !isMenuOpen) {
           const st = ScrollTrigger.getAll()[0];
           if (st && st.direction === 1) {
              hideNav();
           }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (st) st.kill();
    };
  }, [isMenuOpen]);

  // Handle Menu Animation
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOverlayRef.current || !menuLinksRef.current) return;

    if (isMenuOpen) {
      // Open Animation
      gsap.to(menuOverlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.6,
        ease: "power2.inOut"
      });
      
      gsap.fromTo(
        menuLinksRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    } else {
      // Close Animation
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { key: 'navTreatments', href: '#treatments' },
    { key: 'navStory', href: '#our-story' },
    { key: 'navJournal', href: '#journal' },
    { key: 'navContact', href: '#contact' },
  ];

  return (
    <>
      {/* FULLSCREEN GLASS OVERLAY MENU (iOS Style) */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-[40px] saturate-150 flex items-center justify-center pointer-events-none opacity-0"
      >
        <nav ref={menuLinksRef} className="flex flex-col items-center gap-8 text-center">
          {menuItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-[family-name:var(--font-cormorant)] italic text-4xl md:text-6xl text-white/90 hover:text-white transition-colors uppercase tracking-tight"
            >
              {t(item.key)}
            </Link>
          ))}
          
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex gap-4 text-white/50 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-tenor)]">
              <button 
                onClick={() => setLanguage('es')}
                className={`transition-colors ${language === 'es' ? 'text-white font-bold' : 'hover:text-white'}`}
              >
                ES
              </button>
              <span>/</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`transition-colors ${language === 'en' ? 'text-white font-bold' : 'hover:text-white'}`}
              >
                EN
              </button>
            </div>
            
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </div>

      {/* TOP NAVIGATION BAR */}
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-5 md:px-12 md:py-6 text-white transition-all duration-500 ease-out will-change-transform ${
          isMenuOpen ? "bg-transparent" : "bg-black/20 dark:bg-black/40 backdrop-blur-md border-b border-white/5"
        }`}
      >
        {/* LEFT: Menu Trigger */}
        <div className="flex-1 flex justify-start items-center gap-4">
          <button 
            onClick={toggleMenu}
            className="group flex items-center justify-center relative focus:outline-none transition-transform duration-300 hover:scale-105"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
          </button>
          
          <div className="hidden md:flex gap-2 text-[10px] uppercase tracking-[0.2em] font-sans text-white/50">
            <button onClick={() => setLanguage('es')} className={language === 'es' ? 'text-white font-bold' : ''}>ES</button>
            <span>/</span>
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'text-white font-bold' : ''}>EN</button>
          </div>
        </div>

        {/* CENTER: Typography Logo */}
        <div className="flex-1 flex justify-center">
          <Link 
            href="/" 
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
            className="font-[family-name:var(--font-instrument-serif)] text-3xl tracking-wide uppercase"
          >
            Modonab
          </Link>
        </div>

        {/* RIGHT: CTA & Theme */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="hidden md:block text-white/50 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>
          
          <Link 
            href="#contact"
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
            className="group relative font-[family-name:var(--font-tenor)] text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium"
          >
            {t('navConsultation')}
          </Link>
        </div>
      </header>
    </>
  );
}
