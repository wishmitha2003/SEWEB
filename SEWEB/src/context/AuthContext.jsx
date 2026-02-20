import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('ezy_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('ezy_user');
      }
    }
  }, []);

  const login = (userData) => {
    const u = {
      fullName: userData.fullName || userData.email?.split('@')[0] || 'Student',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'student',
    };
    setUser(u);
    localStorage.setItem('ezy_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ezy_user');
  };

  const updateUser = (updatedData) => {
    const u = { ...user, ...updatedData };
    setUser(u);
    localStorage.setItem('ezy_user', JSON.stringify(u));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
