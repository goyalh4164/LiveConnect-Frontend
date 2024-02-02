// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userFriends, setUserFriends] = useState([]);

  const fetchFriends = async () => {
    if (authToken) {
      try {
        const response = await axios.get('http://localhost:8000/api/users/user-friends', {
          withCredentials: true,
          headers: {
            Authorization: `${authToken}`, // Include the Authorization header
          },
        });

        if (response.data.success) {
          setUserFriends(response.data.friends);
        }
      } catch (error) {
        console.error('Error fetching friends:', error.response ? error.response.data : error.message);
      }
    }
  };

  // useEffect(() => {
  //   // Fetch user's friends from the API if authToken is available
  //   fetchFriends();
  // }, [authToken]); // Fetch friends whenever authToken changes

  const login = (token) => {
    setAuthToken(token);
    fetchFriends(); // Trigger fetchFriends on login
  };

  const logout = () => {
    setAuthToken(null);
    setUserFriends([]); // Clear userFriends on logout
  };

  const isAuthenticated = () => {
    return !!authToken;
  };

  return (
    <AuthContext.Provider value={{ authToken, userFriends, login, logout, isAuthenticated, fetchFriends }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
