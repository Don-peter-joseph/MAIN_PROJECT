import { Auth,API } from "aws-amplify";
import { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert,ScrollView,FlatList } from "react-native";
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = ({navigation,route}) => {

    const [list,setlist]=useState([]);
    // const [image,setimage]=useState();

    useEffect(() => {
        getDetails();
      }, []);

    const getDetails=async()=>{
        const data = {
            operation: 'retrieve-all',
            payload: 'nothing',
            tablename:'healthpadfoodlist'
          };
            const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                body: {
                        data 
                } 
            });  
            console.log("items retrieved successfully ",response)
            setlist(response);
    }

    const getImage=async(imgname)=>{
        try {
            console.log(imgname)
            const response = await API.post('healthpadrestapi', '/imageretriever-staging', {
                body: {
                    imgname,
                }
                });
            // setimage(`data:image/jpeg;base64,${response}`);
            // return response;
        } catch (error) {
            console.log('Lambda error:', error);
        }        
    }

    return(

        <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
            <View style={styles.heading}>
                <Text style={{fontSize:30,fontWeight:'600'}}>Diet Plan</Text>
            </View>
            <View style={styles.food}>
                <FlatList style={{flex:1 }} 
                    data={list}
                    numColumns={2}
                    renderItem={({item, index}) => {
                        // const image=getImage(item.imgpath);
                        // console.log(item.imgpath.slice(7,))
                        // const anotherimage='./assets/images/' +item.imgpath.slice(7,)
                        // console.log(anotherimage)
                        return (
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("recipescreen",{ item: JSON.stringify(item) })}>
                            <Text style={{fontWeight:'bold',fontSize:15}}>{item.Name}</Text>
                            {/* <Image source={require(anotherimage)}/> */}
                            <Text style={{color:'#787777',paddingTop:0}}>{item.Calorie} kcal</Text>
                        </Pressable>
                        );
                    }}
                    scrollEnabled={true}
                />
            </View>
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
        height:200,
        backgroundColor:'#ffffff',
        padding:10,
        margin:8
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
        flex:3,
        borderWidth:1,
        borderColor:'green'
    },
    heading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }

})

export default Item;
