import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import {Header} from '../Header';

import { AuthContext } from '../../contexts/auth';

export default function Perfil() {

  const { user, Deslogando } = useContext(AuthContext);

  return (
    <View style = {styles.containerPrincipal}>
        <Text style = {{ color: 'white' }}>
            Perfil xD
        </Text>
        <Text style = {{ color: 'white' }}>
              {user && user.nome}
        </Text>
        <Button
        title="Sair da minha conta"
        onPress={ () => Deslogando()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      backgroundColor: 'black'
    }
});
