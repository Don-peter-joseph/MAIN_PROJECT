  import React, { useRef,useState } from 'react';
  import { View, Text, Image, StyleSheet,  TouchableOpacity, TextInput, FlatList} from 'react-native';
  import {Dimensions} from 'react-native';
  import { NavigationContainer } from "@react-navigation/native";



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

  const ScanPage = () => {
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
      
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', marginVertical: 10, marginLeft: 30,marginTop: 180, fontSize:18, color:'#810CA8'}}>
        Select a fruit or vegetable:
        </Text>
        <TouchableOpacity
          style={{
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
          }}
          onPress={() => {
            setClicked(!clicked);
          }}>
          <Text style={{fontWeight:'600', color:'#810CA8+'}}>
            {selectedname == '' ? 'Select name' : selectedname}
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
          <View
            style={{
              elevation: 5,
              marginTop: 20,
              height: 300,
              alignSelf: 'center',
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search.."
              value={search}
              ref={searchRef}
              onChangeText={txt => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={{
                width: '90%',
                height: 50,
                alignSelf: 'center',
                borderWidth: 0.2,
                borderColor: '#8e8e8e',
                borderRadius: 7,
                marginTop: 20,
                paddingLeft: 20,
              }}
            />

            <FlatList
              data={data}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '85%',
                      alignSelf: 'center',
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                      borderColor: '#8e8e8e',
                    }}
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
    );
  };
export default ScanPage;