import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Modal } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../Services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

export default function ConversasChat() {

    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [ data, setData ] = useState([]);
    const [ refBtn, setRefBtn ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ refUserChat, setRefUserChat ] = useState('');

    useEffect(() => {
        async function getChatList() {
            await firebase.database().ref('users/' + user.uid).child('Chats').on('value', function(snapshoot){
                setData([]);
                snapshoot.forEach((childItem) => {
                        
                        let data = {
                            key: childItem.val().chatID,
                            nome: childItem.val().title,
                            avatar: childItem.val().image,
                            com: childItem.val().with,
                            cidade: childItem.val().cidade,
                            estado: childItem.val().estado,
                            lastMsg: childItem.val().lasTMsg,
                            time: childItem.val().lasTMsgDate
                        }
                        
                        setData(oldArray => [...oldArray, data]);
                })
            })
        }
        getChatList();
    },[])

    function handleChat(item) {
        navigation.navigate('Chat', { infos: item });
    }

    function handleTrash(item) {
        setRefUserChat(item);
        setModalVisible(!modalVisible);
    }

    async function handleExcluirChat() {
        const refUserMe = firebase.database().ref('users/' + user.uid + '/Chats').child(refUserChat.key);
        const refUser2 = firebase.database().ref('users/' + refUserChat.com + '/Chats').child(refUserChat.key);
        const refChat = firebase.database().ref('master/chat').child(refUserChat.key); 
        
        await refUserMe.remove()
        await refUser2.remove()
        await refChat.remove()
        setModalVisible(!modalVisible);
    }

    if(!refBtn) {
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
        <View style = {{ flexDirection: 'row' }}>
        <Text style = {styles.tittlePageChat}>    Lista de Conversas </Text>
        <TouchableOpacity style = {{ justifyContent: 'center' }} onPress = {() => { /*setRefBtn(!refBtn)*/ 
        const dateNow = new Date()
        let date = {
            day: dateNow.getDate(),
            month: dateNow.getMonth() + 1,
            year: dateNow.getFullYear(),
            hour: dateNow.getHours(),
            minutes: dateNow.getMinutes()
        }
        date.hour = date.hour < 10 ? '0' + date.hour : date.hour;
        date.minutes = date.minutes < 10 ? '0' + date.minutes : date.minutes;
        console.log(date)
        } } >
            <Text style = {styles.btnEditar} > Editar </Text>
        </TouchableOpacity>
        </View>
        <FlatList
            //style = {styles.containerFlatList}
            data={data}
            keyExtractor = {(item) => item.key}
            renderItem= { ({ item }) => ( 
                <SafeAreaView style = {styles.containerFlatList}>
                <TouchableOpacity onPress = {() => handleChat(item)}>
                <View style = {styles.costasImagePerfil}>
                <Image 
                    style={styles.imagemPerfil}
                    source={{uri: item.avatar}}
                />
                <View style = {styles.estiloFlatList}> 
                <Text style = {{ color: '#FFF', fontSize: 20}}>{item.nome} </Text>
                <View style = {styles.lastMSG}>
                <View style = {styles.estiloLastMsg}>
                <Text style = {styles.mensageLast}>{item.lastMsg} </Text>    
                </View>
                <View>
                <Text numberOfLines = { 1 } style = {{ color: '#808080', marginLeft: 5 }}> {item.time} </Text>
                </View>
                </View>
                <View style = {{ alignItems: 'flex-end', marginRight: 5}}>
                <Text style = {{ color: '#505050', fontSize: 12}}>{item.cidade}-{item.estado}</Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
                </SafeAreaView>
            ) }
            />
   </View>
  );}
  if(refBtn) {
      return (
      <View style = {styles.containerPrincipal}>

        <Modal
        animationType = 'slide'
        transparent = { true }
        visible = { modalVisible }
        >
        <View style = {{ marginTop: 340, flex: 1 }} >
            

        <View style = {{ height: 160, backgroundColor: 'rgba(15, 15, 15, 0.95)', borderRadius : 15 }}>

        <TouchableOpacity
        style = {{ marginLeft: 450, marginBottom: 10, marginTop: 5 }}
        onPress={ () => {
            setModalVisible(!modalVisible);
        }}
        >
            <Text style = {{fontSize: 20, color: '#FFF'}}> X </Text>
        </TouchableOpacity>

        <View style = {{ alignItems: 'center' }} >
        <Text style = {{ fontSize: 18, color: '#FFF',  }} >Você realmente deseja excluir esta conversa ?  </Text>
        </View>

        <View style = {{ flexDirection: 'row', justifyContent: 'center' }} >

        <TouchableOpacity 
        style = {styles.btnExcluirChatSim}
        onPress = { () => handleExcluirChat() } >
            <Text style = {{ fontSize: 15, color: '#FFF' }} > Sim </Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style = {styles.btnExcluirChatNao}
        onPress = { () => {setModalVisible(!modalVisible);} } >
            <Text style = {{ fontSize: 15, color: '#FFF' }} > Não </Text>
        </TouchableOpacity>

        </View>

        </View>

        </View>
        </Modal>

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
         <View style = {{ flexDirection: 'row' }}>
         <Text style = {styles.tittlePageChat}>    Lista de Conversas </Text>
         <TouchableOpacity style = {{ justifyContent: 'center' }} onPress = {() => { setRefBtn(!refBtn)} } >
             <Text style = {styles.btnEditar} > Editar </Text>
         </TouchableOpacity>
         </View>
         <FlatList
             //style = {styles.containerFlatList}
             data={data}
             keyExtractor = {(item) => item.key}
             renderItem= { ({ item }) => ( 
                 <SafeAreaView style = {styles.containerFlatList}>
                 <View style = {{ flexDirection: 'row' }}>
                 <TouchableOpacity style = {{ justifyContent: 'center', marginHorizontal: 5 }} onPress = { () => handleTrash(item) } >
                 <Icon name="trash" color={'#FFFF'} size={30}/>
                 </TouchableOpacity>
                 <TouchableOpacity onPress = {() => handleChat(item)}>
                 <View style = {styles.costasImagePerfil}>
                 <Image 
                     style={styles.imagemPerfil}
                     source={{uri: item.avatar}}
                 />
                 <View style = {styles.estiloFlatList}> 
                 <Text style = {{ color: '#FFF', fontSize: 20}}>{item.nome} </Text>
                 <View style = {styles.lastMSG}>
                 <View style = {styles.estiloLastMsg}>
                 <Text style = {styles.mensageLast}>{item.lastMsg} </Text>    
                 </View>
                 <View>
                 <Text numberOfLines = { 1 } style = {{ color: '#808080', marginLeft: 5 }}> {item.time} </Text>
                 </View>
                 </View>
                 <View style = {{ alignItems: 'flex-end', marginRight: 5}}>
                 <Text style = {{ color: '#505050', fontSize: 12}}>{item.cidade}-{item.estado}</Text>
                 </View>
                 </View>
                 </View>
                 </TouchableOpacity>
                 </View>
                 </SafeAreaView>
             ) }
             />
    </View>)
  }
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        backgroundColor: '#000'
    },
    estiloReader: {
        backgroundColor: '#151515',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
      },
      containerFlatList: {
        height: 130,
        width: 480,
        marginVertical: 7,
        marginHorizontal: 3,
        marginLeft: 15,
        marginTop: 10,
        backgroundColor: '#000'
    },
    costasImagePerfil: {
        width: 140,
        height: 120,
        flexDirection: 'row',
        marginLeft: 5,
        backgroundColor: '#151515',
        alignItems: 'center',
        borderTopLeftRadius: 70,
        borderBottomLeftRadius: 70
    },
    imagemPerfil: {
        width: 110,
        height: 110,
        borderRadius: 80,
        marginLeft: 5
      },
      estiloFlatList: {
        backgroundColor: '#151515',
        width: 345,
        height: 120
    },
    tittlePageChat: {
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 5,
        marginLeft: 130,
        marginRight: 45
    },
    lastMSG: {
        flexDirection: 'row'
    },
    mensageLast: {
        color: '#808080',
        fontSize: 13,
        marginLeft: 20,
        height: 75
    },
    estiloLastMsg: {
        width: 295,
        flexWrap: 'wrap',
        minWidth: 0,
        overflow: 'hidden'
    },
    btnEditar: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5
    },
    btnExcluirChatSim: {
        width: 80,
        height: 40 ,
        backgroundColor: 'rgba(100, 100, 100, 0.40)',
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 12,
        marginTop: 20,
        marginRight: 140
    },
    btnExcluirChatNao: {
        width: 80,
        height: 40,
        backgroundColor: 'rgba(100, 100, 100, 0.40)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 20
    }
})