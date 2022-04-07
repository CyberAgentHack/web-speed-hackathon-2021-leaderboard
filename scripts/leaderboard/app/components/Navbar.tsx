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
import { Link } from "@remix-run/react";

type Props = {
  user: User | null;
};

export const Navbar = ({ user }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Link to="/dashboard">
              <Heading as="h1" fontSize={{ base: "xl", sm: "2xl" }}>
                FPC 2022
              </Heading>
            </Link>
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
                  <Link to="/dashboard/teams">
                    <MenuItem pb={2}>Teams</MenuItem>
                  </Link>
                  <Link to="/auth/logout">
                    <MenuItem pb={2}>Logout</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
