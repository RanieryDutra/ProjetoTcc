import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';

import {Header} from '../Header'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {      
            feed: [
                {id: '1', nome: 'Raniery', idade: 50, email: 'raniery.dutra@aedb.br'},
                {id: '2', nome: 'Thiagão', idade: 55, email: 'thiagao.gustavo@aedb.br'},
                {id: '3', nome: 'Carrrrlos', idade: 60, email: 'luizinho.carrrlos@aedb.br'},
                {id: '4', nome: 'Koval', idade: 70, email: 'koval.molestador@aedb.br'},
                {id: '5', nome: 'Leo', idade: 80, email: 'leo.molestado@aedb.br'} 
            ]
        };
    }



    render(){
       return (
        <View style = {styles.containerPrincipal}>
            <Header navigation={this.props.navigation}/>
            <FlatList
            style = {styles.containerFlatList}
            showsHorizontalScrollIndicator={false}
            data={this.state.feed}
            keyExtractor={(item) => item.id}
            renderItem={ ({item}) => <Lista data={item}/> }
            />
        </View>
       );
    }
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        backgroundColor: '#000000'
    },
    containerFlatList: {
        height: 200,
        width: 480,
        marginVertical: 10,
        marginHorizontal: 3,
        backgroundColor: '#000000'
    },
    estiloTexto: {
        color: '#FFF',
        fontSize: 20
        
    }
});

export default Home;

class botaoMenu extends Component{
    render(navigation){
        return(
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                    source={require('./menu-b.png')}
                    style={styles.estiloMenu}
                    />
                </TouchableOpacity>
        );
    }
}

class Lista extends Component {
    render() {
        return(
                    <View style = {styles.containerFlatList}>
                        <Text style = {styles.estiloTexto}>Nome: {this.props.data.nome} </Text>
                        <Text style = {styles.estiloTexto}>Idade: {this.props.data.idade} </Text>
                        <Text style = {styles.estiloTexto}>Email: {this.props.data.email} </Text>
                    </View>
        );
    }
}


/**
 * constructor(props) {
        super(props);
        this.state = {
            feed: [
                {
                  id: '1', 
                  nome: 'Lucas Silva', 
                  descricao: 'Mais um dia de muitos bugs :)', 
                  imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil1.png', 
                  imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto1.png',  
                  likeada: false, 
                  likers: 0
                 },
                {
                  id: '2', 
                  nome: 'Matheus', 
                  descricao: 'Isso sim é ser raiz!!!!!', 
                  imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil2.png', 
                  imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto2.png', 
                  likeada: false, 
                  likers: 0
                },
                {
                  id: '3', 
                  nome: 'Jose Augusto', 
                  descricao: 'Bora trabalhar Haha', 
                  imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil3.png', 
                  imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto3.png',  
                  likeada: false, 
                  likers: 3
                },
                {
                  id: '4', 
                  nome: 'Gustavo Henrique', 
                  descricao: 'Isso sim que é TI!', 
                  imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil1.png', 
                  imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto4.png', 
                  likeada: false, 
                  likers: 1
                },
                {
                  id: '5', 
                  nome: 'Guilherme', 
                  descricao: 'Boa tarde galera do insta...', 
                  imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil2.png', 
                  imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto5.png',
                  likeada: false, 
                  likers: 32
                }
              ]
        };
    }
*/