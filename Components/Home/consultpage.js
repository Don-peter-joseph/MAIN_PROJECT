import { Auth,Hub,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert,FlatList } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Shop=({navigation,route})=>{

    const [list,setlist]=useState([]);
    // const [image,setimage]=useState();

    useEffect(() => {
        getDetails();
      }, []);

    const getDetails=async()=>{
        const data = {
            operation: 'retrieve-all',
            payload: 'nothing',
            tablename:'HealthpadDoctorLIst'
          };
            const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                body: {
                        data 
                } 
            });  
            console.log("items retrieved successfully ",response)
            setlist(response);
    }


    return(

        <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
        {list.length?
        <>
            <View style={styles.heading}>
                <Text style={{fontSize:30,fontWeight:'600',paddingTop:40}}>Doctors</Text>
            </View>
            <View style={styles.food}>
                <FlatList style={{flex:1}} contentContainerStyle={{justifyContent:"center",alignItems:'center'}} 
                    data={list}
                    // numColumns={1}
                    renderItem={({item, index}) => {
                        console.log(typeof(imagepath))
                        return (
                        <Pressable style={styles.box} >
                            {item.Gender=='male'?
                            <>
                                <Image source={require("./assets/maledoctor.png")} style={styles.image}/>
                            </>
                            :
                            <>
                                <Image source={require("./assets/femaledoctor.png")} style={styles.image}/>
                            </>
                            }
                            <View style={{flex:2,height:150}}>
                                <Text style={{fontWeight:'bold',fontSize:20,padding:10}}>{item.Name}</Text>
                                <Text style={{fontWeight:'bold',fontSize:15,paddingLeft:10}}>Specialty:{item.Specialty}</Text>
                                <Text style={{fontWeight:'bold',fontSize:15,paddingLeft:10}}>Contact : {item.Contact}</Text>
                                <Text style={{fontWeight:'bold',fontSize:15,paddingLeft:10}}>Education : {item.Education}</Text>
                            </View>
                        </Pressable>
                        );
                    }}
                    scrollEnabled={true}
                />
            </View>
        </>
        :
        <>
            <Lottie
            source={require('../animatedscreen/doctorloading.json')}
            autoPlay
            loop
            style={{width:800,height:400}}
            />
        </>
        }
        </View>
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
        width:windowWidth-30,
        // height:200,
        backgroundColor:'#ffffff',
        padding:10,
        margin:8,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    food:{
        flex:10,
        width:'100%',
        height:700,
        flexDirection:'row',
        // justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#F1F1F1',
        marginTop:60,
        // borderWidth:1

    },
    image:{
        // width:'50%',
        height:120,
        flex:1,
        // borderWidth:1,
        borderColor:'#000000',
        marginRight:10
    },
    heading:{
        flex:2,
        alignItems:'center',
        justifyContent:'center'
    }

})

export default Shop;