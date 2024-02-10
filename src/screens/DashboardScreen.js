import React from 'react';
import { Container, HStack, Content, Button, Text, Icon, Card, CardItem, Body, Box } from 'native-base';

const DashboardScreen = ({navigation}) => {
  return (
    <Container>
      <HStack searchBar rounded>
        <Text>Seu Nome</Text>
        <Text>Condomínio - Bloco - Unidade</Text>
      </HStack>
      <HStack>
        <Button iconLeft vertical>
          <Icon name="apps" type="MaterialIcons" />
          <Text>Menu</Text>
        </Button>
        {/* Adicione mais botões conforme necessário */}
      </HStack>
    </Container>
  );
}

export default DashboardScreen;

