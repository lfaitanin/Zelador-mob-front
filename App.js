import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/screens/SignUp';
import Invite from './src/screens/InviteScreen';

import CadastroScreen from './src/screens/CadastroScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/contexts/AuthContext'

const Stack = createNativeStackNavigator();

export default function App() {
  return (    
    <AuthProvider>
      <NativeBaseProvider>   
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Envie um convite!" component={Invite} />
            <Stack.Screen name="Criar sua conta" component={SignUp} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
}