import React, { useRef,useState } from 'react';
import { View, Text, Image, StyleSheet,  TouchableOpacity, TextInput, FlatList, Pressable,ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';


  const Quantity = ({navigation,route}) => {
    const [flag2,setflag2]=useState(1);
    const [amount,setamount]=useState(100);

    const Increase=()=>{
        setamount(amount +100);
    }
    const Decrease=()=>{
        if(amount>100)
            setamount(amount-100);
    }
    const Saveamount=(text)=>{
            setamount(parseInt(text));
    }

    return (
      
    <View style={styles.outline}>
        <View style={styles.quantity}>
            <Text style={styles.heading}>Quantity(gm)</Text>
            <View style={{flexDirection:'row'}}>
                <Pressable><Text style={{fontSize:60}} onPress={Decrease}>◀</Text></Pressable>
                <TextInput style={{width:'50%',fontSize:40,textAlign:'center'}} value={amount.toString()}
                     keyboardType="numeric" onChangeText={Saveamount}/>
                <Pressable><Text style={{fontSize:60}} onPress={Increase}>▶</Text></Pressable>
            </View>
        </View>   

        <View style={{flexDirection:'row',marginTop:30,width:'80%',justifyContent:"space-evenly"}}>
            <Pressable style={[styles.button,{backgroundColor:'#D33D29'}]} onPress={()=>navigation.navigate("scanscreen")}> 
                <Text style={styles.heading}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={()=>navigation.navigate("scanscreen")}> 
                <Text style={styles.heading}>Confirm</Text>
            </Pressable>
        </View>

        <View style={styles.result}>
                    <Text style={{fontSize:25,fontWeight:900,width:'100%',textAlign:'center',marginBottom:20}}>Sugar Reading</Text>
                    {flag2?
                    <>
                        <View style={styles.reading}>
                            <Lottie source={require('./assets/down.json')} autoPlay loop
                                        style={{width:150}} />
                            <Text style={{fontSize:30,fontWeight:500}}>188</Text>
                        </View>
                        <Text style={{fontSize:15,fontWeight:600}}>100g of Apple will decrease your sugar level from 190 to 188</Text>
                    </>
                    :
                    <>
                        <View style={styles.reading}>
                            <Lottie source={require('./assets/up.json')} autoPlay loop
                                        style={{width:150}} />
                            <Text style={{fontSize:30,fontWeight:500}}>188</Text>
                        </View>
                        <Text style={{fontSize:15,fontWeight:600}}>100g of Apple will increase your sugar level from 185 to 188</Text>
                    </>

                    }
                </View>

    </View>
    );
  };
export default Quantity;

const styles=StyleSheet.create({
  outline:{
    flex:1,
    // borderWidth:2,
    // borderColor:'red',
    // backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center'
  },
  quantity:{
    height:200,
    width:300,
    justifyContent:"center",
    alignItems:'center',
    borderWidth:2,
    borderRadius:20,
    backgroundColor:'#ffffff'
  },
  heading:{
    width:'100%',
    textAlign:'center',
    fontSize:18,
    fontWeight:700,
    height:40,
  },
  button:{
    width:130,
    height:70,
    borderWidth:.5,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40,
    backgroundColor:'#3BA73A'
  },
  reading:{
    // borderWidth:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:'45%',
  },    
    result:{
    // borderWidth:1,
    width:"95%",   
    height:250,
    justifyContent:'center',
    alignItems:"center",
    flexWrap:'wrap',
    flexDirection:'row',
    marginTop:100
  },
  
})
