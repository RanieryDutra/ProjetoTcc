import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../Services/firebaseConnection';

import { AuthContext } from '../../contexts/auth';
import Portifolio from './Portifolio2';
import Contato from './Contato2';

export default function Perfil2({ route }) {

  const { user } = useContext(AuthContext);
  const [ habilidades, setHabilidade ] = useState('');
  const [ servicos, setServicos ] = useState('');
  const [ date, setDate ] = useState('');
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

    //Mostrar habilidades
    async function loadHabilidades() {
      await firebase.database().ref('users/' + sobre + '/Habilidades').once('value').then(function(snapshot) {
        setHabilidade(snapshot.val())        
      })
    }
    loadHabilidades();

    //Mostrar serviços
    async function loadServicos() {
      await firebase.database().ref('users/' + sobre + '/Servicos').once('value').then(function(snapshot) {
        setServicos(snapshot.val())        
      })
    }
    loadServicos();
  }, [])
  
  return (
    <View style = {styles.containerPrincipal}>
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
        <Portifolio/>
        <View style = {{ flexDirection: 'row', marginRight: 398, marginBottom: 5, marginTop: 15, width: 468, justifyContent: 'space-between' }}>            
        <Text style = {{ color: '#FFF', fontSize: 20, marginTop: 11 }}>   Contato </Text> 
        </View>
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
    }
});

/*<TextInput 
        style = {styles.boxHabilidades}
        placeholderTextColor = "#FFF"
        placeholder = "  Suas habilidades."
        //onChangeText = { (Text) => setHabilidade(Text) }
        value = { date.habilidades }
        maxLength = { 50 }
        multiline = { true }
        numberOfLines = { 4 }
        onSubmitEditing = { () => Keyboard.dismiss() }
        />*/