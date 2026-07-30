'use client';

import { Button, Link, Surface } from '@heroui/react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { DownloadSimpleIcon } from '@phosphor-icons/react';

const NAV_LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <Surface className='flex justify-between py-4 px-5 sm:py-5 sm:px-10 fixed top-0 left-0 right-0 z-50'>
      <Link href='/' className='no-underline font-bold text-xl'>
        badru.dev
      </Link>

      <div className='flex items-center gap-4'>
        <nav className='hidden md:flex gap-4'>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='no-underline hover:opacity-70 transition-opacity'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          onClick={toggleMenu}
          variant='ghost'
          className='md:hidden'
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
        </Button>
      </div>

      {isOpen && (
        <nav className='absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--border)] flex flex-col p-4 gap-2 md:hidden'>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='no-underline py-2 px-4 hover:bg-[var(--surface)] rounded-md transition-colors'
              onPress={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
      <Link
        download='CV-Moh_Badrujaman.pdf'
        href='/CV-Moh_Badrujaman.pdf'
        target='_blank'
      >
        Download CV
      </Link>
    </Surface>
  );
}
