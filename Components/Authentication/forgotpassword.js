import { Auth } from "aws-amplify";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Forgotpassword = ({route, navigation }) => {

    const [hide,visible]=useState(true)
    const [code, setcode] = useState("");
    const [loading,setloading]=useState(false);
    const [loading2,setloading2]=useState(false); 
    const [email,setemail]=useState("");

    const getemail = (value) => {
        setemail(value);
        console.log(setemail);
    }

    const Sendpress=async data=>{
        try{
            const response=await Auth.forgotPassword(email);
            navigation.navigate("resetpassword");
        }
        catch(e){
            Alert.alert(e.message);
        }
    }
    

    return (
        <View style={styles.outline}>
            <View style={styles.row1}>
                <Text style={styles.heading}>Reset Your Password</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.common}> 
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Email" onChangeText={getemail} value={email}/>
                </View>

                <Pressable style={({pressed})=>[styles.login,{backgroundColor:pressed?'#6A8AFF':'#8A8AFF',width:pressed?'72%':'70%'}]}
                onPress={Sendpress}>
                        <Text style={{fontSize:20,color:'white'}}>Send</Text>
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
        height:'8%',
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
        marginBottom:30,
        marginTop:15,
        borderRadius:7,
        alignSelf:'flex-start',
    },
    backtosignin:{
        // borderColor:'red',
        // borderWidth:1,
        marginTop:20,
    }
});

export default Forgotpassword
