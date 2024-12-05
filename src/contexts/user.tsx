// Create user context to keep track of current user
import { User } from '@/types/user';
import { users } from '@/data/users';
// import api from '@/utils/api';

import { useState, createContext } from 'react';

const UserContext = createContext<{
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (_email: string, _password: string) => boolean;
  logout: () => void;
}>({
  currentUser: null,
  setCurrentUser: () => null,
  login: () => false,
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

  // make a GET request to  /login which will return an access token that you will store in the local storage and use it to check the user
  // useEffect(() => {
  //   api.get('/login').then((response) => {
  //     localStorage.setItem('accessToken', response.access_token);
  //   });
  // }, []);

  // post as x-www-form-urlencoded
  // username: email, password: password
  // const login = (email: string, password: string) => {
  //   const formData = new URLSearchParams();
  //   formData.append('username', email);
  //   formData.append('password', password);

  //   api
  //     .post('/login', formData, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       localStorage.setItem('zuri_token', response.access_token);
  //     });
  // };

  const login = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
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
