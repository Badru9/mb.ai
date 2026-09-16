// "use client";

// import { Project } from "@/lib/types";
// import { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import Image from "next/image";
// import { motion } from "motion/react";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function Projects() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const galleryWrapperRef = useRef<HTMLDivElement>(null);
//   const galleryStripRef = useRef<HTMLDivElement>(null);

//   const projects: Project[] = [
//     {
//       id: "0",
//       name: "BADRUDEV",
//       description: "Personal Portfolio Website",
//       image: "images/badrudev.webp",
//       link: "https://badrudev.vercel.app",
//       tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "HeroUI"],
//       colSpan: 3,
//     },
//     {
//       id: "1",
//       name: "INTANET",
//       description: "Company Profile Website",
//       image: "images/intanet.webp",
//       link: "https://intanet.id",
//       tags: ["GatsbyJS", "TypeScript", "Tailwind CSS"],
//       colSpan: 3,
//     },
//     {
//       id: "2",
//       name: "Dashboard INTANET",
//       description: "Management Dashboard for INTANET",
//       image:
//         "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
//       link: "/confidential",
//       tags: ["ReactJS", "Laravel", "MySQL"],
//       colSpan: 2,
//     },
//     {
//       id: "3",
//       name: "Fotohokkie",
//       description: "Booking Platform for Photobox",
//       image: "images/fotohokkie.webp",
//       link: "https://fotohokkie.id",
//       tags: ["Next.js", "Tailwind CSS", "ExpressJS", "PostgreSQL"],
//       colSpan: 4,
//     },
//     {
//       id: "4",
//       name: "Dashboard Fotohokkie",
//       description:
//         "Management Dashboard for Fotohokkie ( Box, Branch, User, Admin, Transaction, Profit, Finance )",
//       image: "images/dashboard-fotohokkie.webp",
//       link: "/confidential",
//       tags: [
//         "NextJS",
//         "HeroUI",
//         "TailwindCSS",
//         "PostgreSQL",
//         "ExpressJS",
//         "ReactCharts",
//         "JWT",
//         "ReactQuery",
//       ],
//       colSpan: 2,
//     },
//     // {
//     //   id: '5',
//     //   name: 'E-Commerce',
//     //   description: 'Full-stack e-commerce platform',
//     //   image:
//     //     'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
//     //   link: 'https://example.com',
//     //   tags: ['Next.js', 'Stripe', 'PostgreSQL'],
//     // },
//   ];

//   useGSAP(
//     () => {
//       const wrapper = galleryWrapperRef.current;
//       const strip = galleryStripRef.current;
//       if (!wrapper || !strip) return;

//       if (window.matchMedia("(max-width: 767px)").matches) {
//         gsap.set(strip, { clearProps: "transform" });
//         return;
//       }

//       const stripWidth = strip.scrollWidth;
//       const scrollDistance = stripWidth - window.innerWidth;

//       gsap.to(strip, {
//         x: () => -scrollDistance,
//         ease: "none",
//         opacity: 1,
//         y: 0,
//         scrollTrigger: {
//           trigger: wrapper,
//           pin: true,
//           scrub: 1,
//           start: "top top",
//           end: () => `+=${stripWidth}`,
//           invalidateOnRefresh: true,
//         },
//       });
//     },
//     { scope: sectionRef, dependencies: [] },
//   );

//   useGSAP(() => {
//     const title = titleRef.current;

//     gsap.to(title, {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       scrollTrigger: {
//         trigger: title,
//         start: "top 80%",
//         end: "top 20%",
//         scrub: true,
//       },
//     });
//   }, []);

