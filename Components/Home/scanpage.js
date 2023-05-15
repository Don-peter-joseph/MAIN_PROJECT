import React, { useRef,useState } from 'react';
import { View, Text, Image, StyleSheet,  TouchableOpacity, TextInput, FlatList, Pressable,ImageBackground} from 'react-native';
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
    const {user}=route.params;
    // console.log(user)

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
            (<Text style={{color:'#810CA8'}}>◢</Text>)}
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

        {selectedname?
        <>
          <Pressable style={styles.nextbutton} onPress={()=>navigation.navigate('resultscreen',{item:selectedname,user})}>
            <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',color:'#ffffff'}}>Next</Text>
          </Pressable>        
        </>:
        <>
        </>
        }

        </View>
              
        {/* <View style={styles.features}>
                <Pressable onPress={()=>navigation.navigate("detectfacescreen")} 
                style={({ pressed }) =>[styles.Button1,pressed ? styles.Button1pressed : null,]}>
                  <ImageBackground source={require('./assets/detectface.png')} style={styles.image} imageStyle={{ borderRadius: 30 }} >
                      <Text style={styles.label}>Detect Faces</Text>
                  </ImageBackground>
                </Pressable>
        </View> */}
        <View style={styles.features}>
                <Pressable onPress={()=>navigation.navigate("fooddetectionscreen",{user})}
                style={({ pressed }) =>[styles.Button1,pressed ? styles.Button1pressed : null,]}>
                  <ImageBackground source={require('./assets/detectfood.png')} style={styles.image} imageStyle={{ borderRadius: 20 }} >
                      <Text style={styles.label}>Detect Food</Text>
                  </ImageBackground>
                </Pressable>
        </View>
        <View style={styles.features}>
                <Pressable onPress={()=>navigation.navigate("textrecognitionscreen",{user})}
                style={({ pressed }) =>[styles.Button1,pressed ? styles.Button1pressed : null,]}>
                  <ImageBackground source={require('./assets/detecttext.png')} style={styles.image} imageStyle={{ borderRadius: 20 }} >
                      <Text style={styles.label}>Detect Text</Text>
                  </ImageBackground>
                </Pressable>
        </View>

      </View>
    );
  };
export default Scanimage;

const styles=StyleSheet.create({
  outline:{
    flex:1,
    // borderWidth:2,
    // borderColor:'red',
    // backgroundColor:'black'
  },
  dropdown:{
    // borderWidth:2,
    // borderColor:'yellow',
    justifyContent:'space-evenly',
    alignItems:'center',
    flex:1,
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
    fontSize:18,  
    color:'#810CA8',
  },
  second:{
    position:'absolute',
    // elevation: 5,
    // marginTop: 20,
    height: 200,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    // zIndex: 999,

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
    // position:'absolute',
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#8e8e8e',
    zIndex:4
  },
  features:{
    flex:1,
    // borderWidth:2,
    // borderColor:'blue',
    justifyContent:'center',
    alignItems:'center'
  },
  Button1:{
    borderWidth:1,
    borderColor:'black',
    width:'93%',
    height:'90%',
    borderRadius:30,
    zIndex:0
  },
  Button1pressed:{
    width:'95%',
    height:'92%',
    borderRadius:30
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:2,
    // borderColor:'white'
  },
  label:{
    color:'white',
    fontSize:25
  },
  nextbutton:{
    borderWidth:.4,
    flex:.3,
    justifyContent:'center',
    // alignItems:'center',
    // alignSelf:'center',
    width:"30%",
    borderRadius:20,
    borderColor:'#000000',
    backgroundColor:'#F806CC'
  }

})
