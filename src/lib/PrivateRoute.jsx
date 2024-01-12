import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx' // Adjust this import path

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();

  return user ? (
    <Route element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
