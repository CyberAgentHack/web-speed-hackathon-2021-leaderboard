import React, { useCallback } from "react";
import { authenticator, supabaseStrategy } from "~/libs/auth.server";
import { supabaseClient } from "~/libs/supabase.server";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

type Data = {
  googleAuthUrl: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  await supabaseStrategy.checkSession(request, {
    successRedirect: "/dashboard",
  });

  const { url } = await supabaseClient.auth.signIn(
    {
      provider: "google",
    },
    {
      redirectTo: `${new URL(request.url).origin}/auth/callback`,
    }
  );
  return { googleAuthUrl: url } as Data;
};

const Login = () => {
  const { googleAuthUrl } = useLoaderData<Data>();
  const goGoogleAuth = useCallback(() => {
    window.location.href = googleAuthUrl;
  }, [googleAuthUrl]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.500"}>
            & join the Frontend Performance Contest ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              leftIcon={<FaGoogle />}
              onClick={goGoogleAuth}
            >
              Google
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
