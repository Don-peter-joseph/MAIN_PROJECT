import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import { NavigationContainer } from "@react-navigation/native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Home=({navigation})=>{
    
    const redirectUrl = Linking.createURL('home');
      console.log(redirectUrl);
    return(
        <View style={styles.outline}>
            <Pressable style={[{backgroundColor:"blue"}]} onPress={()=>Linking.openURL("myapp://profile")}>
                <Text>Click here</Text>
            </Pressable>
            <Pressable style={[{backgroundColor:"yellow"}]} onPress={()=>webbrower.openBrowserAsync('https://docs.expo.io')}>
                <Text>Click here for brower</Text>
            </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        position:'absolute',
        width:windowWidth,
        height:windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:' #f5f5f5'
    },
    content:{
        justifyContent:'center',
        alignItems:"center"
    }
})

export default Home