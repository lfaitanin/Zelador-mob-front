import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/screens/SignUp';
import CadastroScreen from './src/screens/CadastroScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { NativeBaseProvider } from 'native-base';
const Stack = createNativeStackNavigator();

export default function App() {
  return (    
    <NativeBaseProvider>   
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Criar sua conta" component={SignUp} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}