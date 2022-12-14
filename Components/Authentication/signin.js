import Amplify,{ Auth,Hub } from "aws-amplify";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import config from "../../src/aws-exports";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



// const urlOpenerExpo = async (url, redirectUrl) => {
//     console.log(">>>>>>>>> in urlOpener")
//       const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
    
//        console.log(type)
//        console.log(newUrl)
//        if (type === 'success') {
//           WebBrowser.dismissBrowser();
//           if (Platform.OS === 'ios') {
//             return Linking.openURL(newUrl);
//           }
//        }
//      return Linking.openURL(newUrl);
    
//      };
     
//      const updatedConfig = {
//       ...config,
//         "oauth":{
//           ...config.oauth,
//           urlOpener:urlOpenerExpo
    
//         }
//     }
//     Amplify.configure(updatedConfig);
//     Auth.configure(updatedConfig);
//     class UserStatus extends React.Component {
    
//       state = { user: null, customState: null };
//       componentDidMount() {
//         Hub.listen("auth", ({ payload: { event, data } }) => {
//           try {
//             switch (event) {
//               case "signIn":
//                 this.setState({ user: data });
//                 break;
//               case "signOut":
//                 this.setState({ user: null });
//                 break;
//               case "customOAuthState":
//                 this.setState({ customState: data });
//             }
//           }
//           catch(e) {console.log(e)}
          
//         });
    
//         Auth.currentAuthenticatedUser()
//           .then(user => this.setState({ user }))
//           .catch(() => console.log("Not signed in"));
//       }
    
//       render() {
        
//         const { user } = this.state;
//         if (user === null) {
//           return(<View>
//             <Text>Signed Out</Text>
//           </View>)
//         }
//         return (
//           <View>
//                <Text>{user.signInUserSession.idToken.payload.email}</Text>
//           <Text>{user.signInUserSession.accessToken.payload.username}</Text>
//           </View>
       
//         )
//       }
//     }




const Signin = ({ navigation }) => {

    const [hide,visible]=useState(true)
    const [color,setcolor]=useState('8A8AFF')
    const [eye,seteye]=useState(require('../assets/eyeclosed.png'))
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading,setloading]=useState(false);

    const getemail = (value) => {
        setemail(value);
        console.log(setemail);
    }

    const getpassword = (value) => {
        setpassword(value);
        console.log(setpassword);
    }

    const changeeye=()=>{
        visible(!hide)
        if(eye==require('../assets/eye.png'))
            seteye(require('../assets/eyeclosed.png'))
        else
            seteye(require('../assets/eye.png'))
    }

    const Signinpress=async data=>{
        if(loading)
            return;
        setloading(true);
        try{
            const response=await Auth.signIn(email,password);
            console.log(response);
            navigation.navigate("homescreen");
        }
        catch(e){
            Alert.alert('Invalid Input',e.message);
        }
        setloading(false);
    }
    
    return (
        <View style={styles.outline}>
            <View style={styles.row1}>
                <Text style={styles.heading}>Login</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.mail}> 
                    <Image style={styles.inputlogo} source={require('../assets/emaillogo-png.png')}/>
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="Email" onChangeText={getemail}/>
                </View>
                <View style={styles.password}>
                    <Image style={styles.inputlogo} source={require('../assets/key.png')}/>
                    <TextInput style={[styles.input,{paddingLeft:10}]} placeholder="password" onChangeText={getpassword} secureTextEntry={hide}/>
                    <Pressable style={{flex:.08,height:'100%',justifyContent:'center'}} onPress={changeeye}>
                        <Image style={{width:'100%',height:'30%'}} source={eye}/>
                    </Pressable>
                </View>
                <Pressable style={{width:'80%', alignItems:'flex-end',marginBottom:10}} onPress={()=>navigation.navigate("forgotpassword")}>
                        <Text>Forgot password?</Text>
                </Pressable>
                <Pressable style={({pressed})=>[styles.login,{backgroundColor:pressed?'#6A8AFF':'#8A8AFF',width:pressed?'72%':'70%'}]}
                onPress={Signinpress}>
                        <Text style={{fontSize:20,color:'white'}}>{loading?"Loggin in...":"Login"}</Text>
                </Pressable>
            </View>
            <Text style={{marginBottom:5}}>or Login via</Text>
            <View style={styles.logosection}>
                <Pressable style={styles.logo} onPress={()=>Auth.federatedSignIn({provider:"Google"})}>
                    <Image style={{height:40,width:40,marginRight:15}} source={require('../assets/google.png')}/>
                    <Text style={{color:'#de5246',fontWeight:'bold'}}>GOOGLE</Text>
                </Pressable>
                <Pressable style={[styles.logo,{padding:7}]} onPress={()=>Auth.federatedSignIn({provider:"Facebook"})}>
                    <Image style={{height:35,width:35}} source={require('../assets/facebook.png')}/>
                    <Text style={{color:'royalblue',fontWeight:'bold'}}>FACEBOOK</Text>
                </Pressable>
            </View>
            <Pressable style={styles.signup} onPress={() => navigation.navigate("signup")}>
                <Text style={{color:'red'}}>New User? Signup here</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    outline: {
        flex: 1,
        position:'absolute',
        width:windowWidth,
        height:windowHeight,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:' #f5f5f5'
    },
    heading: {
        fontSize: 30,
        // borderWidth:2,
        // borderColor:'red'
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
        // backgroundColor:'#8A8AFF',
        height:'13%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:13
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
        marginBottom:20
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
