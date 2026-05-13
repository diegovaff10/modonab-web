import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-instrument-serif"
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
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
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
