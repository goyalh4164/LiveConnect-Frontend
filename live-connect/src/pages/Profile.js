// pages/Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';
import { useAuth } from '../Context/AuthContext';

const Profile = () => {
  const { authToken } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data from the server
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          'https://liveconnect.onrender.com/api/users/get-details/',
          {
            withCredentials: true,
            headers: {
              Authorization: `${authToken}`, // Include the Authorization header
            },
          }
        );

        setUserProfile(response.data.user);
      } catch (error) {
        console.error(
          'Error fetching user profile:',
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authToken]); // Include authToken as a dependency

  return (
    <Box p={8} color="black">
      <Heading as="h1" size="xl" mb={4}>
        User Profile
      </Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : userProfile ? (
        <>
          <Text>Name: {userProfile.name}</Text>
          <Text>Email: {userProfile.email}</Text>
          <Text>Gender: {userProfile.gender}</Text>
        </>
      ) : (
        <Text>Error loading user profile</Text>
      )}
    </Box>
  );
};

export default Profile;
