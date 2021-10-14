import  React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/auth'


export default function CriarConta1() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { EmailSenha } = useContext(AuthContext);

    function handleEmailSenha(){
      EmailSenha(email, senha);
      navigation.navigate('CriarConta2');
      setEmail('');
      setSenha('');
    }
    
     
    return (
        <View style = {styles.containerPrincipal}>
            <View style = {styles.containerAzul}>
                <Text style = {styles.estiloFrase}>
                    Digite um email e senha para criar seu login.
                </Text>
                <View style = {styles.containerEmail}>
                <TextInput
                    style = {styles.inputTexto}
                    placeholder = "Digite seu e-mail aqui"
                    placeholderTextColor = '#FFF'
                    autoCorrect = { false }
                    value = {email}
                    onChangeText = {(text) => setEmail(text)}
                    
                />
                </View>
                <TextInput
                    secureTextEntry = {true}
                    style = {styles.inputTexto2}
                    placeholder = "Digite uma senha com até 6 caracteres."
                    placeholderTextColor = '#FFF'
                    autoCorrect = { false }
                    value = {senha}
                    onChangeText = {(text) => setSenha(text)}
                    
                />                
                
                <TouchableOpacity 
                onPress = {handleEmailSenha}
                style = {styles.btnEnviar}
                >
                    <Text style = {styles.containerBotaoTexto}>
                        Enviar
                    </Text>
                </TouchableOpacity>
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
        paddingTop: 150,
        paddingStart: 15,
        fontSize: 40,
        color: 'white',
        textAlign: 'center'
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
      inputTexto2: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: 'transparent',    
        width: '75%',
        marginBottom: 10,
        marginStart: 70,
        marginTop: 30,
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        color: '#FFFF',
        
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