import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'student' | 'instructor') => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isInstructor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  const saveToken = (token: string | null) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  };

  const getToken = () => localStorage.getItem('token');

  const parseUserFromResponse = (data: any): User | null => {
    if (!data) return null;
    const u = data.user || data;
    return {
      id: u.id?.toString() || '',
      firstName: u.firstName,
      lastName: u.lastName,
      name: u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : u.name,
      email: u.email,
      role: u.role
    };
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${apiBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Login failed');
    }

    const json = await res.json();
    const token = json?.data?.token || json?.token;
    saveToken(token);
    const userObj = parseUserFromResponse(json?.data || json);
    setUser(userObj);
  };

  const register = async (firstName: string, lastName: string, email: string, password: string, role = 'student') => {
    const res = await fetch(`${apiBase}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password, role })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Registration failed');
    }

    const json = await res.json();
    const token = json?.data?.token || json?.token;
    saveToken(token);
    const userObj = parseUserFromResponse(json?.data || json);
    setUser(userObj);
  };

  const logout = () => {
    saveToken(null);
    setUser(null);
  };

  const loadMe = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${apiBase}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        logout();
        return;
      }
      const json = await res.json();
      const userObj = parseUserFromResponse(json?.data || json);
      setUser(userObj);
    } catch (e) {
      console.error('Failed to load user', e);
      logout();
    }
  };

  useEffect(() => {
    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isInstructor: user?.role === 'instructor'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
