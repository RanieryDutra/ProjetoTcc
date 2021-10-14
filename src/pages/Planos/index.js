import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Planos() {
 return (
   <View style = {styles.Principal}>
      <View style = {styles.Plano} >
       <Text style = {styles.Pro} >          PRO </Text>
       <Text>       ________________________________________________________</Text>
      
        <Text style = {styles.vantagensPlano} > - Apareça na frente da lista de buscas </Text>
        <Text style = {styles.vantagensPlano} > - Tenha mais fotos no portifólio </Text>
        <Text style = {styles.vantagensPlano} > - Cadastrar mais de 1 serviço no seu perfil</Text>

        <Text style = {{ marginTop: 130 }} >       ________________________________________________________</Text>
        <View style = {styles.Preco} >
        <Text style = {styles.estiloPrecoValor} > R$ 7,90</Text> 
        <Text style = {styles.estiloPrecoMes} >/MÊS</Text>
        </View>
      </View>
      <TouchableOpacity
      style = {styles.btnAssinar}
      >
        <Text style = {styles.textoBtnAssinar} > Assinar </Text>
      </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  Principal: {
    flex: 1,
    backgroundColor: '#151515',
    alignItems: 'center'
  },
  Plano: {
    backgroundColor: '#D3D3D3',
    width: 400,
    height: 450,
    marginTop: 100,
    alignItems: 'flex-start'
  },
  Pro: {
    fontSize: 60,
    fontFamily: 'sans-serif-thin'
  },
  vantagensPlano: {
    marginLeft: 40,
    marginTop: 20,
    fontSize: 17,
    fontFamily: 'sans-serif'
  },
  Preco: {
    flexDirection: 'row'
  },
  estiloPrecoValor: {
    marginLeft: 60,
    marginTop: 10,
    fontSize: 40,
    fontFamily: 'sans-serif'
  },
  estiloPrecoMes: {
    marginTop: 10,
    fontSize: 40,
    fontFamily: 'sans-serif-thin',
    color: '#808080'
  },
  textoBtnAssinar: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 5
  },
  btnAssinar: {
    backgroundColor: '#303030',
    width: 400,
    height: 40,
    marginTop: 25,
    alignItems: 'center'
  }
});