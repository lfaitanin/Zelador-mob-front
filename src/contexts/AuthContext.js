import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
      const response = await fetch('https://ze-lador.onrender.com/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.respose.json();
      if (response.success) {
        await AsyncStorage.setItem('userToken', json);
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

      const response = await fetch('https://ze-lador.onrender.com/api/insert-user', {
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
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
