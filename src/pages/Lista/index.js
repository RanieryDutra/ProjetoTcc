import React, { Component } from 'React';
import { View, Text, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
    containerFlatList: {
        height: 200,
        width: 480,
        backgroundColor: '#000000'
    },
    estiloTexto: {
        color: '#FFF',
        fontSize: 20
        
    }
});

export default Lista;