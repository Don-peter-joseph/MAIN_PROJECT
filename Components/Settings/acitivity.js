import { Auth,Hub,API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput,Pressable,Image,ImageBackground, Alert} from "react-native";
import {Dimensions} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Activity=({navigation,route})=>{
  
    const [confirmed, setConfirmed] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const {user}=route.params;

    useEffect(() => {
      const interval = setInterval(() => {
        const currentDate = new Date();
        if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0 && currentDate.getSeconds() === 0) {
          setConfirmed(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    

    const handleOptionPress = (option) => {
      setSelectedOption(option);
    };

    const handleOptionPress2 = (option) => {
      setSelectedOption2(option);
    };

    const Predict=async()=>{
        console.log('hi');
        try{

              const response=await API.post('healthpadrestapi', '/healtpadsugarpredictor-staging');
              console.log(response);
          }
          catch(e){
            console.log(e);
          }
    }

    const Confirm=async()=>{

      try {
        // Check if the Confirm button has already been pressed today
        const currentDate = new Date();
        const storedDate = await AsyncStorage.getItem('lastConfirmDate');
        if (storedDate) {
          const lastConfirmDate = new Date(storedDate);
          if (currentDate.getDate() === lastConfirmDate.getDate() && 
              currentDate.getMonth() === lastConfirmDate.getMonth() && 
              currentDate.getFullYear() === lastConfirmDate.getFullYear()) {
              Alert.alert("Physical activity already confirmed today")
            return;
          }
          else{
            console.log("not confirmed")
          }
        }
        // The Confirm button has not been pressed today, store the current date
        await AsyncStorage.setItem('lastConfirmDate', currentDate.toString());
        setConfirmed(true);
      } catch (error) {
        console.log(error);
      }

      let reading=0;
      if(2=='Less than 1 hour'){
        reading = (user.Item.rbs - 80) * (1 - 0.005 * user.Item.bmi) * (1 - 0.01 * .3) + 80
      }
      else if(selectedOption === '2-4 hours'){
        reading = (user.Item.rbs - 80) * (1 - 0.005 * user.Item.bmi) * (1 - 0.01 * 3*.9) + 80
      }
      else if(selectedOption === '5-7 hours'){
        reading = (user.Item.rbs - 80) * (1 - 0.005 * user.Item.bmi) * (1 - 0.01 * 6 * .8) + 80   
      }
      else{
        reading = (user.Item.rbs - 80) * (1 - 0.005 * user.Item.bmi) * (1 - 0.01 * 8 * .7) + 80
      }
      console.log(reading)


      try{
        const id=user.Item.id;
        const data = {
          operation: 'update',
          payload: {id,rbs:Math.round(reading)},
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

    return(
        <View style={styles.outline}>
            <View style={styles.content}>
                <Text style={styles.question}>How much time you devoted to physical work?</Text>
                <Pressable onPress={() => handleOptionPress('Less than 1 hour')} style={[styles.box,{ backgroundColor: selectedOption === 'Less than 1 hour' ? '#a020f0' : '#fff'}]}>
                    <Text style={{ color: selectedOption === 'Less than 1 hour' ? '#fff' : '#000' }}>Less than 1 hour</Text>
                </Pressable>
                <Pressable onPress={() => handleOptionPress('2-4 hours')} style={[styles.box,{ backgroundColor: selectedOption === '2-4 hours' ? '#a020f0' : '#fff'}]}>
                    <Text style={{ color: selectedOption === '2-4 hours' ? '#fff' : '#000' }}>2-4 hours</Text>
                </Pressable>
                <Pressable onPress={() => handleOptionPress('5-7 hours')} style={[styles.box,{ backgroundColor: selectedOption === '5-7 hours' ? '#a020f0' : '#fff'}]}>
                    <Text style={{ color: selectedOption === '5-7 hours' ? '#fff' : '#000' }}>5-7 hours</Text>
                </Pressable>
                <Pressable onPress={() => handleOptionPress('Greater than 7 hours')} style={[styles.box,{ backgroundColor: selectedOption === 'Greater than 7 hours' ? '#a020f0' : '#fff'}]}>
                    <Text style={{ color: selectedOption === 'Greater than 7 hours' ? '#fff' : '#000' }}>Greater than 7 hours</Text>
                </Pressable>
            </View>
            
            <View style={[styles.content,{flexDirection:'row',flexWrap:'wrap'}]}> 

              <Text style={[styles.question,{width:'100%',marginTop:30}]}>How would you rate the work intensity?</Text>
              <Pressable onPress={() => handleOptionPress2('light')} style={[styles.box,{ backgroundColor: selectedOption2 === 'light' ? '#a020f0' : '#fff',width:'30%'}]}>
                  <Text style={{ color: selectedOption2 === 'light' ? '#fff' : '#000' }}>light</Text>
              </Pressable>
              <Pressable onPress={() => handleOptionPress2('moderate')} style={[styles.box,{ backgroundColor: selectedOption2 === 'moderate' ? '#a020f0' : '#fff',width:'30%'}]}>
                  <Text style={{ color: selectedOption2 === 'moderate' ? '#fff' : '#000' }}>moderate</Text>
              </Pressable>
              <Pressable onPress={() => handleOptionPress2('intense')} style={[styles.box,{ backgroundColor: selectedOption2 === 'intense' ? '#a020f0' : '#fff',width:'30%'}]}>
                  <Text style={{ color: selectedOption2 === 'intense' ? '#fff' : '#000' }}>intense</Text>
              </Pressable>
            </View>

            <Pressable style={({pressed,disabled})=>[styles.button,{backgroundColor:pressed?'#FFDA2a':'#FFF'}]} onPress={Confirm}   disabled={confirmed}>
                <Text style={{fontWeight:500,fontSize:18}}>Confirm</Text>
            </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        // position:'absolute',
        // width:windowWidth,
        // height:windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffffff'
    },
    content:{
        // flex:1,
        width:'90%',
        justifyContent:'space-between',
        alignItems:"center",
        // borderWidth:1,
        // elevation:1,
        borderRadius:10,
    }   ,
    question: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        alignSelf:'flex-start'
      },
      option: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
      },
      selectedOption: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
      },
      button:{
        width:"90%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginTop:50,
        borderRadius:5,
        elevation:10,
        shadowColor:'#ffa500',
        borderColor:"#ffa500",
      },
      box:{
        width:"100%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        margin:4,
        borderRadius:5,
        elevation:7,
        shadowColor:'#a020f0',
        borderColor:"#a020f0"
      }
})

export default Activity;