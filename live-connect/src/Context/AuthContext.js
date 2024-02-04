// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);

  const fetchFriends = async () => {
    if (authToken) {
      try {
        const response = await axios.get(
          'https://liveconnect.onrender.com/api/users/user-friends',
          {
            withCredentials: true,
            headers: {
              Authorization: `${authToken}`, // Include the Authorization header
            },
          }
        );

        if (response.data.success) {
          setUserFriends(response.data.friends);
        }
      } catch (error) {
        console.error(
          'Error fetching friends:',
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchFriends();
    }
  }, [authToken]);

  const login = (token, name, userID) => {
    setAuthToken(token);
    setUserName(name);
    setUserID(userID);
    console.log(token, name, userID);
    // fetchFriends(); // Trigger fetchFriends on login
  };

  const logout = () => {
    setAuthToken(null);
    setUserName(null);
    setUserID(null);
    setUserFriends([]); // Clear userFriends on logout
  };

  const isAuthenticated = () => {
    return !!authToken;
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userFriends,
        login,
        logout,
        isAuthenticated,
        fetchFriends,
        userName,
        userID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
