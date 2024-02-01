// ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated())
  if (!isAuthenticated()) return <Navigate to="/login" replace={true} />;
  return children;
};

export default ProtectedRoute;
