import React, { Component } from 'react';
import { Image, View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from './src/firebaseConnection';​
//import firebase from 'firebase/app';
//import 'firebase/database';



// Telas Tab Navigator
import Home from './src/pages/Home';
import Chat from './src/pages/Chat';
import Pesquisa from './src/pages/Pesquisa';
import Perfil from './src/pages/Perfil';

//Tela Drawer Navigator
import Login from './src/pages/Login';

//Telas Stack Navigator
import EsqueciSenha from './src/pages/EsqueciSenha';
import EsqueciSenha2 from './src/pages/EsqueciSenha2';
import EsqueciSenha3 from './src/pages/EsqueciSenha3';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { } from './src/pages/Header';



const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();



const Content = (props) => {
  return (
    <View style = {{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#151515'
    }}>
      <View style = {{ flex: 1 }}>
      <Image 
      source={require('./LogoBranca.png')}
      style={{width: 190, height: 70, margin: 15}}
      />
      </View>

      <View style = {{
        flex: 5,
        backgroundColor: '#151515',
        alignItems: 'flex-start',
        width: 270,
        padding: 10
      }}>
        <TouchableOpacity 
        onPress = { () => props.navigation.navigate('Login')}
        style = {{
          height: 30,
          width: 250,
          borderRadius: 10,
          borderWidth: 2,
          backgroundColor:'gray',
          borderColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style = {{
            fontSize: 17
          }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


function Tabs() { 
  return(
  <Tab.Navigator 
  activeColor= '#FFFF'
  inactiveColor= '#FFFF'
  barStyle= {{
     style: {
      height: 35
    }, 
  }}
  >
    <Tab.Screen 
    name="Feed"
     component={Home}
     barStyle= {{
       style: {
         margin: 20
       }
     }}
     
     options= {{
       tabBarLabel: 'Home',
       tabBarColor: '#000000',
       tabBarIcon: ({ color }) => (
         <Icon name="home" color={'#FFFF'} size={26} />
       ) 
     }}
     />
    <Tab.Screen
    name='Chat'
    component={Chat}
    options= {{
      tabBarLabel: 'Chat',
      tabBarColor: '#000000',
      tabBarIcon: ({ color }) => (
        <Icon name="comments" color={'#FFFF'}  size={26} />
      )
    }}
    />
    <Tab.Screen
    name='Pesquisa'
    component={Pesquisa}
    options= {{
      tabBarLabel: 'Pesquisa',
      tabBarColor: '#000000',
      tabBarIcon: ({ color }) => (
        <Icon name="search" color={'#FFFF'}  size={26} />
      )
    }}
    />
    <Tab.Screen
    name='Perfil'
    component={Perfil}
    options= {{
      tabBarLabel: 'Perfil',
      tabBarColor: '#000000',
      tabBarIcon: ({ color }) => (
        <Icon name="user" color={'#FFFF'}  size={26} />
      ) 
    }}
    />
  </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator 
    initialRouteName='Home'
    drawerContent={Content}
    >
      <Drawer.Screen name="Home" component={Tabs} />
    </Drawer.Navigator>
  );
}




export default class App extends Component{

  /*constructor(props){
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
  }*/

  

  render(){
  return (
     <NavigationContainer>
      <Stack.Navigator
       initialRouteName="Home" >
         <Stack.Screen
        name="Home"
        component={MyDrawer}
        options={{
          title:'',
          headerStyle: {
            backgroundColor: '#000000',
            height: 25,
          },
          headerTintColor: '#FFFF'
        }} 
         />
        <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'AllJobs',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#000000'
          }
        }}
        />
        <Stack.Screen
        name="EsqueciSenha" 
        component={EsqueciSenha}
        options={{
          title: 'Esqueceu a Senha?',
          headerStyle: {
            backgroundColor: '#38b6ff'
          }
        }}
        />
        <Stack.Screen 
        name="EsqueciSenha2"
        component={EsqueciSenha2}
        options={{
          title:'Esqueceu a Senha?',
          headerStyle: {
            backgroundColor: '#38b6ff'
          }
        }}
        />
        <Stack.Screen
        name="EsqueciSenha3"
        component={EsqueciSenha3}
        options={{
          title:'Esqueceu a Senha?',
          headerStyle: {
            backgroundColor: '#38b6ff'
          }
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );}
}