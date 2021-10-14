import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native'; 

import firebase from '../../Services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

export default function ServicosCadastrados() {

    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const modalizeRef = useRef(null);
    const [dataa, setData] = useState([]);
    const [oItem, setOitem] = useState();
    

    useEffect(() => {
        async function loadServicos() {
            await firebase.database().ref('servicos/' + user.uid).on('value', function(snapshoot) {
                setData([]);
                snapshoot.forEach((childItem) => {
                    let date = {
                        key: childItem.key,
                        servico: childItem.val().servico,
                        cidade: childItem.val().cidade,
                        estado: childItem.val().estado,
                        photoUrl: childItem.val().fotoUrl,
                        descricao: childItem.val().descricao,
                        categoria: childItem.val().categorias
                }
                setData(oldArray => [...oldArray, date]);
                })
            })
        }
        loadServicos();
    }, [])

    function editarServico(item) {
        navigation.navigate('CadastrarServico', item);
    }

    function abrirModalExcluir(key){
        setOitem(key);
        modalizeRef.current?.open();
    }

    async function excluirServicoSim() {
        let deletarServico = await firebase.database().ref('servicos/' + user.uid);
        deletarServico.child(oItem).remove();
        modalizeRef.current?.close();
    }

    function excluirServicoNao() {
        modalizeRef.current?.close();
    }

    return(
    <View style = {styles.Principal}>

        <Modalize
        ref = { modalizeRef }
        snapPoint = { 100 }
        modalHeight = { 100 }
        HeaderComponent = {
          <View style = {styles.headerModal}>
          <Text style = {{ color: '#FFF', marginTop: 5, fontSize: 17 }}>Tem certeza de que deseja excluir este serviço ?</Text>
          </View>
        }
        >
            <View style = {{ flex: 1, height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#151515' }}>
          <TouchableOpacity style = {styles.btnSim} onPress = {() => excluirServicoSim()} >
            <Text style = {{ color: '#000', fontSize: 16, fontWeight: '600' }}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btnNao} onPress = {excluirServicoNao} >
            <Text style = {{ color: '#000', fontSize: 16, fontWeight: '600' }}>Não</Text>
          </TouchableOpacity>
            </View>

        </Modalize>

        <FlatList
            style = {styles.containerFlatList}
            data={dataa}
            renderItem= { ({ item }) => ( 
                <SafeAreaView style = {styles.containerFlatList}>
                <View style = {styles.costasImagePerfil}>
                <Image 
                    style={styles.imagemPerfil}
                    source={{uri: item.photoUrl}}
                />
                <View style = {styles.estiloFlatList}> 
                <Text style = {{ color: '#FFF', fontSize: 20}}>{item.servico} </Text>
                <Text style = {{ color: '#FFF', fontSize: 13, marginLeft: 5, height: 75}}>{item.descricao} </Text>
                <View style = {{ alignItems: 'flex-end', marginRight: 5}}>
                <Text style = {{ color: '#505050', fontSize: 12}}>{item.cidade}-{item.estado}</Text>
                </View>
                </View>
                </View>
                <View style = {{ flexDirection: 'row-reverse', marginLeft: 20  }}>
                <TouchableOpacity
                    style = {styles.btnUpload2}
                        onPress = {() => abrirModalExcluir(item.key)}
                >
                        <Text style = {{color: '#FFF'}}> Excluir </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.btnUpload}
                    onPress = {() => editarServico(item)}
                >
                        <Text style = {{color: '#FFF'}}> Editar </Text>
                </TouchableOpacity>   
                </View>
                </SafeAreaView>
            ) }
            />
    </View>
)}

const styles = StyleSheet.create({
    Principal: {
        backgroundColor: '#000',
        flex: 1
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
        height: 155,
        width: 480,
        marginVertical: 3,
        marginHorizontal: 3,
        marginLeft: 8,
        backgroundColor: '#000'
    },
    btnUpload: {
        marginTop: 5,
        height: 32,
        width: 70,
        borderRadius: 20,
        backgroundColor:'#151515',
        justifyContent: 'center',
        alignItems: 'center'
      },
      btnUpload2: {
        marginTop: 5,
        marginLeft: 10,
        height: 32,
        width: 70,
        borderRadius: 20,
        backgroundColor:'#151515',
        justifyContent: 'center',
        alignItems: 'center'
      }, 
      headerModal: {
        backgroundColor: '#151515',
        alignItems: 'center',
        height: 30
      }, 
      btnSim: {
        backgroundColor: '#FFF',
        width: 60,
        height: 35, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 100
      },
      btnNao: {
        backgroundColor: '#FFF',
        width: 60,
        height: 35, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }
})