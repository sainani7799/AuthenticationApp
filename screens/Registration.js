import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text,TouchableOpacity, Alert } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
import Realm from 'realm';


const Registration = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const UserSchema = {
    name: 'User',
    properties: {
      username: 'string',
      password: 'string',
    },
  };
  console.log('Realm Database Path:', Realm.defaultPath);

  // Open or create a Realm instance
const realm = new Realm({ schema: [UserSchema] });

// Query the database to retrieve stored users
const storedUsers = realm.objects('User');

// Log the stored users to the console
console.log('Stored Users:', storedUsers);

  const handleRegister = () => {
    if (!name || !username || !password) {
      console.log('All Fields are required ')
      setErrorMessage('All fields are required');
      return;
    }
    const userExists = storedUsers.filtered(`username = "${username}"`).length > 0;
  if (userExists) {
    Alert.alert('Error', 'Username already exists. Please choose a different username or Login .');
    navigation.navigate('Login')
    return;
  } 
    try {
        realm.write(() => {
        realm.create('User', { username, password });
      console.log('Username and password stored successfully!');
      Alert.alert('success', 'You have been registered successfully!')
      navigation.navigate('Login');
    });
 } catch (error) {
      console.error('Error storing username and password:', error);
    }
  };
  const HanndleLoginRedirect=()=>{
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* <AntDesign name="user" size={100} color="black" style={styles.icon} /> */}
      <Text style={styles.Text} >Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity onPress={HanndleLoginRedirect}><Text>Already have an account!! Click here to Login</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  Text:{
    fontSize:30,
    padding:10,
    
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent:'center',
    alignItems:'center',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Registration;
