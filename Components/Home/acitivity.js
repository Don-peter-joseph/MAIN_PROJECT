import { Auth,Hub,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert} from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Activity=({navigation,route})=>{

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionPress = (option) => {
      setSelectedOption(option);
    };

    const Predict=async()=>{
        console.log('hi');
        try{

              const response=await API.post('healthpadrestapi', '/healtpadsugarpredictor-staging');
              console.log(response);
          }
          catch(e){
            console.log(e);
          }
    }

    return(
        <View style={styles.outline}>
            <View style={styles.content}>
                <Text style={styles.question}>How much time you devoted to physical work?</Text>
                <Pressable onPress={() => handleOptionPress('Less than 1 hour')} style={[styles.box,{ backgroundColor: selectedOption === 'Less than 1 hour' ? '#a020f0' : '#fff'}]}>
                    <Text style={{ color: selectedOption === 'Less than 1 hour' ? '#fff' : '#000' }}>Less than 1 hour</Text>
                </Pressable>
                <Pressable onPress={() => handleOptionPress('2-4 hours')} style={[styles.box,{ backgroundColor: selectedOption === '2-4 hours' ? '#a020f0' : '#fff'}]}>
                    <Text style={{ color: selectedOption === '2-4 hours' ? '#fff' : '#000' }}>2-4 hours</Text>
                </Pressable>
                <Pressable onPress={() => handleOptionPress('5-7 hours')} style={[styles.box,{ backgroundColor: selectedOption === '5-7 hours' ? '#a020f0' : '#fff'}]}>
                    <Text style={{ color: selectedOption === '5-7 hours' ? '#fff' : '#000' }}>5-7 hours</Text>
                </Pressable>
                <Pressable onPress={() => handleOptionPress('Greater than 7 hours')} style={[styles.box,{ backgroundColor: selectedOption === 'Greater than 7 hours' ? '#a020f0' : '#fff'}]}>
                    <Text style={{ color: selectedOption === 'Greater than 7 hours' ? '#fff' : '#000' }}>Greater than 7 hours</Text>
                </Pressable>
            </View>
            <Pressable style={({pressed})=>[styles.button,{backgroundColor:pressed?'#FFDA2a':'#FFF'}]} onPress={()=>navigation.navigate("homescreen")}>
                <Text style={{fontWeight:500,fontSize:18}}>Confirm</Text>
            </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        // position:'absolute',
        // width:windowWidth,
        // height:windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffffff'
    },
    content:{
        // flex:1,
        width:'90%',
        justifyContent:'center',
        alignItems:"center",
        // borderWidth:1,
        // elevation:1,
        borderRadius:10,
    }   ,
    question: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
      },
      option: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
      },
      selectedOption: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
      },
      button:{
        width:"90%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginTop:50,
        borderRadius:5,
        elevation:10,
        shadowColor:'#ffa500',
        borderColor:"#ffa500",
      },
      box:{
        width:"100%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        margin:4,
        borderRadius:5,
        elevation:7,
        shadowColor:'#a020f0',
        borderColor:"#a020f0"
      }
})

export default Activity;