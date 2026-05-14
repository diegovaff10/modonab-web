"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: string) => any;
}

const translations = {
  en: {
    heroTitle: "MODONAB",
    heroSubtitle: "The new over the new",
    scrollDiscover: "Scroll to discover",
    navTreatments: "Treatments",
    navStory: "Our Story",
    navJournal: "Journal",
    navContact: "Contact",
    navConsultation: "Consultation",
    loaderText: "MODONAB",
    row1: "DENTAL AESTHETICS — IMPLANTOLOGY — ORTHODONTICS — ORAL SURGERY — PERIODONTICS — ENDODONTICS —",
    row2: "INNOVATION — PRECISION — CRAFTSMANSHIP — LUXURY — ADVANCED CARE — DIGITAL DENTISTRY —",
    manifestoMain: "Technology as the new standard of dentistry.",
    manifestoSecond: "Where digital innovation meets clinical mastery.",
    manifestoKeywords: ["Technology", "Innovation", "Mastery"]
  },
  es: {
    heroTitle: "MODONAB",
    heroSubtitle: "Lo nuevo sobre lo nuevo",
    scrollDiscover: "Desliza para descubrir",
    navTreatments: "Tratamientos",
    navStory: "Nuestra Historia",
    navJournal: "Diario",
    navContact: "Contacto",
    navConsultation: "Consulta",
    loaderText: "MODONAB",
    row1: "ESTÉTICA DENTAL — IMPLANTOLOGÍA — ORTODONCIA — CIRUGÍA ORAL — PERIODONCIA — ENDODONCIA —",
    row2: "INNOVACIÓN — PRECISIÓN — ARTESANÍA — LUJO — CUIDADO AVANZADO — ODONTOLOGÍA DIGITAL —",
    manifestoMain: "La tecnología como el nuevo estándar de la odontología.",
    manifestoSecond: "Donde la innovación digital se encuentra con la maestría clínica.",
    manifestoKeywords: ["Tecnología", "Innovación", "Maestría"]
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
