import { Auth,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import { NavigationContainer } from "@react-navigation/native";
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Home=({navigation,route})=>{
    const [user,setuser]=useState('');
    let userid='';
    const [profileData, setprofileData] = useState(null);


    useEffect(async()=>{
            await currentUser() ;
            getImage();
      },[]);

      const getImage=async()=>{
        try {
            const imgname=user.Item.imgname;
            console.log(imgname)
            const response = await API.post('healthpadrestapi', '/imageretriever-staging', {
                body: {
                    imgname,
                }
                });
            setprofileData(`data:image/jpeg;base64,${response}`);
        } catch (error) {
            console.log('Lambda error:', error);
        }        
    }

    const currentUser=async()=> {
        try{
          const authuser=await Auth.currentAuthenticatedUser({bypassCache:'True'});
          userid=authuser.username;
        //   userid=JSON.stringify(authuser.username, null, 2)
          const data = {
            operation: 'retrieve',
            payload: userid,
          };
            const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                body: {
                        data 
                } 
            });
            setuser(response);
            console.log(user.Item.name)
        }
        catch(e){
          console.log(e);
        }
    };

      const redirectProfile=async()=>{
            navigation.navigate("profilescreen",{user})
    }

    const redirectUrl = Linking.createURL('home');
      console.log(redirectUrl);
    return(
        <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>

        {!user?
            <>
            <Lottie
                source={require('../animatedscreen/loading2.json')}
                autoPlay
                speed={0.8}
                loop
                style={{width: 200, height: 200}}
                />
            </>
            :
            <>
            
                <View style={styles.outline}>
                    <View style={styles.navbar}>
                        <View style={{flex:1}}>
                            {/* <Text>nothing</Text> */}
                        </View>
                        <View style={styles.logo}>
                        <Image style={[styles.inputlogo]} source={require('./assets/adaptiveicon.png')}/>
                        </View>
                        <Pressable style={styles.profile} onPress={redirectProfile}>
                            <Image style={{width:50,height:50,borderRadius:30}} source={{uri:profileData}}/>
                        </Pressable>
                    </View>
                    <View style={styles.features}>
                        <Pressable  style={styles.box} onPress={()=>navigation.navigate("scanscreen")}>
                            <Lottie style={styles.animation} source={require('../animatedscreen/scan.json')} autoPlay loop speed={0.6}/>
                        {/* <Image style={[styles.featureimages]} source={require('./assets/scan.png')}/> */}
                            <Text style={{fontWeight:'bold',fontSize:15}}>Scan</Text></Pressable>
                        <Pressable  style={styles.box} onPress={()=>navigation.navigate("dietscreen")}>        
                        {/* <Image style={[styles.featureimages]} source={require('./assets/diet.jpg')}/> */}
                        <Lottie style={styles.animation} source={require('../animatedscreen/diet.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Manage Diet</Text></Pressable>
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("shopscreen")}>
                        {/* <Image style={[styles.featureimages]} source={require('./assets/cart.jpg')}/> */}
                        <Lottie style={styles.animation} source={require('../animatedscreen/shop.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Medicine Shop</Text></Pressable>
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("statisticsscreen")}>
                        {/* <Image style={[styles.featureimages]} source={require('./assets/statistics.png')}/> */}
                        <Lottie style={styles.animation} source={require('../animatedscreen/statistics.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Statistics</Text></Pressable>
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("detectfacescreen")}>
                        {/* <Image style={[styles.featureimages]} source={require('./assets/doctor.jpg')}/> */}
                        <Lottie style={styles.animation} source={require('../animatedscreen/doctor.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Consult Doctor</Text></Pressable>
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("servicescreen")}>
                        {/* <Image style={[styles.featureimages]} source={require('./assets/customercare.jpg')}/> */}
                        <Lottie style={styles.animation} source={require('../animatedscreen/customercare.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Customer Care</Text></Pressable>
                    </View>
                </View>
            </>

        }
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
        backgroundColor:'#ffffff',
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
        borderWidth:.5,
        // borderColor:'red',
        borderRadius:25,
        alignItems:'center',
        width:'100%',
        justifyContent:'space-between',
        backgroundColor:'#F7EBFE'
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
        borderColor:'black',
        borderWidth:1,
        width:'40%',
        padding:5,
        marginTop:30,
        height:'40%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFCA2F',
        borderRadius:20,
        paddingBottom:20,

    },
    profile:{
        flex:1,
        // borderWidth:2,
        // borderColor:'red',
        borderRadius:40,
        // height:50,
        // width:40
    },
    animation:{
        height:"95%"
    }
})

export default Home