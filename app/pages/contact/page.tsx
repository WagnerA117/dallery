"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      emailAddress: "",
      emailContent: "",
    },
    onSubmit: (values) => {
      if (formik.values.emailContent.length > 0) {
        console.log("Sending email");
      } else console.log("no info");
    },
  });

  return (
    <>
      <Box margin="2%">
        <Heading> Get in touch!</Heading>
        <Heading size="md">
          Whether its an idea for a feature, a bug you've found, suggestions or
          would just like to chat about art. I'd love to hear from you!
          <br />
          Send me an email below
        </Heading>
      </Box>

      <Box margin="2%">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>Send an Email</FormLabel>
            <Textarea
              alignItems="left"
              minH="200px"
              maxW="40%"
              id="emailContent"
              name="emailContent"
              onChange={formik.handleChange}
              value={formik.values.emailContent}
            />
          </FormControl>
          <Button type="submit"> Let loose the digital ravens!( Send)</Button>
        </form>
      </Box>
    </>
  );
};

export default ContactPage;
