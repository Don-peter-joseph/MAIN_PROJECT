
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert, ScrollView } from "react-native";
import {Dimensions} from 'react-native';
import { ScrollViewComponent } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TermsCondition=({navigation,route})=>{

    return(
        <ScrollView style={styles.container}>
            <View style={{ marginTop: 20, height:990 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18}}>
            Terms and Conditions
        </Text>
        <Text style={{ marginTop: 7 }}>
        1. Acceptance of Terms: By downloading and using this mobile health application HealthPad, 
        you agree to be bound by these terms and conditions.
        </Text>
        <Text style={{ marginTop: 7 }}>
        2. Use of the Application: The Application is provided for informational and health related purposes only. 
        You may use the Application for personal, non-commercial purposes only, and you may not modify, 
        distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, 
        transfer, or sell any information, software, products, or services obtained from the Application.
        </Text>
        <Text style={{ marginTop: 7 }}>
        3. Privacy Policy: The Application collects and uses personal information in accordance with our Privacy Policy. 
        By using the Application, you consent to our collection and use of your personal information as
         described in the Privacy Policy.
        </Text>
        <Text style={{ marginTop: 7 }}>
        4. User Data: You own your personal information and health data that you provide through the 
        Application. We will only use your personal information and health data in accordance with our 
        Privacy Policy.
        </Text>
        <Text style={{ marginTop: 7 }}>
        5. User Responsibility: You are responsible for maintaining the confidentiality of your login credentials, 
        and you agree to immediately notify us of any unauthorized use of your account or any other breach of 
        security.
        </Text>
        <Text style={{ marginTop: 7 }}>
        6. Medical Disclaimer: The Application is not intended to be a substitute for professional medical advice,
        diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions 
        you may have regarding a medical condition.
        </Text>
        <Text style={{ marginTop: 7 }}>
        7. Intellectual Property: The Application and its contents are protected by copyright, trademark, and 
        other intellectual property laws. You may not modify, copy, distribute, transmit, display, perform, 
        reproduce, publish, license, create derivative works from, transfer, or sell any information, 
        software, products, or services obtained from the Application.
        </Text>
        <Text style={{ marginTop: 7 }}>
        8. Termination: We reserve the right to terminate your access to the Application 
        at any time and for any reason, without notice.
        </Text>
        <Text style={{ marginTop: 7 }}>
        9. Applicable Law: These Terms and any dispute arising out of or in connection with them are 
        governed by and construed in accordance with the laws of India, and you submit to 
        the exclusive jurisdiction of the courts of Kerala.
        </Text>
        <Text style={{ marginTop: 7 }}>
        10. Changes to Terms: We reserve the right to change these Terms at any time and without notice. 
        Your continued use of the Application after any such changes constitutes your acceptance of the new 
        Terms.
        </Text>
        </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
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
    },
    container:{
         paddingHorizontal: 20, 
         paddingTop: 16
    }
})

export default TermsCondition;