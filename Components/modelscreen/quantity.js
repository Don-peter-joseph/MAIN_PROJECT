import React, { useRef,useState } from 'react';
import { View, Text, Image, StyleSheet,  TouchableOpacity, TextInput, FlatList, Pressable,ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';
import {API } from "aws-amplify";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

  const Quantity = ({navigation,route}) => {
    const [flag,setflag]=useState(1);
    const [flag2,setflag2]=useState(1);
    const [amount,setamount]=useState(100);
    const {eng,carbs,cal,fib,gindex,user,item,temp,insulinfactor}=route.params;
    const [reading,setreading]=useState(temp);
    const [gload,setgload]=useState(0);
    const [content,setcontent]=useState(item+"  ---------------  "+amount+"g\n");

    const Increase=()=>{
        const updatedamount=amount+100;
        setamount(amount +100);
        setcontent(item+"  ---------------  "+updatedamount+"g\n");
        Calculate(updatedamount);
    }
    const Decrease=()=>{
      if(amount>100){
        const updatedamount=amount-100;
        setcontent(item+"  ---------------  "+updatedamount+"g\n");
        setamount(amount-100);
        Calculate(updatedamount);
      }
    }
    const Saveamount=(text)=>{
        const updatedamount=parseInt(text);
        setamount(parseInt(text));
        setcontent(item+"  ---------------  "+updatedamount+"g\n");
        Calculate(updatedamount);
    }

    const Calculate=async(updatedamount)=>{
      setflag(0);
      setTimeout(() => {
        setgload((gindex*((carbs/100)*updatedamount))/100)
        setreading(Math.round(parseInt(user.Item.rbs)+((gindex*((carbs/100)*updatedamount))/10000)*(gindex/100)*user.Item.rbs*insulinfactor))
        setflag(1);
      }, 5000);
    }

    const Predict=async()=>{
      console.log('hi');
      try{

            const response=await API.post('healthpadrestapi', '/healtpadsugarpredictor-staging');
            setreading(response);
        }
        catch(e){
          console.log(e);
        }
  }

    const Savedata=async()=>{
      let temp="";
      try{
        const data = {
          operation: 'retrieve',
          payload: user.Item.id,
          tablename:'HealthpadFoodHistory'
        };
          const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
              body: {
                      data 
              } 
          });
          temp=response.Item.history;
      }
      catch(e){
        console.log(e);
      }

      const newhistory ={
        id:user.Item.id,
        history:temp+content
      };
      const data = {
        operation: 'create',
        payload: newhistory,
        tablename:'HealthpadFoodHistory'
      };


      try{
        const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
                      body: {
                            data
                      } 
        });
        console.log("history saved successfully")
        console.log(response)
      }
      catch(e){
        console.log('Error saving history', e);
      }
      
      try{
        const id=user.Item.id;
        const data = {
          operation: 'update',
          payload: {id,rbs:reading,intake:parseInt(user.Item.intake)+parseInt(eng)},
          tablename:'heathpaduserdetails-staging'
        };
          const response=await API.post('healthpadrestapi', '/healthpaddynamodbTriggerd96984dd-staging',{ 
              body: {
                      data 
              } 
          });
          console.log("rbs updated");
      }
      catch(e){
        console.log("rbs not updated");
      }


      navigation.reset({
        index: 0,
        routes: [{ name: 'homescreen' }],
      });
    }

    return (
      
    <View style={styles.outline}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <View style={styles.quantity}>
              <Text style={styles.heading}>Quantity(gm)</Text>
              <View style={{flexDirection:'row'}}>
                  <Pressable><Text style={{fontSize:60}} onPress={Decrease}>◀</Text></Pressable>
                  <TextInput style={{width:'50%',fontSize:40,textAlign:'center'}} value={amount.toString()}
                      keyboardType="numeric" onChangeText={Saveamount}/>
                  <Pressable><Text style={{fontSize:60}} onPress={Increase}>▶</Text></Pressable>
              </View>
          </View>   
        </View>

        <View style={styles.result}>
        {flag?
        <>
              <Text style={{fontSize:25,fontWeight:900,width:'100%',textAlign:'center',marginBottom:20}}>Sugar Reading</Text>
              {reading<user.Item.rbs?
              <>
                  <View style={styles.reading}>
                      <Lottie source={require('./assets/down.json')} autoPlay loop
                                  style={{width:150}} />
                      <Text style={{fontSize:30,fontWeight:500}}>{reading} <Text style={{fontSize:20}}> mg/dL</Text></Text>
                  </View>
                  <Text style={{fontSize:15,fontWeight:600}}>{amount}g of {item} will decrease your sugar level from {user.Item.rbs} to {reading}</Text>
              </>
              :
              <>
                  <View style={styles.reading}>
                      <Lottie source={require('./assets/up.json')} autoPlay loop
                                  style={{width:150}} />
                      <Text style={{fontSize:30,fontWeight:500}}>{reading}<Text style={{fontSize:20}}> mg/dL</Text></Text>
                  </View>
                  <Text style={{fontSize:15,fontWeight:600}}>{amount}g of {item} will increase your sugar level from {user.Item.rbs} to {reading}</Text>
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
                    {gindex<50 && gload<10 || reading<150?
                    <>
                        <View style={styles.recommended}>
                            <Text style={{fontSize:20,fontWeight:700}}>Safe</Text>
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

        <View style={{flexDirection:'row',width:'80%',justifyContent:"space-evenly",flex:.2}}>
            <Pressable style={[styles.button,{backgroundColor:'#D33D29'}]} onPress={()=>navigation.navigate("scanscreen",{user})}> 
                <Text style={styles.heading}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={Savedata}> 
                <Text style={styles.heading}>Confirm</Text>
            </Pressable>
        </View>

    </View>
    );
  };
export default Quantity;

const styles=StyleSheet.create({
  outline:{
    height:windowHeight,
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
    marginTop:40
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
    flex:.8,
    justifyContent:'center',
    alignItems:"center",
    flexWrap:'wrap',
    flexDirection:'row',
    // marginTop:80,
    // marginBottom:30
  },
recommendation:{
    width:'100%',
    // borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    // height:200,
    flex:.7
},
recommended:{
    width:'55%',
    height:"85%",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#b1fcb1",
    borderRadius:15
},
notrecommended:{
    width:'55%',
    height:"85%",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff4d4d",
    borderRadius:15
},
})
