import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
 
export default function Header(){

    const navigation = useNavigation();

        return(
            <View style = {{ 
            backgroundColor: '#151515',
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10
            }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
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