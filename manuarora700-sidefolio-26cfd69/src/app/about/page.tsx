import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import Image from "next/image";

import { motion } from "framer-motion";
import { AlumniNotes } from "@/components/AlumniNotes";

export const metadata: Metadata = {
  title: "Alumni Notes | University Resources",
  description:
    "Browse and share course notes from alumni to help current students succeed in their classes.",
};

export default function AboutPage() {
  return (
    <Container>
      <span className="text-4xl">📚</span>
      <Heading className="font-black">Alumni Notes</Heading>
      <AlumniNotes />
    </Container>
  );
}
