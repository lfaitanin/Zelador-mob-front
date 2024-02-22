import React, { createContext, useReducer, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const AuthContext = createContext();

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Tentativa de carregar o token ao iniciar o app
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restaurar token falhou
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);
  
  const authContext = {
    signIn: async (data) => {
      try {
        const response = await fetch('https://seu-endpoint.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.senha,
          }),
        });
        const json = await response.json();
        if (response.ok && json.token) {
          await AsyncStorage.setItem('userToken', json.token);
          dispatch({ type: 'SIGN_IN', token: json.token });
        } else {
          // Tratar os erros de login aqui, como mostrar uma mensagem para o usuário
          throw new Error(json.error || 'Falha ao realizar login');
        }
      } catch (e) {
        // Tratar os erros de rede aqui
        console.error('Erro de autenticação', e);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        // Removing token failed
      }
      dispatch({ type: 'SIGN_OUT' });
    },
    signUp: async (data) => {
      var usuario = {
        nome: data.name,
        dataNascimento: data.dataNascimento,
        email: data.email,
        documento: data.document,
        senha: data.password
      }
    
      console.log(usuario)
      axios.post('https://ze-lador.onrender.com/api/user/update-user', usuario)
        .then(response => {
          console.log(response)
        }).catch(err => {
          console.log(err)
        });     
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthProvider and useAuth hook
export { AuthProvider, AuthContext };

// Hook for child components to get the auth object
// and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};
