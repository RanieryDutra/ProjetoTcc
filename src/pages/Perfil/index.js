import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firebase from '../../Services/firebaseConnection';
import ImagePicker from 'react-native-image-picker';
import { Modalize } from 'react-native-modalize';
import { AuthContext } from '../../contexts/auth';
import Icon from 'react-native-vector-icons/FontAwesome';


import Portifolio from './Portifolio';
//import Contato from './Contato';

export default function Perfil() {

  const { user } = useContext(AuthContext);
  const [ habilidades, setHabilidade ] = useState('');
  const [ servicos, setServicos ] = useState('');
  const [ photoProfile, setPhotoProfile ] = useState();
  const [ infoPhotoProfile, setInfoPhotoProfile ] = useState();
  const [ whatsApp, setWhatsApp ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ insta, setInsta ] = useState('');
  const [ twitter, setTwitter ] = useState('');
  const [ face, setFace ] = useState('');
  const [ linkedin, setLinkedin ] = useState('');
  const [ upTeclado, setUpTeclado ] = useState(false);
  const [ modalVisibleTwitter, setModalVisibleTwitter ] = useState(false);
  const [ modalVisibleWhats, setModalVisibleWhats ] = useState(false);
  const [ modalVisibleEmail, setModalVisibleEmail ] = useState(false);
  const [ modalVisibleInsta, setModalVisibleInsta ] = useState(false);
  const [ modalVisibleFace, setModalVisibleFace ] = useState(false);
  const [ modalVisibleLinkedin, setModalVisibleLinkedin ] = useState(false);
  const navigation = useNavigation();
  const storageRef = firebase.storage();
  const modalizeRef = useRef(null);
  

  useEffect( () => {
    //Mostrar habilidades
    async function loadHabilidades() {
      await firebase.database().ref('users/' + user.uid + '/Habilidades').once('value').then(function(snapshot) {
        setHabilidade(snapshot.val())        
      })
    }
    loadHabilidades();
    //Mostrar serviços
    async function loadServicos() {
      await firebase.database().ref('users/' + user.uid + '/Servicos').once('value').then(function(snapshot) {
        setServicos(snapshot.val())        
      })
    }
    loadServicos();
    async function loadFotoPerfil() {
      await firebase.database().ref('users/' + user.uid + '/photoURL').on('value', function(snapshot) {
        setPhotoProfile(snapshot.val())        
      })
    }
    loadFotoPerfil();

    async function loadFileNameFoto() {
      await firebase.database().ref('users/' + user.uid + '/photoFileName').on('value', function(snapshot) {
        setInfoPhotoProfile(snapshot.val());
      })
    }
    loadFileNameFoto();
  }, [])

  //Salvar serviços
  async function salvarServicos() {
    await firebase.database().ref('users').child(user.uid).update({
      Servicos: servicos
  })
  }

  //Salvar habilidades
  async function salvarHabilidades() {
    await firebase.database().ref('users').child(user.uid).update({
      Habilidades: habilidades
  })
  }

  function imagePickerCallback(data){
    
    if (data.didcancel) {
      return;
    }
    if (data.error) {
      alert("Ocorreu um erro estranho, tente novamente outro momento.");
    }
    if (!data.uri) {
      return;
    }

    uploadImageProfile(data);
  }
  async function uploadImageProfile(data) {
    /*firebase.auth().currentUser;
    if (user) {
      console.log(user);
    } else {
      console.log('Ninguém logado');
    }*/
      const blob = await new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
          resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', data.uri, true);
      xhr.send(null);
  });

    const reference = storageRef.ref(`images/profile/${user.uid}/${data.fileName}`);
    await reference.put(blob);
    const url = await reference.getDownloadURL();
    await firebase.database().ref('users').child(user.uid).update({
      photoURL: url,
      photoFileName: data.fileName
  })
      setInfoPhotoProfile(data.fileName);
  }

    function onOpen() {
      modalizeRef.current?.open();
    }

    function abrirgaleria() {
      ImagePicker.launchImageLibrary({}, imagePickerCallback);
    }

    async function excluirPhoto() {
      //let refServico = await firebase.database().ref('servicos/' + user.uid + urlFotoServico);
      await firebase.database().ref('users').child(user.uid).update({
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/alljobs-8f75a.appspot.com/o/images%2Fperfil1.jpg?alt=media&token=b9a1b6bc-2d35-4f29-b489-1d068292c5c2'
      });
      /*await firebase.database().ref('servicos/' + user.uid).child(urlFotoServico).update({
          fotoUrl: 'https://firebasestorage.googleapis.com/v0/b/alljobs-8f75a.appspot.com/o/images%2Fperfil1.jpg?alt=media&token=b9a1b6bc-2d35-4f29-b489-1d068292c5c2'
      })
      await firebase.database().ref('servicos/' + user.uid).child(urlFotoServico2).update({
          fotoUrl: 'https://firebasestorage.googleapis.com/v0/b/alljobs-8f75a.appspot.com/o/images%2Fperfil1.jpg?alt=media&token=b9a1b6bc-2d35-4f29-b489-1d068292c5c2'
        })*/
      excluirPhotoStorage();
    }
    async function excluirPhotoStorage() {
      const desertRef = storageRef.ref(`images/profile/${user.uid}/${infoPhotoProfile}`);
      await desertRef.delete();
    }

    async function salvarWhats() {
      await firebase.database().ref('users').child(user.uid).update({
        WhatsApp: whatsApp
      });
    }

    async function salvarEmail() {
      await firebase.database().ref('users').child(user.uid).update({
        contatoEmail: email
      });
    }

    async function salvarInsta() {
      await firebase.database().ref('users').child(user.uid).update({
        Instagram: insta
      });
    }

    async function salvarTwitter() {
      await firebase.database().ref('users').child(user.uid).update({
        Twitter: twitter
      });
    }

    async function salvarFace() {
      await firebase.database().ref('users').child(user.uid).update({
        Facebook: face
      });
    }

    async function salvarLinkedin() {
      await firebase.database().ref('users').child(user.uid).update({
        Linkedin: linkedin
      });
    }

  return (
    
    <KeyboardAvoidingView behavior = 'padding' style = {styles.containerPrincipal} enabled = {upTeclado}>

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
          
          <Text style = {{ fontSize: 16, color: '#FFF' }} >Insira o link do seu perfil do Twitter. </Text>
          <TextInput
          style = {{ fontSize: 16, color: '#FFF', width: 430, height: 40, marginTop: 10, textAlign: 'center' }}
          placeholderTextColor = "#FFF"
          placeholder = 'Digite o link do seu Twitter aqui.'
          onChangeText = {(text) => setTwitter(text)}
          value = { twitter }
          //onFocus = { () => setUpTeclado(true)}
          />

          <TouchableOpacity
          style = {styles.btnSalvarWhats}
          onPress = {salvarTwitter}
          >
            <Text style = {{ color: '#FFF', fontSize: 16 }}> Salvar </Text>
          </TouchableOpacity>
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
          
          <Text style = {{ fontSize: 16, color: '#FFF' }} >Insira o link do seu WhatsApp ou seu numero de celular. </Text>
          <TextInput
          style = {{ fontSize: 16, color: '#FFF', width: 430, height: 40, marginTop: 10, textAlign: 'center' }}
          placeholderTextColor = "#FFF"
          placeholder = 'Digite o link ou seu numero aqui.'
          onChangeText = {(text) => setWhatsApp(text)}
          value = { whatsApp }
          />

          <TouchableOpacity
          style = {styles.btnSalvarWhats}
          onPress = {salvarWhats}
          >
            <Text style = {{ color: '#FFF', fontSize: 16 }}> Salvar </Text>
          </TouchableOpacity>
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
          
          <Text style = {{ fontSize: 16, color: '#FFF' }} >Digite o seu email para contato profissional. </Text>
          <TextInput
          style = {{ fontSize: 16, color: '#FFF', width: 430, height: 40, marginTop: 10, textAlign: 'center' }}
          placeholderTextColor = "#FFF"
          placeholder = 'Digite seu email aqui.'
          onChangeText = {(text) => setEmail(text)}
          value = { email }
          //onFocus = { () => setUpTeclado(true)}
          />

          <TouchableOpacity
          style = {styles.btnSalvarWhats}
          onPress = {salvarEmail}
          >
            <Text style = {{ color: '#FFF', fontSize: 16 }}> Salvar </Text>
          </TouchableOpacity>
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
          
          <Text style = {{ fontSize: 16, color: '#FFF' }} >Digite o link do seu perfil do Instagram. </Text>
          <TextInput
          style = {{ fontSize: 16, color: '#FFF', width: 430, height: 40, marginTop: 10, textAlign: 'center' }}
          placeholderTextColor = "#FFF"
          placeholder = 'Digite o link aqui.'
          onChangeText = {(text) => setInsta(text)}
          value = { insta }
          //onFocus = { () => setUpTeclado(true)}
          />

          <TouchableOpacity
          style = {styles.btnSalvarWhats}
          onPress = {salvarInsta}
          >
            <Text style = {{ color: '#FFF', fontSize: 16 }}> Salvar </Text>
          </TouchableOpacity>
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
          
          <Text style = {{ fontSize: 16, color: '#FFF' }} >Digite o link do seu perfil do Facebook. </Text>
          <TextInput
          style = {{ fontSize: 16, color: '#FFF', width: 430, height: 40, marginTop: 10, textAlign: 'center' }}
          placeholderTextColor = "#FFF"
          placeholder = 'Digite o link aqui.'
          onChangeText = {(text) => setFace(text)}
          value = { face }
          //onFocus = { () => setUpTeclado(true)}
          />

          <TouchableOpacity
          style = {styles.btnSalvarWhats}
          onPress = {salvarFace}
          >
            <Text style = {{ color: '#FFF', fontSize: 16 }}> Salvar </Text>
          </TouchableOpacity>
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
          
          <Text style = {{ fontSize: 16, color: '#FFF' }} >Digite o link do seu perfil do Linkedin. </Text>
          <TextInput
          style = {{ fontSize: 16, color: '#FFF', width: 430, height: 40, marginTop: 10, textAlign: 'center' }}
          placeholderTextColor = "#FFF"
          placeholder = 'Digite o link aqui.'
          onChangeText = {(text) => setLinkedin(text)}
          value = { linkedin }
          //onFocus = { () => setUpTeclado(true)}
          />

          <TouchableOpacity
          style = {styles.btnSalvarWhats}
          onPress = {salvarLinkedin}
          >
            <Text style = {{ color: '#FFF', fontSize: 16 }}> Salvar </Text>
          </TouchableOpacity>
          </View>

      </View>
      </Modal>

      <Modalize
      ref = { modalizeRef }
      snapPoint = { 200 }
      modalHeight = { 700 }
      HeaderComponent = {
        <View style = {{ backgroundColor: '#151515', alignItems: 'center', height: 30}}>
        <Text style = {{ color: '#FFF', marginTop: 10 }}>Selecione uma opção ou toque acima para sair das opções.</Text>
        </View>
      }
      >
        <View style = {{ flex: 1, height: 180, justifyContent: 'center', alignItems: 'center', backgroundColor: '#151515' }}>
          <TouchableOpacity style = {styles.btnPhotoGaleria} onPress = {abrirgaleria}>
            <Text style = {{ color: '#FFF' }}>Escholha uma foto da galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btnPhotoExcluir} onPress = {excluirPhoto}>
            <Text style = {{ color: '#FFF' }}>Excluir foto atual do Perfil</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

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
        <View style = {{ flexDirection: "row", marginTop: 20, marginHorizontal: 10 }}>
        <TouchableOpacity onPress = {onOpen}>
        <Image 
        style={styles.imagemPerfil}
        source={{ uri: photoProfile }}
        //resizeMode = 'contain'
        />
        </TouchableOpacity> 
        <View style = {styles.boxInput}>
        
        <Text style = {{ color: 'white', fontSize: 20 }}> {user.nome} </Text>

        <TextInput 
        style = {styles.boxHabilidades}
        placeholderTextColor = "#FFF"
        placeholder = "  Suas habilidades."
        onChangeText = { (Text) => setHabilidade(Text) }
        value = { habilidades }
        maxLength = { 80 }
        multiline = { true }
        numberOfLines = { 4 }
        returnKeyType = 'done'
        blurOnSubmit = { true }
        onSubmitEditing = { () => Keyboard.dismiss() }
        onFocus = { () => setUpTeclado(false)}
        />
        </View>
        </View>
        <View style = {{ flexDirection: "row-reverse", marginRight: 150, width: 320, justifyContent: 'space-between' }}>
        <TouchableOpacity
        style = {styles.btnUpload}
        onPress = {salvarHabilidades}
        >
        <Text style = {{color: '#FFF'}}> Atualizar </Text>
        </TouchableOpacity>
        <Text style = {{ color: "#FFF" }}> {user && user.cidade} - {user && user.estado} </Text>
        </View>
        
        <View style = {styles.boxServico}>
        <Text style = {{ color: '#FFF', fontSize: 20 }}>   Serviços </Text>    
        <TextInput
        style = {styles.boxInputServicos}
        placeholderTextColor = "#FFF"
        placeholder = "  Suas experiências de serviços"
        onChangeText = { (Text) => {setServicos(Text)}}
        value = { servicos }
        maxLength = { 416 }
        multiline = { true }
        numberOfLines = { 6 }
        returnKeyType = 'done'
        blurOnSubmit = { true }
        onSubmitEditing = { () => {Keyboard.dismiss()} }
        onFocus = { () => setUpTeclado(false)}
        />
        <View style = {{ alignItems: 'flex-end', marginLeft: 390 }}>  
        <TouchableOpacity
        style = {styles.btnUpload}
        onPress = {salvarServicos}
        >
          <Text style = {{color: '#FFF'}}> Atualizar </Text>
        </TouchableOpacity>          
        </View>
        </View>

        <Portifolio/>

      <View>
       <View style = {{flexDirection: 'row'}}>
        <View style = {styles.boxPrincipais}>
        {/*<Text style = {{ color: '#FFF', fontSize: 12, marginTop: 2 }}>    Principais </Text>*/}
        <View style = {{ flexDirection: 'row'}}>
        <TouchableOpacity
        onPress = { async () => { 
          await firebase.database().ref('users/' + user.uid + '/WhatsApp').once('value').then(function(snapshot) {
            setWhatsApp(snapshot.val())
          })
          setModalVisibleWhats(!modalVisibleWhats)}}
        >
        <Icon name="whatsapp" color={'#FFFF'} size={85} style = {{height: 80, marginLeft: 33, marginTop: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity
        onPress = { async () => {
          await firebase.database().ref('users/' + user.uid + '/contatoEmail').once('value').then(function(snapshot) {
            setEmail(snapshot.val())
          })
          setModalVisibleEmail(!modalVisibleEmail)
        }}
        >
        <Icon name="envelope-square" color={'#FFFF'} size={85} style = {{height: 95, marginLeft: 33, marginTop: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity
        onPress = { async () => {
          await firebase.database().ref('users/' + user.uid + '/Instagram').once('value').then(function(snapshot) {
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
          await firebase.database().ref('users/' + user.uid + '/Twitter').once('value').then(function(snapshot) {
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
          await firebase.database().ref('users/' + user.uid + '/Facebook').once('value').then(function(snapshot) {
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
          await firebase.database().ref('users/' + user.uid + '/Linkedin').once('value').then(function(snapshot) {
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
        //onPress = { () => navigation.navigate('Chat')}
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
    btnPhotoGaleria: {
      width: 210,
      height: 50,
      borderRadius: 20,
      backgroundColor:'#000',
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnPhotoExcluir: {
      marginTop: 20,
      width: 210,
      height: 50,
      borderRadius: 20,
      backgroundColor:'#000',
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
      marginRight: 10
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
    },
    btnSalvarWhats: {
      backgroundColor: '#000',
      width: 90,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15
    }
});