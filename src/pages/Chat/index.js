import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { database } from 'firebase';

import Messages from './Messages';

export default function Chat({ route }) {

  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [enviar, setEnviar] = useState('');
  const [messages, setMessages] = useState([]);
  const [ user2uid, setUser2Uid ] = useState('');
  const chaveChat = route.params?.chaveDoChat;
  const info = route.params?.infos;
  
//console.log(user.uid);

  useEffect( () => {

    async function getHabilidades() {
      await database().ref('users').child(info.com).once('value', (snap) => {
        setUser2Uid(snap.val().Habilidades);
      })
    }
    getHabilidades();

    getUserUid(info.key);

  }, [])

  // Conectar o usuário ao uid

  async function getUserUid(item) {
    getMessages(item)
  }

  async function sendMessage(item) {

    const masterRef = database().ref(`master/chat/${item}`).push();
    const dateNow = new Date();
    if(enviar) {
      
      masterRef.update({
        messages: {
        message: enviar,
        who: user.uid,
        date: {
          day: dateNow.getDate(),
          month: dateNow.getMonth() + 1,
          year: dateNow.getFullYear(),
          hour: dateNow.getHours(),
          minutes: dateNow.getMinutes()
        }
      }
      })
      setEnviar('');
    }
  }

  // Obter menssagens da lista

  async function getMessages(chave) {
    const messagesRef = database().ref(`master/chat/${chave}/`);

    messagesRef.on('value', (data) => {
      //console.log(user.uid)
      // Obter menssagens
      var list = [];

      if (data.val()) {
        
        data.forEach(element => {
          element.forEach((item) => {
          //console.log(item.val())
        if (item.val().who == user.uid) {
          list.push({
            text: item.val().message,
            me: item.val().who,
            date: item.val().date,
            key: element.key
          });
        } if (item.val().who == info.com) {
          list.push({
            text: item.val().message,
            me: item.val().who,
            date: item.val().date,
            key: element.key
          });
        }
        })
      })
      } else {
        list = [];
        setMessages([]);
      }
      setMessages(list);
      //console.log(list)

    })
  }
  //console.log(messages);
  return (
    <View style = {styles.Principal}>
        <View style = {styles.costasImagePerfil}>
                <Image 
                    style={styles.imagemPerfil}
                    source={{ uri: info.avatar }}
                />
                <View style = {styles.estiloPerfil}> 
                <Text style = {{ color: '#FFF', fontSize: 20}}>{info.nome} </Text>
                <View style = {{ maxHeight: 22 }}>
                <Text numberOfLines = {3} style = {{ color: '#FFF', fontSize: 15, marginLeft: 5}}>{user2uid} </Text>
                </View>
                <View style = {{ alignItems: 'flex-start', marginTop: 50}}>
                <Text style = {{ color: '#505050', fontSize: 12}}>{info.cidade} - {info.estado} </Text>
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
          onPress = {() => sendMessage(info.key)}
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
    height: 120,
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