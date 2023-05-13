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
            tablename:'HealthpadMedLIst'
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
                <Text style={{fontSize:30,fontWeight:'600',paddingTop:40}}>Medicine Shop</Text>
            </View>
            <View style={styles.food}>
                <FlatList style={{flex:1 }} 
                    data={list}
                    numColumns={2}
                    renderItem={({item, index}) => {
                        console.log(typeof(imagepath))
                        return (
                        <Pressable style={styles.box} >
                            <Text style={{fontWeight:'bold',fontSize:15,height:50}}>{item.Name}</Text>
                            <Image source={require("./assets/medicine.jpg")} style={styles.image}/>
                            <Text style={{color:'#787777',paddingTop:10}}>Quantity - {item.Amount}</Text>
                            <Text style={{height:40,paddingTop:17,fontSize:15,fontWeight:600}}>₹{item.Price}</Text>
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
            source={require('../animatedscreen/shoploading.json')}
            autoPlay
            loop
            style={{width:400,height:400}}
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
        width:windowWidth/2.2,
        // height:200,
        backgroundColor:'#ffffff',
        padding:10,
        margin:8,
        justifyContent:'center',
        alignItems:'center'
    },
    food:{
        flex:10,
        width:'100%',
        height:700,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F1F1F1',
        marginTop:60,
        // borderWidth:1

    },
    image:{
        width:'100%',
        height:150,
        borderWidth:1,
        borderColor:'#000000'
    },
    heading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }

})

export default Shop;