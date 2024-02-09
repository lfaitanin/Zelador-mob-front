import React, {useState, useEffect} from "react";
import { Box, Heading, VStack, FormControl, Button, Center, Input, View } from "native-base";
import Selector from '../components/Selector';
import {useForm, Controller} from 'react-hook-form'
import * as  yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'

const signUpSchema = yup.object({
    email: yup.string().required(),
});

const Invite = () => {
    const [unidade, setUnidade] = useState([]); // Deve ser carregado do backend
    const [perfil, setPerfil] = useState([]); // Deve ser carregado do backend

    useEffect(() => {
        // substitua o URL pelo seu endpoint
        axios.get('https://ze-lador.onrender.com/api/perfil/get-all-visible')
          .then(response => {
            let data = response.data.response;
   
            const perfilData = [...new Set(data.map(item => item.nomePerfil))];
            console.log(data)
            setPerfil(perfilData)            
          });

          axios.get('https://ze-lador.onrender.com/api/unidade/unidades-by-condominio?id=1')
          .then(response => {
            let data = response.data.response;
    
            const unidadeData = [...new Set(data.map(item => item.apartamento))];
            setUnidade(unidadeData)            
          });
      }, []);

      const {control, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    const handleSignUp = async (data) => {

        axios.post('https://ze-lador.onrender.com/api/user/convidar-usuarios', {usuario: {
            email: data.email,
            celular: data.celular,
            idCondominio: data.idCondominio,
            idPerfil: data.idPerfil
        }, enviadoPor: ''})
        .then(response => {
            console.log(response)
        });
    }
    return  <VStack bgColor="gray.100" mt="15%">
                <Center>
                        <Controller
                            control={control}
                            name="email"       
                            style={{ maxWidth: "95%"}}             
                            render={({field: {onChange}}) => (
                                <Input 
                                placeholder="Email" 
                                onChangeText={onChange}
                                erorMensage={errors.email?.message}
                                style={{ maxWidth: "95%", minHeight:58, padding: "10"}}
                                />
                            )}
                        />
                    <Controller
                        control={control}
                        name="celular"                    
                        render={({field: {onChange}}) => (
                            <Input 
                            placeholder="Celular" 
                            onChangeText={onChange}
                            erorMensage={errors.celular?.message}
                            style={{ maxWidth: "95%", minHeight:58, padding: "10"}}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="unidade"
                        render={({field: {onChange}}) => (
                            <Selector 
                            placeholder="Escolha sua unidade" 
                            onChangeText={onChange}
                            erorMensage={errors.unidade?.message}
                            items={unidade}
                            choose="unidade"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="perfil"
                        render={({field: {onChange}}) => (
                            <Selector 
                            placeholder="Escolha seu perfil" 
                            onChangeText={onChange}
                            erorMensage={errors.perfil?.message}
                            items={perfil}
                            choose="perfil"
                            />
                        )}
                    />
                    <Button title="Criar" onPress={handleSubmit(handleSignUp)}/>
                </Center>
            </VStack>;
  };

  export default Invite;