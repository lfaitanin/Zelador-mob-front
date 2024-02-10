import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const DashboardScreen = ({ route, navigation }) => {
  console.log(JSON.stringify(route));

  const handleSignout = () => {
    //TODO: Limpar o token
    navigation.navigate('Bem vindo!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) ao Dashboard</Text>
      <Text>Essa é a área logada da aplicação. Aqui você pode acessar todas as funcionalidades disponíveis para você.</Text>
      <Button
        title="Sair"
        onPress={() => handleSignout()}
        color="#ADD8E6"
      />
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
