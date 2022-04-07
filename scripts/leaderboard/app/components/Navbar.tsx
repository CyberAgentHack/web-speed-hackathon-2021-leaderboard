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
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "@remix-run/react";
import { useCallback } from "react";

type Props = {
  user: User | null;
};

export const Navbar = ({ user }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navi = useNavigate();
  const goLogout = useCallback(() => {
    navi("/auth/logout");
  }, [navi]);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading as="h1" fontSize={{ base: "xl", sm: "2xl" }}>
              FPC 2022
            </Heading>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    name={user?.user_metadata.name ?? user?.email ?? "no user"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      name={
                        user?.user_metadata.name ?? user?.email ?? "no user"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user?.email ?? "no user"}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={goLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
