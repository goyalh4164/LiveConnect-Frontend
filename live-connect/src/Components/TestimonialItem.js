import { Box, Text } from '@chakra-ui/react';
export const TestimonialItem = ({ name, role, testimonial }) => (
  <Box
    p={8}
    borderWidth="1px"
    borderRadius="md"
    boxShadow="md"
    bg="white"
    color="teal.500"
  >
    <Text fontSize="xl" mb={4}>
      "{testimonial}"
    </Text>
    <Text fontSize="lg" fontWeight="bold">
      {name}
    </Text>
    <Text fontSize="md">{role}</Text>
  </Box>
);
