'use client';

import { Project } from '@/lib/types';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const galleryStripRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'INTANET',
      description: 'Internal network management platform',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      link: 'https://example.com',
      tags: ['Next.js', 'TypeScript', 'Prisma'],
    },
    {
      id: '2',
      name: 'mb.ai',
      description: 'AI-powered personal assistant chatbot',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
      link: 'https://example.com',
      tags: ['Next.js', 'Gemini AI', 'Streaming'],
    },
    {
      id: '3',
      name: 'Portfolio v3',
      description: 'Personal portfolio with GSAP animations',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      link: 'https://example.com',
      tags: ['Next.js', 'GSAP', 'Tailwind CSS'],
    },
    {
      id: '4',
      name: 'Dashboard',
      description: 'Lecturer performance analytics dashboard',
      image:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
      link: 'https://example.com',
      tags: ['React', 'HeroUI', 'Charts'],
    },
    {
      id: '5',
      name: 'E-Commerce',
      description: 'Full-stack e-commerce platform',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
      link: 'https://example.com',
      tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    },
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

  return (
    <section ref={sectionRef} className='relative'>
      {/* Section title - normal scroll section before gallery */}
      <div className='flex items-center justify-center h-screen'>
        <h2 className='text-[clamp(2rem,5vw,4rem)] font-bold tracking-tighter uppercase'>
          [ Projects ]
        </h2>
      </div>

      {/* Gallery Section - pinned during horizontal scroll */}
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
                <img src={project.image} alt={project.name} loading='lazy' />
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
  );
}
