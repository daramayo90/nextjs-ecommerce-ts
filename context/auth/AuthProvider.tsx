import { FC, ReactNode, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';

import { frontApi } from '../../api';
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
   const router = useRouter();

   useEffect(() => {
      checkToken();
   }, []);

   const checkToken = async () => {
      if (!Cookies.get('token')) return;

      try {
         const { data } = await frontApi.get('/user/validate-token');
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: '[Auth] - Login', payload: user });
      } catch (error) {
         console.log(error);
         Cookies.remove('token');
      }
   };

   const loginUser = async (email: string, password: string): Promise<boolean> => {
      try {
         const { data } = await frontApi.post('/user/login', { email, password });
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: '[Auth] - Login', payload: user });
         return true;
      } catch (error) {
         console.log(error);
         return false;
      }
   };

   const registerUser = async (
      name: string,
      email: string,
      password: string,
   ): Promise<{ hasError: boolean; message?: string }> => {
      try {
         const { data } = await frontApi.post('/user/register', { name, email, password });
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: '[Auth] - Login', payload: user });
         return {
            hasError: false,
         };
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const err = error as AxiosError;
            return {
               hasError: true,
               //message: error.response?.data.message,
               message: err.message,
            };
         }

         return {
            hasError: true,
            message: 'Failed to create user - try again',
         };
      }
   };

   const logout = () => {
      Cookies.remove('token');
      Cookies.remove('cart');
      router.reload(); // refresh of the whole application - loose all the context states (auth, cart, ui)
   };

   return (
      <AuthContext.Provider value={{ ...state, checkToken, loginUser, registerUser, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
