import { SafeAreaView, StyleSheet, Text, View,Button,StatusBar,Pressable,Image } from 'react-native';
import { Amplify,Auth, Hub,Storage } from 'aws-amplify';
import { Camera,CameraType} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from "react";
import { API } from 'aws-amplify';
import { ScrollView } from 'react-native-gesture-handler';
import {launchCameraAsync} from 'expo-image-picker';
import Lottie from 'lottie-react-native';


const FoodDetector = ({navigation,route}) => {
  let imgname='';  
  const [text,settext]=useState("No Response")
  const [hasCameraPermission,sethasCameraPermission]=useState(null);
  const [takenImage, setTakenImage] = useState();
  const [type,settype]=useState(Camera.Constants.Type.back);
  const [flash,setflash]=useState(Camera.Constants.FlashMode.off);
  const {user}=route.params;
  const cameraRef=useRef(null);

  useEffect(()=>{
      (async()=>{
          MediaLibrary.requestPermissionsAsync();
          const camerastatus=await Camera.requestCameraPermissionsAsync();
          sethasCameraPermission(camerastatus.status==='granted');
      })();
      takePicture();
  },[])

  if(hasCameraPermission===false){
    return <Text>No camera permission</Text>
    }

    const fetchimage=async(imageuri)=>{
    const response=await fetch(imageuri);
    const blob=await response.blob();
    return blob;
  }
    const uploadimage=async(image)=>{
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
            })
        .catch(error=>{
            console.log(error);
        })
    }


    const invokeLambda=async(imgname)=> {
        try {
            const response = await API.post('healthpadrestapi', '/healthpadfooddetectionlambda-staging', {
            body: {
                imgname
            }
        });
            settext(JSON.stringify(response, null, 2).slice(1,-1))
            console.log('Lambda response:', response);
        } catch (error) {
            console.log('Lambda error:', error);
        }
    }

  const takePicture=async()=>{
    setTakenImage();
    if(cameraRef){
        try{
            // const options={quality:0.5,base64:true,skipProcessing:true};
            // const data=await cameraRef.current.takePictureAsync(options);   
            const data=await launchCameraAsync({
                allowsEditing:true,
                quality:0.5,
             });
            // console.log(data.base64);       
            await uploadimage(data);
            console.log(imgname);
            imgname="public/"+imgname;
            console.log(imgname);
            await invokeLambda(imgname);
            setTakenImage(data.uri);
        }catch(e){
            console.log(e);
        }
    }
  }
  
return(
  <>
  <StatusBar hidden={true}/>
  {
      <View style={styles.outline}>
          {!takenImage?
          <>
            <View style={styles.content}>
              <Lottie style={styles.animation} source={require('../animatedscreen/food.json')} autoPlay loop />
              <Pressable style={{marginBottom:100}} onPress={takePicture}>
                <Text>Taking too long? Capture another image</Text>
              </Pressable>
            </View>
          </>
          :
          <>
              <Pressable style={styles.nextbutton} onPress={takePicture}>
                <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',color:'#ffffff'}}>Open Cam</Text>
              </Pressable>
              <Image source={{uri:takenImage}} style={styles.camera}/>
              {text!=''?
              <>
                <View style={styles.output}>
                  <Text style={{fontWeight:'900',fontSize:20}}>Detected Item is <Text 
                        style={{color:"purple"}}>{text}</Text></Text>
                </View>
                <Pressable style={styles.nextbutton} onPress={()=>navigation.navigate('resultscreen',{item:text.toUpperCase(),user})}>
                  <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',color:'#ffffff'}}>Next</Text>
                </Pressable>
              </>
              :
              <>
                <View style={styles.output}>
                  <Text style={{fontWeight:'900',fontSize:20}}>Item unable to recognise</Text>
                </View>
                <Pressable style={styles.nextbutton} onPress={()=>navigation.navigate('scanscreen',{user})}>
                  <Text style={{textAlign:'center',fontSize:18,fontWeight:'600',color:'#ffffff'}}>Go back</Text>
                </Pressable>
              </>
              }
          </>
          }
        </View>
  }
  </>
  )
}

export default FoodDetector;

const styles=StyleSheet.create({
  outline:{
      flex: 1,
      // position:'absolute',
      width:450,
      height:'100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor:'#ffffff',
      // borderWidth:2,
      // borderColor:'red'
  },
  content:{
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:"center"
}   ,
  signout:{
      borderWidth:1,
      borderColor:'black',
      borderRadius:25,
      backgroundColor:'#8A8AFF',
      height:'13%',
      justifyContent:'center',
      alignItems:'center',
      marginTop:13,
      width:'50%'
  },
  camera:{
      // flex:1,
      width:'100%',
      height:'50%'
  },

  animation:{
    // borderWidth:2,
    // borderColor:'black',
    height:500,
    marginBottom:200
  },
  nextbutton:{
    borderWidth:.4,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    width:"30%",
    borderRadius:20,
    borderColor:'#000000',
    backgroundColor:'#F806CC',
    flex:.15,
  },
  output:{
    flex:.3,
    // borderWidth:1,
    width:'100%',
    justifyContent:"center",
    alignItems:'center',
  }
})