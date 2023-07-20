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

//1) Create custom hook outside of body?

const ContactPage = () => {
  // 2) destructuring the values needed from
  //the custom hook

  const reRef = useRef<ReCAPTCHA>(null);

  const usePostContact = () => {
    return useMutation({
      mutationKey: ["contact"],
      mutationFn: async (values: EmailValuesType) => {
        console.log("this ran");
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
            console.log("email sent!");
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
        </Heading>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="emailAddress">Email</FormLabel>
          <Input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
          />
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
          Let loose the digital ravens!
        </Button>
        <Button bg="red.400" onClick={handleCancel}>
          Cancel
        </Button>
      </form>

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
