import { Flex, Loader as Spinner } from "@mantine/core";

export default function Loader() {
  return (
    <Flex h="80vh" justify="center" align="center">
      <Spinner color="blue" />;
    </Flex>
  );
}
