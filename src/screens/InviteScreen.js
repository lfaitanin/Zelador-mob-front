import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, FormControl, Button, Center, Input, View, Spacer } from "native-base";
import Selector from '../components/Selector';
import { useForm, Controller } from 'react-hook-form'
import * as  yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
                let data = response.data;
                const perfilData = data.map(item => {
                    return { label: item.nomePerfil, value: item.id };
                });
                setPerfil(perfilData)
            });

        axios.get('https://ze-lador.onrender.com/api/unidade/unidades-by-condominio?id=1')
            .then(response => {
                let data = response.data.response;
                const unidadeData = data.map(item => {
                    return { label: item.apartamento, value: item.id };
                });
                setUnidade(unidadeData)
            });
    }, []);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    const handleSignUp = async (data) => {

        axios.post('https://ze-lador.onrender.com/api/user/convidar-usuarios', {
            usuarios: [{
                email: data.email,
                celular: data.celular,
                idCondominio: data.unidade,
                idPerfil: data.perfil
            }], enviadoPor: ''
        })
            .then(response => {
                console.log(response.data)
            });
    }
    return <VStack bgColor="gray.100" mt="5%">
        <Center>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange } }) => (
                    <Input
                        placeholder="Email"
                        onChangeText={onChange}
                        erorMensage={errors.email?.message}
                        style={{ maxWidth: "95%", minHeight: 58, padding: "10" }}
                    />
                )}
            />
            <Spacer size="2" />
            <Controller
                control={control}
                name="celular"
                render={({ field: { onChange } }) => (
                    <Input
                        placeholder="Celular"
                        onChangeText={onChange}
                        erorMensage={errors.celular?.message}
                        style={{ maxWidth: "95%", minHeight: 58, padding: "10" }}
                    />
                )}
            />
            <Spacer size="1" />
            <Controller
                control={control}
                name="unidade"
                render={({ field: { onChange, value } }) => (
                    <Selector
                        items={unidade}
                        choose="unidade"
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="perfil"
                render={({ field: { onChange, value } }) => (
                    <Selector
                        placeholder="Escolha seu perfil"
                        erorMensage={errors.perfil?.message}
                        items={perfil}
                        choose="perfil"
                        value={value} // Passa o value para o Selector
                        onChange={onChange} // Passa o onChange para o Selector
                    />
                )}
            />
            <Spacer size="10" />
            <Button
                onPress={handleSubmit(handleSignUp)}
                size="lg" // Tamanho grande
                colorScheme="indigo" // Esquema de cores indigo, escolha qualquer esquema de cores disponível
                _text={{ color: 'white' }} // Texto do botão branco
                borderRadius="full" // Bordas completamente arredondadas
                _pressed={{ bg: "indigo.600" }} // Cor de fundo ao pressionar o botão
                shadow={2}
                isLoading // Aplica uma sombra leve
            // Outras propriedades de estilo que você deseja aplicar
            >
                Criar convite
            </Button>

        </Center>
    </VStack>;
};

export default Invite;