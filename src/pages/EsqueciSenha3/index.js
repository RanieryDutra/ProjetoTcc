import  React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EsqueciSenha3() {

    const navigation = useNavigation();

    return (
        <View style = {styles.containerPrincipal}>
            <View style = {styles.containerAzul}>
                <Image 
                    style={styles.imagemLogo}
                    source={require('../Home/LogoBranca.png')}
                    resizeMode = 'contain'
        />
                <Text style = {styles.estiloFrase}>
                    Enviamos um e-mail para você poder trocar sua senha. Atenciosamente a equipe AllJobs
                    agradece sua compreensão.
                </Text>
            </View>
            <View style = {styles.containerVerde}>
                <View style = {styles.containerHome}>
                <TouchableOpacity
                onPress = { () => navigation.navigate('Login')}>
                    <Text style = {styles.estiloHome}>
                        Voltar para Login
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
        height: 760
    },
    containerVerde: {
        width: 480,
        backgroundColor: '#151515',
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    estiloHome: {
        fontSize: 30,
        color: '#FFFF'
    },
    containerHome: {
        paddingTop: 0
    },
    estiloFrase: {
        width: 480,
        paddingTop: 130,
        paddingStart: 30,
        fontSize: 24,
        color: 'white'   
    },
    containerLogo:{
        height: 230,
        marginTop: 80
      },
    imagemLogo: {
        width: 480,
        height: 170,
        marginTop: 90
    }
});