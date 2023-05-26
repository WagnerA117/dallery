"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      emailAddress: "",
      emailContent: "",
    },
    onSubmit: (values) => {
      if (formik.values.emailContent.length > 0) {
        console.log(values, "Sending email");
      } else console.log("no info");
    },
  });

  const handleCancel = () => {
    formik.resetForm();
  };

  const sendEmail = async (data) =>
    fetch("../api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

  //  const {
  //    data: queryData,
  //    error,
  //    isLoading,
  //  } = useQuery({
  //    queryKey: "contact",
  //    queryFn: sendEmail,
  //  });

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

      <Box margin="2%" maxW="80%">
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          ></Input>

          <FormLabel>Email</FormLabel>
          <Input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          ></Input>

          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
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

          <Flex marginTop={4}>
            <Button
              type="submit"
              bg="green.400"
              disabled={formik.values.emailContent.length < 2}
            >
              {" "}
              Let loose the digital ravens!
            </Button>
            <Button bg="red.400" onClick={handleCancel}>
              {" "}
              Cancel
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default ContactPage;
