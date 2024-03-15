"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
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
import { signUp } from "@/services/auth";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useAuth } from "@/authContext";

export default function SignupForm() {
  let initialValues = {
    display_name: "",
    email: "",
    password: "",
  };

  const { status } = useAuth();

  const form = useForm({
    initialValues,
    validate: {
      display_name: (value) =>
        value.length < 8
          ? "Display name must have at least 8 letters"
          : value.length > 50
          ? "Display name must have maximum 50 letters"
          : null,
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
      const response = await signUp(values);

      if (response.status === 200) {
        notifications.show({
          title: "Account created!",
          message: "Check your email to verify your account.",
          icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
          color: "teal",
        });
        form.reset();
        setLoading(false);
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
          <Title>Create an account</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{" "}
            <Anchor size="sm" component="button">
              Login
            </Anchor>
          </Text>
        </div>
        <Paper withBorder shadow="md" radius="md" w="80vh" p="xl">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction="column" gap="lg">
              <TextInput
                label="Display Name"
                {...form.getInputProps("display_name")}
                required
              />
              <TextInput
                label="Email"
                type="text"
                {...form.getInputProps("email")}
                required
              />
              <TextInput
                label="Password"
                type="password"
                {...form.getInputProps("password")}
                required
              />

              <Flex justify="center">
                <Button
                  mt="md"
                  type="submit"
                  variant="filled"
                  color="blue"
                  loading={loading}
                  loaderProps={{ type: "dots" }}
                >
                  Create
                </Button>
              </Flex>
            </Flex>
          </form>
        </Paper>
      </Flex>
    </>
  );
}
