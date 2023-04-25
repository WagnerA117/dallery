import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";

import AuthContext from "../firebase/AuthProvider";

const Navbar: React.FC = () => {
  const { currentUser, login, logout } = useContext(AuthContext);

  const customButtonStyle = {
    backgroundColor: "starNight.medium",
    color: "white",
    borderRadius: "md",
    _hover: {
      backgroundColor: "starNight.light",
    },
    _active: {
      backgroundColor: "teal.700",
    },
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="2%"
      margin="1%"
      bg="starNight.dark"
    >
      <Button sx={customButtonStyle}>
        {" "}
        <Link href="/">Home</Link>
      </Button>
      <Button sx={customButtonStyle}>
        {" "}
        <Link href="./pages/galleries">Galleries</Link>
      </Button>
      <Button sx={customButtonStyle}>
        {" "}
        <Link href="./pages/contact">Contact</Link>
      </Button>{" "}
      <Button sx={customButtonStyle}>
        {" "}
        <Link href="./pages/about">About</Link>
      </Button>
      {/*<Button sx={customButtonStyle}>
        {" "}
        <Link href="./pages/profile">Profile</Link>
      </Button>*/}
      {currentUser ? (
        <Button bg="orange.500" onClick={logout}>
          {" "}
          Logout
        </Button>
      ) : (
        <Button bg="orange.500" onClick={login}>
          Login
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
