import React, {useContext, useEffect, useState, useRef} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet, FlatList, TextInput} from 'react-native';

import {Modalize} from 'react-native-modalize';
//import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../Services/firebaseConnection';

import {AuthContext} from '../../contexts/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {white} from "react-native-paper/src/styles/colors";

export default function Pesquisa() {

    const {user} = useContext(AuthContext);
    const navigation = useNavigation();
    const [dataa, setData] = useState([]);
    const [valorPicker, setValorPicker] = useState('');
    const modalizeRef = useRef(null);
    const [categoria, setCategoria] = useState('');
    const [text, onChangeText] = useState('');

    {/*const info = [
        {key: '1',nome: 'Adminstrativo / Secretariado / Finanças', valor: '' , setValor: ''},
        {key: '2',nome: 'Comercial / Vendas'},
        {key: '3',nome: 'Telecomunicações / Informática / Multimídia'},
        {key: '4',nome: 'Atendimento ao cliente / Call Center'},
        {key: '5',nome: 'Banco / Seguros / Consultoria Jurídica'},
        {key: '6',nome: 'Logística / Distribuição'},
        {key: '7',nome: 'Turismo / Hotelaria / Restaurante'},
        {key: '8',nome: 'Educação / Formação'},
        {key: '9',nome: 'Marketing / Comunicação'},
        {key: '10',nome: 'Serviços Domésticos / Limpezas'},
        {key: '11',nome: 'Constrição / Industrial'},
        {key: '12',nome: 'Saúde / Medicina / Enfermagem'},
        {key: '13',nome: 'Agricultura / Pecuária / Veterinária'},
        {key: '14',nome: 'Engenharia / Arquitetura / Design'}
    ];*/
    }


    useEffect(() => {
        async function loadUsers() {

            if (valorPicker == '') {
                await firebase.database().ref('servicos').on('value', function (snapshoot) {
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
            } else {
                await firebase.database().ref('servicos').on('value', function (snapshoot) {
                    setData([]);
                    snapshoot.forEach((childItem) => {
                        childItem.forEach((filhoItem) => {
                            if (valorPicker === filhoItem.val().categorias) {
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
                            }
                        })
                    })
                })
            }
        }

        loadUsers();
    }, [valorPicker])

    function handleSeila(item) {
        navigation.navigate('Perfil2', {uid: item.chave});
    }

    function onOpen() {
        modalizeRef.current?.open();
    }

    async function loadUsuarios() {
        console.log('aquiiiiiiiiiiiiiiiiiiiii');
    }

    return (
        <View style={styles.containerPrincipal}>

            <Modalize
                ref={modalizeRef}
                snapPoint={700}
                modalHeight={700}
            >
                <View style={{height: 700, backgroundColor: '#303030'}}>
                    <Text style={{fontSize: 25, color: '#FFF', marginTop: 10, marginLeft: 20}}> Profissões </Text>
                    <View style={styles.estiloViewPicker}>
                        <Picker
                            style={styles.estiloPicker}
                            mode={"dropdown"}
                            selectedValue={valorPicker}
                            onValueChange={(itemValor, itemIndex) => setValorPicker(itemValor)}
                        >
                            <Picker.Item label="Categorias" value=""/>
                            <Picker.Item label="Adminstrativo / Secretariado / Finanças" value="1"/>
                            <Picker.Item label="Comercial / Vendas" value="2"/>
                            <Picker.Item label="Telecomunicações / Informática / Multimídia" value="3"/>
                            <Picker.Item label="Atendimento ao cliente / Call Center" value="4"/>
                            <Picker.Item label="Banco / Seguros / Consultoria Jurídica" value="5"/>
                            <Picker.Item label="Logística / Distribuição" value="6"/>
                            <Picker.Item label="Turismo / Hotelaria / Restaurante" value="7"/>
                            <Picker.Item label="Educação / Formação" value="8"/>
                            <Picker.Item label="Marketing / Comunicação" value="9"/>
                            <Picker.Item label="Serviços Domésticos / Limpezas" value="10"/>
                            <Picker.Item label="Construção / Industrial" value="11"/>
                            <Picker.Item label="Saúde / Medicina / Enfermagem" value="12"/>
                            <Picker.Item label="Agricultura / Pecuária / Veterinária" value="13"/>
                            <Picker.Item label="Engenharia / Arquitetura / Design" value="14"/>

                        </Picker>
                    </View>
                </View>
            </Modalize>

            <View style={styles.estiloReader}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        source={require('../Home/menu-b.png')}
                        style={{
                            height: 23,
                            width: 23
                        }}
                    />
                </TouchableOpacity>

                <Image
                    source={require('../Home/LogoBranca.png')}
                    style={{
                        width: 65,
                        height: 23
                    }}
                />
            </View>
            <View style={{flexDirection: 'row'}}>

                <TextInput
                    style={styles.inputPesquisa}
                    onChangeText={text => onChangeText(text)}
                    value={text}
                />

                <TouchableOpacity
                    onPress={() => loadUsuarios()}
                >
                    <View style={styles.iconeInput}>
                        <Icon name="search" color={'#FFFF'} size={40} style={{height: 50, marginTop: 2}}/>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => onOpen()}
                style={{marginLeft: 1, marginBottom: 10}}>
                <Text style={{color: '#FFF', fontSize: 17}}> Filtrar <Icon name="caret-down" color={'#FFFF'} size={25}/>
                </Text>
            </TouchableOpacity>

            <FlatList
                style={styles.containerFlatList}
                data={dataa}
                renderItem={({item}) => (
                    <SafeAreaView style={styles.containerFlatList}>
                        <TouchableOpacity onPress={() => handleSeila(item)}>
                            <View style={styles.costasImagePerfil}>
                                <Image
                                    style={styles.imagemPerfil}
                                    source={{uri: item.photoUrl}}
                                />
                                <View style={styles.estiloFlatList}>
                                    <Text style={{color: '#FFF', fontSize: 20}}>{item.nome} </Text>
                                    <Text style={{
                                        color: '#FFF',
                                        fontSize: 13,
                                        marginLeft: 5,
                                        height: 75
                                    }}>{item.descricao} </Text>
                                    <View style={{alignItems: 'flex-end', marginRight: 5}}>
                                        <Text
                                            style={{color: '#505050', fontSize: 12}}>{item.cidade}-{item.estado}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        backgroundColor: '#000'
    },
    estiloViewPicker: {
        width: 415,
        marginTop: 10,
        marginLeft: 30,
        backgroundColor: '#151515',
        borderRadius: 6
    },
    estiloPicker: {
        color: '#FFF',
        width: 430
    },
    iconeInput: {
        backgroundColor: '#303030',
        height: 51,
        width: 56,
        marginTop: 19,
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    inputPesquisa: {
        backgroundColor: white,
        marginTop: 20,
        //marginBottom: 10,
        width: 350,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        color: '#000000',
        fontSize: 18,
        flex: 1,
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
