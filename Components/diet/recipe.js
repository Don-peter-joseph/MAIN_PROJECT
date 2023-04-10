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
    const [content,setcontent]=useState('loading...');

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
            setcontent(response.Item.Recipe);
      
    }

    return(

        <View style={styles.outline}>
            <Text style={{fontSize:40,fontWeight:300,padding:20}}>Recipe</Text>
            <View style={styles.content}>
                <Text style={{padding:15}}>{content}</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        width:'100%',
        height:'100%',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    content:{
        width:'90%',
        backgroundColor:'#ffffff'
    }
})

export default Recipe;
