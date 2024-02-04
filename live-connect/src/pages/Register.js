import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [isRegistering, setRegistering] = useState(false);

  const handleRegister = async e => {
    e.preventDefault();

    try {
      setRegistering(true);

      const response = await axios.post(
        'https://liveconnect.onrender.com/api/users/signup',
        {
          name,
          email,
          password,
          confirmPassword,
          gender,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(response.data.success){
        toast.success('Registration Successful!!')
      }
      console.log('Registration successful:', response.data);
    } catch (error) {
      toast.error('Registration Failed')
      console.error(
        'Registration failed:',
        error.response ? error.response.data : error.message
      );
    } finally {
      setRegistering(false);
    }
  };

  return (
    <Box p={8} color="black">
      <VStack spacing={4} align="center" width="100%">
        <Heading as="h1" size="xl" mb={4}>
          Register for LiveConnect
        </Heading>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <FormControl isRequired width="100%">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Your Name"
              size="lg"
              onChange={e => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl isRequired width="100%">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Your Email"
              size="lg"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl isRequired width="100%">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Your Password"
              size="lg"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl isRequired width="100%">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm Password"
              size="lg"
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl isRequired width="100%">
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Select Gender"
              size="lg"
              onChange={e => setGender(e.target.value)}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </Select>
          </FormControl>
          {/* Register button with loading state */}
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="100%"
            disabled={isRegistering}
          >
            {isRegistering ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default Register;
