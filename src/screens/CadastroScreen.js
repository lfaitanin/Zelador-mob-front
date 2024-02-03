import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Platform, Pressable } from 'react-native';
import DateInput from '../components/DateInput';
import Perfis from '../components/Perfis';
import AuthContext from '../contexts/AuthContext';

const CadastroScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  
  const handleCadastro = async () => {
    await signUp({ nome, email, documento, senha, apartamento, dataNascimento, bloco, perfil});
    // Após o cadastro, redirecione para a tela de login ou diretamente para o Dashboard se receber um token
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Zé Lador</Text>
      <TextInput style={styles.input} placeholder="Nome" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Documento" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry /> 
      <DateInput />
      <TextInput style={styles.input} placeholder="Apartamento" />
      <TextInput style={styles.input} placeholder="Bloco" />
      <TouchableOpacity style={styles.button} onPress={() => handleCadastro}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default CadastroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    alignSelf: 'center',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});