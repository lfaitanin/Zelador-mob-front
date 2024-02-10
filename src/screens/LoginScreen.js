import React, { useState } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { VStack, Button, Center, Input, AlertDialog } from "native-base";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios';
import helpers from '../helpers/helpers';

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (data) => {
    setIsLoading(true);
    console.log(data.email);
    const url = `https://ze-lador.onrender.com/api/user/authenticate`;
    axios.post(url, { email: data.email, senha: data.senha })
      .then(response => {
        console.log(response.data)
        if (response.data.success) {
          helpers.saveToken(helpers.formatEmailToStore(data.email), response.data.response);
          navigation.navigate('Dashboard', { email: data.email, token: helpers.getToken(data.email.replace('@', '')) });
        } else {
          alert('Usuário ou senha inválido(s)!');
        }
      }).catch(err => {
        console.log('err: ' + err);
      }).finally(() => setIsLoading(false));
  };

  return (
    <VStack style={styles.container}>
      <Text style={styles.header}>Zé Lador</Text>
      <Image
        source={require('./imgs/logo.png')} // substitua pelo caminho correto da imagem
        style={styles.logo}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange } }) => (
          <Input
            placeholder="Email"
            onChangeText={onChange}
            erorMensage={errors.email?.message}
            style={{ maxWidth: "55%", minHeight: 15, padding: "10" }}
          />
        )}
      />
      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange } }) => (
          <Input
            secureTextEntry={true}
            placeholder="Senha"
            onChangeText={onChange}
            erorMensage={errors.token?.message}
            style={{ maxWidth: "55%", minHeight: 15, padding: "10" }}
          />
        )}
      />
      <Button
        onPress={handleSubmit(handleLogin)}
        size="lg" // Tamanho grande
        colorScheme="indigo" // Esquema de cores indigo, escolha qualquer esquema de cores disponível
        _text={{ color: 'white' }} // Texto do botão branco
        borderRadius="full" // Bordas completamente arredondadas
        _pressed={{ bg: "indigo.600" }} // Cor de fundo ao pressionar o botão
        shadow={2} // Aplica uma sombra leve
        _loading={isLoading}
      // Outras propriedades de estilo que você deseja aplicar
      >
        Entrar
      </Button>

      {/* <View style={styles.socialLoginSection}>
        <Text style={styles.socialLoginText}>Faça login com:</Text>
        <View style={styles.socialIcons}>
          <SocialIcon type="google" />
          <SocialIcon type="facebook" />
          <SocialIcon type="apple" />
        </View>
      </View> */}
    </VStack>
  );
}

export default LoginScreen;

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
