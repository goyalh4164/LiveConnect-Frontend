// components/SearchResults.js

import React from 'react';
import {
  Box,
  Text,
  Link as ChakraLink,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SearchResults = ({ results }) => {
  return (
    <Box
      mt={4}
      ml={4}
      p={2}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      maxH="200px"
      overflowY="auto"
    >
      <Text fontWeight="bold" mb={2}>
        Search Results:
      </Text>
      {results.map(user => (
        <HStack key={user._id} align="start" spacing={2} mb={2}>
          <Text color="teal.500" fontWeight="bold" display="block">
            {user.name}
          </Text>
          <HStack>
            <Button colorScheme="teal" size="sm">
              Chat
            </Button>
          </HStack>
        </HStack>
      ))}
    </Box>
  );
};

export default SearchResults;
