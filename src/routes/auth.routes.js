import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';

console.disableYellowBox = true;

// Telas Tab Navigator
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Pesquisa from '../pages/Pesquisa';
import Perfil from '../pages/Perfil';
import Logar from '../pages/Logar';
import Logar2 from '../pages/Logar2';

//Tela Drawer Navigator
import Login from '../pages/Login';
import ConteudoDrawerOut from '../pages/ConteudoDrawer/ConteudoDrawerOut';
import ConteudoDrawerIn from '../pages/ConteudoDrawer/ConteudoDrawerIn';

//Telas Stack Navigator
import EsqueciSenha from '../pages/EsqueciSenha';
import EsqueciSenha2 from '../pages/EsqueciSenha2';
import EsqueciSenha3 from '../pages/EsqueciSenha3';
import CriarConta1 from '../pages/CriarConta1';
import CriarConta2 from '../pages/CriarConta2';
import CriarConta3 from '../pages/CriarConta3';
import CriarConta4 from '../pages/CriarConta4';
import CriarConta5 from '../pages/CriarConta5';
import CriarConta6 from '../pages/CriarConta6';
import Perfil2 from '../pages/Perfil2';
import Ajuda from '../pages/Ajuda';
import Sobre from '../pages/Sobre';




const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();



//const Content = props => ConteudoDrawerOut(props)


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
    name='Logar'
    component={Logar}
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
    name='Logar2'
    component={Logar2}
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
    drawerContent={ props => <ConteudoDrawerOut {...props}/>}
    >
      <Drawer.Screen name="Home" component={Tabs} />
    </Drawer.Navigator>
  );
}




export default function AuthRoutes(){
  return (
     <NavigationContainer independent={true}>
      <Stack.Navigator
       initialRouteName="Home" >
         <Stack.Screen
        name="Home"
        component={MyDrawer}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000000',
            height: 25,
          },
          headerTintColor: '#FFFF'
        }} 
         />
         <Stack.Screen
        name="Perfil2"
        component={Perfil2}
        options={{
          //headerShown: false,
          headerStyle: {
            backgroundColor: '#151515',
            height: 50,
            
          },
          headerTintColor: '#FFFF',
          headerTitle: 'Voltar'
        }} 
         />
        <Stack.Screen 
        name="CriarConta1"
        component={CriarConta1}
        options={{
          title: '',
          headerTintColor: '#FFFF',
          headerStyle: {
            backgroundColor: '#000000',
            height: 25
          }
        }}
        />
       <Stack.Screen 
        name="CriarConta2"
        component={CriarConta2}
        options={{
          title: '',
          headerTintColor: '#FFFF',
          headerStyle: {
            backgroundColor: '#000000',
            height: 25,
          }
        }}
        />
        <Stack.Screen 
        name="CriarConta3"
        component={CriarConta3}
        options={{
          title: '',
          headerTintColor: '#FFFF',
          headerStyle: {
            backgroundColor: '#000000',
            height: 25,
          }
        }}
        />
        <Stack.Screen 
        name="CriarConta4"
        component={CriarConta4}
        options={{
          title: '',
          headerTintColor: '#FFFF',
          headerStyle: {
            backgroundColor: '#000000',
            height: 25,
          }
        }}
        />
        <Stack.Screen 
        name="CriarConta5"
        component={CriarConta5}
        options={{
          title: '',
          headerTintColor: '#FFFF',
          headerStyle: {
            backgroundColor: '#000000',
            height: 25,
          }
        }}
        />
        <Stack.Screen 
        name="CriarConta6"
        component={CriarConta6}
        options={{
          title: '',
          headerTintColor: '#FFFF',
          headerStyle: {
            backgroundColor: '#000000',
            height: 25,
          }
        }}
        />
        <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Voltar',
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
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#000000'
          }
        }}
        />
        <Stack.Screen 
        name="EsqueciSenha2"
        component={EsqueciSenha2}
        options={{
          title:'Esqueceu a Senha?',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#000000'
          }
        }}
        />
        <Stack.Screen
        name="EsqueciSenha3"
        component={EsqueciSenha3}
        options={{
          title:'Esqueceu a Senha?',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#000000'
          }
        }}
        />
        <Stack.Screen
        name="Sobre"
        component={Sobre}
        options={{
          //headerShown: false,
          headerStyle: {
            backgroundColor: '#151515',
            height: 50,
            
          },
          headerTintColor: '#FFFF',
          headerTitle: 'Voltar'
        }} 
         />
         <Stack.Screen
        name="Ajuda"
        component={Ajuda}
        options={{
          //headerShown: false,
          headerStyle: {
            backgroundColor: '#151515',
            height: 50,
            
          },
          headerTintColor: '#FFFF',
          headerTitle: 'Voltar'
        }} 
         />
      </Stack.Navigator>
    </NavigationContainer>
  );}