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
    //const [ key, setKey ] = useState([]);

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

        /*{id: <Text style = {styles.estiloTexto}>{user && user.uid} </Text>, 
        nome: <Text style = {styles.estiloTexto}> {user && user.nome} </Text>, 
        idade: 50, 
        email: <Text style = {styles.estiloTexto}> {user && user.email} </Text>},
        {id: '2', nome: 'Thiagão', idade: 55, email: 'thiagao.gustavo@aedb.br'},
        {id: '3', nome: 'Carlos', idade: 60, email: 'luizinho.carrrlos@aedb.br'},
        {id: '4', nome: 'Koval', idade: 70, email: 'koval.123@aedb.br'},
        {id: '5', nome: 'Leo', idade: 80, email: 'leo.369@aedb.br'}*/


        /*{key: '1',foto: 'Foto',profissao: 'Digital Influencer', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '2',foto: 'Foto',profissao: 'Programador Java', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '3',foto: 'Foto',profissao: 'Design de interiores', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '4',foto: 'Foto',profissao: 'Editor de Video', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '5',foto: 'Foto',profissao: 'Modelo', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '6',foto: 'Foto',profissao: 'Digital Influencer', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '7',foto: 'Foto',profissao: 'Programador Java', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '8',foto: 'Foto',profissao: 'Design de interiores', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '9',foto: 'Foto',profissao: 'Editor de Video', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},
        {key: '10',foto: 'Foto',profissao: 'Modelo', servicos: 'Uma breve descrição dos serviços prestados', cidade: 'Resende-RJ'},*/

        /*async function loadPhotoProfile() {
            await firebase.database().ref('users/' + dataa.key + '/photoURL').on('value', (snapshot) => {
              if(!snapshot.val()) {
                setData({
                    photoUrl:'https://png.pngtree.com/png-vector/20190307/ourmid/pngtree-vector-edit-profile-icon-png-image_762931.jpg'
                });
              } else {
                setData({ photoUrl: snapshot.val()});
              }
            })
          }
        loadPhotoProfile();*/

        /* let data = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        habilidades: childItem.val().Habilidades,
                        cidade: childItem.val().cidade,
                        estado: childItem.val().estado,
                        photoUrl: childItem.val().photoURL
                    }*/

                    {/*let data = {
                        key: childItem.key,
                        nome: childItem.val().servico,
                        cidade: childItem.val().cidade,
                        estado: childItem.val().estado,
                    photoUrl: childItem.val().photoURL*/}