import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import helpers from '../helpers/helpers';
import { Path } from "react-native-svg";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { PermissionsAndroid } from 'react-native';
import { createClient } from '@segment/analytics-react-native';
import messaging from '@react-native-firebase/messaging';
import { DeviceTokenPlugin } from '@segment/analytics-react-native-plugin-device-token';

import axios from 'axios'
import { Button, Actionsheet, useDisclose, Box, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const DashboardScreen = ({ route, navigation }) => {
  const userParams = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [comunicados, setComunicados] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [user, setUser] = useState({});
  const base64Image = 'data:image/png;base64,' + user.imagem;
  const [storedExpoToken, setStoredExpoToken] = useState("");
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const moduloJaEstaFavoritado = (item, mFavoritos) => {
    return mFavoritos.some(favorito => favorito.nome === item.nome);
  };

  useEffect(() => {
    //functions 
    async function init() {
      await registerForPushNotificationsExpoAsync();

      const loadUser = async (params) => {
        const url = `https://ze-lador.onrender.com/api/user/who-am-i?token=${params.token}`;
        const { data } = await axios.get(url);
        const usuario = {
          email: params.email,
          token: params.token,
          idCondominio: data.idCondominio,
          idUnidadeUsuario: data.idUnidadeUsuario
        };
        return usuario;
      }

      const loadAdditionalUserData = async (user) => {
        const url = `https://ze-lador.onrender.com/api/dashboard/get-additional-user-data-by-unidade-usuario?idUnidadeUsuario=${user.idUnidadeUsuario}`;
        const { data } = await axios.get(url);
        setUser(currentUserData => ({
          ...currentUserData,
          email: user.email,
          token: user.token,
          nome: data.response.nome,
          condominio: data.response.nomeCondominio,
          unidade: data.response.unidade,
          bloco: data.response.bloco,
          imagem: data.response.imagem,
          mFavoritos: data.response.modulosFavoritos,
          tokenDispositivo: data.response.tokenDispositivo,
          id: data.response.id
        }));
      }

      const loadComunicados = async (user) => {
        console.log(user);
        const url = `https://ze-lador.onrender.com/api/dashboard/get-comunicados-por-condominio?idCondominio=${user.idCondominio}`;
        const { data } = await axios.get(url);
        setComunicados(data.response);
      }

      const loadNotificacoes = async (user) => {
        const url = `https://ze-lador.onrender.com/api/dashboard/get-notificacoes?idUnidadeUsuario=${user.idUnidadeUsuario}`;
        const { data } = await axios.get(url)
        console.log('teste ' + JSON.stringify(data.response));
        setNotificacoes(data.response);
      }

      const loadModulos = async (user) => {
        const url = `https://ze-lador.onrender.com/api/dashboard/get-modulos-por-condominio?idCondominio=${user.idCondominio}`;
        const { data } = await axios.get(url)
        setModulos(data.response);
      }

      async function registerForPushNotificationsExpoAsync() {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          console.log('Failed to get push token for push notification!');
          return;
        }

        //token = (await Notifications.getExpoPushTokenAsync()).data;
        let storedToken = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo Push Token:', storedToken);

        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: true,
          }),
        });

        setStoredExpoToken(storedToken);

        /* call the teste notification method    
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Testando Notificação',
            body: "Testezinho",
          },
          trigger: null,
        });
        */
      }

      const updateDeviceToken = async (newToken) => {
        try {
          console.log("Eh diferente Expo:" + storedExpoToken + " salvo base:" + user.tokenDispositivo);
          const url = `https://ze-lador.onrender.com/api/user/update-device-token`;
          const response = await axios.post(url, {
            id: user.id, // Supondo que você tenha um ID de usuário para associar o token
            tokenDispositivo: newToken,
          });

          if (response.status === 200) {
            console.log('Token atualizado com sucesso.');
          } else {
            console.log('Falha ao atualizar o token.', response.data);
          }
        } catch (error) {
          console.error('Erro ao atualizar o token: ', error);
        }
      };


      const usuario = await loadUser(userParams);
      setUser(usuario);
      await loadAdditionalUserData(usuario);

      await Promise.all([
        loadComunicados(usuario),
        loadNotificacoes(usuario),
        loadModulos(usuario)
      ]);

      console.log("Verificar token dispositivo");
      if (storedExpoToken && user.tokenDispositivo &&
        storedExpoToken !== user.tokenDispositivo) {
        console.log("Vamos atualizar");
        updateDeviceToken(storedExpoToken);
      }

    }

    init();

  }, [userParams, storedExpoToken]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Notificações')}>
          <Image
            source={{ uri: base64Image }}
            style={styles.userPhoto}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Olá, {user.nome !== undefined && user.nome}
            {user.nome === undefined && 'usuário'}
          </Text>
          {user.nome !== undefined && user.nome !== '' &&
            <Text style={styles.userDetails}>
              Condomínio {user.condominio} - Bloco {user.bloco} Unidade {user.unidade}</Text>
          }
          {user.nome === undefined || user.nome == '' &&
            <Text style={styles.userDetails}>---</Text>
          }
        </View>

        {notificacoes !== undefined && notificacoes.length > 0 &&
          <View style={{ paddingRight: '53px' }}>
            <Icon name="notifications" size={30} color="#e6e600" onPress={() => navigation.navigate('Notificações', notificacoes.map(a => a.idUnidadeUsuario)[0])} />
            <Text style={{ alignSelf: 'center' }}>{notificacoes.length}</Text>
          </View>
        }
        {notificacoes !== undefined && notificacoes.length === 0 &&
          <Icon name="notifications-outline" size={30} style={styles.notificationIcon} />
        }
      </View>

      {/* Announcements Section */}
      {comunicados !== undefined && comunicados.length > 0 &&
        <View style={styles.adminAnnouncement}>
          <Text style={styles.announcementTitle}>Anúncios da Administração</Text>
          {comunicados.map((item, i) => {
            (item);
            return <Text style={styles.announcementText} key={item.id}>- {item.mensagem}</Text>
          })}
        </View>
      }

      {/* Services Buttons */}
      <View style={styles.services}>

        {user.mFavoritos !== undefined && user.mFavoritos.length > 0 && user.mFavoritos.map((item, index) => (
          <TouchableOpacity key={index} style={styles.serviceButton}>
            <Icon name={item.imagem} size={30} />
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        ))}

        {user.mFavoritos !== undefined && user.mFavoritos.length > 0 && user.mFavoritos.length < 4 && (
          <TouchableOpacity onPress={onOpen} style={styles.serviceButton}>
            <Icon name="add-circle-outline" size={30} />
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Box w="100%" h={60} px={4} justifyContent="center">
                  <Text fontSize="16" color="gray.500" _dark={{
                    color: "gray.300"
                  }}>
                    Atalhos
                  </Text>
                </Box>

                {modulos !== undefined && modulos.length > 0 && modulos.map((item, index) => (
                  !moduloJaEstaFavoritado(item, user.mFavoritos) && (
                    <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name={item.imagem} size={21} />}>
                      {item.nome}
                    </Actionsheet.Item>
                  )
                ))}
              </Actionsheet.Content>
            </Actionsheet>
            <Text>Adicionar atalho</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10, // Ajustado para um espaçamento vertical maior
    paddingHorizontal: 16, // Ajustado para um espaçamento horizontal
    backgroundColor: '#f8f8f8',
    marginTop: 22
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
  },
  notificationIcon: {
    color: '#000',
  },
  adminAnnouncement: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  announcementTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 5
  },
  announcementText: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    paddingLeft: 5
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 470,
  },
  serviceButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    paddingVertical: 300,
  },
  shortcutIcon: {
    marginLeft: 255,
    color: '#333',
  },
});

export default DashboardScreen;