import  React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { AuthContext } from '../../contexts/auth'

export default function CriarConta6 () {

    const { Finalizando } = useContext(AuthContext);

    function handleFinalizando(){
         Finalizando();
      }
    return (
        <View style = {styles.containerPrincipal}>
            <View style = {styles.containerAzul}>
                <Text style = {styles.estiloFrase}>
                    Pronto!
                </Text>
                {/*<Text style = {styles.estiloTexto}>
                Em breve receberá um e-mail com a confirmação do cadastro.
                </Text>*/}
                <Text style = {styles.estiloTexto2}>
                Agora poderá utilizar todas as funções do nosso app.
                </Text>
                <TouchableOpacity 
                onPress = {handleFinalizando}
                style = {styles.btnEnviar}
                >
                    <Text style = {styles.containerBotaoTexto}>
                        Ir para o página inicial
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
        paddingTop: 200,
        paddingStart: 150,
        fontSize: 60,
        color: 'white'
    },
      btnEnviar: {
        height: 80,
        width: 480,
        borderRadius: 3,
        backgroundColor:'#151515',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200
      },
      containerBotaoTexto: {
        fontSize: 28,
        color: '#FFF'
      },
      estiloTexto: {
        fontSize: 25,
        color: '#FFFF',
        height: 100,
        width: 350,
        marginStart: 60,
        marginTop: 100,
        textAlign: 'center'
      },
      estiloTexto2: {
        fontSize: 25,
        color: '#FFFF',
        height: 100,
        width: 250,
        marginStart: 115,
        marginTop: 30,
        textAlign: 'center'
      },
});