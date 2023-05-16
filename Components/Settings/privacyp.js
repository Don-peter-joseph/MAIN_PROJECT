import { Auth,Hub } from "aws-amplify";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert, ScrollView } from "react-native";
import {Dimensions} from 'react-native';
import { ScrollViewComponent } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PrivacyPolicy=({navigation,route})=>{

    return(
      <View style={{borderWidth:2,height:'100%'}}>
            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 16,height:'100%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18}}>
            Privacy Policy
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop:8 }}>Introduction:</Text>
          <Text style={{ marginTop: 7 }}>
          At HealthPad, we are committed to protecting the privacy and security of our users' 
          personal information. This Privacy Policy describes how we collect, use, and protect personal 
          information obtained through the HealthPad mobile application.
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop:8 }}>Information Collection and Use:</Text>
          <Text style={{ marginTop: 7 }}>
            We collect personal information, such as name, age, gender, email address, and health-related data,
            to provide personalized health and wellness recommendations and track progress. 
            HealthPad does not share any personal information with third parties unless required by law or 
            with user consent.
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop:8 }}>Data Security:</Text>
          <Text style={{ marginTop: 7 }}>
            HealthPad employs industry-standard security measures to protect user data from unauthorized 
            access, alteration, or destruction. This includes data encryption, access control, and 
            regular security audits. In the unlikely event of a data breach, 
            we will inform affected users as soon as possible.
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop:8 }}>Data Retention:</Text>
          <Text style={{ marginTop: 7 }}>
            We will retain user data only as long as necessary for the purposes outlined in this Privacy Policy 
            or as required by law.
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop:8 }}>User Rights:</Text>
          <Text style={{ marginTop: 7 }}>
            Users have the right to request access to, correction of, or deletion of their personal information.
            Users may also request a copy of their data or ask to restrict its processing. 
            HealthPad will respond to these requests promptly and in accordance with applicable laws.
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop:8 }}>Changes to This Policy:</Text>
          <Text style={{ marginTop: 7 }}>
            HealthPad may update this Privacy Policy from time to time. Users will be notified of
            any changes and are encouraged to review this Policy periodically.
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop:8 }}>Contact Information:</Text>
          <Text style={{ marginTop: 7 }}>
          If you have any questions or concerns regarding this Privacy Policy, please contact us 
          at privacy@healthpad.com.
          </Text>
          <Text style={{ marginTop: 7 }}>
                                   
          </Text>
        </ScrollView>
          </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        position:'absolute',
        width:windowWidth,
        height:windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:' #f5f5f5'
    },
    content:{
        justifyContent:'center',
        alignItems:"center"
    }   ,
    signout:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:25,
        backgroundColor:'#8A8AFF',
        height:'13%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:13,
        width:'50%'
    }
})

export default PrivacyPolicy;