import React, { useEffect, useRef,useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable,ScrollView,TouchableOpacity,Alert, TextInput, FlatList, KeyboardAvoidingView} from 'react-native';
import {Dimensions} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { Auth,Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import {launchCameraAsync} from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera,CameraType} from "expo-camera";
import Lottie from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const names = [
    {name: 'Andhra Pradesh'},
    {name: 'Arunachal Pradesh'},
    {name: 'Assam'},
    {name: 'Bihar'},
    {name: 'Chhattisgarh'},
    {name: 'Goa'},
    {name: 'Gujarat'},
    {name: 'Haryana'},
    {name: 'Himachal Pradesh'},
    {name: 'Jharkhand'},
    {name: 'Karnataka'},
    {name: 'Kerala'},
    {name: 'Madhya Pradesh'},
    {name: 'Maharashtra'},
    {name: 'Manipur'},
    {name: 'Meghalaya'},
    {name: 'Mizoram'},
    {name: 'Nagaland'},
    {name: 'Odisha'},
    {name: 'Punjab'},
    {name: 'Rajasthan'},
    {name: 'Sikkim'},
    {name: 'Tamil Nadu'},
    {name: 'Telangana'},
    {name: 'Tripura'},
    {name: 'Uttar Pradesh'},
    {name: 'Uttarakhand'},
    {name: 'West Bengal'},
    {name: 'Andaman and Nicobar Islands'},
    {name: 'Chandigarh'},
    {name: 'Dadra and Nagar Haveli and Daman and Diu'},
    {name: 'Lakshadweep'},
    {name: 'Delhi'},
    {name: 'Puducherry'},
    {name: 'Jammu and Kashmir'},
    {name: 'Ladakh'}
  ];

