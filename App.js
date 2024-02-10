import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/screens/SignUp';
import Invite from './src/screens/InviteScreen';

import CadastroScreen from './src/screens/CadastroScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import PreLoginScreen from './src/screens/PreLoginScreen';
import HasInviteScreen from './src/screens/HasInviteScreen';

import LoginScreen from './src/screens/LoginScreen';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/contexts/AuthContext'

const Stack = createNativeStackNavigator();

export default function App() {
  return (    
    <AuthProvider>
      <NativeBaseProvider>   
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Bem vindo!" component={PreLoginScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={SignUp} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="HasInvite" component={HasInviteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
}