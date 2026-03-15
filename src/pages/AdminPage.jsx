import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProtectedRoute from '../components/admin/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user ? 
            <Navigate to="/admin/dashboard" replace /> : 
            <Navigate to="/admin/login" replace />
        } 
      />
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminPage;