"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.3 },
      }}
      id="about"
      className="flex w-full flex-col items-center justify-center space-y-6 px-5 py-10 sm:gap-5 sm:p-10 scroll-mt-20"
    >
      <h2 className="text-2xl font-bold uppercase tracking-tighter sm:text-3xl">
        [ Get To Know Me ]
      </h2>
      <div className="flex space-x-6">
        <p className="w-full max-w-3xl text-left text-sm leading-7 text-muted sm:text-base sm:leading-8">
          I&apos;m a fullstack developer with around 2 years of experience. On
          the frontend I build with React and Next.js, and on the backend I work
          with Node.js, Express, and Laravel. What I like most is digging into
          how things actually work under the hood, then writing code that&apos;s
          easy for the next person (usually future me) to read.
        </p>
        <Image
          src={"/images/badru.jpg"}
          alt="badrudev"
          width={400}
          height={400}
          className="rounded-lg aspect-auto object-cover"
        />
      </div>
    </motion.div>
  );
}
