import { Amplify,Auth, Hub } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

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
import Scanimage from './Components/Home/scanpage';
import Shop from './Components/Home/shop';
import Statistics from './Components/Home/statistics';
import Consult from './Components/Home/consultpage';
import Customercare from './Components/Home/customercare';
import DetectFaces from './Components/Home/detectface';
import TextRecogniser from './Components/Home/textrecognition';
import textDetection from './Components/Home/googlevisiontext';
import FoodDetector from './Components/Home/fooddetection';
import Detailsfirst from './Components/Home/details';
import Detailssecond from './Components/Home/details2';
import Detailsthird from './Components/Home/details3';
import Diet from './Components/diet/Home';
import Item from './Components/diet/Items';
import Recipe from './Components/diet/recipe';
import TermsCondition from './Components/Home/termscond';
import PrivacyPolicy from './Components/Home/privacyp';
import {AmazonAIPredictionsProvider} from '@aws-amplify/predictions';
import {withAuthenticator} from 'aws-amplify-react-native';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';


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
  
  useEffect(async()=>{
      await checkUser();
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
            <Stack.Screen name="itemscreen" component={Item}/> 
            {/* <Stack.Screen name="textrecognitionscreen" component={TextRecogniser}/> */}
            <Stack.Screen name="googlevisiontextscreen" component={textDetection}/>
            <Stack.Screen name="profilescreen" component={Profile}/> 
            <Stack.Screen name="confirmemail" component={Confirmemail}/>
            <Stack.Screen name="forgotpassword" component={Forgotpassword}/>
            <Stack.Screen name="resetpassword" component={Resetpassword}/>
            <Stack.Screen name="shopscreen" component={Shop}/>
            <Stack.Screen name="servicescreen" component={Customercare}/>
            <Stack.Screen name="consultscreen" component={Consult}/>
            <Stack.Screen name="statisticsscreen" component={Statistics}/>
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
        </>
         : 
         ( <>
            <Stack.Screen name="detailsScreen" component={Detailsfirst}/> 
            <Stack.Screen name="details2screen" component={Detailssecond}/>     
            <Stack.Screen name="details3screen" component={Detailsthird}/>     
            <Stack.Screen name="signin" component={Signin}/>
            <Stack.Screen name="itemscreen" component={Item}/> 
            <Stack.Screen name="signup" component={Signup}/>
            {/* <Stack.Screen name="signin" component={Signin}/>
            <Stack.Screen name="signup" component={Signup}/> */}
            <Stack.Screen name="homescreen" component={Home}/>
            {/* <Stack.Screen name="signup" component={Signup}/> */}
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
            <Stack.Screen name="scanscreen" component={Scanimage}/>
            <Stack.Screen name="detectfacescreen" component={DetectFaces}/>
            {/* <Stack.Screen name="textrecognitionscreen" component={TextRecogniser}/> */}
            <Stack.Screen name="googlevisiontextscreen" component={textDetection}/>
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

