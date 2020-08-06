import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Messages({ item }) {
  if(item.me) {
 return (
   <View style = {styles.messageMe}>
     <View style = {styles.bkMessageMe}>
       <Text style = {styles.messageMeText}>{item.text}</Text>
      </View>
      <Text style = {styles.horaMinutos}>{item.date.hour}:{item.date.minutes}</Text>
   </View>
  );
  } else {
    return(
    <View style = {styles.messageOther}>
      <View style = {styles.bkMessageOther}>
        <Text style = {styles.messageOtherText}>{item.text}</Text>
      </View>
        <Text style = {styles.horaMinutosOhter}>{item.date.hour}:{item.date.minutes.toFixed(2)}</Text>
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
    marginLeft: 85
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