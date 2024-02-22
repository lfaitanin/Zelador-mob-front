import React, {useEffect, useState} from "react";
import { Box, FlatList, Heading, Icon, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, InfoIcon, Pressable } from "native-base";
import axios from 'axios'

const NotificationsScreen = ({ route, navigation }) => {
  const [notificacoes, setNotificacoes] = useState([]);
  const idUnidadeUsuaria = route.params;

  useEffect(() => {
   
    getNotifications()
  }, []);

  const handlePress = (params) => {

    axios.put(`https://ze-lador.onrender.com/api/notificacao/marcar-como-lida?id=${params.id}`)
    .then(response => {
      getNotifications()
    });
  };

  const getNotifications = () => {
    axios.get(`https://ze-lador.onrender.com/api/dashboard/get-notificacoes?idUnidadeUsuario=${idUnidadeUsuaria}`)
      .then(response => {
        let data = response.data.response;
        const notificacao = data.map(elem => (
          {
            id: elem.id,
            remetente: elem.remetente,
            mensagem: elem.mensagem,
            dataEntregue: elem.dataEntregue.toLocaleDateString('pt-BR'),
            idUnidadeUsuaria: elem.idUnidadeUsuaria,
            lida: elem.dataEntregue == null ? true : false
          } 
        ));
        setNotificacoes([]);
        setNotificacoes(notificacao);
    });
  }
  return  <NativeBaseProvider>
    <Center flex={1} px="2">
  <Box>
      <FlatList data={notificacoes} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "muted.50"
    }} borderColor="muted.800"  pr={250} py="11">
            <HStack space={[2, 3]} justifyContent="space-between" >
            <Pressable
            key={item.id}
            onPress={() => handlePress(item)}
          >           
            <InfoIcon name="question-outline" />
              <VStack>
                <Text  _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold={item.lida}>
                  {item.remetente}
                </Text>
                <Text color="coolGray.600"  bold={item.lida} _dark={{
            color: "warmGray.200" 
          }}>
                  {item.mensagem}
                </Text>
              </VStack>
              <Text fontSize="xs"  bold={item.lida} _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" >
                {item.dataEntregue == null ? new Date().toLocaleDateString() : item.dataEntregue }
              </Text>
              </Pressable>
            </HStack>
          </Box>} keyExtractor={item => item.id} />
    </Box>
    </Center>
    </NativeBaseProvider>;
    };

export default NotificationsScreen