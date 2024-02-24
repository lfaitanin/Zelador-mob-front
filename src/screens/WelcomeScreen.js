import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

import { PermissionsAndroid } from 'react-native';
import { createClient } from '@segment/analytics-react-native';
import messaging from '@react-native-firebase/messaging';
import { DeviceTokenPlugin } from '@segment/analytics-react-native-plugin-device-token';


const WelcomeScreen = ({ navigation }) => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    console.log('useEffect')

    const segmentClient = createClient({
      writeKey: 'ZE-LADOR'
    });
    
    // const teste = messaging().getToken();
    // console.log('token1 ' + JSON.stringify(teste));
    const deviceTokenPlugin = new DeviceTokenPlugin()
    segmentClient.add({ plugin: deviceTokenPlugin })
    console.log('token ' + JSON.stringify(deviceTokenPlugin));
  }, []);

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
