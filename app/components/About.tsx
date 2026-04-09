'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const aboutWrapper = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const about = aboutWrapper.current;

    gsap.to(about, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: about,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={aboutWrapper}
      className='w-full flex flex-col items-center justify-center p-10 gap-5 opacity-0'
    >
      <h2 className='text-3xl font-bold tracking-tighter uppercase font-lexend'>
        [ Get To Know Me ]
      </h2>
      <p className='w-1/2 text-justify'>
        I&apos;m a Fullstack Developer with roughly 2 years of experience
        working across the stack — from building user interfaces with React and
        Next.js to setting up APIs and backend logic with Node.js, Express, and
        Laravel. I enjoy figuring out how things work, writing clean code, and
        shipping products that actually solve problems.
      </p>
    </section>
  );
}
