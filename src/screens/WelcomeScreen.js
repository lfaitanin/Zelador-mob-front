import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { PermissionsAndroid } from 'react-native';
import { createClient } from '@segment/analytics-react-native';
import messaging from '@react-native-firebase/messaging';
import { DeviceTokenPlugin } from '@segment/analytics-react-native-plugin-device-token';


const WelcomeScreen = ({ navigation }) => {
  
  useEffect(() => {
    if (__DEV__ && Constants.expoConfig ) {
      registerForPushNotificationsExpoAsync();
    } else {
      registerForPushNotificationsFirebaseAsync();
    }

  }, []);

  async function registerForPushNotificationsExpoAsync() {
    let token;
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

    console.log("vamos pegar o token? " + Constants.expoConfig.name)
    //token = (await Notifications.getExpoPushTokenAsync()).data;
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    // Aqui você pode enviar o token para seu servidor se necessário
  }

  async function registerForPushNotificationsFirebaseAsync() {
    //PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    // Certifique-se de que você tenha solicitado as permissões necessárias no Android manifest ou Info.plist para iOS.
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      console.log('Firebase Push Token:', token);
      
      // Aqui você pode enviar o token para seu servidor se necessário
    }
  }


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo_zelador.png')} // Substitua pelo caminho correto do logo
        style={styles.logo}
      />
      <Text style={styles.subtitle} onPress={() => navigation.navigate('Login')}>Já possuo um cadastro</Text>
      <Text style={styles.buttonText} onPress={() => navigation.navigate('HasInvite')}>Tenho um convite!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 250, // Ajuste conforme o tamanho do seu logo
    height: 250, // Ajuste conforme o tamanho do seu logo
    resizeMode: 'contain',
  },
  subtitle: {
    marginTop: 100,
    fontSize: 16,
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#db6729', // Cor do botão
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    backgroundColor: '#db6729', // Cor do botão
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,

    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
