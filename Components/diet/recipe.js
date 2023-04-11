import { Auth,API } from "aws-amplify";
import { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert,ScrollView,FlatList } from "react-native";
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Recipe = ({navigation,route}) => {
    const {user,flag}=route.params;
    const {item}=route.params;
    const parsedItem = JSON.parse(item);
    const [content,setcontent]=useState();

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
            setTimeout(() => {
                setcontent(response);
              }, 2000);
    }

    const Confirm=()=>{
        console.log(content);
        navigation.navigate("dietscreen",{user,calorie:content.Item.Calories,flag})
    }
    const Cancel=()=>{
        navigation.navigate("itemscreen",{user})
    }

    return(

        <View style={styles.outline}>
            {content?
            <>
                <Text style={{fontSize:40,fontWeight:300,paddingTop:60,flex:1}}>Recipe</Text>
                <View style={styles.content}>
                    <Text style={{padding:15}}>{content.Item.Recipe}</Text>
                </View>    
                <View style={styles.footer}>
                    <Pressable style={({pressed})=>pressed ?[styles.button,{backgroundColor:'#3BA73A'}]:
                            [styles.button,{backgroundColor:'#69DE68'}]} onPress={Confirm}>
                        <Text style={{fontWeight:700,fontSize:17}}>✔ Confirm</Text>
                    </Pressable>                        
                    <Pressable style={({pressed})=>pressed ?[styles.button,{backgroundColor:'#D33D29'}]:
                             [styles.button,{backgroundColor:'#FF8686'}]} onPress={Cancel}>
                        <Text style={{fontWeight:700,fontSize:17}}>✕ Cancel</Text>
                    </Pressable>        
                </View>
            </>    
            :
            <>
            <View style={{width:"70%",height:"70%"}}>
                <Lottie
                source={require('./assets/recipeloading.json')}
                autoPlay
                loop
                />
            </View>
            </>
            }
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
        backgroundColor:'#ffffff',
        flex:5,
    },
    footer:{
        flexDirection:'row',
        // borderWidth:1,
        width:'100%',
        flex:1,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    button:{
        width:130,
        height:70,
        borderWidth:.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:40,
    }
})

export default Recipe;
