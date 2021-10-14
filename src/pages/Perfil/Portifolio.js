import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Image, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import { AuthContext } from '../../contexts/auth';
import firebase from '../../Services/firebaseConnection';

export default function Portifolio() {

    const { user } = useContext(AuthContext);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ info, setInfo ] = useState([]);
    const [ fotoName, setFotoName ] = useState('');
    const [ fotoUrl, setFotoUrl ] = useState('');
    const storageRef = firebase.storage();

    useEffect(() => {

      async function loadImages() {
        await firebase.database().ref(`album/${user.uid}`).on('value', (snapshoot) => {
          setInfo([]);

          snapshoot.forEach((childItem) => {
              let data = {
                  key: childItem.key,
                  url: childItem.val().photoURL,
                  name: childItem.val().photoFileName
              }
              setInfo(oldArray => [...oldArray, data]);
          })
        })
      }
      loadImages();
  }, [])

  function sendFoto() {
    if(info.length < 8){
    ImagePicker.launchImageLibrary({}, imagePickerCallback);
    } else {
      alert('Não é possível adicionar mais de 8 fotos.')
    }
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

    uploadImageAlbum(data);
  }

  async function uploadImageAlbum(data) {

      const blob = await new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
          resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', data.uri, true);
      xhr.send(null);
  });

    const reference = storageRef.ref(`images/album/${user.uid}/${data.fileName}`);
    await reference.put(blob);
    const url = await reference.getDownloadURL();

    let qualquer = await firebase.database().ref('album/' + user.uid);
    let chave = qualquer.push().key;

    qualquer.child(chave).update({
      photoURL: url,
      photoFileName: data.fileName
  })
      
  }

  async function deleteImageAlbum() {

    await firebase.database().ref('album/' + user.uid).child(fotoName.key).remove();

    const deleteImage = storageRef.ref(`images/album/${user.uid}/${fotoName.name}`);
    deleteImage.delete().then(function() {
      console.log('Excluiu com sucesso.');
    }).catch(function(error) {
      console.log(error);
    })
    setModalVisible(!modalVisible);
  }



 return (
    <View>
    <Modal
    animationType = "slide"
    transparent = { true }
    visible = { modalVisible }
    onRequestClose = { () => { } }
    >
      <View style = {styles.modal}>
      <View style = {{ marginLeft: 380 }}>
      <TouchableOpacity
      style = {styles.x}
      onPress={ () => {
        setModalVisible(!modalVisible);
      }}
      >
        <Text style = {{fontSize: 20}}> X </Text>
      </TouchableOpacity>
      </View>  
        <View style = {styles.modalImage}>

        <TouchableOpacity 
        style = {styles.btnDeleteImageAlbum}
        onPress = {() => deleteImageAlbum()}
        >
        <Text style = {{ color: '#000' }}> Excluir esta imagem </Text>
      </TouchableOpacity>

        <Image
        source={{uri: fotoUrl}}
        style = {{
          width: 350,
          height: 350
          
        }}
        resizeMode = 'contain'
        />

        </View>
      </View>
      </Modal>

    <View style = {styles.boxPortifolio}>
    <Text style = {{ color: '#FFF', fontSize: 20, width: 100 }}>   Portifólio </Text>
    <FlatList
    style = {styles.containerFlatList}
    //horizontal = { true }
    numColumns = { 4 }
    data = { info }
    keyExtractor = { item => item.key}
    renderItem = { ({ item }) => {
      return(
    <SafeAreaView style = {styles.containerFlatList}> 
   <TouchableWithoutFeedback
    onPress = { () => { 
      setModalVisible(true)
      setFotoUrl(item.url)
      setFotoName(item);
    }}
    >
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: item.url}}
    />
    </TouchableWithoutFeedback>
    </SafeAreaView>
    )
   } }
    />
    
    </View>
    <View style = {{ flexDirection: 'row', marginRight: 398, marginBottom: 5, width: 468, justifyContent: 'space-between' }}>            
        <Text style = {{ color: '#FFF', fontSize: 20, marginTop: 11 }}>   Contato </Text>
        <TouchableOpacity
        style = {styles.btnUpload}
        onPress = {() => sendFoto()}
        >
          <Text style = {{color: '#FFF'}}> Upload </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    modalImage: {
      width: 400,
      height: 400,
      margin: 3,
      paddingTop: 5,
      backgroundColor: 'rgba(52, 52, 52, 0.6)',
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
    estiloPortifolio: {
      width: 109,
      height: 90,
      marginHorizontal: 3,
      marginVertical: 3
    },
    boxPortifolio: {
      //backgroundColor: 'blue',
      width: 460,
      height: 217,
      marginTop: 40,
      marginHorizontal: 10
    },
    btnDeleteImageAlbum: {
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      width: 140,
      height: 25,
      marginBottom: 10,
      borderRadius: 10
    },
    x: {
      backgroundColor: '#FFF',
      borderRadius: 10
    }
});