"use client";

import { AuthProvider } from "@/authContext";
import { MantineProvider } from "@mantine/core";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <MantineProvider>{children}</MantineProvider>
    </AuthProvider>
  );
}
