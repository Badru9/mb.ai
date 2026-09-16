import type { Metadata } from 'next';
import HomeContent from './components/HomeContent';

export const metadata: Metadata = {
  title: 'badrudev | Software Engineer Portfolio',
  description:
    'Moh Badrujaman — Frontend-focused Fullstack Developer portfolio showcasing production web apps built with React, Next.js, TypeScript, and TailwindCSS.',
  openGraph: {
    title: 'badrudev | Software Engineer Portfolio',
    description:
      'Frontend-focused Fullstack Developer portfolio showcasing production web apps built with React, Next.js, TypeScript, and TailwindCSS.',
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeContent />;
}
