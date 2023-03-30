// import React, { useRef,useState } from 'react';
// import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView} from 'react-native';
// import {Dimensions} from 'react-native';
// import { NavigationContainer } from "@react-navigation/native";
// import { CheckBox } from 'react-native-elements';


// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;


// const diseases = [
//   { id: 1, name: 'Diabetes' },
//   { id: 2, name: 'High blood pressure' },
//   { id: 3, name: 'Obesity' }, 
//   // add more diseases as needed
// ];

// const Detailsthird = ({navigation,route}) => {
//   const [selectedDiseases, setSelectedDiseases] = useState([]);
//   const [diabetesCount, setDiabetesCount] = useState([]);
//   const [hbpCount, setHbpCount] = useState(0);
//   const [obesityCount, setObesityCount] = useState(0);    

//   const handleDiseaseSelect = (id) => {
//     setSelectedDiseases((prevSelectedDiseases) => {
//       if (id === 1) {
//         return [id];
//       } else {
//         return [];
//       }
//     });
//   };
  
//   const handleSubmit = () => {
//     navigation.navigate("homescreen")
//   };
  
//   return (      
//     <View style={styles.container}>
//       <Text style={styles.text1}>Select the diseases: </Text>
//       <View style={styles.checkboxmain}>
//       {diseases.map((disease) => (
//         <View key={disease.id} style={styles.checkboxContainer}>
//           <CheckBox
//             checked={selectedDiseases.includes(disease.id)}
//             onPress={() => handleDiseaseSelect(disease.id)}
//             style={styles.checkbox}
//           />
//           <Text style={[styles.label,disease.id === 1 && {color: 'black' }]}>{disease.name}</Text>
//         </View>
        
//       ))}
//       </View>
      
//       {selectedDiseases.includes(1) && (
//         <View>
//           <Text style={styles.Adress1}>Enter the FBS value:</Text>
//           <TextInput
//           style={styles.textb}
//           placeholder="Enter a value"
//           />
//           <Text style={styles.Adress2}>Enter the RBS value:</Text>
//           <TextInput
//           style={styles.textb}
//           placeholder="Enter a value"
//           />
//           <Text style={styles.Adress2}>Enter the HbA1c value:</Text>
//           <TextInput
//           style={styles.textb}
//           placeholder="Enter a value"
//           />

//           {[...Array(diabetesCount)].map((_, i) => (
//             <TextInput
//               key={i}
//               onChangeText={(text) => setDiabetesCount(i, text)}
//             />
//           ))}
          
//         </View>
//       )}
      
//       {/* {selectedDiseases.includes(2) && (
//         <View>
//           <Text>High blood pressure</Text>
//           {[...Array(hbpCount)].map((_, i) => (
//             <TextInput
//               key={i}
//               onChangeText={(text) => setHbpCount(i, text)}
//             />
//           ))}
//         </View>
//       )}
      
//       {selectedDiseases.includes(3) && (
//         <View>
//           <Text>Obesity</Text>
//           {[...Array(obesityCount)].map((_, i) => (
//             <TextInput
//               key={i}
//               onChangeText={(text) => setObesityCount(i, text)}
//             />
//           ))}
//         </View>
//       )} */}
      
//       {/* add more disease-specific textboxes as needed */}

//       <View style={{marginTop:680, marginLeft:20, justifyContent:'center',alignItems:'center', position:"fixed"}}>
//           <Pressable style={styles.button} onPress={handleSubmit}>
//               <Text style={styles.buttontext}>Submit</Text>
//           </Pressable>
//         </View>
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // borderWidth: 5,
//     // borderColor:'green',
//     width:'100%',
//     height: '100%'
//   },
  
//   checkboxmain:{
//     paddingTop: 10,
//     flexDirection: 'row',
//     // borderWidth: 5,  
//     // borderColor:'blue',
//     flexWrap:'wrap'
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // marginBottom: 10,
//     // marginTop: 50,
//   },
//   checkbox: {
//     alignSelf: 'center'
//   },
//   label: {

//     margin: 8,
//     fontSize: 16,
//     color: 'gray'
//   },
//   text1:{
//     marginTop: 20,
//     fontSize:18,
//     paddingLeft: 30
//   },
//   textb:{
//     width: '90%',
//     height: 50,
//     alignSelf: 'center',
//     borderWidth: 0.2,
//     borderColor: '#8e8e8e',
//     borderRadius: 7,
//     marginTop: 8,
//     paddingLeft: 20
//   },
//   Adress1:{
//     marginTop:40,
//     marginLeft:22,
//     fontSize: 16,
//   },
//   Adress2:{
//   marginTop:20,
//   marginLeft:22,
//   fontSize: 16,
//   },
//   button:{
//     borderWidth:0,
//     // borderColor:'#ADA2FF',
//     justifyContent:'center',
//     alignItems:'center',
//     backgroundColor:'#AB46D2',
//     width:350,
//     height:50,
//     borderRadius:25,
//     marginTop:75
//   },
//   buttontext:{
//     fontWeight:'bold',
//     fontSize:22,
//     color:'white'
//   }
// });

// export default Detailsthird;

import { Auth,Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import * as Linking from 'expo-linking';
import * as webbrower from 'expo-web-browser';
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Detailsthird=({navigation,route})=>{

    return(
        <View style={styles.outline}>
            <View style={styles.content}>
                <Text >This is customercare screen hi</Text>
                <Lottie style={styles.animation} source={require('../animatedscreen/loading.json')} autoPlay loop speed={0.8} />
            </View>
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
        backgroundColor:'#ffffff'
    },
    content:{
        flex:1,
        width:'100%',
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
    },
    animation:{
        borderWidth:2,
        borderColor:'black',
        height:500,
    }
})

export default Detailsthird;