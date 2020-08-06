import React, { useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Portifolio2() {

    const [ modalVisible, setModalVisible ] = useState(false);

 return (
    <View>
    <Modal
    animationType = "slide"
    transparent = { true }
    visible = { modalVisible }
    onRequestClose = { () => {} }
    >
      <View style = {styles.modal}>
      <View style = {{ marginLeft: 350 }}>
      <TouchableOpacity
      onPress={ () => {
        setModalVisible(!modalVisible);
      }}
      >
        <Text style = {{color: '#FFF', fontSize: 20}}> X </Text>
      </TouchableOpacity>
      </View>  
        <View style = {styles.modalImage}>
        <Image
        source={{uri: 'https://miro.medium.com/max/1000/1*ciLg4-fezXdbaunhk1E6gQ.jpeg'}}
        style = {{
          width: 350,
          height: 350
        }}
        />
        </View>
      </View>
    </Modal>

    <View style = {styles.boxPortifolio}>
    <Text style = {{ color: '#FFF', fontSize: 20, width: 100 }}>   Portifólio </Text>
    <View style = {{flexDirection: 'row'}}> 
    <TouchableWithoutFeedback
    onPress = { () => {
    setModalVisible(true);
    }}
    >
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: 'https://miro.medium.com/max/1000/1*ciLg4-fezXdbaunhk1E6gQ.jpeg'}}
    />
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback>
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: 'https://s2.glbimg.com/M0ZCm0-RBx9vjM3cken3tcX-VFU=/0x0:2048x1362/695x462/s.glbimg.com/po/tt2/f/original/2016/08/19/12069008_891873374222369_6175874374082915467_o.jpg'}}
    />
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback>
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: 'https://miro.medium.com/max/1000/1*ciLg4-fezXdbaunhk1E6gQ.jpeg'}}
    />
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback>
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: 'https://s2.glbimg.com/M0ZCm0-RBx9vjM3cken3tcX-VFU=/0x0:2048x1362/695x462/s.glbimg.com/po/tt2/f/original/2016/08/19/12069008_891873374222369_6175874374082915467_o.jpg'}}
    />
    </TouchableWithoutFeedback>
    </View>
    <View style = {{flexDirection: 'row'}}>
    <TouchableWithoutFeedback>
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: 'https://miro.medium.com/max/1000/1*ciLg4-fezXdbaunhk1E6gQ.jpeg'}}
    />
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback>
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: 'https://s2.glbimg.com/M0ZCm0-RBx9vjM3cken3tcX-VFU=/0x0:2048x1362/695x462/s.glbimg.com/po/tt2/f/original/2016/08/19/12069008_891873374222369_6175874374082915467_o.jpg'}}
    />
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback>
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: 'https://miro.medium.com/max/1000/1*ciLg4-fezXdbaunhk1E6gQ.jpeg'}}
    />
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback>
    <Image
    style = {styles.estiloPortifolio}
    source = {{uri: 'https://s2.glbimg.com/M0ZCm0-RBx9vjM3cken3tcX-VFU=/0x0:2048x1362/695x462/s.glbimg.com/po/tt2/f/original/2016/08/19/12069008_891873374222369_6175874374082915467_o.jpg'}}
    />
    </TouchableWithoutFeedback>
    </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    modalImage: {
      width: 400,
      height: 400,
      margin: 3,
      paddingTop: 23,
      backgroundColor: 'rgba(52, 52, 52, 0.6)',
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    btnUpload: {
      marginTop: 3,
      height: 32,
      width: 80,
      borderRadius: 20,
      backgroundColor:'#151515',
      justifyContent: 'center',
      alignItems: 'center'
    },
    estiloPortifolio: {
      width: 109,
      height: 90,
      marginHorizontal: 3,
      marginVertical: 3
    },
    boxPortifolio: {
      //backgroundColor: 'red',
      width: 460,
      height: 217,
      marginTop: 55,
      marginHorizontal: 10
    }
});

