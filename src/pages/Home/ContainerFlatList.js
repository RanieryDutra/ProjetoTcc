import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ContainerFlatList({ data }) {
 return (
    <SafeAreaView style = {styles.containerFlatList}>
    <View style = {styles.costasImagePerfil}>
    <Image 
        style={styles.imagemPerfil}
        source={require('../../assets/perfil.jpg')}
        resizeMode = 'contain'
    />
    <View style = {styles.estiloFlatList}> 
    <Text style = {{ color: '#FFF', fontSize: 20}}>{item.profissao} </Text>
    <Text style = {{ color: '#FFF', fontSize: 15, marginLeft: 5}}>{item.servicos} </Text>
    <View style = {{ alignItems: 'flex-end', marginTop: 50}}>
    <Text style = {{ color: '#505050', fontSize: 12}}>{item.cidade} </Text>
    </View>
    </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
        width: 120,
        height: 110,
        borderRadius: 80
      },
    estiloFlatList: {
        backgroundColor: '#151515',
        width: 345,
        height: 120
    },
    containerFlatList: {
        height: 130,
        width: 480,
        marginVertical: 10,
        marginHorizontal: 3,
        backgroundColor: '#000'
    }
});