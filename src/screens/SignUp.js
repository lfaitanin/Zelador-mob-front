import { Heading, VStack,Center, FormControl } from 'native-base';
import React from 'react';
import {useForm, Controller} from 'react-hook-form'
import * as  yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import Input from '../components/Input'
import Button from '../components/Button'
import DateInput from '../components/DateInput'


const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome!'),
    document: yup.string().required('Insira o documento!'),
    password: yup.string().required('Informe a senha!').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    password_confirm: yup.string().required('Informe a confirmação de senha!').oneOf([yup.ref('password'), null], 'A confirmação de senha não é igual.'),
});

const SignUp = () => {

    const { control, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(signUpSchema)
    });
    
    function handleSignUp(data){
        console.log(data)
    }

    return (
        <VStack bgColor="gray.100" flex={1} px={4}>
            <Center>
                <Heading my={6}></Heading>
                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange}}) => (
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
                    render={({field: {onChange}}) => (
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
                    render={({field: {onChange}}) => (
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
                    render={({field: {onChange}}) => (
                        <FormControl h={20}>
                        <DateInput />
                        </FormControl>

                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange}}) => (
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
                    render={({field: {onChange}}) => (
                        <Input 
                        placeholder="Confirme a senha" 
                        onChangeText={onChange}
                        secureTextEntry
                        erorMensage={errors.password_confirm?.message}
                        />
                    )}
                />
                <Button title="Cadastrar" onPress={handleSubmit(handleSignUp)}/>
            </Center>
        </VStack>
    );
}

export default SignUp;

