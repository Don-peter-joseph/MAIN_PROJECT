import { Auth,API } from "aws-amplify";
import { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert,ScrollView,FlatList } from "react-native";
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = ({navigation,route}) => {

    const [list,setlist]=useState([]);
    const {user}=route.params;
    let {flag}=route.params;
    // const [image,setimage]=useState();
    const images = {
        'rice': require('./assets/images/rice.jpg'),
        'eggroast': require('./assets/images/eggroast.jpg'),
        'Appam': require('./assets/images/Appam.jpg'),
        'cabbagethoran': require('./assets/images/cabbagethoran.jpg'),
        'dosa': require('./assets/images/dosa.png'),
        'bittergourd': require('./assets/images/bittergourd.jpg'),
        'chickenstew': require('./assets/images/chickenstew.jpg'),
        'idli': require('./assets/images/idli.jpg'),
      };

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
        } catch (error) {
            console.log('Lambda error:', error);
        }        
    }

    return(

        <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
        {list.length?
        <>
            <View style={styles.heading}>
                <Text style={{fontSize:30,fontWeight:'600',paddingTop:40}}>Diet Plan</Text>
            </View>
            <View style={styles.food}>
                <FlatList style={{flex:1 }} 
                    data={list}
                    numColumns={2}
                    renderItem={({item, index}) => {
                        // const image=getImage(item.imgpath);
                        const imgpath=item.imgpath.slice(7,-4);
                        const imagepath=images[imgpath];
                        console.log(typeof(imagepath))
                        return (
                        <Pressable style={styles.box} onPress={()=>navigation.navigate("recipescreen",{flag:!flag,user, item: JSON.stringify(item) })}>
                            <Text style={{fontWeight:'bold',fontSize:15,height:50}}>{item.Name}</Text>
                            {/* <Lottie
                            source={require('./assets/imageloading.json')}
                            autoPlay
                            loop
                            style={{width:"80%",height:150}}
                            /> */}
                            <Image source={imagepath} style={styles.image}/>
                            <Text style={{color:'#787777',height:40,paddingTop:17}}>{item.Calorie} kcal</Text>
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
            source={require('./assets/recipeloading.json')}
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
        justifyContent:'space-evenly',
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

export default Item;
