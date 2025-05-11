// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
        credentials: true,    
        });
        
        const data = await response.json();
        
        if (data.isAuthenticated) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Try fallback method
        checkUserCookie();
      } finally {
        setLoading(false);
      }
    };

    // Check for user cookie as a fallback
    const checkUserCookie = () => {
      try {
        const userCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('user='));
          
        if (userCookie) {
          const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
          setUser(userData);
        }
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await fetch('"http://localhost:8000/auth/logout"', {
        // credentials: 'include',
        withCredentials: true,
      });
      setUser(null);
      // Navigate to login page by setting location in Header component
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Expose authentication data and functions
  const value = {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
