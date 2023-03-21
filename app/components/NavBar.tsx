import {Box, Button, Flex} from "@chakra-ui/react";
import Link from "next/link";

const Navbar: React.FC = () => {
	const customButtonStyle = {
		backgroundColor: "teal.500",
		color: "white",
		borderRadius: "md",
		_hover: {
			backgroundColor: "teal.600",
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
			backgroundColor="yellow.400"
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
				<Link href="./pages/contact">Contact Dallery</Link>
			</Button>{" "}
			<Button sx={customButtonStyle}>
				{" "}
				<Link href="./pages/about">About Dallery</Link>
			</Button>
			<Button bg="orange.500">
				{" "}
				<Link href="./pages/login">Login </Link>
			</Button>
			<Button bg="orange.500">
				{" "}
				<Link href="./pages/about">Sign Up</Link>
			</Button>
		</Flex>
	);
};

export default Navbar;
