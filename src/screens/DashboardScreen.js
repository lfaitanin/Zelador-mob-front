import React from 'react';
import { Container, HStack, Content, Button, Text, Icon, Card, CardItem, Body, Box } from 'native-base';

const DashboardScreen = ({navigation}) => {
  return (
    <Container>
      <HStack searchBar rounded>
        <Text>Seu Nome</Text>
        <Text>Condomínio - Bloco - Unidade</Text>
      </HStack>
      <Box padder>
        <Card>
          <CardItem header button onPress={() => alert("Comunicados")}>
            <Text>Comunicados</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem button onPress={() => alert("Encomendas")}>
            <Body>
              <Icon name="cube" />
              <Text>Encomendas</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem button onPress={() => alert("Boletos")}>
            <Body>
              <Icon name="card" />
              <Text>Boletos</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem button onPress={() => alert("Serviços")}>
            <Body>
              <Icon name="hammer" />
              <Text>Serviços</Text>
            </Body>
          </CardItem>
        </Card>
      </Box>
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

