import AuthContext from "@/app/firebase/AuthProvider ";
import { AddIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Image, Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

const buttonStyle = {
  bg: " orange.400",
  padding: "4",
  margin: "4",
};

const SignInOptions = () => {
  const { emailLogin, googleLogin, gitHubLogin, newUserEmailLogin } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = () => {
    //@ts-ignore
    emailLogin(email, password);
  };

  const handleNewUserEmailLogin = () => {
    //@ts-ignore
    newUserEmailLogin(email, password);
  };

  {
    /*<Button
  sx={buttonStyle}
  onClick={() => handleEmailLogin}
  leftIcon={<ArrowRightIcon />}
  >
  Login
  </Button>
  <Button
  sx={buttonStyle}
  leftIcon={<AddIcon />}
  onClick={() => handleNewUserEmailLogin}
  >
  Create Account
  </Button>*/
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="2%"
        margin="1%"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDir="column"
          maxH="480"
          maxW="480"
          padding="2%"
        >
          <Heading size="lg"> Sign in to continue</Heading>{" "}
          <Button sx={buttonStyle} onClick={gitHubLogin}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt=" This is the GitHub SignIn Option Icon"
              height="30px"
              width="100%"
              margin="0.5em"
            />{" "}
            Sign In with GitHub
          </Button>
          <Button sx={buttonStyle} onClick={googleLogin}>
            {" "}
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
              alt=" This is the Gmail Sign In Option"
              height="30px"
              width="100%"
              margin="0.5em"
            />{" "}
            Sign In with Gmail
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default SignInOptions;
