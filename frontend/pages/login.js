import React, { useState, useEffect } from "react";
import Nav from "../components/navbar";
import useSWR from "swr";
import axios from "../lib/axios";
import { useAuth } from "../hooks/auth";
import { useRouter } from "next/router";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const login = () => {
  const router = useRouter();

  useEffect(() => {
    //  check if user is logged in
    if (router.query.reset?.length > 0) {
      setStatus(atob(router.query.reset));
    } else {
      setStatus(null);
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();

    const headers = {
      "Content-Type": `application/json`,
    };
    setLoading(true);
    const res = await axios.post(
      "/api/login",
      {
        email,
        password,
      },
      { headers }
    );
    setLoading(false);
    if (res.data.error) {
      setErrors(res.data.error);
    }
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Nav />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in as Admin</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Admin Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoFocus
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                {error && <Text color={"red.500"}>{error}</Text>}
                {status && <Text color={"green.500"}>{status}</Text>}
                {loading ? (
                  <Text color={"blue.500"}>Loading...</Text>
                ) : (
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={submitForm}
                  >
                    Sign in
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default login;
