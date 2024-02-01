// components/Login.js

import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login clicked');
  };

  return (
    <Box p={8} color="black"> {/* Set text color to black */}
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl" mb={4}>
          Login to LiveConnect
        </Heading>
        <Input
          type="email"
          placeholder="Email"
          size="lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          size="lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="teal" size="lg" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
