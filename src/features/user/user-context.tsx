'use client';

import { createContext, ReactNode } from 'react';
import { useReducer } from '@/hooks/use-reducer';
import { useContext } from '@/hooks/use-context';
import { userReducer } from '@/features/user/user-reducer';
import { UserState, initialState } from '@/features/user/user-state';
import { Action } from '@/features/user/action-types';

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
