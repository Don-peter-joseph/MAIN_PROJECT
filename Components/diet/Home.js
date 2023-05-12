import { Auth,API } from "aws-amplify";
import { StatusBar } from "expo-status-bar";
import { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert,ScrollView } from "react-native";
import {Dimensions} from 'react-native';
import { Circle } from "react-native-progress";
import * as Svg from 'react-native-svg';
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Diet = ({navigation,route}) => {
    const {user,calorie}=route.params  || {};
    let {flag}=route.params||{};
    const [cal,setcal]=useState('2000');
    const [reading,setreading]=useState('40');
    const [fil,setfil]=useState('0');
    const [total,settotal]=useState('0');

    useEffect(()=>{
        if (calorie !== undefined) {
            let value=(((total-(cal-calorie))/total)*100)
            console.log(total,cal,calorie,value)
            setfil(value)
            setcal(cal-calorie)
            flag=0;
          }
        else{
            calculate();
        }
    },[calorie,flag])


    const calculate=()=>{
        if(user.Item.gender==='male'){
            bmr=88.362+(13.397*user.Item.weight)+(4.799*user.Item.height)-(5.677*user.Item.age);
            setcal(Math.round(bmr));
            settotal(Math.round(bmr));
            setfil(1);
        }
        else{
            bmr=655+(9.6*user.Item.weight)+(1.8*user.Item.height)-(4.7*user.Item.age);
            setcal(bmr);
            settotal(Math.round(bmr));
            setfil(1);
        }
    }

    return(
        <ImageBackground source={require('./assets/homescreen.png')}  style={{flex:1}}>
        <ScrollView contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
        style={{width:'100%',height:'100%'}}>
            <View style={styles.heading}>
                <Text style={{fontSize:30,fontWeight:'600',paddingTop:70}}>Diet Plan</Text>
            </View>
            <View style={styles.outline}>
                <AnimatedCircularProgress
                    size={180}
                    width={13}
                    fill={fil}
                    tintColor='#8f00ff'
                    lineCap="round"
                    arcSweepAngle={359}
                    tintColorSecondary="#FF8A00"
                    style={styles.progressbar}
                    backgroundColor="#FF9C28">
                    {
                        (fill) => (
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontSize:30,fontWeight:'bold'}}>
                                    {cal}
                                </Text>
                                <Text style={{fontSize:15,fontWeight:'100'}}>
                                    kcal remaining
                                </Text>
                            </View>
                        )
                    }
                </AnimatedCircularProgress>

                {/* <AnimatedCircularProgress
                    style={styles.progressbar}
                    size={180}
                    width={13}
                    fill={reading}
                    tintColor='#8f00ff'
                    lineCap="round"
                    arcSweepAngle={359}
                    tintColorSecondary="#FF8A00"
                    backgroundColor="#FF9C28">
                    {
                        (fill) => (
                            <View>
                                <Text style={{fontSize:30,fontWeight:'bold'}}>
                                    {reading}
                                </Text>
                                <Text style={{fontSize:30,fontWeight:'bold'}}>
                                    
                                </Text>
                            </View>
                        )
                    }
                </AnimatedCircularProgress> */}
            </View>
            <View style={styles.food}>
                <Pressable style={styles.box} onPress={()=>navigation.navigate("itemscreen",{flag,user,title:'BREAKFAST'})}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:15}}>BREAKFAST</Text>
                        <Lottie
                        source={require('./assets/breakfast.json')}
                        autoPlay
                        loop
                        style={{width: 40, height: 100,marginLeft:80}}
                        />
                    </View>
                        <Text style={{color:'#787777',paddingTop:50}}>360-367 kcal recommended</Text>
                        <Text style={{color:'#787777',paddingTop:5}}>Total 0 kcal consumed</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={()=>navigation.navigate("itemscreen",{flag,user,title:'LUNCH'})}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:15}}>LUNCH</Text>
                        <Lottie
                        source={require('./assets/lunch.json')}
                        autoPlay
                        style={{width: 30, height: 100,marginLeft:105}}
                        />
                    </View>
                        <Text style={{color:'#787777',paddingTop:50}}>360-367 kcal recommended</Text>
                        <Text style={{color:'#787777',paddingTop:5}}>Total 0 kcal consumed</Text>
                </Pressable>            
                <Pressable style={styles.box} onPress={()=>navigation.navigate("itemscreen",{flag,user,title:'SNACKS'})}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:15}}>SNACKS</Text>
                        <Lottie
                        source={require('./assets/snacks.json')}
                        autoPlay
                        loop
                        style={{width: 40, height: 120,marginLeft:95}}
                        />
                    </View>
                    <Text style={{color:'#787777',paddingTop:50}}>360-367 kcal recommended</Text>
                    <Text style={{color:'#787777',paddingTop:5}}>Total 0 kcal consumed</Text>
                </Pressable>            
                <Pressable style={styles.box} onPress={()=>navigation.navigate("itemscreen",{flag,user,title:'DINNER'})}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:15}}>DINNER</Text>
                        <Lottie
                        source={require('./assets/dinner.json')}
                        autoPlay
                        loop
                        style={{width: 40, height: 120,marginLeft:100}}
                        />
                    </View>
                        <Text style={{color:'#787777',paddingTop:50}}>360-367 kcal recommended</Text>
                        <Text style={{color:'#787777',paddingTop:5}}>Total 0 kcal consumed</Text>
                </Pressable>            
            </View>
        </ScrollView>
        </ImageBackground>
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
        width:'95%',
        height:150,
        backgroundColor:'#ffffff',
        padding:10,
        margin:8
    },
    food:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F1F1F1',
        marginTop:60
    },
    inputlogo:{
        width:30,
        height:30
    },
    heading:{
        // borderWidth:1,
    }

})

export default Diet
