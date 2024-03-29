import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { AuthContext } from '../../contexts/auth'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login(){

  const navigation = useNavigation();
  const { Login, loginGoogle, loginFacebook } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrar, setNaoMostrar] = useState(true);

  async function loginGoogle2() {
    let verificadorGoogle = await loginGoogle();
    if(verificadorGoogle == true) {
      console.log("Logar direto, pois já possui cadastro e o verificador é igual a " + verificadorGoogle);
      
    } if(verificadorGoogle == false) {
      console.log("Realizar cadastro antes de logar e o verificador é igual a " + verificadorGoogle);
      navigation.navigate('CriarConta3');
    }
  }

  async function logarFacebook() {
    let verificadoraFace = await loginFacebook();
    if(verificadoraFace == true) {
      console.log("Logar direto, pois já possui cadastro e o verificador é igual a " + verificadoraFace);
    } if(verificadoraFace == false) {
      navigation.navigate('CriarConta3');
    }
  }

  function handleLogin(){
    Login(email, senha);
  }

  function mostrarSenha() {
    setNaoMostrar(!mostrar);
}

  return (
    <View style = {styles.containerPrincipal}>
      <View style = {styles.containerAzul}>
        <KeyboardAvoidingView>
      <View style = {styles.containerLogo}>
        <Image 
        style={styles.imagemLogo}
        source={require('../Home/LogoBranca.png')}
        resizeMode = 'contain'
        />
      </View>

      <View style = {styles.containerLogin}>
        <TextInput
        style = {styles.inputTextoEmail}
        placeholder = "E-mail"
        placeholderTextColor = '#FFF'
        autoCorrect = { false }
        value = { email }
        onChangeText = {(Text) => setEmail(Text)}
        keyboardType = 'email-address'
        />
        <View style = {{flexDirection: 'row'}}>
        <TextInput
        style = {styles.inputTextoSenha}
        placeholder = "Senha"
        placeholderTextColor = '#FFF'
        autoCorrect = { false }
        value = { senha }
        onChangeText = {(Text) => setSenha(Text)}
        secureTextEntry = {mostrar}
        />
        <View style = {styles.inputEye}>
        <TouchableOpacity onPress = {mostrarSenha}>
        <Icon name="eye" color={'#FFFF'} size={20}/>
        </TouchableOpacity>
        </View>
        </View>
        </View>
      
      <TouchableOpacity>
      <Text
      style = {{marginStart: 75,fontSize: 15, color: 'gray'}}
      onPress={ () => navigation.navigate('EsqueciSenha')}
      >Esqueceu a Senha?</Text>
      </TouchableOpacity>
      <View style = {styles.containerBotoeslogin}>
      <TouchableOpacity
      style = {styles.btnEntrar}
      onPress = {handleLogin}>
        <Text style = {styles.containerBotaoLoginTexto}>
        Entrar
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress = {loginGoogle2}
        style = {styles.btnGmail}>
        <Image 
        style = {styles.logoGmail}
        source = {require('./logogmail.png')}
        />
        <Text style = {{fontSize: 20,color: 'white'}}>
        Logar com G-mail  
        </Text> 
        </TouchableOpacity>
        <TouchableOpacity 
        onPress = {logarFacebook}
        style = {styles.btnFace}>
          <Image 
          style = {styles.logoFace}
          source = {require('./logo-facebook.png')}
          />
          <Text style = {{fontSize: 20, color: 'white'}}>
            Logar com Facebook
          </Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </View>


      <View style = { styles.containerVerde}>
        <TouchableOpacity onPress = {() => navigation.navigate('CriarConta1')}>
          <Text style = {{fontSize: 20, color: 'white'}}>Criar nova conta</Text>
        </TouchableOpacity>        
      </View>
    </View>

  );
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
    backgroundColor: '#000000',
    
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
  btnEntrar:{
    height: 48,
    width: 360,
    borderRadius: 10,
    backgroundColor:'#151515',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginStart: 70
  },
  btnFace: {
    height: 48,
    width: 360,
    borderRadius: 10,
    backgroundColor:'#3b5998',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginStart: 70
  },
  logoFace:{
    height: 45,
    width: 50,
    marginRight: 50,
    marginLeft: 2
  },
  containerBotaoLogins: {
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor:'#151515',
    justifyContent: 'center',
  },
  btnGmail: {
    height: 48,
    width: 360,
    borderRadius: 10,
    backgroundColor:'#db4a39',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginStart: 70
  },  
  logoGmail: {
    height: 38,
    width: 50,
    borderRadius: 3,
    marginRight: 50,
    marginLeft: 8
  },
  containerBotaoLoginTexto: {
    fontSize: 20,
    color: '#FFF'
    
  },
  containerVerde: {
    height: 125,
    width: 480,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  inputTextoEmail: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'transparent',    
    width: '97%',
    marginBottom: 10,
    fontSize: 17,
    padding: 10,
    color: 'white'
  },
  inputTextoSenha: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'transparent',    
    width: '86%',
    marginBottom: 10,
    fontSize: 17,
    padding: 10,
    color: 'white'
  },
  inputEye: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'transparent',    
    width: '11%',
    marginBottom: 10,
    fontSize: 17,
    padding: 10,
    color: 'white'
  },
});
   // backgroundColor: '#adff2f',
    //backgroundColor: 'rgba(255,255,255,0.3)'

    /*
    if(verificador == true) {
      console.log("Realizar cadastro antes de logar");
    } if(verificador == false) {
      console.log("Logar direto, pois já possui cadastro");
    }
    */