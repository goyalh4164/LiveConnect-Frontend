// App.js

import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/Navbar';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </>
      ),
    },
  ]);
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
