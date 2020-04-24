import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export class Header extends Component {
    render() {
        return(
            <View style = {{ 
            backgroundColor: '#151515',
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image
                    source={require('./Home/menu-b.png')}
                    style={{
                        height: 23,
                        width: 23
                    }}
                    />
                </TouchableOpacity>

                <Image
                    source={require('./Home/LogoBranca.png')}
                    style={{
                        width: 65,
                        height: 23
                    }}
                    />
            </View>
        );
    }
}

/*const styles = StyleSheet.create({
    header: {
        backgroundColor: '#151515',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    logo: {
        width: 65,
        height: 23
    },
    estiloMenu: {
        height: 23,
        width: 23
    }
});*/