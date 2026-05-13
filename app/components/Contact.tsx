'use client';

import { useGSAP } from '@gsap/react';
import { Button } from '@heroui/react';
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  PaperPlaneTiltIcon,
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EMAIL_ADDRESS = 'mohbadru.dev@gmail.com';

export default function Contact() {
  const contactWrapper = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const contact = contactWrapper.current;
    if (!contact) return;

    gsap.set(contact, { opacity: 0, x: 60 });

    gsap.to(contact, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: contact,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={contactWrapper}
      id='contact'
      className='flex w-full flex-col items-center justify-center gap-4 px-5 py-16 sm:gap-5 sm:px-10 sm:py-32 scroll-mt-20'
    >
      <h2 className='text-2xl font-bold uppercase tracking-tighter sm:text-3xl'>
        [ Contact ]
      </h2>
      <div className='flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:gap-5'>
        <p className='text-left text-sm leading-7 text-muted sm:text-base sm:leading-8'>
          Always open to new opportunities and collaborations. If you have a
          project in mind or just want to say hi, feel free to reach out!
        </p>
        <Button
          as='a'
          href={`mailto:${EMAIL_ADDRESS}`}
          variant='outline'
          size='lg'
          startContent={<PaperPlaneTiltIcon />}
          className='min-w-[140px]'
        >
          Say Hello
        </Button>
        <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-5'>
          <Button
            as='a'
            href={`https://github.com/badru9`}
            variant='outline'
            size='lg'
            isIconOnly
            aria-label='GitHub Profile'
          >
            <GithubLogoIcon className='min-w-5 min-h-5' />
          </Button>
          <Button
            as='a'
            href='https://www.linkedin.com/in/mohammad-badrujaman-784278259/'
            variant='outline'
            size='lg'
            isIconOnly
            aria-label='LinkedIn Profile'
          >
            <LinkedinLogoIcon className='min-w-5 min-h-5' />
          </Button>
        </div>
      </div>
    </section>
  );
}
