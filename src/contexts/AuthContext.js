'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const userData = await api.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      const { user: userData, token } = response;
      
      localStorage.setItem('authToken', token);
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.signup(userData);
      const { user: newUser, token } = response;
      
      localStorage.setItem('authToken', token);
      setUser(newUser);
      
      return newUser;
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const updateUser = async (updatedData) => {
    try {
      const response = await api.updateUser(updatedData);
      setUser(response.user);
      return response.user;
    } catch (error) {
      throw new Error(error.message || 'Update failed');
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
