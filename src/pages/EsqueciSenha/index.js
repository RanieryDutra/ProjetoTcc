import  React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function EsqueciSenha ({ navigation }) {
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
                    onChangeText = {() => {}}
                />
                </View>
                <View style = {styles.containerBotao}>
                <TouchableOpacity 
                onPress = { () => navigation.navigate('EsqueciSenha2')}>
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