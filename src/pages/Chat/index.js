import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { database } from 'firebase';

import Messages from './Messages';

export default function Chat() {

  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [enviar, setEnviar] = useState('');
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState('');


  useEffect( () => {

    getUserUid();

  }, [])

  // Conectar o usuário ao uid

  async function getUserUid() {
    getMessages(user.uid)
    setUid(user.uid);
  }

  async function sendMessage() {

    const masterRef = database().ref(`master/chat/${uid}`);
    const dateNow = new Date();
    if(enviar) {
      
      masterRef.push({
        message: enviar,
        who: true,
        date: {
          day: dateNow.getDate(),
          month: dateNow.getMonth() + 1,
          year: dateNow.getFullYear(),
          hour: dateNow.getHours(),
          minutes: dateNow.getMinutes()
        }
      })

      setEnviar('');

    }
  }

  // Obter menssagens da lista

  async function getMessages(uid) {
    const messagesRef = database().ref(`master/chat/${uid}/`);

    messagesRef.on('value', (data) => {

      // Obter menssagens
      var list = [];

      if(data.val()) {

        data.forEach(element => {
          if(element.val().who) {
            list.push({
              text: element.val().message,
              me: true,
              date: element.val().date,
              key: element.key
            })
          } else {
            list.push({
              text: element.val().message,
              me: false,
              date: element.val().date,
              key: element.key
            })

          }

        })

      } else {
        list = [];
        setMessages([]);
      }

      setMessages(list);

    })
  }

  return (
    <View style = {styles.Principal}>
       <View style = {styles.estiloReader}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                    source={require('../Home/menu-b.png')}
                    style={{
                        height: 23,
                        width: 23
                    }}
                    />
                </TouchableOpacity>

                <Image
                    source={require('../Home/LogoBranca.png')}
                    style={{
                        width: 65,
                        height: 23
                    }}
                    />
        </View>
        <View style = {styles.costasImagePerfil}>
                <Image 
                    style={styles.imagemPerfil}
                    source={require('../../assets/perfil1.jpg')}
                    resizeMode = 'contain'
                />
                <View style = {styles.estiloPerfil}> 
                <Text style = {{ color: '#FFF', fontSize: 20}}>Nome </Text>
                <Text style = {{ color: '#FFF', fontSize: 15, marginLeft: 5}}>Habilidades </Text>
                <View style = {{ alignItems: 'flex-start', marginTop: 50}}>
                <Text style = {{ color: '#505050', fontSize: 12}}>Cidade - Estado </Text>
                </View>
                </View>
                </View>
          <FlatList
          style = {styles.estiloFlatlist}
          data = {messages}
          renderItem = {({ item }) => <Messages item = {item}/>}
          keyExtractor = {(item) => item.key}
          ItemSeparatorComponent = {() => (
            <View style = {{marginVertical: 5}}></View>
          )}
          />
          <View style = {{ flexDirection: 'row' }}>
          <TextInput
          style = {styles.boxInputChat}
          placeholderTextColor = "#FFF"
          placeholder = "  Digite sua mensagem..."
          value = { enviar }
          onChangeText = {(Text) => setEnviar(Text)}
          multiline = { true }
          numberOfLines = { 6 }
          autoCapitalize = 'none'
          autoCorrect = { false }
          blurOnSubmit = { true }
          />
          <TouchableOpacity 
          style = {styles.botaoEnviar}
          onPress = {() => sendMessage()}
          >
          <Icon name="paper-plane" color={'#FFFF'} size={30} style = {{ marginRight: 5 }}/>
          </TouchableOpacity>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  estiloFlatlist: {
    //backgroundColor: 'red'
  },
  botaoEnviar: {
    //backgroundColor: 'red',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxInputChat: {
    textAlignVertical: 'top',
    color: '#FFF',
    backgroundColor: '#151515',
    marginLeft: 5,
    width: 420,
    height: 60,
    borderRadius: 20
  },
  estiloPerfil: {
    backgroundColor: '#000',
    width: 345,
    height: 120,
    marginLeft: 5
  },
  imagemPerfil: {
    width: 120,
    height: 110,
    borderRadius: 80,
    marginLeft: 10
  },
  costasImagePerfil: {
    width: 120,
    height: 120,
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    borderTopLeftRadius: 70,
    borderBottomLeftRadius: 70
  },
  estiloReader: {
    backgroundColor: '#151515',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  Principal: {
    flex: 1,
    backgroundColor: '#000'
  }
})