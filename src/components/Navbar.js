"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/authContext";
import { Button, Paper, Flex, Title, Text, Anchor } from "@mantine/core";

export default function Navbar() {
  const router = useRouter();
  const { user, status, logout } = useAuth();

  const navigateTo = (to) => {
    router.replace(to);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/signin";
  };

  return (
    <>
      <Paper shadow="sm">
        <Flex
          bg="white"
          justify="space-between"
          align="center"
          px="3vh"
          py="md"
        >
          <Title order={1} style={{ cursor: "pointer" }}>
            Cashful
          </Title>
          {user && status === "authenticated" ? (
            <Flex gap="lg" align="center">
              <Text>{user?.email}</Text>
              <Anchor style={{ color: "red" }} onClick={handleLogout}>
                Logout
              </Anchor>
            </Flex>
          ) : status === "unauthenticated" ? (
            <Flex gap="lg">
              <Button onClick={() => navigateTo("/signin")}>Login</Button>
              <Button variant="outline" onClick={() => navigateTo("/signup")}>
                Create an account
              </Button>
            </Flex>
          ) : null}
        </Flex>
      </Paper>
    </>
  );
}
