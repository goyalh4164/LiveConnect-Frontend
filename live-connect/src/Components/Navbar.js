import React, { useState, useEffect } from 'react';
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
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import SearchResults from './SearchResults';

const Navbar = () => {
  const { isAuthenticated, logout, authToken } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation(); // React Router hook to get the current location

  useEffect(() => {
    // Reset search results when the location changes
    setSearchResults([]);
  }, [location]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/get-all-users/${searchQuery}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      setSearchResults(response.data.users);
    } catch (error) {
      console.error(
        'Error searching users:',
        error.response ? error.response.data : error.message
      );
    }
  };

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
          <InputGroup size="md" mr={4}>
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleSearch}>
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        )}

        <Flex>
          {isAuthenticated() ? (
            <>
              {/* Conditionally render based on the current route */}
              {location.pathname === '/profile' ? (
                <ChakraLink as={RouterLink} to="/dashboard" mr={4}>
                  Dashboard
                </ChakraLink>
              ) : (
                <ChakraLink as={RouterLink} to="/profile" mr={4}>
                  Profile
                </ChakraLink>
              )}
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
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

      {/* Display SearchResults component */}
      {searchQuery && isAuthenticated() && searchResults.length > 0 && (
        <SearchResults results={searchResults} />
      )}
    </Box>
  );
};

export default Navbar;
