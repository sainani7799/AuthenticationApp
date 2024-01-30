import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'

export default function Home({navigation}) {
  const handleLogout = () => {
    // Logic to perform logout actions, such as clearing user session or token
    // After logout, navigate to the login screen
    navigation.navigate('Login');
  };
  return (
    <View style={styles.text}>
      <Text style={styles.sai}>
         WELCOME TO OUR ORGANIZATION
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  text:{
    flex:1,
    backgroundColor: '#333',
    alignItems:'center',
    justifyContent:'center'
  },
  sai:{
    color:'blue',
    fontSize:20
  },
  buttonContainer: {
    marginTop: 20,
  },
})
