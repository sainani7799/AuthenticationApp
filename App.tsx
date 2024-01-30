import React, { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from './screens/Registration';
import Login from './screens/Login';
import Home from './screens/Home';
import Realm from 'realm';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if the user is logged in
  const checkLoggedInStatus = async () => {
    const realm = await Realm.open({
      schema: [{ name: 'User', properties: { username: 'string', password: 'string' } }],
    });
    const users = realm.objects('User');
    setLoggedIn(users.length > 0);
  };

  // Call the function to check the login status
  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loggedIn ? 'Home' : 'Login'}>
        <Stack.Screen name="Registration" component={Registration} options={{headerShown:false}} />
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
