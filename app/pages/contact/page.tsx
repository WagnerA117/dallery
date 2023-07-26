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
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import useCustomToast from "../../customHooks/useCustomToast";

interface EmailValuesType {
  name: string;
  emailAddress: string;
  emailContent: string;
  token?: string;
}

console.log(process.env.NEXT_PUBLIC_DEV_EMAIL);

//1) Create custom hook outside of body?

const ContactPage = () => {
  // 2) destructuring the values needed from
  //the custom hook

  const reRef = useRef<ReCAPTCHA>(null);

  const usePostContact = () => {
    return useMutation({
      mutationKey: ["contact"],
      mutationFn: async (values: EmailValuesType) => {
        const token = await reRef.current?.executeAsync();

        reRef.current?.reset();

        const result = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, token }),
        });

        return result.json();
      },
    });
  };
  const { mutate: postContact } = usePostContact();

  const showToast = useCustomToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      emailAddress: "",
      emailContent: "",
    },
    onSubmit: async (values) => {
      if (formik.values.emailContent.length > 0) {
        //3)call the custom hook
        postContact(values, {
          onSuccess: () => {
            formik.resetForm();
            showToast("Email Sent!", "Thanks for getting in touch!", "success");
          },
          onError: () => {
            formik.resetForm();
            showToast(
              "Error",
              "Something went wrong, please try again! ",
              "error"
            );
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
      <Box>
        <Heading marginBottom={4}> Get in touch!</Heading>

        <Heading lineHeight={2} size="md" maxW="60%">
          <p>
            Whether its an idea for a feature , a bug you've found, suggestions{" "}
            <br /> or would just like to chat about art. I'd love to hear from
            you!
          </p>
        </Heading>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel marginTop="1%" htmlFor="name">
            Name
          </FormLabel>
          <Input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel marginTop="1%" htmlFor="emailAddress">
            Email
          </FormLabel>
          <Input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel marginTop="1%" htmlFor="emailContent">
            Message
          </FormLabel>

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

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY_V2 as string}
          size="invisible"
          ref={reRef}
        />

        <Button
          type="submit"
          bg="green.400"
          disabled={formik.values.emailContent.length < 2}
        >
          Send the digital pigeon!
        </Button>
        <Button margin="2%" bg="red.400" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </>
  );
};

export default ContactPage;
