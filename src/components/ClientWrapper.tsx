'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Mods, { UnifiedProject } from '@/components/sections/Mods';
import TechInsights from '@/components/sections/TechInsights';
import Gallery from '@/components/sections/Gallery';
import Contact from '@/components/sections/Contact';

interface ClientWrapperProps {
  mods: UnifiedProject[];
}

export default function ClientWrapper({ mods }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          <Sidebar />
          <main className="lg:ml-64">
            <Hero />
            <About />
            <Mods mods={mods} />
            <TechInsights />
            <Gallery />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}