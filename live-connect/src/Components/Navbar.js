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
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

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
          {isAuthenticated() ? (
            <>
              {/* Render "Profile" button if the user is authenticated */}
              <ChakraLink as={RouterLink} to="/profile" mr={4}>
                Profile
              </ChakraLink>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              {/* Render "Login" and "Register" buttons if the user is not authenticated */}
              <ChakraLink as={RouterLink} to="/login" mr={4}>
                Login
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/register">
                Register
              </ChakraLink>
            </>
          )}
        </Flex>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default Navbar;
