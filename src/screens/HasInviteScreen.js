import React, { useState } from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { VStack, Button, Center, Input, AlertDialog } from "native-base";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

const HasInviteScreen = ({ navigation }) => {
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
        {/* <Text style={styles.header}>Zé Lador</Text> */}
        <Image
          source={require('./imgs/logo_zelador.png')} // substitua pelo caminho correto da imagem
          style={styles.logo}
        />

        <Center>
          <Text bold style={{ fontSize: 20 }}>Valide o convite</Text>
          <Text style={{ fontSize: 14, marginTop: 20 }}>Informe seu e-mail e o código do convite abaixo:</Text>
        </Center>
        <Center style={{ marginTop: 50 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isFullWidth
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && <Text>Preencha o e-mail.</Text>}
        </Center>

        <Center style={{ marginTop: 10 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Código do Convite"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isFullWidth
              />
            )}
            name="token"
            defaultValue=""
          />
          {errors.token && <Text>Preencha o código do convite.</Text>}
        </Center>

        <Button
          style={{ marginTop: 80 }}
          onPress={handleSubmit(handleSignUp)}
          width={150}
          backgroundColor='#db6729'
          size="lg" // Tamanho grande
          colorScheme="indigo" // Esquema de cores indigo, escolha qualquer esquema de cores disponível
          _text={{ color: 'white' }} // Texto do botão branco
          _pressed={{ bg: "indigo.600" }} // Cor de fundo ao pressionar o botão
          shadow={2} // Aplica uma sombra leve
          _loading={isLoading}
        // Outras propriedades de estilo que você deseja aplicar
        >
          Validar
        </Button>
      </Center>
    </VStack>
  );
}

export default HasInviteScreen;

const styles = StyleSheet.create({
  container: {
    space: 4,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
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
