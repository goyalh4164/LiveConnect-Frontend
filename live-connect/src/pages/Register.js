// components/Register.js

import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, FormControl, FormLabel, FormHelperText, InputGroup, InputRightElement } from '@chakra-ui/react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDOB] = useState('');

  const handleRegister = () => {
    // Implement your registration logic here
    console.log('Register clicked');
  };

  return (
    <Box p={8} color="black">
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl" mb={4}>
          Register for LiveConnect
        </Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Your Name"
            size="lg"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Your Email"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup size="lg">
            <Input
              type="password"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => console.log('Toggle password')}>
                Show
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm Password"
            size="lg"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            placeholder="Your Date of Birth"
            size="lg"
            onChange={(e) => setDOB(e.target.value)}
          />
          <FormHelperText>Format: YYYY-MM-DD</FormHelperText>
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleRegister}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
