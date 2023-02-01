import { Auth,Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile=({navigation,route})=>{

    const redirectUrl = Linking.createURL('profile');
    console.log(redirectUrl);

    const signOut=async()=>{
        try{
            await Auth.signOut();
            navigation.navigate("signin",{flag:0});
        }
        catch(e){
            Alert.alert('Unable to Sign out',e.message); 
        }
    }

    return(
        <View style={styles.outline}>
            <View style={styles.content}>
                <Text>Welcome to HealthPad</Text>
            </View>
            <Pressable style={({pressed})=>[styles.signout,{width:pressed?'52%':'50%'}] } onPress={signOut}>
                <Text>Get out</Text>
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
    }   ,
    signout:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:25,
        backgroundColor:'#8A8AFF',
        height:'13%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:13,
        width:'50%'
    }
})

export default Profile