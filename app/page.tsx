'use client';

import { useEffect } from 'react';
import Hero from './components/Hero';
import Lenis from 'lenis';
import Projects from './components/Projects';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenis.on('scroll', (e) => {
      console.log(e);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className='min-h-screen w-full flex flex-col items-center justify-center'>
      {/* <Hero /> */}
      <Projects />
    </main>
  );
}
