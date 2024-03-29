import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AuthProvider from './src/contexts/auth';

import Routes from './src/routes/index';

export default function App() {
  return (
   <NavigationContainer independent={true}>
     <AuthProvider>
     <StatusBar backgroundColor="#151515" barStyle="light-content"/>
     <Routes/>
     </AuthProvider>
   </NavigationContainer>
  );
}