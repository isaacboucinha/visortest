// contexts/auth.js

import React, { createContext, useState, useContext } from 'react';

import * as client from '../services/client.service';
import type User from '@/types/user.type';

interface AuthenticationContext {
  isAuthenticated?: boolean;
  userHasBeenSet?: boolean;
  user?: User | null;
  tryGetCurrentUser: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthenticationContext>({
  tryGetCurrentUser: async () => false,
  login: async (email: string, password: string) => false,
  logout: async () => false
});

export const AuthProvider = ({
  children
}: React.PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [userHasBeenSet, setUserHasBeenSet] = useState<boolean>(false);

  const tryGetCurrentUser = async (): Promise<boolean> => {
    if (userHasBeenSet) return true;
    const user = await client.getCurrentUser();

    if (user !== null) {
      setUser(user);
      setUserHasBeenSet(true);
      return true;
    }

    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setUserHasBeenSet(false);
    const user = await client.loginUser(email, password);
    if (user === null) return false;
    setUser(user);
    return true;
  };

  const logout = async (): Promise<boolean> => {
    if (!userHasBeenSet) return false;
    const success = await client.logoutUser();

    if (success) {
      setUser(null);
      setUserHasBeenSet(false);
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: user !== null,
        user,
        login,
        logout,
        userHasBeenSet,
        tryGetCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = (): AuthenticationContext => useContext(AuthContext);
