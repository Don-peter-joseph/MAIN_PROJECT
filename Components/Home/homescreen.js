import { Auth,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert,ScrollView } from "react-native";
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
    const [profileData, setprofileData] = useState('');


    useEffect(async()=>{
            await currentUser() ;
      },[]);

      const getImage=async(imagename)=>{
        try {
            const imgname=imagename;
            console.log(imgname)
            const response = await API.post('healthpadrestapi', '/imageretriever-staging', {
                body: {
                    imgname,
                }
                });
            setprofileData(`data:image/jpeg;base64,${response}`);
            console.log(profileData)
        } catch (error) {
            console.log('Lambda error:', error);
            setprofileData(`data:image/jpeg;base64`);
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
            tablename:'heathpaduserdetails-staging'
          };
            const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                body: {
                        data 
                } 
            });
            setuser(response);
            console.log(response.Item)
            await getImage(response.Item.imagename);

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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center',height:windowHeight}}>
            
        {!profileData?
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
                        <Image source={{uri:profileData}} style={{width:60,height:60,borderRadius:30,borderWidth:1,borderColor:'black'}}/>
                        </Pressable>
                    </View>
                    <View style={styles.features}>
                        <Pressable  style={styles.box} onPress={()=>navigation.navigate("scanscreen",{user})}>
                            <Lottie style={styles.animation} source={require('../animatedscreen/scan.json')} autoPlay loop speed={0.6}/>
                            <Text style={{fontWeight:'bold',fontSize:15}}>Scan</Text></Pressable>
                        
                        <Pressable  style={styles.box} onPress={()=>navigation.navigate("dietscreen",{user})}>        
                            <Lottie style={styles.animation} source={require('../animatedscreen/diet.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Manage Diet</Text></Pressable>
                        
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("shopscreen")}>
                            <Lottie style={styles.animation} source={require('../animatedscreen/shop.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Medicine Shop</Text></Pressable>
                        
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("statisticsscreen",{user})}>
                            <Lottie style={styles.animation} source={require('../animatedscreen/statistics.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Statistics</Text></Pressable>
                        
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("consultscreen")}>
                            <Lottie style={styles.animation} source={require('../animatedscreen/doctor.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Consult Doctor</Text></Pressable>
                        
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("chatbotscreen")}>
                            <Lottie style={styles.animation} source={require('../animatedscreen/customercare.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Customer Care</Text></Pressable>
                        
                        <Pressable style={[styles.box,{width:'90%',height:70,flexDirection:'row',paddingBottom:0,paddingTop:0}]} onPress={()=>navigation.navigate("settingscreen",{user})} >
                            <Lottie style={{width:80}} source={require('../animatedscreen/settings.json')} autoPlay loop />
                            <Text style={{fontWeight:'bold',fontSize:15}}>Settings</Text></Pressable>
                    </View>
                </View>
            </>

        }
      </View>
      </ScrollView>
    )
}

const styles=StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    outline:{
        flex: 1,
        // position:'absolute',
        width:windowWidth,
        height:"100%",
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
        marginTop:50,
        marginBottom:40,
        paddingTop:50,
        paddingBottom:30,
        borderWidth:.5,
        // borderColor:'red',
        borderRadius:25,
        alignItems:'center',
        width:'95%',
        justifyContent:'space-evenly',
        backgroundColor:'#F7EBFE',
        alignSelf:'center',
        flex:.1
    },
    features:{
        // borderWidth:2,
        // borderColor:'green',
        width:'100%',
        // height:'50%',
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        paddingTop:10
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
        height:'22%',
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
        marginRight:15,
        // height:50,
        // width:40
    },
    animation:{
        height:"95%"
    }
})

export default Home