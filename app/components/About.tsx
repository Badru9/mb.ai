"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const services = [
    {
      id: 1,
      description:
        "Building reporting dashboards and data visibility for business needs",
    },
    {
      id: 2,
      description:
        "Building responsive, production-ready web interfaces with React & Next.js",
    },
    {
      id: 3,
      description: "Integrating payment systems into transaction flows",
    },
    {
      id: 4,
      description:
        "Fixing production bugs and maintaining reliability of live systems",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.3 },
      }}
      viewport={{ once: true }}
      id="about"
      className="flex w-full flex-col items-center justify-center space-y-6 px-5 py-10 sm:gap-5 sm:p-10 scroll-mt-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.3 },
        }}
        viewport={{ once: true }}
        className="text-2xl font-bold uppercase tracking-tighter sm:text-3xl"
      >
        [ About Me ]
      </motion.h2>
      <div className="flex space-x-12">
        <div className="flex flex-col space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, delay: 0.3 },
            }}
          >
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, delay: 0.5 },
              }}
              viewport={{ once: true }}
              className="font-semibold"
            >
              Who Am I?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, delay: 0.7 },
              }}
              viewport={{ once: true }}
              className="w-full max-w-3xl text-left text-sm leading-7 text-muted sm:text-base sm:leading-8"
            >
              I&apos;m a fullstack developer with around 2 years of experience.
              On the frontend I build with React and Next.js, and on the backend
              I work with Node.js, Express, and Laravel. What I like most is
              digging into how things actually work under the hood, then writing
              code that&apos;s easy for the next person (usually future me) to
              read.
            </motion.p>
          </motion.div>
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, delay: 0.8 },
              }}
              viewport={{ once: true }}
              className="font-semibold"
            >
              What Can I Do?
            </motion.h3>
            {services.map((service, index) => (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, delay: 0.9 + index * 0.2 },
                }}
                viewport={{ once: true }}
                key={service.id}
                className="w-full max-w-3xl text-left text-sm leading-7 text-muted sm:text-base sm:leading-8"
              >
                {index + 1}. {service.description}
              </motion.p>
            ))}
          </div>
        </div>
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 1.2 },
          }}
          viewport={{ once: true }}
          src={"/images/badru.jpg"}
          alt="badrudev"
          width={400}
          height={400}
          className="rounded-lg object-cover w-80 aspect-square"
        />
      </div>
    </motion.div>
  );
}
