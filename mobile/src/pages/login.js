import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TextInput, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import logo from './../assets/logo.png';
import api from './../services/api';

export default function Login({navigation}) {

    const [githubUser, setGithubUser] = useState('');

    useEffect(() => {
        const getUsuarioLogado = async () => {
            const usuario = await AsyncStorage.getItem('usuario');

            if(usuario){
                navigation.navigate('Landing', {usuario});
            }
        };

        getUsuarioLogado();
    }, []); // Executa ao iniciar a aplicação

    const doLogin = async () => {
        const response = await api.post('/dev', {
            github_user: githubUser
        });

        if(response.status === 200){

            const {_id} = response.data.data;

            await AsyncStorage.setItem('usuario', _id);

            navigation.navigate('Landing', {_id});
            console.log(_id);
        }else{
            alert('Erro ao fazer login');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={logo}/>
            <TextInput
                placeholder={"Usuário no GitHub"}
                style={styles.inputLogin}
                placeholderTextColor={'#999'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={githubUser}
                onChangeText={setGithubUser}
                />
            <TouchableOpacity style={styles.btnLogin} onPress={doLogin}>
                <Text style={styles.btnLoginText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    inputLogin: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 6,
        marginTop: 20,
        paddingHorizontal: 15
    },
    btnLogin: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLoginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
