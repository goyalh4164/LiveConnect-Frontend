import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';
import axios from 'axios'; // Import axios library
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setLoggingIn] = useState(false);

  const handleLogin = async () => {
    try {
      setLoggingIn(true);

      // Make API request to login endpoint
      const response = await axios.post(
        'http://localhost:8000/api/users/signin',
        {
          email,
          password,
        }
      );
      const { token, name } = response.data;
      login(token, name);
      navigate('/dashboard');
      // Handle the response, you might want to redirect the user or perform other actions
      console.log('Login successful:', response.data);
    } catch (error) {
      // Handle errors, you might want to show an error message to the user
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <Box p={8} color="black">
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl" mb={4}>
          Login to LiveConnect
        </Heading>
        <Input
          type="email"
          placeholder="Email"
          size="lg"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          size="lg"
          onChange={e => setPassword(e.target.value)}
        />
        {/* Login button with loading state */}
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleLogin}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? 'Logging In...' : 'Login'}
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
