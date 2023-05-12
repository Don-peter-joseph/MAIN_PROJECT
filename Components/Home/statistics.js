import { Auth,Hub,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ScrollView } from "react-native-gesture-handler";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Statistics=({navigation,route})=>{

    const [content,setcontent]=useState();
    const {user}=route.params;
    const [reading,setreading]=useState(180)

    useEffect(()=>{
        getHistory();
    },[])

    const getHistory=async()=>{
        try{
            const data = {
              operation: 'retrieve',
              payload: user.Item.id,
              tablename:'HealthpadFoodHistory'
            };
              const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                  body: {
                          data 
                  } 
              });
              setcontent(response.Item.history);
              console.log(response)
          }
          catch(e){
            console.log(e);
          }
    }

    return(
        <ImageBackground source={require('../diet/assets/homescreen.png')}  style={{flex:1}}>
        <View style={styles.outline}>
            <View style={styles.content}>
                <AnimatedCircularProgress
                        size={230}
                        width={15}
                        fill={60}
                        tintColor='#8f00ff'
                        lineCap="round"
                        arcSweepAngle={359}
                        tintColorSecondary="#FF8A00"
                        style={{marginTop:30}}
                        backgroundColor="#FF9C28">
                        {
                            (fill) => (
                                <View style={{alignItems:'center'}}>
                                    <Text style={{fontSize:35,fontWeight:'bold'}}>
                                        {reading}
                                    </Text>
                                    <Text style={{fontSize:20,fontWeight:'100'}}>
                                        Sugar Level
                                    </Text>
                                </View>
                            )
                        }
                </AnimatedCircularProgress>
            </View>

            <View style={styles.history} >
                <Text style={{fontSize:25,fontWeight:600}}>Consumption History</Text>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Text style={{fontSize:25,fontWeight:400}}>{content}</Text>
                </ScrollView>
            </View>
            
            <Text style={{fontSize:15,fontWeight:600,height:50}}>3 days since last checked sugar value</Text>

        </View>
        </ImageBackground>
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
        alignItems:"center",
        // borderWidth:1,
        width:'100%',
        flex:2,
    }   ,
    history:{
        // borderWidth:1,
        width:"100%",
        flex:2.3,
        justifyContent:'center',
        alignItems:'center'
        // backgroundColor:"#ffffff"
    },
    scroll:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        borderRadius:30,
        padding:30,
        marginTop:10,
        borderWidth:2,
        width:windowWidth-50,
        height:200
    }

})

export default Statistics;