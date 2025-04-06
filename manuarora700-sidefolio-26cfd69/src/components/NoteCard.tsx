"use client";
import React from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";
import Link from "next/link";

export type Note = {
  title: string;
  description: string;
  driveLink: string;
};

export const NoteCard = ({ note, index }: { note: Note; index: number }) => {
  // Function to convert any Google link to its embed/preview form
  const getPreviewLink = (link: string): string => {
    // Drive files
    if (link.includes("drive.google.com/file/d/")) {
      const fileId = link.match(/\/d\/([^\/]+)/)?.[1] || "";
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    
    // Drive folders
    if (link.includes("drive.google.com/drive/folders/")) {
      const folderId = link.match(/\/folders\/([^\/]+)/)?.[1] || "";
      return `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
    }
    
    // Google Docs
    if (link.includes("docs.google.com/document/d/")) {
      const docId = link.match(/\/d\/([^\/]+)/)?.[1] || "";
      return `https://docs.google.com/document/d/${docId}/preview`;
    }
    
    // Google Sheets
    if (link.includes("docs.google.com/spreadsheets/d/")) {
      const sheetId = link.match(/\/d\/([^\/]+)/)?.[1] || "";
      return `https://docs.google.com/spreadsheets/d/${sheetId}/preview`;
    }
    
    // Google Slides
    if (link.includes("docs.google.com/presentation/d/")) {
      const slideId = link.match(/\/d\/([^\/]+)/)?.[1] || "";
      return `https://docs.google.com/presentation/d/${slideId}/embed`;
    }
    
    // Google Forms
    if (link.includes("docs.google.com/forms/d/")) {
      const formId = link.match(/\/d\/([^\/]+)/)?.[1] || "";
      return `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;
    }
    
    // Google Drawings
    if (link.includes("docs.google.com/drawings/d/")) {
      const drawingId = link.match(/\/d\/([^\/]+)/)?.[1] || "";
      return `https://docs.google.com/drawings/d/${drawingId}/preview`;
    }
    
    // If no pattern matches, return the original link
    return link;
  };

  // Get the appropriate icon text based on the link type
  const getLinkTypeText = (link: string): string => {
    if (link.includes("docs.google.com/document")) return "Open Doc";
    if (link.includes("docs.google.com/spreadsheets")) return "Open Sheet";
    if (link.includes("docs.google.com/presentation")) return "Open Slides";
    if (link.includes("docs.google.com/forms")) return "Open Form";
    if (link.includes("docs.google.com/drawings")) return "Open Drawing";
    return "Open in Drive";
  };

  return (
    <motion.div
      key={`note-${index}`}
      initial={{
        opacity: 0,
        x: -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className="mb-1.5rem border border-gray-100 rounded-lg p-1.5rem hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col">
        <Heading as="h4" className="font-black text-lg md:text-lg lg:text-lg">
          {note.title}
        </Heading>
        <Paragraph className="text-sm md:text-sm lg:text-sm mt-0.5rem mb-1rem">
          {note.description}
        </Paragraph>
        <div className="bg-gray-50 p-1rem rounded-md">
          <iframe
            src={getPreviewLink(note.driveLink)}
            width="100%"
            height="11.25rem"
            title={note.title}
            className="rounded-md mb-0.5rem"
            allowFullScreen
          ></iframe>
          <a
            href={note.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.25rem group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-lg shadow-black/20 sm:backdrop-blur-sm group-hover/button:bg-gray-50/15 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-sm font-medium px-1rem py-0.5rem mt-0.5rem origin-left"
          >
            {getLinkTypeText(note.driveLink)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-0.875rem h-0.875rem group-hover:translate-x-0.125rem transition-transform"
            >
              <path d="M5 12l14 0"></path>
              <path d="M13 18l6 -6"></path>
              <path d="M13 6l6 6"></path>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}; 