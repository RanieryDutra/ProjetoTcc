import React from 'react';
import { View, Text, StyleSheet, Linking, Image } from 'react-native';

export default function Ajuda() {

  const linkManual = 'https://drive.google.com/file/d/1gP3BsqOzAXtMwmA5I2KJQ4cBUnrQ9Elq/view?usp=sharing';

 return (
   <View style = {styles.Principal} >

    <Image 
    style={styles.imagemLogo}
    source={require('../Home/LogoBranca.png')}
    resizeMode = 'contain'
    />

    <Text style = {styles.title} > Esta com alguma dificuldade no aplicativo ? Calma podemos te ajudar, click no link abaixo para ter acesso ao manual. </Text>

    <Text
    style = {styles.link}
    onPress = { () => Linking.openURL(linkManual) }
    > {linkManual} </Text>

   </View>
  );
}

const styles = StyleSheet.create({
  Principal: {
    flex: 1,
    backgroundColor: '#000'
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'justify',
    marginTop: 60,
    marginLeft: 35
  }, 
  imagemLogo: {
    width: 480,
    height: 150,
    marginTop: 150
  },
  link: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 60,
    textAlign: 'center'
  }
});