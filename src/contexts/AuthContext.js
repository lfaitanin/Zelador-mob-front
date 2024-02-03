// src/contexts/AuthContext.js

import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ... (resto do código)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Carregar o token armazenado no início
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        dispatch({ type: 'RESTORE_TOKEN', payload: token });
      }
    };

    loadToken();
  }, []);

  const authContext = {
    state,
    dispatch,
    signIn: async (data) => {
      // Aqui você faria o fetch para o backend para logar
      // Suponhamos que data inclua email e senha
      const response = await fetch('https://your-backend.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('userToken', json.token);
        dispatch({ type: 'LOGIN', payload: json });
      } else {
        // Tratar os erros de login aqui
      }
    },
    signOut: async () => {
      await AsyncStorage.removeItem('userToken');
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async (data) => {

      const response = await fetch('https://your-backend.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return response.ok;
      } else {
        // Tratar os erros de cadastro aqui
      }
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
