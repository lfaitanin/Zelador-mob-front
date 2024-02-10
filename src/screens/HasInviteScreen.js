import React, { useState } from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { VStack, Button, Center, Input, AlertDialog } from "native-base";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

const PreLoginScreen = ({ navigation }) => {
  // const { signIn } = useContext(AuthContext);

  // const handleLogin = async () => {
  //   await signIn({ email, senha });
  // };

  const { control, handleSubmit, formState: { errors } } = useForm({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data) => {
    setIsLoading(true);
    console.log(data);
    const url = `https://ze-lador.onrender.com/api/validar-cadastro?token=${data.token}&email=${data.email}`;
    axios.get(url)
      .then(response => {
        console.log(response.data)
        if (response.data.success) {
          var user = {
            email: response.data.response.email,
            idCondominio: response.data.response.idCondominio,
            idPerfil: response.data.response.idPerfil
          };
          navigation.navigate('Cadastro', user);
        } else {
          alert('Convite inválido!');
        }
      }).catch(err => {
        console.log('err: ' + err);
      }).finally(() => setIsLoading(false));
  }

  return (
    <VStack style={styles.container}>
      <Center>
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
          name="token"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Token"
              onChangeText={onChange}
              erorMensage={errors.token?.message}
              style={{ maxWidth: "55%", minHeight: 15, padding: "10" }}
            />
          )}
        />
        <Button
          onPress={handleSubmit(handleSignUp)}
          size="lg" // Tamanho grande
          colorScheme="indigo" // Esquema de cores indigo, escolha qualquer esquema de cores disponível
          _text={{ color: 'white' }} // Texto do botão branco
          borderRadius="full" // Bordas completamente arredondadas
          _pressed={{ bg: "indigo.600" }} // Cor de fundo ao pressionar o botão
          shadow={2} // Aplica uma sombra leve
          _loading={isLoading}
        // Outras propriedades de estilo que você deseja aplicar
        >
          Validar convite
        </Button>
      </Center>
    </VStack>
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
  }
});
