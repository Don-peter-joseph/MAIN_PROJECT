import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet,StatusBar,TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';
import { S3Client,RekognitionClient, DetectLabelsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-rekognition";
import { Camera,CameraType} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import {Amplify,Storage} from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import {RNS3} from 'react-native-aws3';
import { fromByteArray } from "base64-js";
import {Predictions} from '@aws-amplify/predictions';
// import RNFetchBlob from 'react-native-fetch-blob';
import {Buffer} from 'buffer';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Scanimage=({navigation,route})=>{


    const[hasCameraPermission,sethasCameraPermission]=useState(null);
    const [takenImage, setTakenImage] = useState();
    const [type,settype]=useState(Camera.Constants.Type.back);
    const [flash,setflash]=useState(Camera.Constants.FlashMode.off);
    const cameraRef=useRef(null);

    useEffect(()=>{
        (async()=>{
            MediaLibrary.requestPermissionsAsync();
            const camerastatus=await Camera.requestCameraPermissionsAsync();
            sethasCameraPermission(camerastatus.status==='granted');
        })();
    },[])

    if(hasCameraPermission===false){
        return <Text>No camera permission</Text>
    }


      //upload image to s3 bucket

      const fetchimage=async(imageuri)=>{
        const response=await fetch(imageuri);
        const blob=await response.blob();
        return blob;
      }

        const base64ToArrayBuffer = (base64) => {
        const bytes = Buffer.from(base64, 'base64');
        const arrayBuffer = bytes.buffer;
        return arrayBuffer;
        };

      // const uploadimage=async(image)=>{
      //   const img=await fetchimage(image.uri)
      //   return Storage.put(`demo${Math.random()}.jpg`,img,{
      //       level:'public',
      //       contentType:image.type,
      //       progressCallback(uploadProgress){
      //         console.log('PROGRESS-- ',uploadProgress.loaded+'/'+uploadProgress.total);
      //       }
      //     })
      //   .then((res)=>{
      //     Storage.get(res.key)
      //     .then((result)=>{
      //       console.log("RESULT-- ",result);
      //     })
      //     .catch(e=>{
      //       console.log(error);
      //     })
      //   }).catch(error=>{
      //     console.log(error);
      //   })
      // }

    
      const Recognize=async(file)=>{
        Predictions.identify({
          text: {
              source: {
                  file
              }
          }
      })
      .then(response => console.log({ response }))
      .catch(err => console.log({ err }));
      }

      const takePicture=async()=>{
        if(cameraRef){
            try{
                const options={quality:0.5,base64:true,skipProcessing:true};
                const data=await cameraRef.current.takePictureAsync(options);          
                setTakenImage(data.uri);
                // uploadimage(data);
                // const file={
                //   uri:data.uri,
                //   type:'image/jpeg',
                //   name:`textrecognition${Math.random()}.jpg`
                // }
                const arrayBuffer = base64ToArrayBuffer(data.base64);
                console.log(arrayBuffer.byteLength)
                Recognize(arrayBuffer);

            }catch(e){
                console.log(e);
            }
        }
    };

    return(
        <>
        <StatusBar hidden={true}/>
        {
            <View style={styles.outline}>
                {!takenImage?
                <>
                    <Camera 
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                    
                    >
                    </Camera>
                    <Pressable style={styles.button} onPress={takePicture}>
                    <Text>Take Picture</Text>
                    </Pressable>
                </>
                :
                <>
                    <Image source={{uri:takenImage}} style={styles.camera}/>
                    <Text>This is an image</Text>
                </>
                }
        </View>
        }
        </>
    )
}

const styles=StyleSheet.create({
    outline:{
        flex: 1,
        position:'absolute',
        width:windowWidth,
        height:windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:' #f5f5f5',
        // borderWidth:2,
        // borderColor:'red'
    },
    content:{
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
        height:'70%'
    },
    button:{
        width:150,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:4,
        borderColor:'red',
        borderRadius:10,
        marginTop:20
    }
})

export default Scanimage;