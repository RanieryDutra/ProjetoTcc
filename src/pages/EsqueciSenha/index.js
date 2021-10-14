import  React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

import firebase from '../../Services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';

export default function EsqueciSenha () {

    const navigation = useNavigation();
    const auth = firebase.auth();
    const [email, setEmail] = useState('');


    async function enviarEmail() {
        auth.sendPasswordResetEmail(email).then(function() {
            console.log('Email enviado');
          }).catch(function(error) {
            console.log(error);
          });
          navigation.navigate('EsqueciSenha3');
    }

    return (
        <View style = {styles.containerPrincipal}>
            <View style = {styles.containerAzul}>
                <Text style = {styles.estiloFrase}>
                    Qual seu e-mail ?
                </Text>
                <View style = {styles.containerEmail}>
                <TextInput
                    style = {styles.inputTexto}
                    placeholder = "Digite seu e-mail aqui"
                    placeholderTextColor = '#FFF'
                    autoCorrect = { false }
                    value = { email }
                    onChangeText = { (text) => setEmail(text) }
                />
                </View>
                <View style = {styles.containerBotao}>
                <TouchableOpacity 
                onPress = { () => enviarEmail()}>
                    <Text style = {styles.containerBotaoTexto}>
                        Enviar
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
        height: 860
    },
    estiloFrase: {
        
        width: 480,
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
        color: '#FFF'
      },
      containerEmail: {
        marginTop: 60,
        paddingStart: 70,
        paddingHorizontal: 40
      },
      containerBotao: {
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