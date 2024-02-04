import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Platform, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const CadastroScreen = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [blocos, setBlocos] = useState([]); // Deve ser carregado do backend
  const [apartamentos, setApartamentos] = useState([]); // Deve ser carregado do backend
  
  // Carregar os blocos do backend
  useEffect(() => {
    // substitua o URL pelo seu endpoint
    axios.get('https://ze-lador.onrender.com/api/unidade/unidades-by-condominio?id=1')
      .then(response => {
        let data = response.data.response;

        const blocosData = [...new Set(data.map(item => item.bloco))];
        const apartamentosData = [...new Set(data.map(item => item.apartamento))];

        setApartamentos(apartamentosData)
        setBlocos(blocosData);
      });
  }, []);


  // Função para manipular a submissão do formulário
  const onSubmit = (data) => {
    console.log(data);
    // Implemente a lógica de submissão aqui, fazendo uma requisição POST para o backend
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setValue('dataNascimento', currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Use o Controller para integrar o TextInput com o react-hook-form */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Nome"
            style={styles.input}
          />
        )}
        name="nome"
        rules={{ required: true }}
        defaultValue=""
      />

      {/* Campo de e-mail já preenchido via parâmetro */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="E-mail"
            keyboardType="email-address"
            style={styles.input}
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />

      {/* Campo de documento com máscara de CPF */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMask
            type="cpf"
            style={styles.input}
            options={{
              maskType: 'BRL',          
            }}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Documento"
          />
        )}
        name="documento"
        rules={{ required: true }}
        defaultValue=""
      />
       <Controller
        control={control}
        name="senha"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Senha"
            secureTextEntry
          />
        )}
      />

      {/* Repetir Senha */}
      <Controller
        control={control}
        name="repetirSenha"
        defaultValue=""
        style={styles.input}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Repetir Senha"
            secureTextEntry
          />
        )}
      />
    {/* DatePicker */}
    <Controller
        control={control}
        name="dataNascimento"
        render={({ field: { onChange, value } }) => (
          <View>
            <Button title="Data de Nascimento" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                style={styles.input}
                testID="dateTimePicker"
                value={value || new Date()}
                mode={'date'}
                display= "spinner"
                onChange={onDateChange}
              />
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => {
              onChange(itemValue);
            }}>
            {blocos.map((bloco, index) => (
              <Picker.Item key={index} label={bloco} value={bloco} />
            ))}
          </Picker>
        )}
        name="bloco"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              onChange(itemValue);
            }}>
            {apartamentos.map((apartamento, index) => (
              <Picker.Item key={index} label={apartamento} value={apartamento} />
            ))}
          </Picker>
        )}
        name="apartamento"
        rules={{ required: true }}
      />
      {/* Botão de criar */}
      <Button style={styles.button} title="Criar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default CadastroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    marginTop: 20,
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
  }
});
