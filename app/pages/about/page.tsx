"use client";

import { Button, Flex, IconButton, Input } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";

const AboutPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Flex justifyContent="center">
        <Button
          onClick={handleClick}
          width="60%"
          size="lg"
          bg="starNight.medium"
        >
          Upload Files
        </Button>

        <Input ref={inputRef} hidden type="file"></Input>
      </Flex>
    </>
  );
};

export default AboutPage;
