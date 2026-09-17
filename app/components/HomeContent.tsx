"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Projects from "./Projects";
import SmoothCursor from "./lightswind/smooth-cursor";

export default function HomeContent() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main
      id="main-content"
      className="min-h-screen w-full flex flex-col items-center justify-center"
    >
      <Hero />
      <Projects />
      <About />
      <Contact />
      <SmoothCursor
        size={16}
        rotateOnMove={true}
        scaleOnClick={true}
        glowEffect={true}
        className="invisible md:visible"
      />
    </main>
  );
}
