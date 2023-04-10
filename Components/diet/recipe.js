import { Auth,API } from "aws-amplify";
import { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert,ScrollView,FlatList } from "react-native";
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Recipe = ({navigation,route}) => {

    const {item}=route.params;
    const parsedItem = JSON.parse(item);

    useEffect(() => {
        getDetails();
      }, []);

    const getDetails=async()=>{
        console.log(parsedItem.Name);
        const data = {
            operation: 'retrieve',
            payload: parsedItem.Name,
            tablename:'recipehealthpad'
          };
            const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                body: {
                        data 
                } 
            });  
            console.log("items retrieved successfully")
            console.log(response)
      
    }

    return(

        <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
            <Text>nothing</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        width:'100%',
        height:'100%',
        justifyContent: 'space-evenly', 
        // borderWidth:2,
        // borderColor:'red',
        flexDirection:'row'
    },
    content:{
        justifyContent:'center',
        alignItems:"center"
    },
    progressbar:{
        marginTop:30,
        marginBottom:20
    },
    box:{
        // borderWidth:1,
        // borderColor:'green',
        width:windowWidth/2.2,
        height:200,
        backgroundColor:'#ffffff',
        padding:10,
        margin:8
    },
    food:{
        flex:10,
        width:'100%',
        height:700,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F1F1F1',
        marginTop:60,
        // borderWidth:1

    },
    image:{
        width:'100%',
        flex:3,
        borderWidth:1,
        borderColor:'green'
    },
    heading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }

})

export default Recipe;
