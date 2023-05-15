import { Auth,Hub } from "aws-amplify";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert, ScrollView } from "react-native";
import {Dimensions} from 'react-native';
import { ScrollViewComponent } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const About=({navigation,route})=>{

    return(
        <View style={styles.outline}>
            <Text style={{fontSize:30,fontWeight:500,marginTop:100,marginBottom:20}}>Developed by:</Text>
            <Text style={{alignSelf:'center',fontSize:18}}>Don Peter Joseph</Text>
            <Text style={{alignSelf:'center',fontSize:18}}>Sreehari P</Text>
            <Text style={{alignSelf:'center',fontSize:18}}>Amith Bino</Text>
        <Image source={require('../Home/assets/icon.png')} style={{width:300,height:300,alignSelf:"center",marginTop:70}}/>
            <Text style={{position:'absolute',bottom:100}}>
        If you have any questions, feedback, or suggestions, please feel free to reach out to us at  
        <Text style={{fontWeight:600,fontSize:15}}> appsupport@healtpad.org </Text>. We would love to hear from you!
      </Text>
        </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        // position:'absolute',
        width:"95%",
        height:windowHeight,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:' #f5f5f5',
        alignSelf:'center'
    },
    content:{
        justifyContent:'center',
        alignItems:"center"
    }   ,

})

export default About;