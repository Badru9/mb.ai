"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import TerminalCard from "./lightswind/terminal-card";

interface HeroContent {
  id: number;
  name: string;
  content: ReactNode;
  // extraAnimation?: {

  // }
}

export default function Hero() {
  const heroContents: HeroContent[] = [
    {
      id: 0,
      name: "role",
      content: (
        <p className="max-w-[18rem] text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.22em] text-muted sm:max-w-none sm:text-sm sm:tracking-[0.45em]">
          Frontend Developer · Fullstack Developer
        </p>
      ),
    },
    {
      id: 1,
      name: "name",
      content: (
        <h1 className="text-[clamp(2.45rem,13vw,8.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.08em] sm:leading-[0.85]">
          MOH BADRUJAMAN
        </h1>
      ),
    },
    {
      id: 2,
      name: "headline",
      content: (
        <h2 className="text-balance text-xl font-semibold leading-snug tracking-[-0.03em] sm:text-4xl sm:leading-tight md:text-5xl">
          Frontend-focused Fullstack Developer with 2+ years of professional
          experience.
        </h2>
      ),
    },
    {
      id: 3,
      name: "description",
      content: (
        <p className="mx-auto max-w-3xl text-pretty text-sm leading-7 text-muted sm:text-lg sm:leading-8">
          I build production-ready web apps with React, Next.js, TypeScript,
          Tailwind, Laravel, and Express, handling everything from responsive UI
          and API integration to booking flows, payment modules, reporting
          dashboards, and squashing bugs once the&apos;re live.
        </p>
      ),
    },
    {
      id: 4,
      name: "hireMeButton",
      content: (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.8 },
          }}
          className="space-x-4 flex items-center"
        >
          {/* <Button size="lg" aria-label="hire-me-button">
            Hire Me
          </Button> */}
          <TerminalCard command="npx hire badrudev" language="bash" />
        </motion.div>
      ),
    },
  ];

  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-4 pb-12 pt-24 sm:p-8">
      <motion.div
        className="flex w-full max-w-7xl flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.3 },
        }}
        viewport={{ once: true }}
      >
        {heroContents.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.3 + index * 0.2 },
            }}
            aria-label={`aria-label-${item.name}`}
          >
            {item.content}
          </motion.div>
        ))}
        {/* <p className="max-w-[18rem] text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.22em] text-muted sm:max-w-none sm:text-sm sm:tracking-[0.45em]">
          Frontend Developer · Fullstack Developer
          </p>
          
          <h1 className="text-[clamp(2.45rem,13vw,8.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.08em] sm:leading-[0.85]">
          MOH BADRUJAMAN
          </h1>
          
          <h2 className="text-balance text-xl font-semibold leading-snug tracking-[-0.03em] sm:text-4xl sm:leading-tight md:text-5xl">
          Frontend-focused Fullstack Developer with 2+ years of professional
          experience.
          </h2>
          
          <p className="mx-auto max-w-3xl text-pretty text-sm leading-7 text-muted sm:text-lg sm:leading-8">
          Building production web applications with ReactJS, Next.js,
          TypeScript, TailwindCSS, Laravel, and ExpressJS — from responsive UI
          implementation and API integration to booking flows, payment modules,
          reporting dashboards, and production bug resolution.
          </p> */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.8 },
            }}
            className="space-x-4 flex items-center"
            >
            <Button size="lg">Hire Me</Button>
            <Button size="lg" variant="outline">
            See More Projects
            </Button>
            </motion.div> */}
      </motion.div>
    </section>
  );
}
