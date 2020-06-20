import  React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/auth'

export default function CriarConta5() {
    const navigation = useNavigation();

    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');

    const { Localizacao } = useContext(AuthContext);

    function handleLocal() {
        Localizacao(estado, cidade);
        navigation.navigate('CriarConta6');
        setEstado('');
        setCidade('');
    }


    return (
        <View style = {styles.containerPrincipal}>
            <View style = {styles.containerAzul}>
                <Text style = {styles.estiloFrase}>
                    Onde você mora ?
                </Text>
                <View style = {styles.containerEmail}>
                <TextInput
                    style = {styles.inputTexto}
                    placeholder = "Estado"
                    placeholderTextColor = '#FFF'
                    autoCorrect = { false }
                    value = { estado }
                    onChangeText = {(Text) => setEstado(Text)}
                />
                <TextInput
                    style = {styles.inputTexto}
                    placeholder = "Cidade"
                    placeholderTextColor = '#FFF'
                    autoCorrect = { false }
                    value = { cidade }
                    onChangeText = {(Text) => setCidade(Text)}
                />
                </View>
                <View>
                <TouchableOpacity 
                onPress = {handleLocal}
                style = {styles.btnEnviar}
                >
                    <Text style = {styles.containerBotaoTexto}>
                        Próximo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                style = {styles.btnLocal}
                >
                <Text style = {{fontSize: 25, color: '#FFFF'}}>
                    Localizar
                </Text>
                <Image 
                style = {styles.logoLocal}
                source = {require('./localizacao.png')}
                />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1
    },
    containerAzul: {
        backgroundColor: '#000000',
        width: 480,
        height: 890
    },
    estiloFrase: {
        width: 480,
        paddingTop: 250,
        paddingStart: 90,
        fontSize: 40,
        color: 'white'
    },
    inputTexto: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: 'transparent',    
        width: '97%',
        marginBottom: 10,
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        color: '#FFF'
      },
      containerEmail: {
        height: 130,
        marginTop: 40,
        paddingStart: 70,
        paddingHorizontal: 40,
        justifyContent: 'space-around'
      },
      containerBotao: {
        height: 40,
        width: 100,
        borderRadius: 40,
        borderWidth: 2,
        backgroundColor:'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginStart: 330
      },
      btnEnviar: {
        height: 48,
        width: 360,
        borderRadius: 10,
        backgroundColor:'#151515',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginStart: 70
      },
      containerBotaoTexto: {
        fontSize: 20,
        color: '#FFF'
      },
      logoLocal: {
        height: 95,
        width: 120,
        marginStart: 15

      },
      btnLocal: {
        height: 102,
        width: 180,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 2,
        marginStart: 301,
        marginTop: 219
      },
});