import React, { useState, useContext,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import { AuthContext } from '../../contexts/auth';
import firebase from '../../Services/firebaseConnection';
import { Picker } from '@react-native-community/picker';

export default function CadastrarServico() {
 
    const { user } = useContext(AuthContext);
    const [valorPicker, setValorPicker] = useState('');
    const [valorServico, setValorServico] = useState('');
    const [valorDescricao, setValorDescricao] = useState('');
    const [valorCidade, setValorCidade] = useState('');
    const [valorEstado, setValorEstado] = useState('');
    const [valorFoto, setValorFoto] = useState('');
 
    useEffect(() => {
        async function loadFoto(){
            await firebase.database().ref('users/' + user.uid + '/photoURL').once('value').then(function(snapshot) {
                setValorFoto(snapshot.val());
            });
    } loadFoto();

        async function loadCidade() {
            await firebase.database().ref('users/' + user.uid + '/cidade').once('value').then(function(snapshot) {
                setValorCidade(snapshot.val());
            });
        } loadCidade();

        async function loadEstado() {
            await firebase.database().ref('users/' + user.uid + '/estado').once('value').then(function(snapshot) {
                setValorEstado(snapshot.val());
            });
        } loadEstado();
    }, [])

    
    async function salvarInformacoes() {
        if(valorPicker !== '' && valorDescricao !== '' && valorServico !== '') {

            let qualquer = await firebase.database().ref('servicos/' + user.uid);
            let chave = qualquer.push().key;

            qualquer.child(chave).update({
                    categorias: valorPicker,
                    descricao: valorDescricao,
                    servico: valorServico,
                    cidade: valorCidade,
                    estado: valorEstado,
                    fotoUrl: valorFoto
        })
        setValorPicker('');
        setValorServico('');
        setValorDescricao('');
        setValorFoto('');
        setValorCidade('');
        setValorEstado('');
        //console.log(valorFoto);
        //console.log(valorCidade);
        //console.log(valorEstado);
        }
    }

    return (
   <View style = {styles.Principal}>
           <View style = {styles.estiloViewPicker}>
                <Picker
                style = {styles.estiloPicker}
                mode = {"dropdown"}
                selectedValue = {valorPicker}
                onValueChange = { (itemValor, itemIndex) => setValorPicker(itemValor)}
                >
                    <Picker.Item label = "Categorias" value = "" />
                    <Picker.Item label = "Adminstrativo / Secretariado / Finanças" value = "1"/>
                    <Picker.Item label = "Comercial / Vendas" value = "2"/>
                    <Picker.Item label = "Telecomunicações / Informática / Multimídia" value = "3"/>
                    <Picker.Item label = "Atendimento ao cliente / Call Center" value = "4"/>
                    <Picker.Item label = "Banco / Seguros / Consultoria Jurídica" value = "5"/>
                    <Picker.Item label = "Logística / Distribuição" value = "6"/>
                    <Picker.Item label = "Turismo / Hotelaria / Restaurante" value = "7"/>
                    <Picker.Item label = "Educação / Formação" value = "8"/>
                    <Picker.Item label = "Marketing / Comunicação" value = "9"/>
                    <Picker.Item label = "Serviços Domésticos / Limpezas" value = "10"/>
                    <Picker.Item label = "Construção / Industrial" value = "11"/>
                    <Picker.Item label = "Saúde / Medicina / Enfermagem" value = "12"/>
                    <Picker.Item label = "Agricultura / Pecuária / Veterinária" value = "13"/>
                    <Picker.Item label = "Engenharia / Arquitetura / Design" value = "14"/>

                </Picker>
           </View>
           <TextInput
           style = {styles.inputServico}
           placeholder = 'Serviço'
           placeholderTextColor = '#FFF'
           maxLength = { 40 }
           numberOfLines = { 1 }
           value = { valorServico }
           onChangeText = { (text) => setValorServico(text)}
           />
       <View style = {styles.descricao}>
           <View style = {{ marginBottom: 3 }}>
           <Text style = {{ fontSize: 18, color: '#FFF' }}> Descrição </Text>
           </View>
           <TextInput
           style = {styles.textInput}
           placeholder = 'Descreva o que você faz'
           placeholderTextColor = '#FFF'
           maxLength = { 80 }
           numberOfLines = { 4 }
           multiline = { true }
           value = { valorDescricao }
           onChangeText = { (text) => setValorDescricao(text) }
           returnKeyType = 'done'
           />
       </View>
       <View style = {styles.btnCadastrar}>
            <TouchableOpacity
            style = {styles.estiloBotaoCadastrar}
            onPress = {salvarInformacoes}
            >
                <Text style = {styles.textoBotao}>
                    Cadastrar
                </Text>
            </TouchableOpacity>
       </View>
   </View>
  );
}

const styles = StyleSheet.create({
    Principal: {
        backgroundColor: '#000',
        flex: 1
    },
    estiloViewPicker: {
        width: 415,
        marginTop: 150,
        marginLeft: 30,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        backgroundColor: '#151515',
        borderRadius: 6
    },
    estiloPicker: {
        color: '#FFF',
        width: 430
        
    },
    inputServico: {
        marginLeft: 30,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: 'transparent',    
        width: 415,
        marginBottom: 10,
        fontSize: 16,
        padding: 10,
        color: '#FFF'
    },
    descricao: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        //backgroundColor: 'blue',
        //alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        backgroundColor: '#151515',
        color: '#FFF',
        marginTop: 3,
        width: 420,
        height: 100,
        textAlignVertical: 'top',
        borderRadius: 12
    },
    btnCadastrar: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        //backgroundColor: 'blue'
    },
    estiloBotaoCadastrar: {
        backgroundColor: '#151515',
        width: 420,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    textoBotao: {
        color: '#FFF',
        fontSize: 18
    },
})