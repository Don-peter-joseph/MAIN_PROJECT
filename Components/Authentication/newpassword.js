import { Auth } from "aws-amplify";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Resetpassword = ({route, navigation }) => {

    const [hide,visible]=useState(true)
    const [code, setcode] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState(""); 

    const getemail = (value) => {
        setemail(value);
        console.log(setemail);
    }
    const getpassword = (value) => {
        setpassword(value);
        console.log(setpassword);
    }    
    
    const getcode = (value) => {
        setcode(value);
        console.log(setcode);
    }

    const Submitpress=async data=>{
        try{
            const response=await Auth.forgotPasswordSubmit(email,code,password);
            navigation.navigate("signin");
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
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Email" onChangeText={getemail}/>
                </View>
                <View style={styles.common}> 
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Code" onChangeText={getcode} />
                </View>
                <View style={styles.common}> 
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Enter you new password" onChangeText={getpassword} />
                </View>

                <Pressable style={({pressed})=>[styles.login,{backgroundColor:pressed?'#6A8AFF':'#8A8AFF',width:pressed?'72%':'70%'}]}
                onPress={Submitpress}>
                        <Text style={{fontSize:20,color:'white'}}>Submit</Text>
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
        marginBottom:40,
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
        marginTop:30
    },
    common:{
        flexDirection:'row',
        width:'80%',
        height:'7%',
        borderBottomWidth:1,
        borderColor:'black',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:5,
    },

    input:{
        flex:1,
        // borderBottomWidth:1,
        // borderColor:'red',
        width:'100%',
        height:'100%',
        marginBottom:15,
        borderRadius:7,
        alignSelf:'flex-start'
    },
    backtosignin:{
        // borderColor:'red',
        // borderWidth:1,
        marginTop:20,
    }
});

export default Resetpassword
