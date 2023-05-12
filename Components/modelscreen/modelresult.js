import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import { Auth,API } from "aws-amplify";
import Lottie from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Result=({navigation,route})=>{
    const {item}=route.params;
    const value=item.toUpperCase();
    const [cal,setcal]=useState(0);
    const [eng,seteng]=useState(0);
    const [fib,setfib]=useState(0);
    const [carbs,setcarbs]=useState(0);
    const [flag,setflag]=useState(0);
    const [flag2,setflag2]=useState(1);
    const [gindex,setgindex]=useState(0);
    const [gload,setgload]=useState(0);
    const [message,setmessage]=useState("Feeding Data ...");

    useEffect(async()=>{
        await getDetails() ;
        updateLoadingMessage('Applying machine learning model...', 1000);
        updateLoadingMessage('Generating Output...', 3000);
        updateLoadingMessage('Almost there...', 6000);
    },[]);

    const updateLoadingMessage = (message, timeout) => {
        setTimeout(() => {
          setmessage(message);
        }, timeout);
      };
      

    const getDetails=async()=>{
        const data = {
            operation: 'retrieve',
            payload: value,
            // payload:'APPLE',
            tablename:'HealthpadNutritionList'
          };
            const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                body: {
                        data 
                } 
            });  
            seteng(response.Item.Energy);
            setcal(response.Item.Calcium);
            setfib(response.Item.Fibre);
            setcarbs(response.Item.Carbos);
            setgindex(response.Item.Glycemicindex);
            setgload((response.Item.Glycemicindex*response.Item.Carbos)/100)
            console.log(response);
            setTimeout(() => {
                setflag(1);
              }, 100);
    }

    return(
        <View style={styles.outline}>
            {flag?
            <>
                <View style={styles.item}>
                    <Text style={{width:'100%',textAlign:'center',fontSize:30,fontWeight:900}}>{item}</Text>
                    {/* <Text style={{width:'100%',textAlign:'center',fontSize:30,fontWeight:900}}>Apple</Text> */}
                    <View style={styles.box}>
                        <Text style={styles.text}>Energy</Text>
                        <Text style={styles.text}>{eng}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.text}>Carbos</Text>
                        <Text style={styles.text}>{carbs}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.text}>Fibre</Text>
                        <Text style={styles.text}>{fib}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.text}>Calcium</Text>
                        <Text style={styles.text}>{cal}</Text>
                    </View>
                    <Text>* Above values given are per 100g</Text>
                </View>

                <View style={styles.result}>
                    <Text style={{fontSize:25,fontWeight:900,width:'100%',textAlign:'center',marginBottom:20}}>Sugar Reading</Text>
                    {flag2?
                    <>
                        <View style={styles.reading}>
                            <Lottie source={require('./assets/down.json')} autoPlay loop
                                        style={{width:150}} />
                            <Text style={{fontSize:30,fontWeight:500}}>188</Text>
                        </View>
                        <Text style={{fontSize:15,fontWeight:600}}>100g of Apple will decrease your sugar level from 190 to 188</Text>
                    </>
                    :
                    <>
                        <View style={styles.reading}>
                            <Lottie source={require('./assets/up.json')} autoPlay loop
                                        style={{width:150}} />
                            <Text style={{fontSize:30,fontWeight:500}}>188</Text>
                        </View>
                        <Text style={{fontSize:15,fontWeight:600}}>100g of Apple will increase your sugar level from 185 to 188</Text>
                    </>

                    }
                </View>

                <View style={styles.recommendation}>
                    {gindex<50 && gload<10?
                    <>
                        <View style={styles.recommended}>
                            <Text style={{fontSize:20,fontWeight:700}}>Recommended</Text>
                        </View>
                    </>
                    :
                    <>
                        <View style={styles.notrecommended}>
                            <Text style={{fontSize:20,fontWeight:700}}>Not Recommended</Text>
                        </View>
                    </>
                    }
                </View>

                <View style={styles.choice}>
                    <Pressable style={[styles.button,{backgroundColor:'#D33D29'}]}
                        onPress={()=>navigation.navigate("scanscreen")}>
                        <Text style={{fontSize:18,fontWeight:700}}>Cancel</Text>
                    </Pressable>
                    <Pressable style={[styles.button,{backgroundColor:'#3BA73A'}]} 
                        onPress={()=>navigation.navigate("quantityscreen",{carbs,eng,cal,fib,gindex})}>
                        <Text style={{fontSize:18,fontWeight:700}}>Next</Text>
                    </Pressable>
                </View>
            </>
            :
            <>
                <View style={{flex:1,backgroundColor:"#ffffff",width:'100%'}}>
                    <Lottie source={require('./assets/loading.json')}
                    autoPlay loop />
                    <Text style={styles.text2}>{message}</Text>
                </View>
            </>
            }
        </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        width:windowWidth,
        height:windowHeight,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor:' #f5f5f5'
    },
    item:{
        justifyContent:'center',
        alignItems:"center",
        borderWidth:3,
        width:'95%',
        flexDirection:'row',
        flexWrap:'wrap',
        borderRadius:15,
        backgroundColor:'#e6e6fa',
        borderColor:'#dda0dd'
    }   ,
    box:{
        width:'25%',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:80,
        marginTop:30,
    },
    text:{
        fontWeight:'900',
        fontSize:20
    },
    result:{
        // borderWidth:1,
        width:"95%",   
        height:250,
        justifyContent:'center',
        alignItems:"center",
        flexWrap:'wrap',
        flexDirection:'row'
    },
    recommendation:{
        width:'100%',
        // borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        height:200,
    },
    recommended:{
        width:'55%',
        height:180,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#b1fcb1",
        borderRadius:15
    },
    notrecommended:{
        width:'55%',
        height:180,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff4d4d",
        borderRadius:15
    },
    text2:{
        position:'absolute',
        bottom:100,
        alignSelf:'center',
        fontSize:20,
        fontWeight:700
    },
    reading:{
        // borderWidth:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'45%',
    },
    button:{
        width:130,
        height:70,
        borderWidth:.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:40,
    },
    choice:{
        // borderWidth:1,
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-evenly'
    },
    quantity:{
        width:'100%',
        textAlign:'center',
        fontSize:18,
        fontWeight:700,
        height:40,
    },
    quantity2:{
        flexWrap:'wrap',
        height:150,
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#ffffff'
    }
})

export default Result;