import { Auth,Hub,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert} from "react-native";
// import CheckBox from "@react-native-community/checkbox";
import {Dimensions} from 'react-native';
import { CheckBox } from 'react-native-elements';
// import { CheckBox, Icon } from '@rneui/themed';
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 


const diseases = [
  { id: 1, name: 'Diabetes' },
  { id: 2, name: 'High blood pressure' },
  { id: 3, name: 'Obesity' }, 
  // add more diseases as needed
];

const Detailsthird = ({navigation,route}) => {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [diabetesCount, setDiabetesCount] = useState(0);
  const [fbs,setfbs]=useState();
  const [rbs,setrbs]=useState();
  const [hba1c,sethba1c]=useState();
  const [loading,setloading]=useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleDiseaseSelect = (id) => {
    setSelectedDiseases((prevSelectedDiseases) => {
      if (id === 1) {
        return [id];
      } else {
        return [];
      }
    });
  };

  const {state,city,phoneno,pincode,address,weight,height,bmi,date,gender,bloodgroup,imagename,age}=route.params;

  const terms = () =>
  {
    navigation.navigate("termsscreen")
  }

  const privacy = () =>
  {
    navigation.navigate("privacyscreen")
  }

  const handleSubmit = async() => {
    let Id='';
    let Name='';
    let Email='';
    if(loading)
    return;
    setloading(true);
        console.log('saving....')
        try{
          const currentUser = await Auth.currentAuthenticatedUser();
          Id = currentUser.attributes.sub;
          Name=currentUser.attributes.name;
          Email=currentUser.attributes.email;
        }
        catch(e){
          console.log(e);
        }
        // user creation
        const newUser ={
          id:Id,
          name: Name,
          email:Email,
          phoneno,
          address,
          pincode,
          city,
          state,
          height,
          weight,
          bmi,
          birthdate:date,
          gender,
          bloodgroup,
          disease:selectedDiseases,
          rbs,
          fbs,
          hba1c,
          imagename,
          age
      };
      
      const data = {
        operation: 'create',
        payload: newUser,
        tablename:'heathpaduserdetails-staging'
      };


      try{
        const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                      body: {
                            data
                      } 
        });
        console.log("user saved successfully")
        console.log(response)
      }
      catch(e){
        console.log('Error saving user', e);
      }
    navigation.navigate("homescreen")
  };
  
  return (      
    <View style={styles.container}>
      <Text style={styles.text1}>Select the diseases: </Text>
      <View style={styles.checkboxmain}>
      {diseases.map((disease) => (
        <View key={disease.id} style={styles.checkboxContainer}>
          <CheckBox
            checked={selectedDiseases.includes(disease.id)}
            onPress={() => handleDiseaseSelect(disease.id)}
            style={styles.checkbox}
          />
          <Text style={[styles.label,disease.id === 1 && {color: 'black' }]}>{disease.name}</Text>
        </View>
        
      ))}
      </View>
      
      {selectedDiseases.includes(1) && (
        <View>
          <Text style={styles.Adress1}>Enter the FBS value:</Text>
          <TextInput
          onChangeText={(text) => {
            setfbs(text);
          }}
          value={fbs}
          style={styles.textb}
          placeholder="Enter a value"
          />
          <Text style={styles.Adress2}>Enter the RBS value:</Text>
          <TextInput
          onChangeText={(text) => {
            setrbs(text);
          }}
          value={rbs}
          style={styles.textb}
          placeholder="Enter a value"
          />
          <Text style={styles.Adress2}>Enter the HbA1c value:</Text>
          <TextInput
          onChangeText={(text) => {
            sethba1c(text);
          }}
          value={hba1c}
          style={styles.textb}
          placeholder="Enter a value"
          />
        </View>
      )}

      <View style={styles.checkboxContainer2}>
        <CheckBox checked={isChecked} onPress={() => setIsChecked(!isChecked)} style={styles.checkbox1} />
        <Text style={styles.labelc}>
          I have agree to the{' '} 
          <Text style={styles.link} onPress={terms}>terms & conditions </Text> and{'\n'}
          <Text style={styles.link} onPress={privacy}>privacy policy</Text>.
        </Text>
      </View>

      <View style={styles.mainb}>
          <Pressable style={styles.button} onPress={handleSubmit}>
          {loading ? (
                <Lottie
                source={require('../animatedscreen/loadingmain.json')}
                autoPlay
                loop
                style={{width: 100, height: 100}}
                />
            ) : (
                <Text style={{fontSize:20,color:'white'}}>Submit</Text>
            )}
          </Pressable>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  checkboxmain:{
    paddingTop: 10,
    flexDirection: 'row',
    // borderWidth: 5,  
    // borderColor:'blue',
    flexWrap:'wrap'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    // marginTop: 50,
  },
  checkbox: {
    alignSelf: 'center'
  },
  label: {

    margin: 8,
    fontSize: 16,
    color: 'gray'
  },
  text1:{
    marginTop: 80,
    fontSize:18,
    paddingLeft:20
  },
  textb:{
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: '#8e8e8e',
    borderRadius: 7,
    marginTop: 8,
    paddingLeft: 20
  },
  Adress1:{
    marginTop:40,
    marginLeft:22,
    fontSize: 16,
  },
  Adress2:{
  marginTop:20,
  marginLeft:22,
  fontSize: 16,
  },
  checkbox1: {
    alignSelf: 'center',
  },
  button:{
    borderWidth:0,
    // borderColor:'#ADA2FF',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#AB46D2',
    width:350,
    height:50,
    borderRadius:25,
    marginTop:75
  },
  buttontext:{
    fontWeight:'bold',
    fontSize:22,
    color:'white'
  },
  mainb:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf: 'center', 
    position: 'absolute',
    width: '100%',
    bottom: 40
  },
  checkboxContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    // position: 'absolute',
    // bottom: 100
  },
  labelc: {
    fontSize: 16
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Detailsthird;