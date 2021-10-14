import React, { useContext, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../Services/firebaseConnection';

import { AuthContext } from '../../contexts/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {

    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [dataa, setData] = useState([]);

    useEffect(() => {

        async function loadUsers() {
            
            await firebase.database().ref('servicos').on('value', function(snapshoot) {
                setData([]);
                snapshoot.forEach((childItem) => {
                    childItem.forEach((filhoItem) => {
                    let date = {
                            chave: childItem.key,
                            key: filhoItem.key,
                            nome: filhoItem.val().servico,
                            cidade: filhoItem.val().cidade,
                            estado: filhoItem.val().estado,
                            photoUrl: filhoItem.val().fotoUrl,
                            descricao: filhoItem.val().descricao
                    }
                    setData(oldArray => [...oldArray, date]);
                    
                    })
                })
            })
        }
        loadUsers();
    }, [])
    function handleSeila(item) {
        navigation.navigate('Perfil2', { uid: item.chave });
    }
       return (
        <View style = {styles.containerPrincipal}>
        <View style = {styles.estiloReader}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                    source={require('./menu-b.png')}
                    style={{
                        height: 23,
                        width: 23
                    }}
                    />
                </TouchableOpacity>

                <Image
                    source={require('./LogoBranca.png')}
                    style={{
                        width: 65,
                        height: 23
                    }}
                    />
        </View>
            <FlatList
            style = {styles.containerFlatList}
            data={dataa}
            renderItem= { ({ item }) => ( 
                <SafeAreaView style = {styles.containerFlatList}>
                <TouchableOpacity onPress = {() => handleSeila(item)}>
                <View style = {styles.costasImagePerfil}>
                <Image 
                    style={styles.imagemPerfil}
                    source={{uri: item.photoUrl}}
                />
                <View style = {styles.estiloFlatList}> 
                <Text style = {{ color: '#FFF', fontSize: 20}}>{item.nome} </Text>
                <Text style = {{ color: '#FFF', fontSize: 13, marginLeft: 5, height: 75}}>{item.descricao} </Text>
                <View style = {{ alignItems: 'flex-end', marginRight: 5}}>
                <Text style = {{ color: '#505050', fontSize: 12}}>{item.cidade}-{item.estado}</Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
                </SafeAreaView>
            ) }
            />
        </View>
       );
    }


const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        backgroundColor: '#000'
    },
    costasImagePerfil: {
        width: 120,
        height: 120,
        flexDirection: 'row',
        marginLeft: 5,
        backgroundColor: '#151515',
        alignItems: 'center',
        borderTopLeftRadius: 70,
        borderBottomLeftRadius: 70
    },
    imagemPerfil: {
        width: 110,
        height: 110,
        borderRadius: 80,
        marginLeft: 5
      },
    estiloFlatList: {
        backgroundColor: '#151515',
        width: 345,
        height: 120
    },
    containerFlatList: {
        height: 130,
        width: 480,
        marginVertical: 3,
        marginHorizontal: 3,
        marginLeft: 8,
        backgroundColor: '#000'
    },
    estiloReader: {
        backgroundColor: '#151515',
              height: 55,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10
      }
});