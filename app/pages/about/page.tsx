"use client";

import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";

const AboutPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  //ideas include an about the idea of project
  //
  return (
    <>
      <Flex justifyContent="center">
        <Heading>This will be the about page</Heading>
      </Flex>
    </>
  );
};

export default AboutPage;
