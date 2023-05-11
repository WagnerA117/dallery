"use client";

import { auth, db } from "@/app/firebase/clientApp ";
import { Flex, Heading } from "@chakra-ui/react";
import { Button, Input } from "@chakra-ui/react";
import { arrayUnion, setDoc, updateDoc } from "firebase/firestore";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";

const AboutPage = () => {
  const [text, setText] = useState("");
  const [about, setAbout] = useState("");
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
