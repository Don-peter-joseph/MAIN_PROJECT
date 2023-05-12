import React, { useRef,useState } from 'react';
import { View, Text, Image, StyleSheet,  TouchableOpacity, TextInput, FlatList, Pressable,ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';


  const Quantity = ({navigation,route}) => {
    const [flag,setflag]=useState(1);
    const [flag2,setflag2]=useState(1);
    const [amount,setamount]=useState(100);
    const {eng,carbs,cal,fib,gindex}=route.params;
    const [gload,setgload]=useState(0);

    const Increase=()=>{
        const updatedamount=amount+100;
        setamount(amount +100);
        Calculate(updatedamount);
    }
    const Decrease=()=>{
      if(amount>100){
        const updatedamount=amount-100;
        setamount(amount-100);
        Calculate(updatedamount);
      }
    }
    const Saveamount=(text)=>{
        const updatedamount=parseInt(text);
        setamount(parseInt(text));
          Calculate(updatedamount);
    }

    const Calculate=(updatedamount)=>{
      setflag(0);
      setTimeout(() => {
        setgload((gindex*((carbs/100)*updatedamount))/100)
        setflag(1);
      }, 5000);
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

        <View style={styles.result}>
        {flag?
        <>
              <Text style={{fontSize:25,fontWeight:900,width:'100%',textAlign:'center',marginBottom:20}}>Sugar Reading</Text>
              {flag2?
              <>
                  <View style={styles.reading}>
                      <Lottie source={require('./assets/down.json')} autoPlay loop
                                  style={{width:150}} />
                      <Text style={{fontSize:30,fontWeight:500}}>188</Text>
                  </View>
                  <Text style={{fontSize:15,fontWeight:600}}>{amount}g of Apple will decrease your sugar level from 190 to 188</Text>
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
        </>
        :
        <>
          <View style={{flex:1,width:'100%',height:'100%'}}>
              <Lottie source={require('./assets/loading.json')}
              autoPlay loop />
              {/* <Text style={styles.text2}>Calculating</Text> */}
          </View>
        </>
        }
        </View>

        <View style={styles.recommendation}>
                    {gindex<50 && gload<10?
                    <>
                        <View style={styles.recommended}>
                            <Text style={{fontSize:20,fontWeight:700}}>Recommended</Text>
                        </View>
                    </>
                    :
                    <>
                        <View style={styles.notrecommended}>
                            <Text style={{fontSize:20,fontWeight:700}}>Not Recommended</Text>
                        </View>
                    </>
                    }
        </View>

        <View style={{flexDirection:'row',marginTop:30,width:'80%',justifyContent:"space-evenly"}}>
            <Pressable style={[styles.button,{backgroundColor:'#D33D29'}]} onPress={()=>navigation.navigate("scanscreen")}> 
                <Text style={styles.heading}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={()=>navigation.navigate("scanscreen")}> 
                <Text style={styles.heading}>Confirm</Text>
            </Pressable>
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
    backgroundColor:'#ffffff',
    // borderColor:'#FFBA2A'
  },
  heading:{
    width:'100%',
    textAlign:'center',
    fontSize:18,
    fontWeight:700,
    // height:40,
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
    marginTop:80,
    marginBottom:30
  },
recommendation:{
    width:'100%',
    // borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    height:200,
},
recommended:{
    width:'55%',
    height:180,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#b1fcb1",
    borderRadius:15
},
notrecommended:{
    width:'55%',
    height:180,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff4d4d",
    borderRadius:15
},
})
