import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';

export default function Perfil() {

  const { user, Deslogando } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style = {styles.containerPrincipal}>
      <View style = {styles.estiloReader}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                    source={require('../Home/menu-b.png')}
                    style={{
                        height: 23,
                        width: 23
                    }}
                    />
                </TouchableOpacity>

                <Image
                    source={require('../Home/LogoBranca.png')}
                    style={{
                        width: 65,
                        height: 23
                    }}
                    />
        </View>
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
    },
    estiloReader: {
      backgroundColor: '#151515',
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10
    }
});
