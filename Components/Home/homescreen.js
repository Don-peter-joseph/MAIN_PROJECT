import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import { NavigationContainer } from "@react-navigation/native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Home=({navigation,route})=>{
    const [a,a1] = useState(false);
    const [b,b1] = useState(false);
    const [c,c1] = useState(false);
    const [d,d1] = useState(false);
    const [e,e1] = useState(false);
    const [f,f1] = useState(false);

    // const handlePressIn = () => {
    //     a1(true);
    //   };
    //   const handlePressOut = () => {
    //     a1(false);
    //   };

    //   const handlePressIn2 = () => {
    //     b1(true);
    //   };
    //   const handlePressOut2 = () => {
    //     b1(false);
    //   };

    //   const handlePressIn3 = () => {
    //     c1(true);
    //   };
    //   const handlePressOut3 = () => {
    //     c1(false);
    //   };

    //   const handlePressIn4 = () => {
    //     d1(true);
    //   };
    //   const handlePressOut4 = () => {
    //     d1(false);
    //   };

    //   const handlePressIn5 = () => {
    //     e1(true);
    //   };
    //   const handlePressOut5 = () => {
    //     e1(false);
    //   };

    //   const handlePressIn6 = () => {
    //     f1(true);
    //   };
    //   const handlePressOut6 = () => {
    //     f1(false);
    //   };

    const redirectUrl = Linking.createURL('home');
      console.log(redirectUrl);
    return(
        <View style={styles.outline}>
            <View style={styles.navbar}>
                <View style={{flex:1}}>
                    {/* <Text>nothing</Text> */}
                </View>
                <View style={styles.logo}>
                   <Image style={[styles.inputlogo]} source={require('./assets/adaptiveicon.png')}/>
                </View>
                <Pressable style={styles.profile} onPress={()=>navigation.navigate("profilescreen")}>
                    <Image style={{width:50,height:50,borderRadius:30}} source={require('./assets/scan.jpg')}/>
                </Pressable>
            </View>
            <View style={styles.features}>
                <Pressable  style={styles.box} onPress={()=>navigation.navigate("scanscreen")}>
                   <Image style={[styles.featureimages]} source={require('./assets/scan.png')}/>
                    <Text>Scan</Text></Pressable>
                <Pressable  style={styles.box} onPress={()=>navigation.navigate("dietscreen")}>        
                   <Image style={[styles.featureimages]} source={require('./assets/diet.jpg')}/>
                    <Text>Manage Diet</Text></Pressable>
                <Pressable style={styles.box} onPress={()=>navigation.navigate("shopscreen")}>
                   <Image style={[styles.featureimages]} source={require('./assets/cart.jpg')}/>
                    <Text>Medicine Shop</Text></Pressable>
                <Pressable style={styles.box} onPress={()=>navigation.navigate("statisticsscreen")}>
                   <Image style={[styles.featureimages]} source={require('./assets/statistics.png')}/>
                    <Text>Statistics</Text></Pressable>
                <Pressable style={styles.box} onPress={()=>navigation.navigate("consultscreen")}>
                   <Image style={[styles.featureimages]} source={require('./assets/doctor.jpg')}/>
                    <Text>Consult Doctor</Text></Pressable>
                <Pressable style={styles.box} onPress={()=>navigation.navigate("servicescreen")}>
                   <Image style={[styles.featureimages]} source={require('./assets/customercare.jpg')}/>
                    <Text>Customer Care</Text></Pressable>
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor:'#E9E9E9',
        // borderWidth:2,
        // borderColor:'yellow'
    },
    content:{
        justifyContent:'center',
        alignItems:"center",
    },
    navbar:{
        flexDirection:'row',
        padding:10,
        paddingTop:50,
        paddingBottom:30,
        // borderWidth:1,
        // borderColor:'red',
        alignItems:'center',
        width:'100%',
        justifyContent:'space-between'
    },
    features:{
        // borderWidth:2,
        // borderColor:'green',
        width:'100%',
        height:'50%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        paddingTop:50
    },
    logo:{
        // position:'absolute',
        width:'30%',
        height:'210%',
        // borderColor:'blue',
        // borderWidth:2,
        flex:6,
        alignItems:'center'
    },
    inputlogo:{
        flex:1,
        width:'40%',
        height:'40%'
    },
    featureimages:{
        flex:1,
        width:'70%',
        height:'70%',
        borderRadius:30,
    },
    box:{
        // borderColor:'red',
        // borderWidth:1,
        width:'33%',
        padding:5,
        marginTop:30,
        height:'30%',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'#f5ffff',
        borderRadius:10,
        // padding:20,

    },
    boxPressed:{
        padding:2,
    },
    profile:{
        flex:1,
        // borderWidth:2,
        // borderColor:'red',
        borderRadius:40,
        // height:50,
        // width:40
    }
})

export default Home