import React, { useRef,useState } from 'react';
import { View, Text, Image, StyleSheet,  TouchableOpacity, TextInput, FlatList, Pressable} from 'react-native';
import {Dimensions} from 'react-native';




  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const names = [
    {name: 'Apple'},
    {name: 'Banana'},
    {name: 'Beetroot'},
    {name: 'Bell pepper'},
    {name: 'Cabbage'},
    {name: 'Capsicum'},
    {name: 'Carrot'},
    {name: 'Cauliflower'},
    {name: 'Chilli pepper'},
    {name: 'Corn'},
    {name: 'Cucumber'},
    {name: 'Eggplant'},
    {name: 'Garlic'},
    {name: 'Ginger'},
    {name: 'Grapes'},
    {name: 'Jalepeno'},
    {name: 'Kiwi'},
    {name: 'Lemon'},
    {name: 'Lettuce'},
    {name: 'Mango'},
    {name: 'Onion'},
    {name: 'Orange'},
    {name: 'Paprika'},
    {name: 'Pear'},
    {name: 'Peas'},
    {name: 'Pineapple'},
    {name: 'Pomegranate'},
    {name: 'Potato'},
    {name: 'Raddish'},
    {name: 'Soy beans'},
    {name: 'Spinach'},
    {name: 'Sweetcorn'},
    {name: 'Sweetpotato'},
    {name: 'Tomato'},
    {name: 'Turnip'},
    {name: 'Watermelon'}
  ];

  const Scanimage = ({navigation,route}) => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(names);
    const [selectedname, setSelectedname] = useState('');
    const handlenameChange = (name) => {
      setSelectedname(name);
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
        <View style={styles.dropdown}>
          <Text style={styles.heading}>
          Select a fruit or vegetable:
          </Text>
          <TouchableOpacity style={styles.first} onPress={() => {setClicked(!clicked);}}>
            <Text style={{fontWeight:'600', color:'#810CA8'}}>
              {selectedname == '' ? 'Select name' : selectedname}
            </Text>
            {clicked ? 
            (<Image source={require('./assets/upload.png')} style={{width: 20, height: 20}}/>) 
            :
            (<Image source={require('./assets/dropdown.png')} style={{width: 20, height: 20}}/>)}
          </TouchableOpacity>
          
          {clicked ? (
            <View style={styles.second}>
              <TextInput  placeholder="Search.."  value={search}  ref={searchRef} style={styles.input} 
                        onChangeText={txt => {  
                            onSearch(txt);
                            setSearch(txt);
                          }}
              />

              <FlatList
                data={data}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={styles.third}
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
              />
            </View>
          ) : null}
        </View>

        <View style={styles.face}>
                <Pressable style={styles.Button1} onPress={()=>navigation.navigate("detectfacescreen")}>
                  <Text>DetectFaces</Text>
                </Pressable>
        </View>
        <View style={styles.face}>
                <Pressable style={styles.Button1} onPress={()=>navigation.navigate("detectfacescreen")}>
                  <Text>Detect Food</Text>
                </Pressable>
        </View>
        <View style={styles.face}>
                <Pressable style={styles.Button1} onPress={()=>navigation.navigate("textrecognitionscreen")}>
                  <Text>Detect Packaged food</Text>
                </Pressable>
        </View>

      </View>
    );
  };
export default Scanimage;

const styles=StyleSheet.create({
  outline:{
    flex:1,
    borderWidth:2,
    borderColor:'red'
  },
  dropdown:{
    borderWidth:2,
    borderColor:'black',
    flex:2,
  },
  first:{
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F806CC',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    
  },
  heading:{
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 30,
    marginTop: 180,
    fontSize:18,  
    color:'#810CA8'
  },
  second:{
    elevation: 5,
    marginTop: 20,
    height: 300,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 2,

  },
  input:{
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: '#8e8e8e',
    borderRadius: 7,
    marginTop: 20,
    paddingLeft: 20,
  },
  third:{
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#8e8e8e',
  },
  face:{
    flex:1,
    borderWidth:2,
    borderColor:'blue',
    justifyContent:'center',
    alignItems:'center'
  },
  Button1:{
    borderWidth:4,
    borderColor:'green',
    borderRadius:10,
    padding:20
  }
})