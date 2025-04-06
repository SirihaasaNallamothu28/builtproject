import Image from "next/image";
import React from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";

export const TechStack = () => {
  const partners = [
    {
      title: "Hack4Impact",
      className: "h-10 w-14",
    },
    {
      title: "BUILT UIUC",
      className: "h-10 w-10",
    },
  ];

  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Partner Organizations
      </Heading>
      <div className="flex flex-wrap">
        {partners.map((partner) => (
          <div
            key={partner.title}
            className="flex flex-col items-center mr-5 mb-6"
          >
            <span className="text-sm text-center">{partner.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
