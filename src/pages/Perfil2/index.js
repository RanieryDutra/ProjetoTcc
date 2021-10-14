import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Keyboard, KeyboardAvoidingView, TouchableOpacity, Linking, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../Services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

import Portifolio from './Portifolio2';

export default function Perfil2({ route }) {

  const [ date, setDate ] = useState('');
  const [ whatsApp, setWhatsApp ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ insta, setInsta ] = useState('');
  const [ twitter, setTwitter ] = useState('');
  const [ face, setFace ] = useState('');
  const [ linkedin, setLinkedin ] = useState('');
  //const [ verificaChat, setVerificaChat ] = useState([]);
  const [ modalVisibleTwitter, setModalVisibleTwitter ] = useState(false);
  const [ modalVisibleWhats, setModalVisibleWhats ] = useState(false);
  const [ modalVisibleEmail, setModalVisibleEmail ] = useState(false);
  const [ modalVisibleInsta, setModalVisibleInsta ] = useState(false);
  const [ modalVisibleFace, setModalVisibleFace ] = useState(false);
  const [ modalVisibleLinkedin, setModalVisibleLinkedin ] = useState(false);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const sobre = route.params?.uid;
  

  useEffect( () => {    
    //Buscando usuário
    async function usuarioPerfil(){
      await firebase.database().ref('users').child(sobre).once('value', (snapshoot) => {
        setDate('');
            let data = {
                Nome: snapshoot.val().nome,
                habilidades: snapshoot.val().Habilidades,
                servicos: snapshoot.val().Servicos,
                cidade: snapshoot.val().cidade,
                estado: snapshoot.val().estado,
                photoURL: snapshoot.val().photoURL
            }
            setDate(data);
    })
}
    usuarioPerfil();
  }, [])
  
  async function handleChat() {

    const databasChatRef = firebase.database().ref(`master/chat`);
    const databaseUserRef = firebase.database().ref('users');

    var verificaChat = [];
    //Verifica se existe um chat
    await databaseUserRef.child(user.uid).child('Chats').once('value', (snap) => {
      snap.forEach((childItem) => {
        verificaChat.push(
          childItem.val().with
        )
      })
    })

    if(user.uid === sobre) {
      console.log('Não pode criar chat pois é o próprio usuário.')
      alert('Não pode criar Chat com o próprio usuário.')
    } 
    else if(verificaChat.includes(sobre)) {
      console.log('Não cria novo chat e vai para a tela de conversas.')
      navigation.navigate('ConversasChat');
    }
    else {
      console.log('Criar um novo chat')

    let chaveChat = databasChatRef.push().key;

    await databasChatRef.child(chaveChat).update({
      users: [ user.uid, sobre ]
    })

    await databaseUserRef.child(user.uid).child('Chats').child(chaveChat).update({
        chatID: chaveChat,
        title: date.Nome,
        image: date.photoURL,
        with: sobre,
        cidade: date.cidade,
        estado: date.estado
    })

    await databaseUserRef.child(sobre).child('Chats').child(chaveChat).update({
        chatID: chaveChat,
        title: user.nome,
        image: user.fotoPerfil,
        with: user.uid,
        cidade: user.cidade,
        estado: user.estado
    })

      navigation.navigate('ConversasChat');
      }
    }
  
  return (
    <KeyboardAvoidingView style = {styles.containerPrincipal}>

<Modal
      animationType = 'slide'
      transparent = { true }
      visible = { modalVisibleTwitter }
      >
        <View style = {{ marginTop: 350, flex: 1 }} >
        

      <View style = {{ height: 176, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15, 15, 15, 0.95)', borderRadius : 15 }}>

      <TouchableOpacity
      style = {{ marginLeft: 450, marginBottom: 10 }}
      onPress={ () => {
        setModalVisibleTwitter(!modalVisibleTwitter);
      }}
      >
        <Text style = {{fontSize: 20, color: '#FFF'}}> X </Text>
      </TouchableOpacity>
          
          <Text style = {{ width: 400 ,fontSize: 17, color: '#FFF' }} >Caso o profissional tenha disponibilizado o link do Twitter esta abaixo. </Text>
          <Text
          style = {{ fontSize: 16, color: '#FFF', width: 450, height: 40, marginTop: 10, textAlign: 'center' }}
          onPress = {() => {
            Linking.openURL(twitter);
          }}
          > {twitter} </Text>
          </View>

      </View>
      </Modal>

      <Modal
      animationType = 'slide'
      transparent = { true }
      visible = { modalVisibleWhats }
      >
        <View style = {{ marginTop: 350, flex: 1 }} >
        

      <View style = {{ height: 176, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15, 15, 15, 0.95)', borderRadius : 15 }}>

      <TouchableOpacity
      style = {{ marginLeft: 450, marginBottom: 10 }}
      onPress={ () => {
        setModalVisibleWhats(!modalVisibleWhats);
      }}
      >
        <Text style = {{fontSize: 20, color: '#FFF'}}> X </Text>
      </TouchableOpacity>
          
          <Text style = {{ width: 400 ,fontSize: 17, color: '#FFF' }} >Caso o profissional tenha disponibilizado o link do WhatsApp ou numero de celular para contato esta abaixo. </Text>
          <Text
          style = {{ fontSize: 16, color: '#FFF', width: 450, height: 40, marginTop: 10, textAlign: 'center' }}
          onPress = {() => {
            Linking.openURL(whatsApp);
          }}
          > {whatsApp} </Text>
          </View>

      </View>
      </Modal>

      <Modal
      animationType = 'slide'
      transparent = { true }
      visible = { modalVisibleEmail }
      >
        <View style = {{ marginTop: 350, flex: 1 }} >
        

      <View style = {{ height: 176, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15, 15, 15, 0.95)', borderRadius : 15 }}>

      <TouchableOpacity
      style = {{ marginLeft: 450, marginBottom: 10 }}
      onPress={ () => {
        setModalVisibleEmail(!modalVisibleEmail);
      }}
      >
        <Text style = {{fontSize: 20, color: '#FFF'}}> X </Text>
      </TouchableOpacity>
          
          <Text style = {{ width: 400 ,fontSize: 17, color: '#FFF' }} >Caso o profissional tenha disponibilizado o email para contato esta abaixo. </Text>
          <Text
          style = {{ fontSize: 16, color: '#FFF', width: 450, height: 40, marginTop: 10, textAlign: 'center' }}
          > {email} </Text>
          </View>

      </View>
      </Modal>

      <Modal
      animationType = 'slide'
      transparent = { true }
      visible = { modalVisibleInsta }
      >
        <View style = {{ marginTop: 350, flex: 1 }} >
        

      <View style = {{ height: 176, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15, 15, 15, 0.95)', borderRadius : 15 }}>

      <TouchableOpacity
      style = {{ marginLeft: 450, marginBottom: 10 }}
      onPress={ () => {
        setModalVisibleInsta(!modalVisibleInsta);
      }}
      >
        <Text style = {{fontSize: 20, color: '#FFF'}}> X </Text>
      </TouchableOpacity>
          
          <Text style = {{ width: 400 ,fontSize: 17, color: '#FFF' }} >Caso o profissional tenha disponibilizado o link do Instagram esta abaixo. </Text>
          <Text
          style = {{ fontSize: 16, color: '#FFF', width: 450, height: 40, marginTop: 10, textAlign: 'center' }}
          onPress = {() => {
            Linking.openURL(insta);
          }}
          > {insta} </Text>
          </View>

      </View>
      </Modal>

      <Modal
      animationType = 'slide'
      transparent = { true }
      visible = { modalVisibleFace }
      >
        <View style = {{ marginTop: 350, flex: 1 }} >
        

      <View style = {{ height: 176, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15, 15, 15, 0.95)', borderRadius : 15 }}>

      <TouchableOpacity
      style = {{ marginLeft: 450, marginBottom: 10 }}
      onPress={ () => {
        setModalVisibleFace(!modalVisibleFace);
      }}
      >
        <Text style = {{fontSize: 20, color: '#FFF'}}> X </Text>
      </TouchableOpacity>
          
          <Text style = {{ width: 400 ,fontSize: 17, color: '#FFF' }} >Caso o profissional tenha disponibilizado o link do Facebook esta abaixo. </Text>
          <Text
          style = {{ fontSize: 16, color: '#FFF', width: 450, height: 40, marginTop: 10, textAlign: 'center' }}
          onPress = {() => {
            Linking.openURL(face);
          }}
          > {face} </Text>
          </View>

      </View>
      </Modal>

      <Modal
      animationType = 'slide'
      transparent = { true }
      visible = { modalVisibleLinkedin }
      >
        <View style = {{ marginTop: 350, flex: 1 }} >
        

      <View style = {{ height: 176, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15, 15, 15, 0.95)', borderRadius : 15 }}>

      <TouchableOpacity
      style = {{ marginLeft: 450, marginBottom: 10 }}
      onPress={ () => {
        setModalVisibleLinkedin(!modalVisibleLinkedin);
      }}
      >
        <Text style = {{fontSize: 20, color: '#FFF'}}> X </Text>
      </TouchableOpacity>
          
          <Text style = {{ width: 400 ,fontSize: 17, color: '#FFF' }} >Caso o profissional tenha disponibilizado o link do Linkedin esta abaixo. </Text>
          <Text
          style = {{ fontSize: 16, color: '#FFF', width: 450, height: 40, marginTop: 10, textAlign: 'center' }}
          onPress = {() => {
            Linking.openURL(linkedin);
          }}
          > {linkedin} </Text>
          </View>

      </View>
      </Modal>

        <View style = {{ flexDirection: "row", marginTop: 25, marginHorizontal: 10 }}>
        <Image 
        style={styles.imagemPerfil}
        source={{ uri: date.photoURL }}
        /> 

        <View style = {styles.boxInput}>
        
        <Text style = {{ color: 'white', fontSize: 20 }}> {date.Nome} </Text>

        <TextInput 
        style = {styles.boxHabilidades}
        placeholderTextColor = "#FFF"
        placeholder = "  Suas habilidades."
        editable = { false }
        value = { date.habilidades }
        maxLength = { 50 }
        multiline = { true }
        numberOfLines = { 4 }
        onSubmitEditing = { () => Keyboard.dismiss() }
        />
        </View>
        </View>
        <View style = {{ flexDirection: "row-reverse", marginRight: 150, width: 320, justifyContent: 'space-between' }}>
        <Text style = {{ color: "#FFF" }}> {date.cidade} - {date.estado} </Text>
        </View>
        
        <View style = {styles.boxServico}>
        <Text style = {{ color: '#FFF', fontSize: 20 }}>   Serviços </Text>    
        <TextInput
        style = {styles.boxInputServicos}
        placeholderTextColor = "#FFF"
        placeholder = "  Suas experiências de serviços"
        editable = { false }
        value = { date.servicos }
        maxLength = { 416 }
        multiline = { true }
        numberOfLines = { 6 }
        onSubmitEditing = { () => {Keyboard.dismiss()} }
        />
        {/*<Text style = {{color: '#FFF'}}> {date.servicos} </Text>*/}
        <View style = {{ alignItems: 'flex-end', marginLeft: 390 }}>           
        </View>
        </View>

        <Portifolio data = {sobre}/>

        <View>
       <View style = {{flexDirection: 'row'}}>
        <View style = {styles.boxPrincipais}>
        {/*<Text style = {{ color: '#FFF', fontSize: 12, marginTop: 2 }}>    Principais </Text>*/}
        <View style = {{ flexDirection: 'row'}}>
        <TouchableOpacity
        onPress = { async () => { 
          await firebase.database().ref('users/' + sobre + '/WhatsApp').once('value').then(function(snapshot) {
            setWhatsApp(snapshot.val())
          })
          setModalVisibleWhats(!modalVisibleWhats)}}
        >
        <Icon name="whatsapp" color={'#FFFF'} size={85} style = {{height: 80, marginLeft: 33, marginTop: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity
        onPress = { async () => {
          await firebase.database().ref('users/' + sobre + '/contatoEmail').once('value').then(function(snapshot) {
            setEmail(snapshot.val())
          })
          setModalVisibleEmail(!modalVisibleEmail)
        }}
        >
        <Icon name="envelope-square" color={'#FFFF'} size={85} style = {{height: 95, marginLeft: 33, marginTop: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity
        onPress = { async () => {
          await firebase.database().ref('users/' + sobre + '/Instagram').once('value').then(function(snapshot) {
            setInsta(snapshot.val())
          })
          setModalVisibleInsta(!modalVisibleInsta);
        } }
        >
        <Icon name="instagram" color={'#FFFF'} size={85} style = {{ marginLeft: 33, marginTop: 10}}/>
        {/*<Image
        style = {styles.estiloIconOutros}
        source = {require('../../assets/logoinsta.png')}
        resizeMode = 'contain'
        />*/}
        </TouchableOpacity>
        </View>
        {/*<Text style = {{ color: '#FFF', fontSize: 12, marginTop: 2 }}>    Outros  </Text>*/}
        <View style = {{ flexDirection: 'row' }}>
        <TouchableOpacity
        onPress = { async () => {
          await firebase.database().ref('users/' + sobre + '/Twitter').once('value').then(function(snapshot) {
            setTwitter(snapshot.val())
          })
          setModalVisibleTwitter(!modalVisibleTwitter)
        } }
        >
        <Icon name="twitter" color={'#FFFF'} size={80} style = {{height: 80, marginLeft: 30, marginTop: 10}}/>
        {/*<Image
        style = {styles.estiloIconOutros}
        source = {require('../../assets/logott.png')}
        resizeMode = 'contain'
        />*/}
        </TouchableOpacity>
        <TouchableOpacity
        onPress = { async () => {
          await firebase.database().ref('users/' + sobre + '/Facebook').once('value').then(function(snapshot) {
            setFace(snapshot.val())
          })
          setModalVisibleFace(!modalVisibleFace)
        } }
        >
        <Icon name="facebook-square" color={'#FFFF'} size={80} style = {{height: 80, marginLeft: 38, marginTop: 10}}/>
        {/*<Image
        style = {styles.estiloIconOutros}
        source = {require('../Login/logo-facebook.png')}
        resizeMode = 'contain'
        />*/}
        </TouchableOpacity>
        <TouchableOpacity
        onPress = { async () => {
          await firebase.database().ref('users/' + sobre + '/Linkedin').once('value').then(function(snapshot) {
            setLinkedin(snapshot.val())
          })
          setModalVisibleLinkedin(!modalVisibleLinkedin)
        } }
        >
        <Icon name="linkedin-square" color={'#FFFF'} size={80} style = {{height: 80, marginLeft: 38, marginTop: 10}}/>
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
        onPress = {handleChat}
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
        </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      backgroundColor: '#000'
    },
    btnUpload: {
      marginTop: 3,
      height: 32,
      width: 80,
      borderRadius: 20,
      backgroundColor:'#151515',
      justifyContent: 'center',
      alignItems: 'center'
    }, 
    boxInputServicos: {
      textAlignVertical: 'top',
      color: '#FFF',
      backgroundColor: '#151515',
      width: 460,
      borderRadius: 20
    },
    boxServico: {
      //backgroundColor: 'red',
      width: 460,
      height: 120,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10
    },
    estiloReader: {
      backgroundColor: '#151515',
      height: 55,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10
    },
    boxInput: {
      marginLeft: 10,
      marginRight: 10,
      width: 330,
      height: 120,
      //backgroundColor: 'red',
      borderRadius: 4
    },
    boxHabilidades: {
      textAlignVertical: 'top',
      backgroundColor: '#060606',
      width: 330,
      height: 93,
      color: '#FFF',
      marginRight: 10,
      borderRadius: 30
    },
    /*boxBotaoEditar1: {
      width: 235,
      backgroundColor: 'blue'
    },*/
    imagemPerfil: {
      width: 120,
      height: 120,
      borderRadius: 80
    },


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