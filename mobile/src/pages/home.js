import React, {useEffect, useState} from 'react';
import {SafeAreaView, Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from './../assets/logo.png';
import like from './../assets/like.png';
import dislike from './../assets/dislike.png';

import api from './../services/api';

export default function Home({navigation}) {

    const usuario = navigation.getParam('usuario');

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {

        const getUsuarios = async () => {
            const response = await api.get('/dev', {
                headers: {
                    user_id: usuario

                }
            });

            setUsuarios(response.data.data);

        };

        getUsuarios();

    }, [usuario]);

    const doLike = async () => {
        const [user, ...listaUsuarios] = usuarios;

        const response = await api.post(`/dev/${user._id}/like`, null, {
            headers: {
                user_id: usuario
            }
        });

        setUsuarios(listaUsuarios);
    };

    const doDislike = async () => {
        const [user, ...listaUsuarios] = usuarios;


        const response = await api.post(`/dev/${user._id}/dislike`, null, {
            headers: {
                user_id: usuario
            }
        });

        setUsuarios(listaUsuarios);
    };

    const logout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Login')
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={logout}>
                <Image source={logo} style={styles.logo}/>
            </TouchableOpacity>

            <View style={styles.cardContainer}>
                {
                    usuarios.length === 0 ? <Text style={styles.empty}>Sem usuários =(</Text> : (
                        usuarios.map((user, index) => (
                            <View key={user._id} style={[styles.card, {zIndex: usuarios.length - index}]}>
                                <Image style={styles.avatar} source={{uri: user.github_avatar}}/>
                                <View style={styles.footer}>
                                    <Text style={styles.nome}>{user.nome}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        ))
                    )
                }
            </View>

            {
                usuarios.length > 0 && (
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={doDislike}>
                            <Image source={dislike}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.action} onPress={doLike}>
                            <Image source={like}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        maxHeight: 500
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1

    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    avatar: {
        flex: 1,
        height: 300
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    actions: {
        flexDirection: 'row',
        marginBottom: 30
    },
    action: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 4
    }
});
