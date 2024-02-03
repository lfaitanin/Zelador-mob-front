import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DashboardScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) ao Dashboard</Text>
      <Text>Essa é a área logada da aplicação. Aqui você pode acessar todas as funcionalidades disponíveis para você.</Text>
      <Button
        title="Sair"
        onPress={()=> navigation.navigate('Login')}
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
