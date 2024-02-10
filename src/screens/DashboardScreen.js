import React from 'react';
import { Container, HStack, Content, Button, Text, Icon, Card, CardItem, Body, Box } from 'native-base';
import { View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const DashboardScreen = ({ route, navigation }) => {
  console.log(JSON.stringify(route));

  const handleSignout = () => {
    //TODO: Limpar o token
    navigation.navigate('Bem vindo!');
  }

  return (
    <Container>
      <HStack searchBar rounded>
        <Text>Seu Nome</Text>
        <Text>Condomínio - Bloco - Unidade</Text>
      </HStack>
      <HStack>
        <Text>Bem-vindo(a) ao Dashboard</Text>
        <Text>Essa é a área logada da aplicação. Aqui você pode acessar todas as funcionalidades disponíveis para você.</Text>

      </HStack>
      <HStack>
        <Button onPress={() => handleSignout()} color="#ADD8E6">
          <Text>Sair</Text>
        </Button>
      </HStack>

      <HStack>
        <Button iconLeft vertical>
          <Icon name="apps" type="MaterialIcons" />
          <Text>Menu</Text>
        </Button>
        {/* Adicione mais botões conforme necessário */}
      </HStack>
    </Container >
  );
}

export default DashboardScreen;

