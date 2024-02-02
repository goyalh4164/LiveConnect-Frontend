// components/SearchResults.js

import React from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const SearchResults = ({ results }) => {
  const { authToken ,fetchFriends} = useAuth();
  
  const handleAddFriend = async (userId) => {
    console.log(authToken);
    console.log(userId);

    try {
      // Make an API request to add the user as a friend
      await axios.post(
        `http://localhost:8000/api/users/add-friend/${userId}`,
        null, // Pass null or an empty object as the second parameter if no request body is needed
        {
          headers: {
            Authorization: `${authToken}`, // Include the Authorization header
          },
        }
      );
      await fetchFriends();
      // Optionally, you can update the UI or show a notification upon successful friend addition
      console.log(`User with ID ${userId} added as a friend`);
    } catch (error) {
      console.error('Error adding friend:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box mt={4} ml={4} p={2} bg="white" borderRadius="md" boxShadow="md" maxH="200px" overflowY="auto">
      <Text fontWeight="bold" mb={2}>
        Search Results:
      </Text>
      {results.map(user => (
        <HStack key={user._id} align="start" spacing={2} mb={2}>
          <Text color="teal.500" fontWeight="bold" display="block">
            {user.name}
          </Text>
          <HStack>
            <Button colorScheme="teal" size="sm" onClick={() => handleAddFriend(user._id)}>
              Chat
            </Button>
          </HStack>
        </HStack>
      ))}
    </Box>
  );
};

export default SearchResults;
