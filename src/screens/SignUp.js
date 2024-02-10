import { Heading, VStack, Center, FormControl } from 'native-base';
import React, { useEffect, useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form'
import * as  yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Input from '../components/Input'
import Button from '../components/Button'
import DateInput from '../components/DateInput'
import Selector from '../components/Selector';
import { useAuth } from '../contexts/AuthContext'

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome!'),
    document: yup.string().required('Insira o documento!'),
    password: yup.string().required('Informe a senha!').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    password_confirm: yup.string().required('Informe a confirmação de senha!').oneOf([yup.ref('password'), null], 'A confirmação de senha não é igual.'),
});

const SignUp = ({ route, navigation }) => {
    console.log('Params: ' + JSON.stringify(route));

    const [blocos, setBlocos] = useState([]); // Deve ser carregado do backend
    const [apartamentos, setApartamentos] = useState([]); // Deve ser carregado do backend
    const { signUp } = useAuth();
    const user = route.params;

    useEffect(() => {

        if (user.idPerfil === undefined || user.idPerfil === null) {
            alert('Usuário sem convite!');
            navigation.navigate('PreLogin');
        }

        // substitua o URL pelo seu endpoint
        const url = `https://ze-lador.onrender.com/api/unidade/unidades-by-condominio?id=${user.idCondominio}`;
        console.log('URL: ' + url)
        axios.get(url)
            .then(response => {
                let data = response.data.response;

                const blocosData = [...new Set(data.map(item => item.bloco))];
                const apartamentosData = [...new Set(data.map(item => item.apartamento))];
                setApartamentos(apartamentosData)
                setBlocos(blocosData);

            });
    }, []);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            email: user.email
        }
    });

    const handleSignUp = async (data) => {

        console.log(data)
        var result = await signUp(data);
    }

    return (
        <VStack bgColor="gray.100" flex={1} px={4}>
            <Center>
                <Heading my={3}></Heading>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Nome"
                            onChangeText={onChange}
                            erorMensage={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    defaultValue={user.email}
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Email"
                            onChangeText={onChange}
                            erorMensage={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="document"
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Documento"
                            onChangeText={onChange}
                            erorMensage={errors.document?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="dataNascimento"
                    render={({ field: { onChange } }) => (
                        <FormControl h={20}>
                            <DateInput />
                        </FormControl>

                    )}
                />
                <Controller
                    control={control}
                    name="bloco"
                    render={({ field: { onChange } }) => (
                        <Selector
                            placeholder="Escolha seu bloco"
                            onChangeText={onChange}
                            erorMensage={errors.document?.message}
                            items={blocos}
                            choose="bloco"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="apartamento"
                    render={({ field: { onChange } }) => (
                        <Selector
                            placeholder="Escolha seu apartamento"
                            onChangeText={onChange}
                            erorMensage={errors.document?.message}
                            items={apartamentos}
                            choose="apartamento"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Senha"
                            onChangeText={onChange}
                            secureTextEntry
                            erorMensage={errors.password?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password_confirm"
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Confirme a senha"
                            onChangeText={onChange}
                            secureTextEntry
                            erorMensage={errors.password_confirm?.message}
                        />
                    )}
                />
                <Button title="Cadastrar" onPress={handleSubmit(handleSignUp)} />
            </Center>
        </VStack>
    );
}

export default SignUp;

