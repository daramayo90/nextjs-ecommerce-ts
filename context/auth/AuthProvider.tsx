import { FC, ReactNode, useReducer } from 'react';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

interface Props {
  children: ReactNode;
}
export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  return <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>;
};
