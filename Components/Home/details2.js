import React, { useRef,useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView} from 'react-native';
import {Dimensions} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { API,Auth } from 'aws-amplify';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const names = [
    {name: 'A RhD positive (A+)'},
    {name: 'A RhD negative (A-)'},
    {name: 'B RhD positive (B+)'},
    {name: 'B RhD negative (B-)'},
    {name: 'O RhD positive (O+)'},
    {name: 'O RhD negative (O-)'},
    {name: 'AB RhD positive (AB+)'},
    {name: 'AB RhD negative (AB-)'}
  ];

const Detailssecond = ({navigation,route}) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(names);
  const [selectedname, setSelectedname] = useState('');
  const [textboxValue, setTextboxValue] = useState('');
  const [selected, setSelected] = useState(false);
  const [error1, setErrorAddress] = useState('')
  const [error2, setErrorCity] = useState('')
  const [error3, setErrorPin] = useState('')
  const [error4, setErrorPhone] = useState('')

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [age, setAge] = useState(null);

  const [selectedSex, setSelectedSex] = useState(null);


  const {state,city,phoneno,pincode,address}=route.params;

  const handleSexSelection = (sex) => {
    setSelectedSex(sex);
  };

  const handlenameChange = (name) => {
    setSelectedname(name);
    setSelected(true);
  }

  const handleTextboxChange = (text) => {
    setTextboxValue(text);
  }

  const handleTextInputChangeWeight = (text) => {
    setTextInputValueWeight(text);
  };

  const handleTextInputChangeCity = (text) => {
    setTextInputValueCity(text);
  };

  const handleTextInputChangePin = (text) => {
    setTextInputValuePin(text);
  };

  const handleTextInputChangePhone = (text) => {
    setTextInputValuePhone(text);
  };

  const calculateBmi = () => {
    const heightInMeters = height / 10;
    const bmiIndex = weight / (heightInMeters * heightInMeters);
    setBmi(bmiIndex.toFixed(2));
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setAge(moment().diff(moment(date), 'years'));
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSubmit = async() => {
    const currentUser = await Auth.currentAuthenticatedUser();
    const Id = currentUser.attributes.sub;
    const Name=currentUser.attributes.name;
    const Email=currentUser.attributes.email;

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
      selectedSex,
      selectedDate,
      age
  };
  
  const data = {
    operation: 'create',
    payload: newUser,
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
    // navigation.navigate("details3screen")
  };

  const searchRef = useRef();
  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(names);
    }
  };
  return (
    
    <View style={styles.outline}>
       {/* <View style={styles.form1}> */}
              <Text style={styles.select}>Choose your Blood Group :</Text>
              <TouchableOpacity style={styles.box} onPress={() => {setClicked(!clicked); }}>
              
                <Text style={{fontWeight:'400'}}>
                  {selectedname == '' ? 'Select one' : selectedname}
                </Text>
                {clicked ? (
                  <Image
                    source={require('./assets/upload.png')}
                    style={{width: 20, height: 20}}
                  />
                ) : (
                  <Image
                    source={require('./assets/dropdown.png')}
                    style={{width: 20, height: 20}}
                  />
                )}
              </TouchableOpacity>
              {clicked ? (
                <View style={styles.downl}>
                  
                        <TextInput
                          placeholder="Search.."
                          value={search}
                          ref={searchRef}
                          onChangeText={txt => {
                            onSearch(txt);
                            setSearch(txt);
                          }}
                          style={styles.searchlist}
                        />

                        <FlatList style={{flex:1 }} 
                          data={data}
                          renderItem={({item, index}) => {
                            return (
                              <TouchableOpacity
                                style={styles.items}
                                onPress={() => {
                                  setSelectedname(item.name);
                                  setClicked(!clicked); 
                                  onSearch('');
                                  setSearch('');
                                }}>
                                <Text style={{fontWeight: '600'}}>{item.name}</Text>
                              </TouchableOpacity>
                            );
                          }}
                          scrollEnabled={true}
                          />
                  </View>
                ) : null
                }
        {/* </View>   */}
        {/* <View style={styles.form2}> */}
        

          {/* <Text style={styles.heading1}>
            Enter your details :
          </Text> */}
          <View style={{marginVertical: 10, marginLeft: 10}}>
            <Text style={styles.Adress1}>Enter your weight (kg):</Text>
            <TextInput 
              style={styles.text1}
              onChangeText={(text) => {
                setWeight(text);
                calculateBmi();
              }}
              value={weight}
              placeholder="Enter a value" 
              required
              keyboardType='numeric'
            />
            {error1 ? <Text style={styles.error}>{error1}</Text> : null}
          </View>
          {/* <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>Address Line 2:</Text>
            <TextInput 
              style={styles.text1}
              placeholder="Enter a value"
            />
          </View> */}
          <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>Enter your height (cm):</Text>
            <TextInput 
              style={styles.text1}
              onChangeText={(text) => {
                setHeight(text);
                calculateBmi();
              }}
              value={height}
              placeholder="Enter a value"
              required
              keyboardType='numeric'
            />
            {error2 ? <Text style={styles.error}>{error2}</Text> : null}
          </View>
          <View style={{marginVertical: 10, marginLeft: 10}}>
          <Text style={styles.label}>Your BMI is:</Text>
      <TextInput
        style={[styles.text1, { color: 'black' }]}
        value={bmi}
        editable={false}
      /></View>


    <View style={{marginVertical: 10, marginLeft: 10,}}>
      <Text style={styles.Adress1}>Select your Date of Birth :</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={styles.button2}>
          {selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : 'Click Here to select'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {age !== null && (
        <Text style={styles.text2}>
          Your age is {age} years
        </Text>
      )}
    </View>



          {/* <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>Pin Code:</Text>
            <TextInput 
              style={styles.text1}
              onChangeText={handleTextInputChangePin}
              value={textInputValuePin}
              placeholder="Enter a value"
              required
            />
            {error3 ? <Text style={styles.error}>{error3}</Text> : null}
          </View>
          <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>Phone Number:</Text>
            <TextInput 
              style={styles.text1}
              onChangeText={handleTextInputChangePhone}
              value={textInputValuePhone}
              placeholder="Enter a value"
              required
            />
            {error4 ? <Text style={styles.error}>{error4}</Text> : null}
          </View>  */} 
          <Text style={styles.Adress1}>Please select which sex we should use to calculate your calorie needs :</Text>
          <View style={{marginVertical: 10, marginLeft: 10,flexDirection:'row',justifyContent: 'space-between',
    alignItems: 'flex-start',}}>
          {/* <Text style={styles.Adress1}>Please select which sex we should use to calculate your calorie needs :</Text> */}
          <TouchableOpacity
        style={[
          styles.button3,
          selectedSex === 'male' ? styles.selectedButton : null,
        ]}
        onPress={() => handleSexSelection('male')}>
        <Text style={styles.buttonText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button4,
          selectedSex === 'female' ? styles.selectedButton : null,
        ]}
        onPress={() => handleSexSelection('female')}>
        <Text style={styles.buttonText}>Female</Text>
      </TouchableOpacity>
          </View>


        <View style={{flex:.5,justifyContent:'center',alignItems:'center'}}>
          <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttontext}>Next</Text>
          </Pressable>
        </View>
    </View>

    );
  };

