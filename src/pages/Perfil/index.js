import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, Keyboard, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firebase from '../../Services/firebaseConnection';
import ImagePicker from 'react-native-image-picker';
import { Modalize } from 'react-native-modalize';

import { AuthContext } from '../../contexts/auth';

import Portifolio from './Portifolio';
import Contato from './Contato';

export default function Perfil() {

  const { user } = useContext(AuthContext);
  const [ habilidades, setHabilidade ] = useState('');
  const [ servicos, setServicos ] = useState('');
  const [ photoProfile, setPhotoProfile ] = useState();
  const [ infoPhotoProfile, setInfoPhotoProfile ] = useState();
  const navigation = useNavigation();
  const storageRef = firebase.storage()
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
  }

    function onOpen() {
      modalizeRef.current?.open();
    }

    function abrirgaleria() {
      ImagePicker.launchImageLibrary({}, imagePickerCallback);
    }

    async function excluirPhoto() {
      await firebase.database().ref('users/' + user.uid + '/photoFileName').once('value').then(function(snapshot) {
        setInfoPhotoProfile(snapshot.val());    
      });
      excluirPhotoStorage();
    }
    async function excluirPhotoStorage() {
      const desertRef = storageRef.ref(`images/profile/${user.uid}/${infoPhotoProfile}`);
      await desertRef.delete();
      excluirPhotoDataBase();
    }

    async function excluirPhotoDataBase() {
      await firebase.database().ref('users').child(user.uid).update({
        photoURL: 'https://png.pngtree.com/png-vector/20190307/ourmid/pngtree-vector-edit-profile-icon-png-image_762931.jpg'
      });
      
    }
  return (
    <View style = {styles.containerPrincipal}>
      <Modalize
      ref = { modalizeRef }
      snapPoint = { 200 }
      modalHeight = { 200 }
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
        <Contato/>
        </View>
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
    /*boxBotaoEditar1: {
      width: 235,
      backgroundColor: 'blue'
    },*/
    imagemPerfil: {
      width: 120,
      height: 120,
      borderRadius: 80
    }
});

                  /*    photoProfile
                      ? photoProfile.uri 
                      :'https://png.pngtree.com/png-vector/20190307/ourmid/pngtree-vector-edit-profile-icon-png-image_762931.jpg' */