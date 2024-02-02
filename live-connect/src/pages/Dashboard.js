import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  Box,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  Divider,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useAuth } from '../Context/AuthContext';

const UserDashboard = () => {
  const { userFriends } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);

    // Establish a Socket.IO connection when a user is selected
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io('http://localhost:8000'); // Replace with your server URL
    setSocket(newSocket);

    // Emit 'join-room' event to join a private chat room
    newSocket.emit('join-room', { roomID: user.roomID });

    // Set up event listeners for receiving messages
    newSocket.on('message', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && socket) {
      // Emit a 'message' event to the server
      socket.emit('message', { sender: 'You', message: newMessage });
      setChatMessages([...chatMessages, { sender: 'You', message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <Box
      p={8}
      color="black"
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" flex="1">
        {/* Left Sidebar - User List */}
        <Box w="20%" borderRight="1px solid #ccc" pr={4}>
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="md" mb={4}>
              Friend List
            </Heading>
            <Input
              placeholder="Search Friends"
              size="sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <VStack spacing={2} align="stretch">
              {userFriends
                .filter((user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <Text
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    cursor="pointer"
                    _hover={{ background: '#f2f2f2' }}
                    p={2}
                    borderRadius="md"
                  >
                    {user.name}
                  </Text>
                ))}
            </VStack>
          </VStack>
        </Box>

        {/* Right Main Content - Chat Window */}
        <Box w="80%" pl={4}>
          <HStack spacing={4} align="center">
            <Heading as="h2" size="md">
              {selectedUser
                ? `Chatting with ${selectedUser.name}`
                : 'Select a friend to chat'}
            </Heading>
          </HStack>
          <Divider my={4} />
          {/* Chat Messages */}
          <VStack spacing={2} align="stretch" flex="1">
            {chatMessages.map((msg, index) => (
              <Text
                key={index}
                fontWeight={msg.sender === 'You' ? 'bold' : 'normal'}
              >
                <strong>{msg.sender}:</strong> {msg.message}
              </Text>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* New Message Input */}
      <HStack mt={4} justify="flex-end">
        <Textarea
          placeholder="Type your message..."
          size="md"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button colorScheme="teal" size="md" onClick={handleSendMessage}>
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default UserDashboard;
