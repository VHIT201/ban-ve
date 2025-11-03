import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = authService.login(email, password);
    if (user) {
      setUser(user);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const user = authService.register(name, email, password);
    if (user) {
      setUser(user);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
