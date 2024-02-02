import React from 'react';
import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { TestimonialItem } from '../Components/TestimonialItem';
import { FeatureItem } from '../Components/FeatureItem';
const Home = () => {
  const backgroundImage =
    "url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

  return (
    <Box
      p={8}
      bgImage={backgroundImage}
      bgSize="cover"
      bgPosition="center"
      color="white"
    >
      <VStack spacing={8} align="center">
        <Heading as="h1" size="3xl" fontWeight="bold" textAlign="center" mb={4}>
          Elevate Your Communication with LiveConnect
        </Heading>
        <VStack spacing={4} textAlign="center">
          <Text fontSize="xl">
            Connect instantly, chat seamlessly, and stay in touch with
            LiveConnect - your go-to platform for real-time communication.
          </Text>
          <Text fontSize="xl">
            Experience the simplicity of one-on-one private chats, even when
            users are offline.
          </Text>
        </VStack>

        <Box w="full" h="300px" borderRadius="md" p={8}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Start your LiveConnect journey today!
          </Text>
          {/* Add any additional content or components here */}
        </Box>

        <Box w="full" textAlign="center" mt={5}>
          <Heading as="h2" size="2xl" mb={4}>
            What Users Say
          </Heading>
          <VStack spacing={4} align="center">
            <TestimonialItem
              name="John Doe"
              role="CEO, Tech Company"
              testimonial="LiveConnect has transformed the way our team communicates. The real-time messaging and one-on-one chats make collaboration seamless."
            />
            {/* Add more testimonials as needed */}
          </VStack>
        </Box>

        <Box w="full" textAlign="left">
          <Heading as="h2" size="2xl" mb={4}>
            Key Features
          </Heading>
          <VStack spacing={4} align="left">
            <FeatureItem title="Real-time Messaging">
              Exchange messages instantly in a responsive and real-time chat
              environment.
            </FeatureItem>
            <FeatureItem title="One-on-One Chats">
              Engage in private conversations with individual users, ensuring
              focused and meaningful communication.
            </FeatureItem>
            <FeatureItem title="Offline Messaging">
              Send and receive messages even when users are offline, keeping
              your conversations uninterrupted.
            </FeatureItem>
            {/* Add more features as needed */}
          </VStack>
        </Box>

        <Box w="full" textAlign="center">
          <Heading as="h2" size="2xl" mb={4}>
            Explore More
          </Heading>
          <Text fontSize="xl" mb={4}>
            Join LiveConnect today and experience a new level of communication.
          </Text>
          <Button colorScheme="teal" size="lg">
            Sign Up Now
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
