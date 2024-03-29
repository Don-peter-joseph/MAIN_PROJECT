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
    const fill=(user.Item.rbs/ 1000) * 100
    console.log(fill)

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
        <View style={styles.outline}>
            <View style={[styles.content,{ backgroundColor: user.Item.rbs<200 ? '#00C100' : '#FF2E2E'}]}>
                <AnimatedCircularProgress
                        size={230}
                        width={15}
                        fill={fill}
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
                                        {user.Item.rbs}
                                    </Text>
                                    <Text style={{fontSize:20,fontWeight:'100'}}>
                                        Sugar Level
                                    </Text>
                                </View>
                            )
                        }
                </AnimatedCircularProgress>
                {user.Item.rbs>200?
                <>
                    <Text style={{paddingTop:30,fontSize:20,fontWeight:600,color:'#FFFFE0'}}>Sugar level high !!!</Text>
                </>
                :
                <>
                    <Text style={{paddingTop:30,fontSize:20,fontWeight:600,color:'#FFFFE0'}}>Sugar level in control</Text>
                </>
                }
            </View>

            <View style={styles.history} >
                <Text style={{fontSize:25,fontWeight:600,margin:10}}>Consumption History</Text>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Text style={{fontSize:20,fontWeight:400}}>{content}</Text>
                </ScrollView>
            </View>
            
            <Text style={{fontSize:15,fontWeight:600,height:50}}>3 days since last checked sugar value</Text>

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
        alignItems:"center",    
        borderWidth:1,
        width:'100%',
        flex:1.9,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50
    }   ,
    history:{
        marginTop:10,
        borderWidth:1,
        width:"90%",
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 30,
        // height:500,
        backgroundColor:"#ffffff"
    },
    scroll:{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth - 50,
        // flexGrow: 1
    }

})

export default Statistics;