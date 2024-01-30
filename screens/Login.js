import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Realm from 'realm';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const realm = await Realm.open({
        schema: [{ name: 'User', properties: { username: 'string', password: 'string' } }],
      });
      
      const user = realm.objects('User').filtered(`username = "${username}" AND password = "${password}"`);
      
      if (user.length > 0) {
        console.log('Login successful!');
        navigation.navigate('Home');
      } else {
        console.log('Username or password incorrect!');
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error retrieving username and password:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text>Don't have an account? Click here to sign up!</Text>
      </TouchableOpacity>
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
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
});

export default Login;
