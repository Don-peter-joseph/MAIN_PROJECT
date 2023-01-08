import { Auth } from "aws-amplify";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Confirmemail = ({route, navigation }) => {

    const [hide,visible]=useState(true)
    const [email, setemail] = useState(route.params.username);
    const [code, setcode] = useState("");
    const [loading,setloading]=useState(false);
    const [loading2,setloading2]=useState(false); 

    const getemail = (value) => {
        setemail(value);
        console.log(setemail);
    }

    const getcode = (value) => {
        setcode(value);
        console.log(setcode);
    }

    const Confirmpress=async data=>{
        if(loading)
            return;
        setloading(true);
        try{
            const response=await Auth.confirmSignUp(email,code);
            navigation.navigate("signin");
        }
        catch(e){
            Alert.alert(e.message);
        }
        setloading(false);
    }
    const Resendpress=async data=>{
        // if(loading2)
        //     return;
        // setloading2(true);
        try{
            const response=await Auth.resendSignUp(email);
        }
        catch(e){
            Alert.alert('Oops',e.message);
        }
        // setloading2(false);
    }
    

    return (
        <View style={styles.outline}>
            <View style={styles.row1}>
                <Text style={styles.heading}>Confirm Email</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.common}> 
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Email" onChangeText={getemail} value={email}/>
                </View>
                <View style={styles.common}>
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Verification Code" onChangeText={getcode}/>
                </View>

                <Pressable style={({pressed})=>[styles.login,{backgroundColor:pressed?'#6A8AFF':'#8A8AFF',width:pressed?'72%':'70%'}]}
                onPress={Confirmpress}>
                        <Text style={{fontSize:20,color:'white'}}>{loading?"Confirming...":"Confirm"}</Text>
                </Pressable>
                <Pressable style={({pressed})=>[styles.login,{backgroundColor:pressed?'#6A8AFF':'#8A8AFF',width:pressed?'72%':'70%'}]}
                onPress={Resendpress}>
                        <Text style={{fontSize:20,color:'white'}}>Resend Code</Text>
                </Pressable>
                <Pressable style={styles.backtosignin}
                onPress={()=>navigation.navigate("signin")}>
                        <Text style={{fontSize:20,color:'grey'}}>Back to Sign in</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outline: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:' #f5f5f5',
        position:'absolute',
        width:windowWidth,
        height:windowHeight,
    },
    heading: {
        fontSize: 30,
    },
    row1:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'red'
    },
    content:{
        flex:5,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'blue',
    },
    login:{
        borderRadius:25,
        height:'10%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:13
    },
    common:{
        flexDirection:'row',
        width:'80%',
        height:'10%',
        borderBottomWidth:1,
        borderColor:'black',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:5,
    },

    input:{
        flex:1,
        width:'100%',
        height:'100%',
        marginBottom:15,
        borderRadius:7,
        alignSelf:'flex-start'
    },
});

export default Confirmemail
