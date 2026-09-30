import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CinematicIntro } from '@/components/CinematicIntro';
import { AnimatedCursor } from '@/components/AnimatedCursor';
import { EnergyBackground } from '@/components/EnergyBackground';
import { TabTransition } from '@/components/TabTransition';
import { PageTransition } from '@/components/PageTransition';

export const metadata: Metadata = {
  title: "CU Student Survival System | The Sorcerer's Guide & Training Manual",
  description:
    "Mission 02 — Jujutsu High: The First-Year Trial. A modern campus spatial directory, student club matrix, sports arena booking, and new student survival guide for Chandigarh University.",
};

export const viewport: Viewport = {
  themeColor: '#050608',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-void-950 text-slate-100 antialiased min-h-screen flex flex-col selection:bg-cursed-purple selection:text-white">
        {/* Subtle Cyber Grid */}
        <div className="fixed inset-0 bg-cyber-grid opacity-35 pointer-events-none z-0" />

        {/* Ambient Moving Cursed-Energy Field */}
        <EnergyBackground />

        {/* Cinematic Tab-Switch Supernatural Transition System */}
        <TabTransition />

        {/* Custom Desktop Cursed-Energy Cursor */}
        <AnimatedCursor />

        {/* One-time Cinematic Intro */}
        <CinematicIntro />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area with Page Transition */}
        <main className="relative z-10 flex-1 pt-16">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
