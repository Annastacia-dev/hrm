// Create user context to keep track of current user
import { User } from '@/types/user';
import api from '@/utils/api';

import { useState, createContext } from 'react';

const UserContext = createContext<{
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (_email: string, _password: string) => Promise<boolean>;
  logout: () => void;
}>({
  currentUser: null,
  setCurrentUser: () => null,
  login: async () => false,
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user');
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      localStorage.setItem('zuri_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.employee));
      setCurrentUser(response.data.employee);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
