import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';




export default function Contato() {


    const navigation = useNavigation();

 return (
   <View>
       <View style = {{flexDirection: 'row'}}>
        <View style = {styles.boxPrincipais}>
        <Text style = {{ color: '#FFF', fontSize: 12, marginTop: 2 }}>    Principais </Text>
        <View style = {{ flexDirection: 'row'}}>
        <TouchableOpacity>
        <Icon name="whatsapp" color={'#FFFF'} size={80} style = {{height: 80, marginLeft: 50}}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <Icon name="envelope-square" color={'#FFFF'} size={100} style = {{height: 95, marginLeft: 80}}/>
        </TouchableOpacity>
        </View>
        <Text style = {{ color: '#FFF', fontSize: 12, marginTop: 2 }}>    Outros  </Text>
        <View style = {{ flexDirection: 'row' }}>
        <TouchableOpacity>
        <Icon name="instagram" color={'#FFFF'} size={70} style = {{ marginLeft: 10}}/>
        {/*<Image
        style = {styles.estiloIconOutros}
        source = {require('../../assets/logoinsta.png')}
        resizeMode = 'contain'
        />*/}
        </TouchableOpacity>
        <TouchableOpacity>
        <Icon name="twitter" color={'#FFFF'} size={70} style = {{ marginLeft: 20}}/>
        {/*<Image
        style = {styles.estiloIconOutros}
        source = {require('../../assets/logott.png')}
        resizeMode = 'contain'
        />*/}
        </TouchableOpacity>
        <TouchableOpacity>
        <Icon name="facebook-square" color={'#FFFF'} size={70} style = {{ marginLeft: 20}}/>
        {/*<Image
        style = {styles.estiloIconOutros}
        source = {require('../Login/logo-facebook.png')}
        resizeMode = 'contain'
        />*/}
        </TouchableOpacity>
        <TouchableOpacity>
        <Icon name="linkedin-square" color={'#FFFF'} size={70} style = {{ marginLeft: 20}}/>
        {/*<Image
        style = {styles.estiloIconOutros}
        source = {require('../../assets/logoin.png')}
        resizeMode = 'contain'
        />*/}
        </TouchableOpacity>
        </View>
        </View>
        <View style = {styles.costasImageChat}>
        <TouchableOpacity
        onPress = { () => navigation.navigate('Chat')}
        >
        <View style = {styles.imageChat}>
        <Image
        style = {styles.estiloImageChat}
        source = {require('../../assets/chat.png')}
        resizeMode = 'contain'
        />
        <Text style = {{ color: '#101010', fontSize: 20, fontWeight: 'bold' }}>   Chat </Text>
        </View>
        </TouchableOpacity>
        </View>
        </View>
   </View>
  );
}

const styles = StyleSheet.create({
    estiloIconOutros: {
      //backgroundColor: 'red',
      width: 60,
      height: 60,
      marginLeft: 20,
      marginTop: 5,
      borderRadius: 20
    },
    estiloIconWhats: {
      //backgroundColor: 'red',
      width: 80,
      height: 80,
      marginLeft: 50,
      marginRight: 40,
      marginTop: 5,
      borderRadius: 20
    },
    estiloIconGmail: {
      width: 110,
      height: 85,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 5,
      borderRadius: 20
    },
    estiloImageChat: {
      //backgroundColor: 'red',
      width: 80,
      height: 80,
      marginTop: 55,
      marginLeft: 15
    },
    costasImageChat: {
      backgroundColor: '#151515',
      width: 109,
      height: 205,
      marginRight: 10,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20
    },
    imageChat: {
      backgroundColor: '#454545',
      width: 109,
      height: 205,
      borderRadius: 20
    },
    boxPrincipais: {
      backgroundColor: '#151515',
      width: 350,
      height: 205,
      marginLeft: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10
    }
});


        /*
        <Image
        style = {styles.estiloIconWhats}
        source = {require('./logowp.png')}
        resizeMode = 'contain'
        />
        
        <Image
        style = {styles.estiloIconGmail}
        source = {require('./logogmail.png')}
        resizeMode = 'contain'
        />*/