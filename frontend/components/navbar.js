import Link from "next/link";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { useAuth } from "../hooks/auth";
import Cart from "../components/cart";

const NavLink = () => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuth({ middleware: "guest" });
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link href="/">Art Store</Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7} alignItems={"center"}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Cart />

            {typeof window !== "undefined" && window.localStorage.token ? (
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            ) : (
              <Box height="full">
                <Link href="/login">
                  <a>Admin Login</a>
                </Link>
              </Box>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
