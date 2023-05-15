import { Auth,Hub,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert} from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Customercare=({navigation,route})=>{

    const Predict=async()=>{
        console.log('hi');
        try{

              const response=await API.post('healthpadrestapi', '/healtpadsugarpredictor-staging');
              console.log(response);
          }
          catch(e){
            console.log(e);
          }
    }

    return(
        <View style={styles.outline}>
            <View style={styles.content}>
                <Text >This is customercare screen hi</Text>
                <Pressable onPress={Predict}>
                    <Text>click me</Text>
                </Pressable>
            </View>
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
        backgroundColor:'#ffffff'
    },
    content:{
        flex:1,
        width:'100%',
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
    },
    animation:{
        borderWidth:2,
        borderColor:'black',
        height:500,
    }
})

export default Customercare;