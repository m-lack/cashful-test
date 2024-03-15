"use client";

import { Flex, Paper, Text, Title } from "@mantine/core";

export default function Stats({ total, balance, name }) {
  return (
    <Flex justify="space-around" gap="5vh">
      <Paper withBorder w="50vh" p="5vh" shadow="md">
        <Flex direction="column" gap="sm" align="center">
          <Title order={3}>Account holder</Title>
          <Text>{name}</Text>
        </Flex>
      </Paper>
      <Paper withBorder w="50vh" p="5vh" shadow="md">
        <Flex direction="column" gap="sm" align="center">
          <Title order={3}>Total Transactions</Title>
          <Text>{total}</Text>
        </Flex>
      </Paper>
      <Paper withBorder w="50vh" p="5vh" shadow="md">
        <Flex direction="column" gap="sm" align="center">
          <Title order={3}>Balance</Title>
          <Text>{balance}</Text>
        </Flex>
      </Paper>
    </Flex>
  );
}
