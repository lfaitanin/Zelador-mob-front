import { Heading, VStack, Center, FormControl } from 'native-base';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Platform, Pressable } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form'
import * as  yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Input from '../components/Input'
import Button from '../components/Button'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome!'),
    document: yup.string().required('Insira o documento!'),
    password: yup.string().required('Informe a senha!').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    password_confirm: yup.string().required('Informe a confirmação de senha!').oneOf([yup.ref('password'), null], 'A confirmação de senha não é igual.'),
});

const Agendamento = ({ route, navigation }) => {
    const user = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [dateOfBirth, setDateOfBirth ] = useState();
    const [servicos, setServicos] = useState([]);

    useEffect(() => {

        if (user.idPerfil === undefined || user.idPerfil === null) {
            alert('Usuário sem convite!');
            navigation.navigate('PreLogin');
        }
        
        loadServicosDisponiveis();
    }, []);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            email: user.email
        }
    });

    const loadServicosDisponiveis = () => {
        axios.get('http://localhost:8000/servico/all')
        .then(response => {
            setServicos(response.servicos);
        }).catch(err => {
          console.log(err)
        });   
    }
    const handleSignUp = async (data) => {
        setIsLoading(true);

        var usuario = {
            nome: data.name,
            dataNascimento: date.toISOString(),
            email: data.email,
            documento: data.document,
            senha: data.password,
            preCadastro: true
          }
        
          console.log(usuario)
          axios.put('https://ze-lador.onrender.com/api/user/update-user', usuario)
            .then(response => {
                navigation.navigate('Login', user);
            }).catch(err => {
              console.log(err)
              setIsLoading(false);
            });     
    }
    const onDateChange = ({type}, selectedDate) => {
        if(type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if(Platform.OS === "android") {
                toggleDatePicker();
                console.log('aqui')
                setDateOfBirth(formatDate(currentDate));
            }
        } else {
            toggleDatePicker();
        }    
      };
    
    const toggleDatePicker = () =>{
        setShow(!show);
    }
    const dateInputIcon = (
        <Ionicons name="calendar" size={24} color="black" style={styles.icon} />
      );
    const confirmIosDate = () => {
        setDateOfBirth(formatDate(date))
        toggleDatePicker();
    }
    
    const onCanceling = () => {
      toggleDatePicker()
      setDateOfBirth("")
    }
    
    const formatDate = (rawDate) => {
      let date = new Date(rawDate);
      return date.toLocaleString('pt-BR');
    }
    
    return (
        <VStack bgColor="gray.100" flex={1} px={4}>
            <Center>
                <Controller
                    control={control}
                    name="Serviço"
                    render={({ field: { onChange } }) => (                
                        <Select
                            selectedValue={items[0]} 
                            minWidth="100%"
                            placeholder="Serviço"
                            accessibilityLabel="Serviço"
                            onValueChange={(itemValue) => {
                                const item = servicos.find(i => i.value === itemValue);
                                console.log(item)
                                onChange(item ? item.value : null); 
                              }}
                            _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />,
                            }}
                        >
                            {items.map((item, index) => (
                            <Select.Item key={index} label={item.label} value={item.value} />
                            ))}
                        </Select>
                    )}
                />
                <Controller
                    control={control}
                    name="Data Reserva"
                    render={({ field: { onChange } }) => (
                        <FormControl h={20}>
                            <View style={styles.container}>
                                <View>
                                    {show &&
                                            <DateTimePicker
                                                locale="pt-BR"
                                                mode ="date"
                                                value={date}
                                                display="spinner"
                                                onChange={onDateChange}
                                                style={[styles.pickerContainer]}/>
                                        }   
                                        {show && Platform.OS === "ios" && (
                                        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                            <TouchableOpacity style={[ styles.button, styles.pickerButton, {backgroundColor: "11182711"}]} onPress={onCanceling}>
                                                <Text>Cancelar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[ styles.button, styles.pickerButton, {backgroundColor: "11182711"}]} onPress={confirmIosDate}>
                                                <Text>Confirmar</Text>
                                            </TouchableOpacity>
                                        </View>)}
                                        {
                                        <Pressable onPress={toggleDatePicker}  style={styles.input}>
                                        <TextInput 
                                        value={dateOfBirth} 
                                        onChangeText={setDateOfBirth} 
                                        editable={false} 
                                        placeholder="Data de Reserva"
                                        onPressIn={toggleDatePicker}
                                        placeholderTextColor="#11182744"
                                        />
                                        {dateInputIcon}
                                    </Pressable>
                                        }   
                                </View>
                            </View>
                        </FormControl>
                    )}
                />                
                <Button title="Reservar" onPress={handleSubmit(handleSignUp)} isLoading={isLoading}/>
            </Center>
        </VStack>
    );
}

export default Agendamento;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f4f4f5',
    },
    input: {
      width: '100%',
      padding: 19,
      marginTop: 4.5,
      borderWidth: 0.2,
      borderColor: '#000',
      borderRadius: 5,
      alignSelf: 'center',
    },
    button: {
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      marginTop: 10,
      marginBottom: 15,
      backgroundColor: "#075985",
      flex: 1
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "500",
  
      color: "#fff"
    },
    icon: {
      position: 'absolute',
      right: 8,
      bottom: 18
    },
  });