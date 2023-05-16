import { Auth,Hub,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert} from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Settings=({navigation,route})=>{
    const {user}=route.params;

    return(
        <View style={styles.outline}>
                <Text style={{fontSize:40,fontWeight:600,marginBottom:40,paddingLeft:20}}>Settings</Text>
                <Pressable style={({pressed})=>[styles.box,{backgroundColor:pressed?'#EFEFEF':'#fff'}]} onPress={()=>navigation.navigate("activityscreen",{user})}>
                    <Text style={styles.text}>Activity</Text>
                </Pressable>
                <Pressable style={({pressed})=>[styles.box,{backgroundColor:pressed?'#EFEFEF':'#fff'}]} onPress={()=>navigation.navigate("detectfacescreen")}>
                    <Text style={styles.text}>Go Premium</Text>
                </Pressable>
                <Pressable style={({pressed})=>[styles.box,{backgroundColor:pressed?'#EFEFEF':'#fff'}]} onPress={()=>navigation.navigate("aboutscreen")}>
                    <Text style={styles.text}>About</Text>
                </Pressable>
                <Pressable style={({pressed})=>[styles.box,{backgroundColor:pressed?'#EFEFEF':'#fff'}]} onPress={()=>navigation.navigate("privacyscreen")}>
                    <Text style={styles.text}>Privacy Policy</Text>
                </Pressable> 
                <Pressable style={({pressed})=>[styles.box,{backgroundColor:pressed?'#EFEFEF':'#fff'}]} onPress={()=>navigation.navigate("termsscreen")}>
                    <Text style={styles.text}>Terms of use</Text>
                </Pressable>
                <Text style={{color:'grey',position:'absolute',bottom:100,alignSelf:'center'}}>Version 1.3.1</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        paddingTop:100,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor:'#F8F6F6'
    },
      box:{
        width:"97%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        // borderWidth:1,
        margin:6,
        borderRadius:5,
        backgroundColor:'#FFFFFF',
        elevation:3,
        // shadowColor:'#FFCA2F'
      }
})

export default Settings;