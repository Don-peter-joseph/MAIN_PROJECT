import { Amplify,Auth, Hub } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Platform } from 'react-native';
import Signin from './Components/Authentication/signin';
import Signup from './Components/Authentication/signup';
import Confirmemail from './Components/Authentication/confirmemaill';
import Forgotpassword from './Components/Authentication/forgotpassword';
import Resetpassword from './Components/Authentication/newpassword';
import Home from './Components/Home/homescreen';
import Profile from './Components/Home/profile';
import Scanimage from './Components/Home/scanpage';
import Shop from './Components/Home/shop';
import Statistics from './Components/Home/statistics';
import Consult from './Components/Home/consultpage';
import Customercare from './Components/Home/customercare';
import DetectFaces from './Components/Home/detectface';
import TextRecogniser from './Components/Home/textrecognition';
import FoodDetector from './Components/Home/fooddetection';
import Detailsfirst from './Components/Home/details';
import Detailssecond from './Components/Home/details2';
import Detailsthird from './Components/Home/details3';
import Diet from './Components/diet/Home';
import Item from './Components/diet/Items';
import Recipe from './Components/diet/recipe';
import TermsCondition from './Components/Settings/termscond';
import PrivacyPolicy from './Components/Settings/privacyp';
import Result from './Components/modelscreen/modelresult';
import Quantity from './Components/modelscreen/quantity';
import Activity from './Components/Settings/acitivity';
import ChatBot from './Components/Chatbot';
import Settings from './Components/Settings/settings';
import About from './Components/Settings/about';
import Result2 from './Components/modelscreen/modelresult2';
import * as Device from 'expo-device';
import * as Permissions from 'expo-notifications';
import * as Linking from 'expo-linking';
import { useEffect, useState,useRef } from 'react';




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
  
  const subscribeToChannel = async (channelId) => {
    try {
      await Notifications.createChannelAsync(channelId, {
        name: 'staging',
        description: '',
        sound: true,
        priority: Notifications.AndroidImportance.MAX,
      });

      console.log('Subscribed to channel:', channelId);
    } catch (error) {
      console.log('Error subscribing to channel:', error);
    }
  };

  useEffect(async()=>{
    
    const registerForPushNotifications = async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        console.log('Permission not granted!');
        return;
      }
      
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('Expo Push Token:', token);
      
      // Perform the subscription process here
      subscribeToChannel('my-channel-id'); // Replace with your channel identifier
    };
    
    registerForPushNotifications();
    await checkUser();
  },[]);
  

  return (

    <NavigationContainer
      linking={{
        prefixes:[prefix],
        config
      }}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        { user? 
        <>
            <Stack.Screen name="homescreen" component={Home}/>
            <Stack.Screen name="statisticsscreen" component={Statistics}/>
            <Stack.Screen name="resultscreen" component={Result}/>
            <Stack.Screen name="itemscreen" component={Item}/> 
            <Stack.Screen name="textrecognitionscreen" component={TextRecogniser}/>
            <Stack.Screen name="profilescreen" component={Profile}/> 
            <Stack.Screen name="confirmemail" component={Confirmemail}/>
            <Stack.Screen name="forgotpassword" component={Forgotpassword}/>
            <Stack.Screen name="resetpassword" component={Resetpassword}/>
            <Stack.Screen name="shopscreen" component={Shop}/>
            <Stack.Screen name="servicescreen" component={Customercare}/>
            <Stack.Screen name="consultscreen" component={Consult}/>
            <Stack.Screen name="scanscreen" component={Scanimage}/>
            <Stack.Screen name="detectfacescreen" component={DetectFaces}/>
            <Stack.Screen name="fooddetectionscreen" component={FoodDetector}/>
            <Stack.Screen name="detailsScreen" component={Detailsfirst}/>
            <Stack.Screen name="details2screen" component={Detailssecond}/>
            <Stack.Screen name="details3screen" component={Detailsthird}/>
            <Stack.Screen name="dietscreen" component={Diet}/>
            <Stack.Screen name="recipescreen" component={Recipe}/>
            <Stack.Screen name="termsscreen" component={TermsCondition}/>
            <Stack.Screen name="privacyscreen" component={PrivacyPolicy}/>
            <Stack.Screen name="quantityscreen" component={Quantity}/>
            <Stack.Screen name="activityscreen" component={Activity}/>
            <Stack.Screen name="chatbotscreen" component={ChatBot}/>
            <Stack.Screen name="settingscreen" component={Settings}/>
            <Stack.Screen name="aboutscreen" component={About}/>
            <Stack.Screen name="resultscreen2" component={Result2}/>
            {/* <Stack.Screen name="signin" component={Signin}/> */}
            {/* <Stack.Screen name="signup" component={Signup}/> */}

        </>
         : 
         ( <>

            <Stack.Screen name="signin" component={Signin}/>
            <Stack.Screen name="details3screen" component={Detailsthird}/>     
            <Stack.Screen name="settingscreen" component={Settings}/>
            <Stack.Screen name="aboutscreen" component={About}/>
            <Stack.Screen name="chatbotscreen" component={ChatBot}/>
            <Stack.Screen name="activityscreen" component={Activity}/>
            <Stack.Screen name="quantityscreen" component={Quantity}/>
            <Stack.Screen name="resultscreen" component={Result}/>
            <Stack.Screen name="detailsScreen" component={Detailsfirst}/> 
            <Stack.Screen name="details2screen" component={Detailssecond}/>     
            <Stack.Screen name="itemscreen" component={Item}/> 
            <Stack.Screen name="signup" component={Signup}/>
            <Stack.Screen name="homescreen" component={Home}/>
            <Stack.Screen name="scanscreen" component={Scanimage}/>
            <Stack.Screen name="profilescreen" component={Profile}/> 
            <Stack.Screen name="dietscreen" component={Diet}/>
            <Stack.Screen name="confirmemail" component={Confirmemail}/>
            <Stack.Screen name="forgotpassword" component={Forgotpassword}/>
            <Stack.Screen name="resetpassword" component={Resetpassword}/>
            <Stack.Screen name="shopscreen" component={Shop}/>
            <Stack.Screen name="servicescreen" component={Customercare}/>
            <Stack.Screen name="consultscreen" component={Consult}/>
            <Stack.Screen name="statisticsscreen" component={Statistics}/>
            <Stack.Screen name="detectfacescreen" component={DetectFaces}/>
            <Stack.Screen name="textrecognitionscreen" component={TextRecogniser}/>
            <Stack.Screen name="fooddetectionscreen" component={FoodDetector}/> 
            <Stack.Screen name="recipescreen" component={Recipe}/>
            <Stack.Screen name="termsscreen" component={TermsCondition}/>
            <Stack.Screen name="privacyscreen" component={PrivacyPolicy}/>
            <Stack.Screen name="resultscreen2" component={Result2}/>
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

