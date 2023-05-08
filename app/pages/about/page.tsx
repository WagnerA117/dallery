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
  const userId = auth.currentUser?.uid;

  const handleSave = async () => {
    console.log(userId);

    const docRef = doc(db, "users", userId);

    await updateDoc(docRef, {
      name: text,
    });

    const imageObject = {
      imageId: v4(),
      imageName: "test2",
      isFavourited: true,
      uid: userId,
      createdAt: new Date(),
      isFavourite: false,
    };

    await updateDoc(docRef, {
      images: arrayUnion(imageObject),
    });
  };

  //    try {
  //      const newUser = await addDoc(collection(db, `users/${userId}`), {
  //        name: text,
  //        id: auth.currentUser?.uid,
  //        customId: v4(),
  //        createdAt: new Date(),
  //        updatedAt: new Date(),
  //      });

  //      return newUser;
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };

  return (
    <>
      <Flex justifyContent="center">
        <Heading>This will be the about page</Heading>

        <Input
          placeholder="Enter your name"
          onChange={(e) => setText(e.target.value)}
        ></Input>
        <Input
          placeholder="Enter your about"
          onChange={(e) => setAbout(e.target.value)}
        ></Input>
        <Button onClick={handleSave}> Click to save your name</Button>
      </Flex>
    </>
  );
};

export default AboutPage;
