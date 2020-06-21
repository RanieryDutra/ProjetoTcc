import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const data = [
        {id: '1', nome: 'Raniery', idade: 50, email: 'raniery.dutra@aedb.br'},
        {id: '2', nome: 'Thiagão', idade: 55, email: 'thiagao.gustavo@aedb.br'},
        {id: '3', nome: 'Carlos', idade: 60, email: 'luizinho.carrrlos@aedb.br'},
        {id: '4', nome: 'Koval', idade: 70, email: 'koval.123@aedb.br'},
        {id: '5', nome: 'Leo', idade: 80, email: 'leo.369@aedb.br'}
    ];

    const [ names, setNames ] = useState(data);
    const navigation = useNavigation();

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
            showsHorizontalScrollIndicator={false}
            data={names}
            renderItem={ ({item}) => {
            return (
            <View style = {styles.containerFlatList}>
                <Text style = {styles.estiloTexto}>Nome: {item.nome} </Text>
                <Text style = {styles.estiloTexto}>Idade: {item.idade} </Text>
                <Text style = {styles.estiloTexto}>Email: {item.email} </Text>
            </View>
            )}}
            />
        </View>
       );
    }


const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        backgroundColor: '#000000'
    },
    containerFlatList: {
        height: 200,
        width: 480,
        marginVertical: 10,
        marginHorizontal: 3,
        backgroundColor: '#000000'
    },
    estiloTexto: {
        color: '#FFF',
        fontSize: 20
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