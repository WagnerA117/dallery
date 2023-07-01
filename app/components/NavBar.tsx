"use client";

import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import ToggleThemeButton from "../components/ToggleTheme/ToggleTheme";
import AuthContext from "../firebase/AuthProvider";
import Link from "./Link/Link";

const Navbar: React.FC = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="2%"
      margin="2%"
    >
      <Button>
        {" "}
        <Link href="/"> Home </Link>
      </Button>
      <Button>
        {" "}
        <Link href="./pages/galleries">Galleries</Link>
      </Button>
      <Button>
        {" "}
        <Link href="./pages/contact">Contact</Link>
      </Button>{" "}
      <Button>
        {" "}
        <Link href="./pages/about">About</Link>
      </Button>
      {currentUser ? (
        <Button bg="orange.500" onClick={logout}>
          {" "}
          Logout
        </Button>
      ) : (
        <Button bg="orange.500" onClick={handleLogin}>
          {" "}
          Login
        </Button>
      )}
      <ToggleThemeButton />
    </Flex>
  );
};

export default Navbar;
