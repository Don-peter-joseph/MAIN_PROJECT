import { Auth } from "aws-amplify";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert,ScrollView } from "react-native";
import {Dimensions} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({navigation,route}) => {
    
    const [flag,setflag]=useState("");
    const {user} =route.params;
    // console.log(user.Item.city)

    const SignOut=async()=>{
        try{
            await Auth.signOut();
            navigation.navigate("signin");
        }
        catch(e){
            Alert.alert(e.message);
        }
    // console.log("singout out")
    }
    

    return (
        <ImageBackground source={require('./assets/profilescreen.png')}  style={{flex:1}}>
            <View style={styles.outline}>
                {!flag?
                <>
                    <View style={styles.profileimage}>
                            <Text>Here comes profile image</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.userdetails}>
                        <Text style={styles.label}>Full Name</Text>
                            <Text style={styles.item}>{user.Item.name}</Text>
                        <Text style={styles.label}>Email Id</Text>
                            <Text style={styles.item}>{user.Item.email}</Text>
                        <Text style={styles.label}>Phone no</Text>
                            <Text style={styles.item}>{user.Item.phoneno}</Text>
                        <Text style={styles.label}>Age</Text>
                            <Text style={styles.item}>{user.Item.age}</Text>
                        </View>
                        <View style={styles.contentfooter}>
                            <Pressable style={({pressed})=>[styles.button,{backgroundColor:pressed?'#6A8AFF':'#FFBA2A',width:pressed?'72%':'70%'}]}
                            onPress={()=>setflag("1")}>
                                    <Text style={{fontSize:15,color:'#000000'}}>Expand Profile</Text>
                            </Pressable>

                            <Pressable style={({pressed})=>[styles.button,{backgroundColor:pressed?'#6A8AFF':'#FFBA2A',width:pressed?'72%':'70%'}]}
                            onPress={SignOut}>
                                    <Text style={{fontSize:15,color:'#000000'}}>SignOut</Text>
                            </Pressable>
                        </View>
                    </View>
                </>
                :
                <>
                  <StatusBar hidden={true}/>
                    <ScrollView style={{width:'100%'}} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
                        <View style={styles.expandedprofileimage}>
                                <Text>Here comes profile image</Text>
                        </View>
                        <View style={styles.expandedcontent}>
                            <Text style={styles.label}>Full Name</Text>
                            <Text style={styles.item}>{user.Item.name}</Text>
                            <Text style={styles.label}>Email Id</Text>
                            <Text style={styles.item}>{user.Item.email}</Text>
                            <Text style={styles.label}>Phone no</Text>
                            <Text style={styles.item}>{user.Item.phoneno}</Text>
                            <Text style={styles.label}>Age</Text>
                            <Text style={styles.item}>{user.Item.age}</Text>
                            <Text style={styles.label}>Gender</Text>
                            <Text style={styles.item}>{user.Item.selectedSex}</Text>
                            <Text style={styles.label}>Address</Text>
                            <Text style={styles.item}>{user.Item.address}</Text>
                            <Text style={styles.label}>Type</Text>
                            <Text style={styles.item}></Text>
                            <Text style={styles.label}>Diabetic</Text>
                            <Text style={styles.item}></Text>
                            <Text style={styles.label}>Height</Text>
                            <Text style={styles.item}>{user.Item.height}</Text>
                            <Text style={styles.label}>Weight</Text>
                            <Text style={styles.item}>{user.Item.weight}</Text>
                            <Text style={styles.label}>BMI</Text>
                            <Text style={styles.item}>{user.Item.bmi}</Text>
                            <Text style={styles.label}>City</Text>
                            <Text style={styles.item}>{user.Item.city}</Text>
                            <Text style={styles.label}>State</Text>
                            <Text style={styles.item}>{user.Item.state}</Text>
                            <Text style={styles.label}>Zip code</Text>
                            <Text style={styles.item}>{user.Item.pincode}</Text>
                        </View>
                        <View style={styles.expandedcontentfooter}>
                            <Pressable style={({pressed})=>[styles.button,{backgroundColor:pressed?'#FFDA2a':'#FFBA2A',width:pressed?'72%':'70%'}]}
                            onPress={()=>navigation.navigate("detailsScreen",{user})}>
                                    <Text style={{fontSize:15,color:'#000000'}}>Edit Profile</Text>
                            </Pressable>

                            <Pressable style={({pressed})=>[styles.button,{backgroundColor:pressed?'#FFDA2a':'#FFBA2A',width:pressed?'72%':'70%'}]}
                            onPress={()=>setflag("")}>
                                    <Text style={{fontSize:15,color:'#000000',textAlign:'center'}}>Minimize Profile</Text>
                            </Pressable>

                            <Pressable style={({pressed})=>[styles.button,{backgroundColor:pressed?'#FFDA2a':'#FFBA2A',width:pressed?'72%':'70%'}]}
                            onPress={SignOut}>
                                    <Text style={{fontSize:15,color:'#000000'}}>SignOut</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </>
                }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    outline: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor:' #f5f5f5',
        position:'absolute',
        width:windowWidth,
        height:windowHeight,
        
    },
    button:{
        borderRadius:10,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:13,
        flex:1,
        marginLeft:5,
        marginRight:5,
        borderWidth:1,
        borderColor:"#000000",

    },
    profileimage:{
        position:"absolute",
        top:'22%',
        borderWidth:2,
        borderColor:'#AB46D2',
        width:200,
        height:200,
        borderRadius:30,
        backgroundColor:'#f0f0f0',
        zIndex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    content:{
        height:'50%',
        width:'90%',
        borderWidth:2,
        borderColor:'#AB46D2',
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFF0',
        marginBottom:20
    },
    userdetails:{
        width:'100%',
        height:"80%",
        // borderWidth:2,
        // borderColor:'red',
        paddingLeft:10,
        paddingRight:10,
    },
    label:{
        height:25,
        width:'100%',
        color:"grey",
        marginTop:10,
        // borderWidth:2,
        // borderColor:'black'
        // marginBottom:10
    },
    item:{
        height:40,
        width:'100%',
        backgroundColor:'#FAF9F6',
        paddingTop:7,
        paddingLeft:10,
        fontSize:15,
        marginTop:5
    },
    contentfooter:{
        // borderWidth:2,
        // borderColor:'red',
        width:'96%',
        flexDirection:'row',
        paddingBottom:10
    },
    expandedcontentfooter:{
        // borderWidth:2,
        height:100,
        // borderColor:'red',
        width:'96%',
        flexDirection:'row',
        paddingBottom:10
    },
    expandedcontent:{
        borderWidth:2,
        borderColor:'#AB46D2',
        width:"95%",
        marginTop:10,
        backgroundColor:'#FFFFF0',
        borderRadius:30,
        paddingLeft:10,
        paddingTop:10   ,
        paddingBottom:20,
        paddingRight:10    
    },
    expandedprofileimage:{
        // position:"absolute",
        // top:'22%',
        borderWidth:2,
        borderColor:'#AB46D2',
        width:200,
        height:200,
        borderRadius:30,
        backgroundColor:'#f0f0f0',
        zIndex:2,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },

});

export default Profile
