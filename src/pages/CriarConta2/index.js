import  React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/auth'

export default function CriarConta2() {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');

    const { Nome } = useContext(AuthContext);

    function handleNome() {
        Nome(nome);
        navigation.navigate('CriarConta3');
        setNome('');
    }

    return (
        <View style = {styles.containerPrincipal}>
            <View style = {styles.containerAzul}>
                <Text style = {styles.estiloFrase}>
                    Qual seu nome ?
                </Text>
                <View style = {styles.containerEmail}>
                <TextInput
                    style = {styles.inputTexto}
                    placeholder = "Digite seu nome."
                    placeholderTextColor = '#FFF'
                    autoCorrect = { false }
                    value = { nome }
                    onChangeText = {(text) => setNome(text)}
                    
                />
                </View>
                <View>
                <TouchableOpacity 
                onPress = {handleNome}
                style = {styles.btnEnviar}
                >
                    <Text style = {styles.containerBotaoTexto}>
                        Próximo
                    </Text>
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
        width: 505,
        paddingTop: 250,
        paddingStart: 100,
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
        color: '#FFFF'
      },
      containerEmail: {
        marginTop: 60,
        paddingStart: 70,
        paddingHorizontal: 40
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

});