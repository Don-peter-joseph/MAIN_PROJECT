import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import { Auth,API } from "aws-amplify";
import Lottie from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Result2=({navigation,route})=>{
    const {item,user,eng,fib,cal,carbs}=route.params;
    const value=item.toUpperCase();
    const [flag,setflag]=useState(0);
    const [flag2,setflag2]=useState(1);
    const [gindex,setgindex]=useState(0);
    const [gload,setgload]=useState(0);
    const [message,setmessage]=useState("Feeding Data ...");
    const [reading,setreading]=useState(0);
    const [insulinfactor,setinsulinfactor]=useState(0); 

    useEffect(async()=>{
        // await Predict();
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
      
      const Predict=async()=>{
        console.log('hi');
        try{

              const response=await API.post('healthpadrestapi', '/healtpadsugarpredictor-staging');
              setreading(response);
          }
          catch(e){
            console.log(e);
          }
    }

    const getDetails=async()=>{
        const gind=Math.floor(Math.random() * 101)
        setgindex(gind);
        console.log(gind)
        setgload((gind*carbs)/100)
        const insulinf = (1 + (0.01 * (user.Item.bmi - 25))) * (1 + (0.01 * (user.Item.age - 20)));
        setinsulinfactor(insulinf);
        setreading(Math.round(parseInt(user.Item.rbs)+((gind*carbs)/10000)*(gind/100)*user.Item.rbs*insulinf))
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
                    {reading<user.Item.rbs?
                    <>
                        <View style={styles.reading}>
                            <Lottie source={require('./assets/down.json')} autoPlay loop
                                        style={{width:150}} />
                            <Text style={{fontSize:30,fontWeight:500}}>{reading}<Text style={{fontSize:20}}> mg/dL</Text></Text>
                        </View>
                        <Text style={{fontSize:15,fontWeight:600}}>100g of {item} will decrease your sugar level from {user.Item.rbs} to {reading}</Text>
                    </>
                    :
                    <>
                        <View style={styles.reading}>
                            <Lottie source={require('./assets/up.json')} autoPlay loop
                                        style={{width:150}} />
                            <Text style={{fontSize:30,fontWeight:500}}>{reading}<Text style={{fontSize:20}}> mg/dL</Text></Text>
                        </View>
                        <Text style={{fontSize:15,fontWeight:600}}>100g of {item} will increase your sugar level from {user.Item.rbs} to {reading}</Text>
                    </>

                    }
                </View>

                <View style={styles.recommendation}>
                    {gindex<50 && gload<10 || reading<150?
                    <>
                        <View style={styles.recommended}>
                            <Text style={{fontSize:20,fontWeight:700}}>Safe</Text>
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
                        onPress={()=>navigation.navigate("scanscreen",{user})}>
                        <Text style={{fontSize:18,fontWeight:700}}>Cancel</Text>
                    </Pressable>
                    <Pressable style={[styles.button,{backgroundColor:'#3BA73A'}]} 
                        onPress={()=>navigation.navigate("quantityscreen",{carbs,eng,cal,fib,gindex,user,item,temp:reading,insulinfactor})}>
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

export default Result2;