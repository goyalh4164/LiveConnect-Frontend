// components/Navbar.js

import React from 'react';
import { Box, Flex, Heading, Spacer, Link as ChakraLink, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex align="center">
        <Heading as="h2" size="md">
          LiveConnect
        </Heading>
        <Spacer />
        <Flex>
          <ChakraLink as={Link} to="/" mr={4}>
            Home
          </ChakraLink>
          <ChakraLink as={Link} to="/chat">
            Chat
          </ChakraLink>
        </Flex>
        <Spacer />
        <Button colorScheme="white" variant="outline">
          Sign In
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
