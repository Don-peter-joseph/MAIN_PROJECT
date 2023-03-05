import { Auth } from "aws-amplify";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({navigation,route}) => {
    
    const SignOut=async()=>{
        try{
            await Auth.signOut();
        }
        catch(e){
            Alert.alert(e.message);
        }
    }
    

    return (
        <View style={styles.outline}>

                <Pressable style={({pressed})=>[styles.login,{backgroundColor:pressed?'#6A8AFF':'#8A8AFF',width:pressed?'72%':'70%'}]}
                onPress={SignOut}>
                        <Text style={{fontSize:20,color:'white'}}>SignOut</Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    outline: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:' #f5f5f5',
        position:'absolute',
        width:windowWidth,
        height:windowHeight,
    },
    login:{
        borderRadius:25,
        height:'8%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:13
    },

});

export default Profile
