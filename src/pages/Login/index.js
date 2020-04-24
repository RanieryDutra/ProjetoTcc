import React, { Component } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import firebase from './src/firebaseConnection';​

/*import firebase from 'firebase/app';
import 'firebase/database';*/



export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      nome:'',
      cargo:''

    };

    this.cadastrarFuncionario = this.cadastrarFuncionario.bind(this);

    let firebaseConfig = {
      apiKey: "AIzaSyAYnlHP6TrDU7jAzWcUqYirylDKLs5NJ_A",
      authDomain: "alljobs-8f75a.firebaseapp.com",
      databaseURL: "https://alljobs-8f75a.firebaseio.com",
      projectId: "alljobs-8f75a",
      storageBucket: "alljobs-8f75a.appspot.com",
      messagingSenderId: "1091690749675",
      appId: "1:1091690749675:web:a90443b505365a2aac28ae",
      measurementId: "G-T226P8PWKK"
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  };
}



  cadastrarFuncionario(){
    if(this.state.nome != '' && this.state.cargo != ''){

     let usuarios = firebase.database().ref('usuarios');
     let chave = usuarios.push().key;

     usuarios.child(chave).set({
      nome: this.state.nome,
      cargo: this.state.cargo
     });

    }
  }

  render(navigation){
  return (
    <View style = {styles.containerPrincipal}>
      <View style = {styles.containerAzul}>
      <View style = {styles.containerLogo}>
        <Image 
        style={styles.imagemLogo}
        source={require('../Home/LogoBranca.png')}
        resizeMode = 'contain'
        />
      </View>

      <View style = {styles.containerLogin}>
        <TextInput
        style = {styles.inputTexto}
        placeholder = "E-mail"
        placeholderTextColor = '#FFF'
        autoCorrect = { false }
        onChangeText = {(nome) => {this.setState({nome})}}
        />

<TextInput
        style = {styles.inputTexto}
        placeholder = "Senha "
        placeholderTextColor = '#FFF'
        autoCorrect = { false }
        onChangeText = {(cargo) => {this.setState({cargo})}}
        />
        </View>
<TouchableOpacity onPress={this.cadastrarFuncionario} style = {styles.containerBotaoLogin}>
        <Text style = {styles.containerBotaoLoginTexto}>
        Entrar
        </Text>
        </TouchableOpacity>
      </View>
      <View style = { styles.containerVerde}>

      <TouchableOpacity>
      <Text
      style = {{paddingTop: 75, fontSize: 20, color: 'white'}}
      onPress={ () => navigation.navigate('EsqueciSenha')}
      >Esqueceu a Senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity>
          <Text style = {{fontSize: 20, color: 'white'}}>Criar nova conta</Text>
        </TouchableOpacity> 
        
      </View>
    </View>

  );
}
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  containerAzul: {
    width: 480,
    height: 760,
    backgroundColor: '#000000'
  },
  containerLogo:{
    height: 230,
    marginTop: 80
  },
  imagemLogo: {
    width: 480,
    height: 150,
    marginTop: 60
  },
  containerLogin:{
    marginTop: 60,
    paddingStart: 70,
    paddingHorizontal: 40
  },
  containerBotaoLogin:{
    height: 40,
    width: 100,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor:'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginStart: 330
  },
  containerBotaoLoginTexto: {
    fontSize: 20,
    color: '#FFF'
    
  },
  containerVerde: {
    height: 125,
    width: 480,
    backgroundColor: 'gray',
    alignItems: "flex-end",
    paddingVertical: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputTexto: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'transparent',    
    width: '97%',
    marginBottom: 10,
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    color: 'white'
  },
});
   // backgroundColor: '#adff2f',
    //backgroundColor: 'rgba(255,255,255,0.3)'