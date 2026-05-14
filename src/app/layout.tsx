import type { Metadata } from "next";
import { Inter, Syne, Space_Grotesk, Instrument_Serif, Cormorant_Garamond, Tenor_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"] 
});
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk" 
});
const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-instrument-serif" 
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant"
});
const tenorSans = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tenor"
});

export const metadata: Metadata = {
  title: "MODONAB | Lo nuevo sobre lo nuevo",
  description: "Una experiencia dental cinematográfica premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${cormorant.variable} ${tenorSans.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans bg-brand-dark text-brand-light">
        <AppProvider>
          <SmoothScroll>
            <Navigation />
            {children}
          </SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
