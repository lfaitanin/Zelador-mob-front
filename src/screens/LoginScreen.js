import React, { useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { VStack, Button, Input, Text, Center } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import helpers from '../helpers/helpers';

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (data) => {
    setIsLoading(true);
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <VStack style={styles.container}>
      <Center maxW="300px">
        <Image source={require('./imgs/logo_zelador.png')} style={styles.logo} />
      </Center>
      <Center style={{ marginTop: 40 }}>
        <Text bold style={{ fontSize: 18 }}>Informe seus dados para acessar a sua conta</Text>
      </Center>

      <Center style={{ marginTop: 80 }}>

        <Controller
          control={control}
          rules={{
            required: 'E-mail é obrigatório',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'E-mail inválido',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="E-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && <Text color="danger.500">{errors.email.message}</Text>}
      </Center>
      <Center style={{ marginTop: 10 }}>
        <Controller
          control={control}
          rules={{
            required: 'A senha é obrigatória',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name="senha"
          defaultValue=""
        />
        {errors.password && <Text color="danger.500">{errors.password.message}</Text>}

        <Button
          onPress={handleSubmit(handleLogin)}
          style={{ marginTop: 50 }}
          width={150}
          backgroundColor='#db6729'
          size="lg" 
          colorScheme="indigo" 
          _text={{ color: 'white' }} 
          _pressed={{ bg: "indigo.600" }} 
          shadow={2} 
          isLoading={isLoading} 
          isLoadingText='Entrando'
        >
          Entrar
        </Button>

        <Button variant="link" _text={{ color: '#db6729' }}>
          Esqueceu sua senha?
        </Button>
      </Center >
    </VStack >
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    space: 4,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default LoginScreen;