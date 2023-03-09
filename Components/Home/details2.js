import React, { useRef,useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView} from 'react-native';
import {Dimensions} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";



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

const Detailssecond = () => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(names);
  const [selectedname, setSelectedname] = useState('');
  const [textboxValue, setTextboxValue] = useState('');
  const [addressLine1Completed, setAddressLine1Completed] = useState(false);
  const [selected, setSelected] = useState(false);


  const handlenameChange = (name) => {
    setSelectedname(name);
    setSelected(true);
  }

  const handleTextboxChange = (text) => {
    setTextboxValue(text);
  }

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
       <View style={styles.form1}>
              <Text style={styles.select}>Personal Details:</Text>
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
        </View>  
        <View style={styles.form2}>
        

          <Text style={styles.heading1}>
            Enter your details :
          </Text>
          <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>Address Line 1:</Text>
            <TextInput 
              style={styles.text1}
              onBlur={() => {
                if (textboxValue.trim() !== '') {
                  setAddressLine1Completed(true);
                } else {
                  setAddressLine1Completed(false);
                }
              }}
            />
          {!addressLine1Completed && (
          <Text style={styles.error}>Please enter your address line 1</Text>)}
          </View>
          <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>Address Line 2:</Text>
            <TextInput 
              style={styles.text1}
            />
          </View>
          <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>City:</Text>
            <TextInput 
              style={styles.text1}/>
          </View>
          <View style={{marginVertical: 10, marginLeft: 10,}}>
            <Text style={styles.Adress1}>Pin Code:</Text>
            <TextInput 
              style={styles.text1}/>
          </View>
        </View>
        <View style={{flex:.5,justifyContent:'center',alignItems:'center'}}>
          <Pressable style={styles.button}>
              <Text>Next</Text>
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
        fontWeight: 'bold', 
        marginVertical: 10,
        marginLeft: 30,
        marginTop: 100, 
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
            paddingRight: 15
    },
    downl:{
        elevation: 5,
        marginTop: 20,
        height: 400,
        alignSelf: 'center',    
        borderWidth:2,
        borderColor:'black',
        width: '90%',
        backgroundColor: '#ffffff',
        opacity:1,
        borderRadius: 10,
        // zIndex:4,
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
        borderWidth:2,
        borderColor:'red',
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
        borderWidth:2,
        borderColor:'green',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'yellow',
        width:100,
        height:50,
        borderRadius:25
      }
})