import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Image, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import firebase from '../../Services/firebaseConnection';

export default function Portifolio2(props) {

    const [ modalVisible, setModalVisible ] = useState(false);
    const [ info, setInfo ] = useState([]);
    const [ fotoUrl, setFotoUrl ] = useState();
    const sobreUser = props;
    

    useEffect(() => {

      async function loadImages() {
        await firebase.database().ref('album/' + sobreUser.data).on('value', (snapshoot) => {
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
    <View style = {{flexDirection: 'row'}}> 
    <FlatList
    style = {styles.containerFlatList}
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
    </View>
    <Text style = {{ color: '#FFF', fontSize: 20, marginTop: 11, marginBottom: 5 }}>   Contato </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    modalImage: {
      width: 400,
      height: 400,
      margin: 3,
      paddingTop: 23,
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
      //backgroundColor: 'red',
      width: 460,
      height: 217,
      marginTop: 55,
      marginHorizontal: 10
    },
    x: {
      backgroundColor: '#FFF',
      borderRadius: 10
    }
});

