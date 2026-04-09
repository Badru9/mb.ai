'use client';

import { Project } from '@/lib/types';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const galleryStripRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'INTANET',
      description: 'Company Profile Website',
      image: 'images/intanet.webp',
      link: 'https://intanet.id',
      tags: ['GatsbyJS', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: '2',
      name: 'Dashboard INTANET',
      description: 'Management Dashboard for INTANET',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
      link: '/confidential',
      tags: ['ReactJS', 'Laravel', 'MySQL'],
    },
    {
      id: '3',
      name: 'Fotohokkie',
      description: 'Booking Platform for Photobox',
      image: 'images/fotohokkie.webp',
      link: 'https://fotohokkie.id',
      tags: ['Next.js', 'Tailwind CSS', 'ExpressJS', 'PostgreSQL'],
    },
    {
      id: '4',
      name: 'Dashboard Fotohokkie',
      description:
        'Management Dashboard for Fotohokkie ( Box, Branch, User, Admin, Transaction, Profit, Finance )',
      image: 'images/dashboard-fotohokkie.webp',
      link: '/confidential',
      tags: [
        'NextJS',
        'HeroUI',
        'TailwindCSS',
        'PostgreSQL',
        'ExpressJS',
        'ReactCharts',
        'JWT',
        'ReactQuery',
      ],
    },
    // {
    //   id: '5',
    //   name: 'E-Commerce',
    //   description: 'Full-stack e-commerce platform',
    //   image:
    //     'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    //   link: 'https://example.com',
    //   tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    // },
  ];

  useGSAP(
    () => {
      const wrapper = galleryWrapperRef.current;
      const strip = galleryStripRef.current;
      if (!wrapper || !strip) return;

      const stripWidth = strip.scrollWidth;
      const scrollDistance = stripWidth - window.innerWidth;

      gsap.to(strip, {
        x: () => -scrollDistance,
        ease: 'none',
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${stripWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate each card on entry
      const cards = strip.querySelectorAll('.project-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById('horizontalScroll') || undefined,
              start: 'left 80%',
              end: 'left 50%',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  useGSAP(() => {
    const title = titleRef.current;

    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      {/* Heading — sits outside pinned section, scrolls naturally */}
      <div ref={titleRef} className='w-full px-10 md:px-20 opacity-0'>
        <h2 className='text-3xl font-bold tracking-tighter uppercase font-lexend'>
          [ Projects ]
        </h2>
      </div>

      {/* Gallery Section — only this part gets pinned by GSAP */}
      <section ref={sectionRef} className='relative w-full self-stretch'>
        <div ref={galleryWrapperRef} className='horiz-gallery-wrapper'>
          {/* Horizontal strip */}
          <div ref={galleryStripRef} className='horiz-gallery-strip'>
            {/* Project cards */}
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='project-card group'
              >
                {/* Image */}
                <div className='project-card-image'>
                  <Image
                    src={`/${project.image}`}
                    alt={project.name}
                    loading='lazy'
                    width={500}
                    height={500}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Overlay */}
                <div className='project-card-overlay'>
                  <span className='project-card-index'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className='project-card-title'>{project.name}</h4>
                  <p className='project-card-description'>
                    {project.description}
                  </p>
                  <div className='project-card-tags'>
                    {project.tags.map((tag) => (
                      <span key={tag} className='project-card-tag'>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}

            {/* Outro panel */}
            <div className='gallery-outro'>
              <div className='flex flex-col items-center justify-center h-full px-8'>
                <p className='text-muted text-lg uppercase tracking-widest'>
                  More coming soon
                </p>
                <div className='mt-4 w-12 h-px bg-current opacity-30' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
