"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { TeamCarousel, TeamMember } from "./lightswind/team-carousel";

interface ProjectTypes extends TeamMember {
  href?: string;
}

export default function Projects() {
  const router = useRouter();

  const projects: ProjectTypes[] = [
    {
      id: "1",
      name: "Fotohokkie Booking Platform",
      role: "Fullstack Booking System",
      image: "images/fotohokkie.webp",
      bio: "A photobooth booking platform with Midtrans payment gateway integration for dynamic QRIS transactions, built using Next.js and ExpressJS.",
      href: "https://fotohokkie.id",
    },
    {
      id: "2",
      name: "Fotohokkie Analytics Dashboard",
      role: "Management Dashboard",
      image: "images/dashboard-fotohokkie.webp",
      bio: "An internal reporting system tracking Rp18.6 billion in annual transaction value, engineered with Next.js, HeroUI, and PostgreSQL.",
      href: "/confidential",
    },
    {
      id: "3",
      name: "NeedABeauty POS",
      role: "Mobile Point of Sale",
      image: "images/needabeauty.jpg",
      bio: "A mobile cashier application featuring open bill management and hold transaction states for front-desk operations, built with Flutter.",
      href: "/confidential",
    },
    // {
    //   id: "4",
    //   name: "INTANET Attendance",
    //   role: "Location-based Mobile App",
    //   image: "images/intanet-attendance.jpg",
    //   bio: "A field technician attendance tracker with geolocation and leave request workflows, built using React Native Expo.",
    //   href: "/confidential",
    // },
    {
      id: "5",
      name: "AI Lecturer Assistant",
      role: "RAG-LLM Web Application",
      image: "images/chatbot.jpg",
      bio: "A virtual assistant leveraging Retrieval-Augmented Generation with the Gemini API, Next.js, and pgvector in PostgreSQL.",
      href: "https://chatbot-hazel-one-96.vercel.app",
    },
  ];

  const onCardClick = (member: ProjectTypes) => {
    router.push(member.href || "/confidential");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.3 },
      }}
      viewport={{ once: true, margin: "100px" }}
      id="projects"
      className="flex flex-col w-full items-center justify-center my-10"
    >
      <div className="flex items-center flex-col justify-center w-full space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-tighter sm:text-3xl">
          [ Projects ]
        </h2>
        <TeamCarousel
          members={projects}
          cardWidth={400}
          grayscaleEffect={false}
          onCardClick={onCardClick}
          showDots={false}
          className="space-y-6"
          cardClassName="shadow-lg"
        />
      </div>
    </motion.div>
  );
}
