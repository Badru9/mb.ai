"use client";

import { Button, Link, toast } from "@heroui/react";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface SocialTypes {
  id: number;
  name: string;
  href: string;
  icon: ReactNode;
}

export default function Contact() {
  // const subject = encodeURIComponent(
  //   "Hello from Your Portfolio – Let's Connect",
  // );
  // const body = encodeURIComponent(
  //   `Hi Badru,\n\nI came across your portfolio and would like to discuss the following:\n\n[Describe your needs/opportunity here]\n\nCould you let me know your availability for a quick chat?\n\nBest regards,\n[Your Name]`,
  // );

  const socials: SocialTypes[] = [
    // {
    //   id: 1,
    //   name: "Send Email to mohbadru.dev@gmail.com",
    //   href: `#contact`,
    //   icon: <PaperPlaneTiltIcon size={48} weight="bold" />,
    // },
    {
      id: 2,
      name: "GitHub",
      href: "https://github.com/Badru9",
      icon: <GithubLogoIcon size={48} weight="bold" />,
    },
    {
      id: 3,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mohammad-badrujaman-784278259/",
      icon: <LinkedinLogoIcon size={48} weight="bold" />,
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
      className="flex space-x-6"
    >
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.3 },
        }}
        viewport={{ once: true }}
        id="contact"
        className="flex w-full flex-col items-center justify-center gap-4 px-5 py-16 sm:gap-5 sm:px-10 sm:py-32 scroll-mt-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
          viewport={{ once: true }}
          className="text-2xl font-bold uppercase tracking-tighter sm:text-3xl"
        >
          [ Social ]
        </motion.h2>
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
          viewport={{ once: true }}
          className="flex w-full items-center justify-center gap-4 sm:gap-5"
        >
          {socials.map((social, index) => (
            <motion.span
              key={social.id}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.5 + index * 0.2 },
              }}
              viewport={{ once: true }}
            >
              <Link
                href={social.href}
                target={social.name === "Send Email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.name}
                className="no-underline group "
              >
                <Button size="lg" variant="outline">
                  {social.icon} {social.name}
                </Button>
              </Link>
            </motion.span>
          ))}
        </motion.div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.3 },
        }}
        viewport={{ once: true }}
        id="contact"
        className="flex w-full flex-col items-center justify-center gap-4 px-5 py-16 sm:gap-5 sm:px-10 sm:py-32 scroll-mt-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
          viewport={{ once: true }}
          className="text-2xl font-bold uppercase tracking-tighter sm:text-3xl"
        >
          [ Contact Me ]
        </motion.h2>
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
          viewport={{ once: true }}
          className="flex w-full items-center justify-center gap-4 sm:gap-5"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.5 },
            }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="outline"
              onPress={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText("mohbadru.dev@gmail.com");

                  toast("Email Copied to Clipboard!", {
                    variant: "success",
                  });
                } else {
                  toast("Clipboard API not supported!", {
                    variant: "danger",
                  });
                }
              }}
            >
              Send Email to <strong> mohbadru.dev@gmail</strong> to discuss your
              needs/opportunity
            </Button>
          </motion.span>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
