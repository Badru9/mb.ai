'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create an infinite looping timeline for the rolling effect
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'power2.inOut', duration: 1 },
      });

      tl.to('#roller', {
        yPercent: -50,
        delay: 3,
      }).to('#roller', {
        yPercent: 0,
        delay: 3,
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className='flex flex-col items-center justify-center p-8 min-h-screen'
    >
      <div className='flex flex-col items-center w-full max-w-7xl px-4'>
        <h1 className='text-[clamp(2rem,10vw,8.5rem)] font-bold tracking-tighter uppercase leading-[0.8] text-center whitespace-nowrap'>
          MOH BADRUJAMAN
        </h1>

        <div className='w-full overflow-hidden h-10 md:h-12 relative'>
          <div id='roller' className='flex flex-col'>
            <div
              id='role'
              className='h-10 md:h-12 flex items-center justify-between gap-8 text-xl md:text-2xl font-light uppercase tracking-widest'
            >
              <p>Software</p>
              <p>Engineer</p>
            </div>

            <div
              id='experience'
              className='h-10 md:h-12 flex items-center justify-between gap-8 text-xl md:text-2xl font-light uppercase tracking-widest'
            >
              <p>2+ Years</p>
              <p>Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
