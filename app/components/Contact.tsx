'use client';

import { useGSAP } from '@gsap/react';
import { Link, buttonVariants } from '@heroui/react';
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  MailboxIcon,
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
      className='flex w-full flex-col items-center justify-center gap-4 px-5 py-16 sm:gap-5 sm:px-10 sm:py-32'
    >
      <h2 className='text-2xl font-bold uppercase tracking-tighter sm:text-3xl'>
        [ Contact ]
      </h2>
      <div className='flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:gap-5'>
        <p className='text-left text-sm leading-7 text-muted sm:text-base sm:leading-8'>
          I&apos;m always open to new opportunities and collaborations. If you
          have a project in mind or just want to say hi, feel free to reach out!
        </p>
        <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-5'>
          <Link
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`}
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              isIconOnly: true,
            })}
            target='_blank'
            aria-label='Email me'
          >
            <MailboxIcon />
          </Link>
          <Link
            href='https://github.com/badru9'
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              isIconOnly: true,
            })}
            target='_blank'
            aria-label='Follow me on GitHub'
          >
            <GithubLogoIcon />
          </Link>
          <Link
            href='https://www.linkedin.com/in/mohammad-badrujaman-784278259/'
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              isIconOnly: true,
            })}
            target='_blank'
            aria-label='Connect with me on LinkedIn'
          >
            <LinkedinLogoIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
