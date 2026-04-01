import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('ezy_user');
    const storedToken = localStorage.getItem('ezy_token');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('ezy_user');
      }
    }
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (userData, tokenArg) => {
    const u = {
      id: userData.id || '',
      username: userData.username || '',
      fullName: userData.fullName || userData.email?.split('@')[0] || 'Student',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'student',
      idCardNo: userData.idCardNo || '',
      address: userData.address || '',
      city: userData.city || '',
      postalCode: userData.postalCode || '',
      country: userData.country || '',
      profileImage: userData.profileImage || userData.profileImageUrl || null,
    };
    setUser(u);
    if (tokenArg) {
      setToken(tokenArg);
      localStorage.setItem('ezy_token', tokenArg);
    }
    localStorage.setItem('ezy_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ezy_user');
    localStorage.removeItem('ezy_token');
  };

  const updateUser = (updatedData) => {
    const u = { ...user, ...updatedData };
    setUser(u);
    localStorage.setItem('ezy_user', JSON.stringify(u));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
