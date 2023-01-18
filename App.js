import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signin from './Components/Authentication/signin';
import Signup from './Components/Authentication/signup';
import Confirmemail from './Components/Authentication/confirmemaill';
import Forgotpassword from './Components/Authentication/forgotpassword';
import Resetpassword from './Components/Authentication/newpassword';
import Home from './Components/Home/homescreen';
import Profile from './Components/Home/profile';
import { Amplify,Auth } from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
import * as Linking from 'expo-linking';


Amplify.configure(awsconfig)

const Stack = createNativeStackNavigator();


const config={
  screens:{
    homescreen:"home",
    profilescreen:"profile",
  }
}

const prefix=Linking.createURL('/')

export default function App() { 
  // Auth.signOut();
  return (

    <NavigationContainer
      linking={{
        prefixes:[prefix],
        config
      }}>
      <Stack.Navigator initialRouteName="profilescreen">
        <Stack.Screen name="signin" component={Signin} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name="confirmemail" component={Confirmemail} options={{headerShown:false}}/>
        <Stack.Screen name="forgotpassword" component={Forgotpassword} options={{headerShown:false}}/>
        <Stack.Screen name="resetpassword" component={Resetpassword} options={{headerShown:false}}/>
        <Stack.Screen name="homescreen" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="profilescreen" component={Profile} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

