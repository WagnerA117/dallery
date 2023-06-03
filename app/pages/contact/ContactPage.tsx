"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";

import useCustomToast from "../../customHooks/useCustomToast";

interface EmailValuesType {
  name: string;
  emailAddress: string;
  emailContent: string;
}

//1) Create custom hook outside of body?
const usePostContact = () => {
  return useMutation({
    mutationKey: ["contact"],
    mutationFn: async (values: EmailValuesType) => {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      return result.json();
    },
  });
};

const ContactPage = () => {
  // 2) destructuring the values needed from
  //the custom hook
  const { mutate: postContact } = usePostContact();

  const showToast = useCustomToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      emailAddress: "",
      emailContent: "",
    },
    onSubmit: (values) => {
      if (formik.values.emailContent.length > 0) {
        //3)call the custom hook
        postContact(values, {
          onSuccess: () => {
            console.log("email sent"!);
            formik.resetForm();
            showToast("Email Sent!", "Thanks for getting in touch!", "success");
          },
        });
      } else console.log("no info");
    },
  });

  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <>
      <Box margin={4}>
        <Heading marginBottom={4}> Get in touch!</Heading>

        <Heading size="md" maxW="60%">
          <p>
            Whether its an idea for a feature, a bug you've found, suggestions
            or would just like to chat about art. I'd love to hear from you!
          </p>
          <br />
        </Heading>
      </Box>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            ></Input>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="emailAddress">Email</FormLabel>
            <Input
              id="emailAddress"
              name="emailAddress"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
            ></Input>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="emailContent">Message</FormLabel>
            <Textarea
              alignItems="left"
              required
              minH="200px"
              errorBorderColor="red.300"
              id="emailContent"
              name="emailContent"
              onChange={formik.handleChange}
              value={formik.values.emailContent}
            />
          </FormControl>

          <Button
            type="submit"
            bg="green.400"
            disabled={formik.values.emailContent.length < 2}
          >
            Let loose the digital ravens!
          </Button>
          <Button bg="red.400" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </div>

      {/*<Formik
	  initialValues={{name:'',
	  emailAddress:'',
	  emailContent:'',}}>
        <Box as="form" margin="2%" maxW="80%">
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            ></Input>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="emailAddress">Email</FormLabel>
            <Input
              id="emailAddress"
              name="emailAddress"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
            ></Input>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="emailContent">Message</FormLabel>
            <Textarea
              alignItems="left"
              required
              minH="200px"
              errorBorderColor="red.300"
              id="emailContent"
              name="emailContent"
              onChange={formik.handleChange}
              value={formik.values.emailContent}
            />
          </FormControl>

          <Button
            type="submit"
            bg="green.400"
            disabled={formik.values.emailContent.length < 2}
          >
            Let loose the digital ravens!
          </Button>
          <Button bg="red.400" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Formik>*/}
    </>
  );
};

export default ContactPage;
