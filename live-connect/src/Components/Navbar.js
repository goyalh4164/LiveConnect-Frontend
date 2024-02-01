// components/Navbar.js

import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex align="center">
        <ChakraLink as={RouterLink} to="/" mr={4}>
          <Heading as="h2" size="md">
            LiveConnect
          </Heading>
        </ChakraLink>

        <Spacer />
        <Flex>
          <ChakraLink as={RouterLink} to="/login" mr={4}>
            Login
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/register">
            Register
          </ChakraLink>
        </Flex>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default Navbar;
