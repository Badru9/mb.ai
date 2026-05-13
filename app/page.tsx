'use client';

import { useEffect } from 'react';
import Hero from './components/Hero';
import Lenis from 'lenis';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main id='main-content' className='min-h-screen w-full flex flex-col items-center justify-center pb-10 sm:pb-20'>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
