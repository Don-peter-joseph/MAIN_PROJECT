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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { useEffect, useState,useRef } from 'react';
// import {AmazonAIPredictionsProvider} from '@aws-amplify/predictions';
// import {withAuthenticator} from 'aws-amplify-react-native';

const NOTIFICATION_TASK = 'notification-task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  
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
  
  useEffect(async()=>{
      await checkUser();
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      // Register the task to run every day at 6pm
      TaskManager.defineTask(NOTIFICATION_TASK, ({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        if (data.task === 'send-notification') {
          schedulePushNotification();
        }
      });
      const notificationTrigger = {
        hour: 20,
        minute: 45,
        repeats: true,
      };
      TaskManager.isTaskDefined(NOTIFICATION_TASK).then(defined => {
        if (defined !== true) {
          TaskManager.defineTask(NOTIFICATION_TASK, ({ data, error }) => {
            if (error) {
              console.log(error);
              return;
            }
            if (data.task === 'send-notification') {
              schedulePushNotification();
            }
          });
        }
      });
      TaskManager.getTaskOptionsAsync(NOTIFICATION_TASK).then(options => {
        if (options === null || options === void 0 ? void 0 : options.data) {
          if (options.data.task === 'send-notification') {
            Notifications.cancelAllScheduledNotificationsAsync();
            schedulePushNotification();
          }
        } else {
          TaskManager.setTaskOptionsAsync(NOTIFICATION_TASK, {
            startAt: notificationTrigger,
            data: { task: 'send-notification' },
          }).then(() => {
            Notifications.cancelAllScheduledNotificationsAsync();
            schedulePushNotification();
          });
        }
      });
  
      return () => {
        Notifications.cancelAllScheduledNotificationsAsync();
      };
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
            {/* <Stack.Screen name="signin" component={Signin}/>
            <Stack.Screen name="signup" component={Signup}/>  */}
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
        </>
         : 
         ( <>

            <Stack.Screen name="signin" component={Signin}/>
            <Stack.Screen name="settingscreen" component={Settings}/>
            <Stack.Screen name="aboutscreen" component={About}/>
            <Stack.Screen name="chatbotscreen" component={ChatBot}/>
            <Stack.Screen name="activityscreen" component={Activity}/>
            <Stack.Screen name="quantityscreen" component={Quantity}/>
            <Stack.Screen name="resultscreen" component={Result}/>
            <Stack.Screen name="details3screen" component={Detailsthird}/>     
            <Stack.Screen name="detailsScreen" component={Detailsfirst}/> 
            <Stack.Screen name="details2screen" component={Detailssecond}/>     
            <Stack.Screen name="itemscreen" component={Item}/> 
            <Stack.Screen name="signup" component={Signup}/>
            {/* <Stack.Screen name="signin" component={Signin}/>
            <Stack.Screen name="signup" component={Signup}/> */}
            <Stack.Screen name="homescreen" component={Home}/>
            {/* <Stack.Screen name="signup" component={Signup}/> */}
            <Stack.Screen name="scanscreen" component={Scanimage}/>
            {/* <Stack.Screen name="details2screen" component={Detailssecond}/>
            <Stack.Screen name="details3screen" component={Detailsthird}/>                                                            */}
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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

