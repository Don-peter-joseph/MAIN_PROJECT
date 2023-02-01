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
import { Amplify,Auth, Hub } from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';

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
  
  const [user,setUser]=useState(undefined);
  
  
  const checkUser=async()=> {
    try{
      const authUser=await Auth.currentAuthenticatedUser({bypassCache:'True'});
      console.log("current user is "+authUser);
      setUser(authUser);
    }
    catch(e){
      setUser(null);
    }
  };
  
  useEffect(()=>{
    checkUser();
  },[]);
  
  // useEffect(()=>{
  //     const listener=(data)=>{
  //         if(data.payload.event=='signIn'){
  //             console.log("its a signin")
  //           }
  //           if(data.payload.event==='signOut'){
  //               console.log("singout")
  //             }
  //           };
  //           let result=Hub.listen('auth',listener);
  //           return()=>Hub.dispatch('auth',listener);
  //         },[]);
          
          
          // if(user==undefined){
          //   return(
          //     <View>
          //       <Text>loading sdfoasdfajsdfjasidjfasjdfasjdfas;d</Text>
          //     </View>
          //   )
          // }

          return (

    <NavigationContainer
      linking={{
        prefixes:[prefix],
        config
      }}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        { user? <Stack.Screen name="profilescreen" component={Profile}/> : 
        ( <>
        <Stack.Screen name="signin" component={Signin}/>
        <Stack.Screen name="signup" component={Signup}/>
        <Stack.Screen name="confirmemail" component={Confirmemail}/>
        <Stack.Screen name="forgotpassword" component={Forgotpassword}/>
        <Stack.Screen name="resetpassword" component={Resetpassword}/>
        <Stack.Screen name="homescreen" component={Home}/>
        <Stack.Screen name="profilescreen" component={Profile}/> 
        </>)
    }
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

