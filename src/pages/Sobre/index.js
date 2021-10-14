import React from 'react';
import { View, Text, StyleSheet, Linking, Image } from 'react-native';

export default function Sobre() {

  const siteAllJbos = 'https://alljobs-app.000webhostapp.com/'

 return (
   <View style = {styles.Principal} >

       <Image 
        style={styles.imagemLogo}
        source={require('../Home/LogoBranca.png')}
        resizeMode = 'contain'
        />

      <Text style = {styles.textoTitulo} >      Conheça um pouco sobre nós! </Text>

       <Text 
       style = {styles.textoSobre}
       onPress = { () => Linking.openURL(siteAllJbos) } > Entre em nosso site e conheça um pouco sobre o AllJobs                                         https://alljobs-app.000webhostapp.com </Text>
   </View>
  );
}

 const styles = StyleSheet.create({
    Principal: {
      flex: 1,
      backgroundColor: '#000'
    },
    textoTitulo: {
      color: '#FFF',
      fontSize: 30,
      marginTop: 90
    },
    textoSobre: {
      color: '#FFF',
      fontSize: 20,
      marginTop: 80,
      marginLeft: 50,
      width: 390,
      textAlign: 'center'
    },
    imagemLogo: {
      width: 480,
      height: 150,
      marginTop: 150
    },
 });