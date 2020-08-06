import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';




// Telas Tab Navigator
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Pesquisa from '../pages/Pesquisa';
import Perfil from '../pages/Perfil';

//Tela Drawer Navigator
import Login from '../pages/Login';
import ConteudoDrawerOut from '../pages/ConteudoDrawer/ConteudoDrawerOut';
import ConteudoDrawerIn from '../pages/ConteudoDrawer/ConteudoDrawerIn';

//Telas Stack Navigator

import Perfil2 from '../pages/Perfil2';




const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();


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
    name="Home"
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
    drawerContent={ props => <ConteudoDrawerIn {...props}/>}
    >
      <Drawer.Screen name="Home" component={Tabs} />
    </Drawer.Navigator>
  );
}




export default function AppRoutes(){
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
      </Stack.Navigator>
    </NavigationContainer>
  );}