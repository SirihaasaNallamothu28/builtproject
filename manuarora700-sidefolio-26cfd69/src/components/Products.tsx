"use client";
import React from "react";
import { Heading } from "./Heading";
import { Product } from "@/types/products";
import Link from "next/link";
import Image from "next/image";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";

export const Products = () => {
  // These will be our diversity initiatives
  const initiatives = [
    {
      title: "Mentorship Program",
      description: "Connecting underrepresented tech talent with industry leaders for personalized guidance and career development.",
      thumbnail: "/images/logos/mentorship.png",
      href: "/initiatives/mentorship",
      slug: "mentorship",
      stack: ["Education", "Career Development", "Networking"]
    },
    {
      title: "Scholarship Fund",
      description: "Financial support for individuals from marginalized communities to pursue education and training in technology fields.",
      thumbnail: "/images/logos/scholarship.png",
      href: "/initiatives/scholarship",
      slug: "scholarship",
      stack: ["Education", "Funding", "Opportunity"]
    },
    {
      title: "Inclusive Hackathons",
      description: "Collaborative coding events designed to foster innovation while ensuring participation from diverse backgrounds and perspectives.",
      thumbnail: "/images/logos/hackathon.png",
      href: "/initiatives/hackathons",
      slug: "hackathons",
      stack: ["Community", "Coding", "Innovation"]
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        {initiatives.map((initiative, idx: number) => (
          <motion.div
            key={initiative.href}
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 0.2, delay: idx * 0.1 }}
          >
            <Link
              href={initiative.slug ? `/initiatives/${initiative.slug}` : initiative.href}
              key={initiative.href}
              className="group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50 rounded-2xl transition duration-200 pt-4"
            >
              <Image
                src={initiative.thumbnail}
                alt={initiative.title}
                height="200"
                width="200"
                className="rounded-md"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <Heading
                    as="h4"
                    className="font-black text-lg md:text-lg lg:text-lg "
                  >
                    {initiative.title}
                  </Heading>
                  <Paragraph className="text-sm md:text-sm lg:text-sm mt-2 max-w-xl">
                    {initiative.description}
                  </Paragraph>
                </div>
                <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
                  {initiative.stack?.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs md:text-xs lg:text-xs bg-gray-50 px-2 py-1 rounded-sm text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
