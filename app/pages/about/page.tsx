"use client";

import { Flex, Heading, Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <>
      <Flex direction="column">
        <Heading margin="2%">
          Dallery is build with Next.js, TypeScript and Firebase and deploying
          via Vercel.
        </Heading>

        <Heading margin="2%">
          Dallery is a spot to curate and collect images, in my case it was to
          eventually serve as a digital catalogue of the many doodles and
          snippets I've collected over the years.
        </Heading>

        <Heading margin="2%">
          I'd love to hear from you! Please get in contact with me{" "}
          <Button variant="outline">
            {" "}
            <Link href="/pages/contact">Here</Link>
          </Button>
        </Heading>
      </Flex>
    </>
  );
};

export default AboutPage;
