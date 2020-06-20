import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

export default function ConteudoDrawerOut(props) {
 return (
    <View style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151515'
      }}>
        <View style = {{ width: 280, marginHorizontal: 10, marginVertical: 10 }}>
        <Image 
        source={require('./Home/LogoBranca.png')}
        style={{width: 190, height: 70, margin: 15}}
        />
        </View>
  
        <View style = {{
          flex: 5,
          backgroundColor: '#151515',
          alignItems: 'flex-start',
          width: 280,
          padding: 10
        }}>
          <TouchableOpacity 
          onPress = { () => props.navigation.navigate('Login')}
          style = {{
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            backgroundColor: 'transparent',    
            width: '97%',
            marginBottom: 10,
            fontSize: 17,
            padding: 10
          }}>
            <Text style = {{
              fontSize: 23,
              color: '#FFF'
            }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress = { () => {} }
          style = {{
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            backgroundColor: 'transparent',    
            width: '97%',
            marginBottom: 10,
            fontSize: 17,
            padding: 10
          }}>
            <Text style = {{
              fontSize: 23,
              color: '#FFF'
            }}>
              Ajuda
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress = { () => {} }
          style = {{
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            backgroundColor: 'transparent',    
            width: '97%',
            marginBottom: 10,
            marginTop: 480,
            fontSize: 17,
            padding: 10
          }}>
            <Text style = {{
              fontSize: 23,
              color: '#FFF'
            }}>
              Políticas de uso
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress = { () => {} }
          style = {{
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            backgroundColor: 'transparent',    
            width: '97%',
            marginBottom: 10,
            fontSize: 17,
            padding: 10
          }}>
            <Text style = {{
              fontSize: 23,
              color: '#FFF'
            }}>
              Sobre o All Jobs
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}