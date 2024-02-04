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
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const { userFriends, userName, userID } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    // toast.success('Success notification!');
    // Establish a Socket.IO connection when the component mounts
    const newSocket = io('https://liveconnect.onrender.com'); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      // Clean up the socket connection when the component unmounts
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []); // Run only on mount and unmount

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  const formatMessages = (messages, currentUserID, selectedUser) => {
    return messages.map((message) => {
      const isCurrentUser = message.userID === currentUserID;
      if (isCurrentUser) return `you: ${message.content}`;
      return `${selectedUser}: ${message.content}`;
    });
  };

  useEffect(() => {
    // Function to fetch messages
    const fetchMessages = async () => {
      setLoadingMessages(true);
      if (selectedUser) {
        try {
          const response = await axios.get(
            `https://liveconnect.onrender.com/api/messages/get-messages/${userID}/${selectedUser.id}`
          );

          if (response.data.success) {
            const formattedMessages = formatMessages(
              response.data.messages,
              userID,
              selectedUser.name
            );
            console.log(formattedMessages);
            setChatMessages(formattedMessages);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setLoadingMessages(false);
        }
      }
    };

    // Call the fetchMessages function when selectedUser changes
    fetchMessages();
  }, [selectedUser, userID, userName]);

  useEffect(() => {
    // Join rooms of all friends when socket is available
    if (socket) {
      userFriends.forEach((friend) => {
        socket.emit('join-room', { roomID: friend.roomID });
      });
    }
  }, [socket, userFriends]);

  // Set up event listener for receiving messages
  useEffect(() => {
    const handleMessage = (data) => {
      if (selectedUser && data.roomID === selectedUser.roomID) {
        const formattedMessage = `${data.sender} : ${data.message}`;
        setChatMessages((prevMessages) => [...prevMessages, formattedMessage]);
      }
      else{
        // console.log(`New Message from ${data.sender}: ${data.message}`)
        toast.success(`New Message from ${data.sender}: ${data.message}`)
      }
    };

    if (socket) {
      socket.on('message', handleMessage);
    }

    return () => {
      if (socket) {
        socket.off('message', handleMessage);
      }
    };
  }, [socket, selectedUser]);

  const handleUserSelect = (user, index) => {
    setSelectedUser(user);
    setSelectedUserIndex(index);
    setChatMessages([]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && socket && selectedUser) {
      // Emit a 'message' event to the server
      socket.emit('message', {
        sender: userName,
        message: newMessage,
        senderID: userID,
        receiverID: selectedUser.id,
        roomID: selectedUser.roomID,
      });

      // Update the state with the new formatted message
      const formattedMessage = `you : ${newMessage}`;
      setChatMessages([...chatMessages, formattedMessage]);

      // Clear the input field
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
                .map((user, index) => (
                  <Text
                    key={user.id}
                    onClick={() => handleUserSelect(user, index)}
                    cursor="pointer"
                    _hover={{ background: '#f2f2f2' }}
                    p={2}
                    borderRadius="md"
                    className={
                      selectedUserIndex === index ? 'selected-user' : ''
                    }
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
                : `Welcome , ${userName}`}{' '}
            </Heading>
          </HStack>
          <Divider my={4} />

          {/* Display spinner or message when loading messages */}
          {!selectedUser ? (
            <Text>Start Your Chatting By Selecting Your Friend</Text>
          ) : !chatMessages.length ? (
            <>
              {loadingMessages ? (
                <ClipLoader color="#teal" css={override} size={50} />
              ) : (
                <Text>No Messages Yet! Start Your Conversation</Text>
              )}
            </>
          ) : (
            <VStack spacing={2} align="stretch" flex="1">
              {chatMessages.map((formattedMessage, index) => (
                <Text key={index}>{formattedMessage}</Text>
              ))}
            </VStack>
          )}
        </Box>
      </Box>

      {/* New Message Input */}
      <HStack mt={4} justify="flex-end">
        <Textarea
          placeholder={`Message ${selectedUser ? selectedUser.name : ''}`}
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
