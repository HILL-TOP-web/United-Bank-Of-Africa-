import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Payouts from './pages/Payouts';
import Users from './pages/Users';
import Login from './pages/Login';

export const AdminRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="payouts" element={<Payouts />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
