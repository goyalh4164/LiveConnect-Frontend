// App.js

import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/Dashboard';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: (
        <>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="dashboard"
              element={
                <>
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                </>
              }
            />
            <Route
              path="profile"
              element={
                <>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </>
              }
            />
          </Routes>
        </>
      ),
    },
  ]);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
