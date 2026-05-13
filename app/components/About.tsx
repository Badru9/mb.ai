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
    if (!about) return;

    gsap.set(about, { opacity: 0, x: -60 });

    gsap.to(about, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: about,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={aboutWrapper}
      id='about'
      className='flex w-full flex-col items-center justify-center gap-4 px-5 py-10 sm:gap-5 sm:p-10 scroll-mt-20'
    >
      <h2 className='text-2xl font-bold uppercase tracking-tighter sm:text-3xl'>
        [ Get To Know Me ]
      </h2>
      <p className='w-full max-w-3xl text-left text-sm leading-7 text-muted sm:text-base sm:leading-8'>
        I&apos;m a Fullstack Developer with roughly 2 years of experience
        working across the stack — from building user interfaces with React and
        Next.js to setting up APIs and backend logic with Node.js, Express, and
        Laravel. I enjoy figuring out how things work, writing clean code, and
        shipping products that actually solve problems.
      </p>
    </section>
  );
}