//   return (
//     <section
//       id="projects"
//       className="relative w-full self-stretch overflow-hidden"
//     >
//       <div className="grid grid-cols-6 gap-6 grid-rows-2 grid-flow-col auto-cols-fr">
//         {!!projects &&
//           projects.map((project) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
//               className="hover:cursor-pointer hover:shadow-md"
//               style={{
//                 gridColumn: project.colSpan
//                   ? `span ${project.colSpan} / span ${project.colSpan}`
//                   : undefined,
//                 gridRow: project.rowSpan
//                   ? `span ${project.rowSpan} / span ${project.rowSpan}`
//                   : undefined,
//               }}
//               // href={project.link}
//               // target="_blank"
//               // rel="noopener noreferrer"
//             >
//               <Image
//                 src={
//                   project.image.startsWith("http")
//                     ? project.image
//                     : `/${project.image}`
//                 }
//                 alt={project.name}
//                 loading="lazy"
//                 width={400}
//                 height={220}
//                 className="w-full h-full object-cover rounded-md"
//               />
//             </motion.div>
//           ))}
//       </div>
//       <div className="gallery-outro">
//         <div className="flex h-full flex-col items-center justify-center px-8">
//           <p className="text-center text-sm uppercase tracking-widest text-muted sm:text-lg">
//             More coming soon
//           </p>
//           <div className="mt-4 h-px w-12 bg-current opacity-30" />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { TeamCarousel, TeamMember } from "./lightswind/team-carousel";

interface ProjectTypes extends TeamMember {
  href?: string;
}

