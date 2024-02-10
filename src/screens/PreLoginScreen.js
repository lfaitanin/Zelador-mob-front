import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
// import AuthContext from '../contexts/AuthContext';

const PreLoginScreen = ({ navigation }) => {
  // const { signIn } = useContext(AuthContext);

  // const handleLogin = async () => {
  //   await signIn({ email, senha });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Zé Lador</Text>
      <Image
        source={require('./imgs/logo.png')} // substitua pelo caminho correto da imagem
        style={styles.logo}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword} onPress={() => navigation.navigate('Login')}>Já possuo um cadastro</Text>
      </TouchableOpacity>
      <Button
        title="Tenho um convite!"
        buttonStyle={styles.loginButton}
        onPress={() => navigation.navigate('HasInvite')}
      />
    </View>
  );
}

export default PreLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
  },
  forgotPassword: {
    color: 'blue',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 25,
    width: 200,
    height: 50,
    justifyContent: 'center',
  },
  socialLoginSection: {
    alignItems: 'center',
  },
  socialLoginText: {
    fontSize: 16,
    marginVertical: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});