export default Detailssecond;

const styles=StyleSheet.create({
    outline:{
        flex:1,
        // borderWidth:2,
        // borderColor:'red'
    },
    select:{
        // fontWeight: 'bold', 
        marginVertical: 10,
        marginLeft: 30,
        marginTop: 70, 
        fontSize:17, 
        color:'black'
      },
    box:{
            width: '90%',
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#F806CC',
            alignSelf: 'center',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            // zIndex:2,
    },
    downl:{
        elevation: 5,
        marginTop: 20,
        height: 400,  
        alignSelf: 'center',    
        borderWidth:1,
        borderColor:'black',
        width: '90%',
        backgroundColor: '#ffffff',
        opacity:1,
        borderRadius: 10,
        zIndex:2,
      },
    searchlist:{
        width: '90%',
        height: 50,
        alignSelf: 'center',
        borderWidth: 0.2,
        borderColor: '#8e8e8e',
        borderRadius: 7,
        marginTop: 20,
        paddingLeft: 20,
      },
    items:{
        width: '85%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#8e8e8e',
      },
      form1:{
        flex:1,
        zIndex:2,

        // borderWidth:2,
        // borderColor:'black'
      },
      label: {
        fontSize: 16,
        marginTop: 4,
        marginLeft: 24
      },
      form2:{
        flex:3,
        // borderWidth:2,
        // borderColor:'red',
        pointerEvents: 'none'
        // borderWidth:2,
        // borderColor:"green"
      },
      Adress1:{
          marginLeft:22,
          fontSize: 16,
      },
      heading1:{
        fontWeight: 'bold',
         marginVertical: 10, 
         marginLeft: 30,
         marginTop: 20, 
         fontSize:18, 
         color:'#810CA8',
        },
        
      text1:{
        width: '90%',
        height: 50,
        alignSelf: 'center',
        borderWidth: 0.2,
        borderColor: '#8e8e8e',
        borderRadius: 7,
        marginTop: 10,
        paddingLeft: 20
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
      },
      error: {
        color: 'red',
        marginLeft: 20,
        marginTop: 5,
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
      button2:{
        marginTop:10,
        marginLeft:20,
        borderWidth:0,
        paddingLeft:20,
        paddingTop:8,
        // borderColor:'#ADA2FF',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#E1EEFF',
        width:200,
        height:40,
        borderRadius:25
      },
      ageText: {
        fontSize: 20,
        marginTop: 20,
      },
      text2:{
        width: 200,
        height: 40,
        borderWidth: 0.2,
        borderColor: '#8e8e8e',
        borderRadius: 7,
        marginTop: 10,
        paddingLeft: 20,
        paddingTop:8,
        fontSize: 16,
        marginLeft: 20
      },
      button3: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width:150,
        padding: 10,
        marginTop:10,
        marginLeft:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,

      },
      button4: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width:150,
        padding: 10,
        marginTop:10,
        marginRight:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
      },
      selectedButton: {
        borderRadius: 10,
        borderColor: '#0002A1',
        borderWidth: 2,
        backgroundColor:'#ECF2FF',
      },
      buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
      },
})