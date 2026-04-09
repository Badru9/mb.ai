'use client';

import { useGSAP } from '@gsap/react';
import { Button, Link } from '@heroui/react';
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

    gsap.to(contact, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: contact,
        start: 'top 100%',
        end: 'top 50%',
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={contactWrapper}
      className='w-full flex flex-col items-center justify-center p-10 gap-5 opacity-0'
    >
      <h2 className='text-3xl font-bold tracking-tighter uppercase font-lexend'>
        [ Contact ]
      </h2>
      <div className='w-1/2 flex flex-col items-center justify-center gap-5'>
        <p className='text-justify'>
          I&apos;m always open to new opportunities and collaborations. If you
          have a project in mind or just want to say hi, feel free to reach out!
        </p>
        <div className='flex items-center justify-center gap-5'>
          <Button isIconOnly variant='outline' size='lg'>
            <Link
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <MailboxIcon />
            </Link>
          </Button>
          <Button isIconOnly variant='outline' size='lg'>
            <Link
              href='https://github.com/badru9'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubLogoIcon />
            </Link>
          </Button>
          <Button isIconOnly variant='outline' size='lg'>
            <Link
              href='https://www.linkedin.com/in/mohammad-badrujaman-784278259/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedinLogoIcon />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
