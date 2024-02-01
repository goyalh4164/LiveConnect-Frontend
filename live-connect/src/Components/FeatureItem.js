import { Box, Heading, Text } from '@chakra-ui/react';
export const FeatureItem = ({ title, children }) => (
  <Box
    p={4}
    borderWidth="1px"
    borderRadius="md"
    boxShadow="md"
    bg="white"
    color="teal.500"
  >
    <Heading as="h3" size="lg" mb={2}>
      {title}
    </Heading>
    <Text>{children}</Text>
  </Box>
);
