// components/Navbar.js

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Link as ChakraLink,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex align="center">
        <ChakraLink as={RouterLink} to="/" mr={4}>
          <Heading as="h2" size="md">
            LiveConnect
          </Heading>
        </ChakraLink>

        <Spacer />

        {isAuthenticated() && (
          // Display the search bar only when the user is logged in
          <InputGroup size="md" mr={4}>
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              {/* Add functionality for search button */}
              <Button h="1.75rem" size="sm">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        )}

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
