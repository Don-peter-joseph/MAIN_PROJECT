import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable,Image,ImageBackground,Alert } from "react-native";
import {Auth} from "aws-amplify";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Signin = ({ navigation }) => {

    const [hide,visible]=useState(true)
    const [duphide,dupvisible]=useState(true)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [passwordrepeat, setpasswordrepeat] = useState("");
    const [loading,setloading] = useState(false);

    const getname = (value) => {
        setname(value);
    }
    const getemail = (value) => {
        setemail(value);
    }
    const getpassword = (value) => {
        setpassword(value);
        console.log(value);
    }
    const getconfirmation = (value) => {
        setpasswordrepeat(value);
    }

    const Signuppress=async data=>{
        const username=email;
        if(loading)
            return;
        setloading(true);
        try{
            const response=await Auth.signUp({
                username,
                password,
                attributes:{name,email}
            });
            console.log(response);
            navigation.navigate("confirmemail",{username:username});
        }
        catch(e){
            Alert.alert("Invalid input",e.message);
        }
        setloading(false);
    }

    return (
        <View style={styles.outline}>
            <View style={styles.row1}>
                <Text style={styles.heading}>SignUp</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.mail}> 
                    <Image style={{flex:.07,height:'80%'}} source={require('./assets/profileicon.png')}/>
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Name" onChangeText={getname}/>
                </View>
                <View style={styles.mail}> 
                    <Image style={styles.inputlogo} source={require('./assets/emaillogo-png.png')}/>
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Email" onChangeText={getemail}/>
                </View>
                <View style={styles.password}>
                    <Image style={styles.inputlogo} source={require('./assets/key.png')}/>
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Password" onChangeText={getpassword} secureTextEntry={hide}/>
                    {/* <Pressable style={{flex:.08,height:'100%',justifyContent:'center'}} onChangeText={()=>visible(!hide)}>
                        <Image style={{width:'100%',height:'30%'}} source={require('./assets/eye.png')}/>
                    </Pressable> */}
                </View>
                <View style={styles.password}>
                    <Image style={styles.inputlogo} source={require('./assets/key.png')}/>
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Confirm Password" onChangeText={getconfirmation} secureTextEntry={duphide}/>
                    {/* <Pressable style={{flex:.08,height:'100%',justifyContent:'center'}} onChangeText={()=>dupvisible(!duphide)}>
                        <Image style={{width:'100%',height:'30%'}} source={require('./assets/eye.png')}/>
                    </Pressable> */}
                </View>
                <Pressable style={{width:'80%', alignItems:'flex-end',marginBottom:10}}>
                        <Text></Text>
                </Pressable>
                <Pressable style={({pressed})=>[styles.login,{backgroundColor:pressed?'#6A8AFF':'#8A8AFF',width:pressed?'72%':'70%'}]}
                onPress={Signuppress}>
                        <Text style={{fontSize:20,color:'white'}}>{loading?"Loading...":"Register"}</Text>
                </Pressable>
            </View>
            <Text style={{marginBottom:5}}>or Signup via</Text>
            <View style={styles.logosection}>
                <View style={styles.logo}>
                    <Image style={{height:40,width:40,marginRight:15}} source={require('./assets/google.png')}/>
                    <Text style={{color:'#de5246',fontWeight:'bold'}}>GOOGLE</Text>
                </View>
                <View style={[styles.logo,{padding:7}]}>
                    <Image style={{height:35,width:35}} source={require('./assets/facebook.png')}/>
                    <Text style={{color:'royalblue',fontWeight:'bold'}}>FACEBOOK</Text>
                </View>
            </View>
            <Pressable style={styles.signup} onPress={() => navigation.navigate("signin")}>
                <Text style={{color:'red'}}>Already have an account? Login here</Text>
            </Pressable>
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
        // borderWidth:2,
        // borderColor:'black'
    },
    content:{
        flex:2,
        width:'100%',
        // borderWidth:2,
        // borderColor:'red',
        justifyContent:'center',
        alignItems:'center'

    },
    signup:{
        flex:1,
        width:'100%',
        // borderWidth:2,
        // borderColor:'red',
        justifyContent:'flex-end',
        alignItems:'center',
        paddingBottom:10,
    },
    login:{
        // borderWidth:1,
        // borderColor:'black',
        borderRadius:25,
        backgroundColor:'#8A8AFF',
        width:'70%',
        height:'13%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    mail:{
        flexDirection:'row',
        width:'80%',
        height:'13%',
        borderBottomWidth:1,
        borderColor:'black',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:5,
    },
    password:{
        flexDirection:'row',
        width:'80%',
        height:'13%',
        borderBottomWidth:1,
        borderColor:'black',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:10
    },
    input:{
        flex:1,
        // borderBottomWidth:1,
        // borderColor:'black',
        width:'100%',
        height:'100%',
        marginBottom:15,
        borderRadius:7,
        alignSelf:'flex-start'
    },
    logosection:{
        flex:.3,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        borderWidth:1,
        borderColor:'black',
        width:'35%',
        borderColor:'grey',
        borderRadius:30,
        padding:5,
        marginRight:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    inputlogo:{
        flex:.07,
        width:'5%',
        height:'40%'
    }
    // flogo:{
    //     borderWidth:1,
    //     borderColor:'black',
    //     width:'35%',
    //     borderColor:'grey',
    //     borderRadius:30,
    //     padding:7,
    //     flexDirection:'row',
    //     justifyContent:'center',
    //     alignItems:'center'
    // }
});
export default Signin 
