import React, { useContext } from "react";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import AuthContext from "@/app/firebase/AuthProvider ";

const buttonStyle = {
  bg: " orange.400",
  padding: "4",
  margin: "4",
  _hover: {
    bg: "starNight.medium",
  },
};

const SignInOptions = () => {
  const { googleLogin, gitHubLogin } = useContext(AuthContext);
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDir="column"
        bg="starNight.dark"
        maxH="480"
        maxW="480"
      >
        <Heading size="lg"> Sign in to continue</Heading>{" "}
        <Button sx={buttonStyle} onClick={gitHubLogin}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt=" This is the GitHub SignIn Option Icon"
            height="30px"
            maxW="30px"
            margin="0.5em"
          />{" "}
          Sign In with GitHub
        </Button>
        <Button sx={buttonStyle} onClick={googleLogin}>
          {" "}
          <Image
            bg="orange.400"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
            alt=" This is the Gmail Sign In Option"
            height="30px"
            maxW="30px"
            margin="0.5em"
          />{" "}
          Sign In with Gmail
        </Button>
      </Flex>
    </Box>
  );
};

export default SignInOptions;
