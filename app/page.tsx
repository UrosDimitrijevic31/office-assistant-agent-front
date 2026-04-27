import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Heading size="2xl" mb={4}>
          Office Assistant
        </Heading>
        <Text color="fg.muted">Your AI-powered office companion.</Text>
      </Box>
    </Box>
  );
}