export default function Projects() {
  const router = useRouter();

  // const cards: ScrollCardsProps["cards"] = [
  //   {
  //     id: 1,
  //     image: "images/badrudev.webp",
  //     alt: "BADRUDEV",
  //   },
  //   {
  //     id: 2,
  //     image: "images/intanet.webp",
  //     alt: "INTANET",
  //   },
  //   {
  //     id: 3,
  //     image: "images/fotohokkie.webp",
  //     alt: "Fotohokkie",
  //   },
  //   {
  //     id: 4,
  //     image: "images/dashboard-fotohokkie.webp",
  //     alt: "Dashboard Fotohokkie",
  //   },
  // ];

  // const projects: Project[] = [
  //   {
  //     id: "0",
  //     name: "BADRUDEV",
  //     description: "Personal Portfolio Website",
  //     image: "images/badrudev.webp",
  //     link: "https://badrudev.vercel.app",
  //     tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "HeroUI"],
  //     colSpan: 3,
  //   },
  //   {
  //     id: "1",
  //     name: "INTANET",
  //     description: "Company Profile Website",
  //     image: "images/intanet.webp",
  //     link: "https://intanet.id",
  //     tags: ["GatsbyJS", "TypeScript", "Tailwind CSS"],
  //     colSpan: 3,
  //   },
  //   {
  //     id: "2",
  //     name: "Dashboard INTANET",
  //     description: "Management Dashboard for INTANET",
  //     image:
  //       "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  //     link: "/confidential",
  //     tags: ["ReactJS", "Laravel", "MySQL"],
  //     colSpan: 2,
  //   },
  //   {
  //     id: "3",
  //     name: "Fotohokkie",
  //     description: "Booking Platform for Photobox",
  //     image: "images/fotohokkie.webp",
  //     link: "https://fotohokkie.id",
  //     tags: ["Next.js", "Tailwind CSS", "ExpressJS", "PostgreSQL"],
  //     colSpan: 4,
  //   },
  //   {
  //     id: "4",
  //     name: "Dashboard Fotohokkie",
  //     description:
  //       "Management Dashboard for Fotohokkie ( Box, Branch, User, Admin, Transaction, Profit, Finance )",
  //     image: "images/dashboard-fotohokkie.webp",
  //     link: "/confidential",
  //     tags: [
  //       "NextJS",
  //       "HeroUI",
  //       "TailwindCSS",
  //       "PostgreSQL",
  //       "ExpressJS",
  //       "ReactCharts",
  //       "JWT",
  //       "ReactQuery",
  //     ],
  //     colSpan: 2,
  //   },
  //   // {
  //   //   id: '5',
  //   //   name: 'E-Commerce',
  //   //   description: 'Full-stack e-commerce platform',
  //   //   image:
  //   //     'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  //   //   link: 'https://example.com',
  //   //   tags: ['Next.js', 'Stripe', 'PostgreSQL'],
  //   // },
  // ];

  const projects: ProjectTypes[] = [
    {
      id: "1",
      name: "Intanet",
      role: "Company Profile Website",
      image: "images/intanet.webp",
      bio: "A company profile website for Intanet, built with GatsbyJS, TypeScript, and Tailwind CSS.",
      href: "https://intanet.id",
    },
    {
      id: "2",
      name: "Fotohokkie",
      role: "Booking Platform for Photobox",
      image: "images/fotohokkie.webp",
      bio: "A booking platform for Photobox, built with Next.js, Tailwind CSS, ExpressJS, and PostgreSQL.",
      href: "https://fotohokkie.id",
    },
    {
      id: "3",
      name: "Dashboard Fotohokkie",
      role: "Management Dashboard for Fotohokkie",
      image: "images/dashboard-fotohokkie.webp",
      bio: "A management dashboard for Fotohokkie, built with NextJS, HeroUI, TailwindCSS, PostgreSQL, ExpressJS, ReactCharts, JWT, and ReactQuery.",
      href: "/confidential",
    },
    // {
    //   id: "4",
    //   name: "Dashboard Intanet",
    //   role: "Management Dashboard for Intanet",
    //   image:
    //     "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    //   bio: "A management dashboard for Intanet, built with ReactJS, Laravel, and MySQL.",
    //   href: "/confidential",
    // },
  ];

  const onCardClick = (member: ProjectTypes) => {
    // Handle card click event here
    router.push(member.href || "/confidential");
  };

  // useGSAP(
  //   () => {
  //     const wrapper = galleryWrapperRef.current;
  //     const strip = galleryStripRef.current;
  //     if (!wrapper || !strip) return;

  //     if (window.matchMedia("(max-width: 767px)").matches) {
  //       gsap.set(strip, { clearProps: "transform" });
  //       return;
  //     }

  //     const stripWidth = strip.scrollWidth;
  //     const scrollDistance = stripWidth - window.innerWidth;

  //     gsap.to(strip, {
  //       x: () => -scrollDistance,
  //       ease: "none",
  //       opacity: 1,
  //       y: 0,
  //       scrollTrigger: {
  //         trigger: wrapper,
  //         pin: true,
  //         scrub: 1,
  //         start: "top top",
  //         end: () => `+=${stripWidth}`,
  //         invalidateOnRefresh: true,
  //       },
  //     });
  //   },
  //   { scope: sectionRef, dependencies: [] },
  // );

  // useGSAP(() => {
  //   const title = titleRef.current;

  //   gsap.to(title, {
  //     opacity: 1,
  //     y: 0,
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: title,
  //       start: "top 80%",
  //       end: "top 20%",
  //       scrub: true,
  //     },
  //   });
  // }, []);

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
      {/* <div className="grid grid-cols-6 gap-6 grid-rows-2 grid-flow-col auto-cols-fr">
        {!!projects &&
          projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
              className="hover:cursor-pointer hover:shadow-md"
              style={{
                gridColumn: project.colSpan
                  ? `span ${project.colSpan} / span ${project.colSpan}`
                  : undefined,
                gridRow: project.rowSpan
                  ? `span ${project.rowSpan} / span ${project.rowSpan}`
                  : undefined,
              }}
              // href={project.link}
              // target="_blank"
              // rel="noopener noreferrer"
            >
              <Image
                src={
                  project.image.startsWith("http")
                    ? project.image
                    : `/${project.image}`
                }
                alt={project.name}
                loading="lazy"
                width={400}
                height={220}
                className="w-full h-full object-cover rounded-md"
              />
            </motion.div>
          ))}
      </div> */}
      <div className="flex items-center flex-col justify-center w-full space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-tighter sm:text-3xl">
          [ Projects ]
        </h2>
        <TeamCarousel
          members={projects}
          cardWidth={700}
          grayscaleEffect={false}
          onCardClick={onCardClick}
          showDots={false}
        />
      </div>
    </motion.div>
  );
}
