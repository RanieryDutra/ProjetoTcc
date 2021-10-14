import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { AuthContext } from '../../contexts/auth';

function Messages({ item }) {

  const { user } = useContext(AuthContext);
  const [ hora, setHora ] = useState('');
  const [ minutos, setMinutos ] = useState('');

  useEffect( () => {
    function horaEminutos() {
      if(item.date.hour < 10) {
        setHora('0' + item.date.hour);
      }
      if(item.date.minutes < 10) {
        setMinutos('0' + item.date.minutes);
      }
      if(item.date.hour >= 10) {
        setHora(item.date.hour);
      }
      if(item.date.minutes >= 10) {
        setMinutos(item.date.minutes);
      }
    }
    horaEminutos()
  },[])
  
  //console.log(item)
  if(item.me == user.uid) {
 return (
   <View style = {styles.messageMe}>
     <View style = {styles.bkMessageMe}>
       <Text style = {styles.messageMeText}>{item.text}</Text>
      </View>
      {<Text style = {styles.horaMinutos}>{hora}:{minutos}</Text>}
   </View>
  );
  } if(item.me != user.uid) {
    return(
    <View style = {styles.messageOther}>
      <View style = {styles.bkMessageOther}>
        <Text style = {styles.messageOtherText}>{item.text}</Text>
      </View>
        {<Text style = {styles.horaMinutosOhter}>{hora}:{minutos}</Text>}
    </View>
    )  
  }
}

const styles = StyleSheet.create({
  bkMessageOther: {
    backgroundColor: '#E4E7EC',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 5
  },
  messageOtherText: {
    color: '#2B4051',
    fontSize: 15
  },
  horaMinutosOhter: {
    color: '#bbbb',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 5
  },
  bkMessageMe: {
    backgroundColor: '#2B4051',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 5,
    marginLeft: 5
  },
  messageMeText: {
    color: '#FFF',
    fontSize: 15
  },
  horaMinutos: {
    color: '#bbbb',
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 6
  }
})

export default Messages;