const Detailsfirst = ({navigation,route}) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(names);
  const [uploadstatus,setuploadstatus] = useState(false);
  const [uploading,setuploading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedname, setSelectedname] = useState('');
  const [textInputValueAddress, setTextInputValueAddress] = useState('');
  const [textInputValueCity, setTextInputValueCity] = useState('');
  const [textInputValuePin, setTextInputValuePin] = useState('');
  const [textInputValuePhone, setTextInputValuePhone] = useState('');
  const [error1, setErrorAddress] = useState('')
  const [error2, setErrorCity] = useState('')
  const [error3, setErrorPin] = useState('')
  const [error4, setErrorPhone] = useState('')
  const [image,setImage] = useState(null);
  const [temp,settemp]=useState('');
  const[hasCameraPermission,sethasCameraPermission]=useState(null);
  const cameraRef=useRef(null);
  let imgname='';  

  useEffect( async () =>{
    if(Platform.OS !== 'web'){
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission denied!')
      }
    }
    setuploadstatus(false)
    setuploading(false)
  },[])

  const showAlert=()=>{
      Alert.alert(
        'Hello!',
        'This is a simple message.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
  }

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })
    console.log(result.uri)
    if(result.uri){
      await uploadimage(result);
      imgname="public/"+imgname;
      settemp(imgname);
      console.log(imgname);
    }
  }

  const fetchimage=async(imageuri)=>{
    const response=await fetch(imageuri);
    const blob=await response.blob();
    return blob;
  }

  const uploadimage=async(image)=>{
    setuploadstatus(true);
    setuploading(true)
    const img=await fetchimage(image.uri)
    imgname=`demo${Math.random()}.jpg`;
    // console.log(imgname);
    return Storage.put(imgname,img,{
        level:'public',
        contentType:image.type,
        progressCallback(uploadProgress){
        console.log('PROGRESS-- ',uploadProgress.loaded+'/'+uploadProgress.total);
        }
    })
    .then((res)=>{
        Storage.get(res.key)
        .then((result)=>{
                console.log("RESULT-- ",result);
            })
            .catch(e=>{
                console.log(error);
            });
          setuploading(false);
        })
    .catch(error=>{
        console.log(error);
    })
}


  const takePicture=async()=>{
    MediaLibrary.requestPermissionsAsync();
    const camerastatus=await Camera.requestCameraPermissionsAsync();
    sethasCameraPermission(camerastatus.status==='granted');
    if(cameraRef){
        try{ 
            const data=await launchCameraAsync({
                allowsEditing:true,
                quality:0.5,
             });
             if(data.uri){
               await uploadimage(data);
               imgname="public/"+imgname;
                settemp(imgname);
               console.log(imgname);
             }
        }catch(e){
            console.log(e);
        }
    }
    else {
      sethasCameraPermission(false)
      console.log('Camera permission not granted');
    }
  }

  if(hasCameraPermission===false){
    return <Text>No camera permission</Text>
    }

  const handlenameChange = (name) => {
    setSelectedname(name);
    setSelected(true);
  }

  const handleTextboxChange = (text) => {
    setTextboxValue(text);
  }

  const handleTextInputChangeAddress = (text) => {
    setTextInputValueAddress(text);
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

  const handleSubmit = () => {
    if (selectedname=='' || textInputValueAddress=='' || textInputValueCity=='' || textInputValuePhone=='' || textInputValuePin=='') {
    if (textInputValueAddress=='') {
      setErrorAddress('Please enter a value');
    } else {
      setErrorAddress('');
      // do something with the input value
    }
    if (textInputValueCity=='') {
      setErrorCity('Please enter a value');
    } else {
      setErrorCity('');
      // do something with the input value
    }
    if (textInputValuePin=='') {
      setErrorPin('Please enter a value');
    } else {
      setErrorPin('');
      // do something with the input value
    }
    if (textInputValuePhone=='') {
      setErrorPhone('Please enter a value');
    } else {
      setErrorPhone('');
      // do something with the input value
    }
  }
  else{
    const isValidPhone = /^(?:(?:(?:\+|00)?(91))[\s-]?)?(?:\d{10})$/.test(textInputValuePhone);
    if (!isValidPhone) {
      setErrorPhone('Please enter a valid Indian phone number');
    } else {
        setErrorPhone('');
        console.log(selectedname,temp);
    navigation.navigate("details2screen",{state:selectedname,address:textInputValueAddress,
                        city:textInputValueCity,phoneno:textInputValuePhone,pincode:textInputValuePin,imagename:temp})
  }
}
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
              <Text style={styles.select}>Select your State or UT :</Text>
              <TouchableOpacity style={styles.box} onPress={() => {setClicked(!clicked); }}>
              
                <Text style={{fontWeight:'600', color:'#810CA8'}}>
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
        
        <ScrollView>
          <Text style={styles.heading1}>
            Enter your details :
          </Text>
          <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>Address :</Text>
            <TextInput 
              style={styles.text1}
              onChangeText={handleTextInputChangeAddress}
              value={textInputValueAddress}
              placeholder="Enter a value"
              required
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
            <Text style={styles.Adress1}>City:</Text>
            <TextInput 
              style={styles.text1}
              onChangeText={handleTextInputChangeCity}
              value={textInputValueCity}
              placeholder="Enter a value"
              required
            />
            {error2 ? <Text style={styles.error}>{error2}</Text> : null}
          </View>
          <View style={{marginVertical: 10, marginLeft: 10,}}>
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
          </View>
        {/* </View> */}

        <View style={{marginVertical: 10, marginLeft: 10}}>
            <Text style={styles.Adress1}>Upload Profile Picture: </Text>
            <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'flex-start', paddingLeft:20}}> 
              {uploadstatus?
              <>
              {uploading?
              <>
                <Lottie
                    source={require('../animatedscreen/uploading.json')}
                    autoPlay
                    speed={0.7}
                    loop
                    style={{width: 60, height: 60,}}
                />
              </>
              :
              <>
              <TouchableOpacity style={styles.button1} >
                <Text style={styles.buttonText1}>Uploaded</Text>
              </TouchableOpacity>
              </>
              }
              </>
              :
              <>
              <TouchableOpacity style={styles.button1} onPress={PickImage} >
                <Text style={styles.buttonText1}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button1} onPress={takePicture} >
                <Text style={styles.buttonText1}>Open Camera</Text>
              </TouchableOpacity>
              </>  
              }
          </View>
        </View>


        <View style={{flex:.5,justifyContent:'center',alignItems:'center'}}>
          <Pressable style={styles.button} onPress={handleSubmit}>
              <Text  style={styles.buttontext}>Next</Text>
          </Pressable>
        </View>
        </ScrollView>
    </View>

    );
  };

export default Detailsfirst;

const styles=StyleSheet.create({
    outline:{
        flex:1,
        // borderWidth:2,
        // borderColor:'red'
    },
    select:{
        fontWeight: 'bold', 
        marginVertical: 10,
        marginLeft: 30,
        marginTop: 55, 
        fontSize:18, 
        color:'#810CA8'
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
        marginTop: 8,
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
        marginTop: 4,
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
        marginTop:20
      },
      buttontext:{
        fontWeight:'bold',
        fontSize:22,
        color:'white'
      },
      button1: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width:150,
        padding: 10,
        marginTop:10,
        marginRight:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        backgroundColor: '#ECF2FF'
      },
      buttonText1: {
        color: 'black',
        fontSize: 16,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
      },
})