import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">🤝🏽</span>
      <Heading className="font-black">Diversity in Technology</Heading>
      <Paragraph className="max-w-xl mt-4">
        Building a more <Highlight>inclusive tech ecosystem</Highlight> where
        diversity drives innovation and empowers communities
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Our platform connects underrepresented groups with{" "}
        <Highlight>opportunities, resources, and mentorship</Highlight> to
        foster diversity and inclusion in the technology sector.
      </Paragraph>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Our Initiatives
      </Heading>
      <Products />
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Partner Organizations
      </Heading>
      <TechStack />
    </Container>
  );
}
