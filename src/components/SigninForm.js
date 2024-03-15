"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/authContext";
import {
  TextInput,
  Button,
  Paper,
  Title,
  Flex,
  Text,
  Anchor,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { signIn } from "@/services/auth";
import { IconX } from "@tabler/icons-react";

export default function SigninForm() {
  let initialValues = {
    email: "",
    password: "",
  };

  const { status } = useAuth();

  const form = useForm({
    initialValues,
    validate: {
      email: (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value)
          ? null
          : "Please enter a valid email address";
      },
      password: (value) =>
        value.length < 8
          ? "Password must have at least 8 characters"
          : value.length > 20
          ? "Password must have maximum 20 characters"
          : null,
    },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await signIn(values);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        form.reset();
        setLoading(false);

        window.location.href = "/dashboard";
      } else {
        setLoading(false);
        notifications.show({
          title: "Error",
          message: response.data.message,
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          color: "red",
        });
      }
    } catch (err) {
      setLoading(false);
      notifications.show({
        title: "Error",
        message: "An error occured!",
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: "red",
      });
    }
  };

  if (status === "authenticated") return redirect("/dashboard");

  return (
    <>
      <Flex
        direction="column"
        h="80vh"
        gap="xl"
        justify="center"
        align="center"
      >
        <div>
          <Title>Login to your account</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
        </div>
        <Paper withBorder shadow="md" radius="md" w="80vh" p="xl">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction="column" gap="lg">
              <TextInput
                label="Email"
                type="email"
                {...form.getInputProps("email")}
                required
              />
              <TextInput
                label="Password"
                type="password"
                {...form.getInputProps("password")}
                required
              />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
              <Flex justify="center">
                <Button
                  type="submit"
                  variant="filled"
                  color="blue"
                  loading={loading}
                  loaderProps={{ type: "dots" }}
                >
                  Login
                </Button>
              </Flex>
            </Flex>
          </form>
        </Paper>
      </Flex>
    </>
  );
}
