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

Amplify.configure(awsconfig);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Scanimage=({navigation,route})=>{


    const[hasCameraPermission,sethasCameraPermission]=useState(null);
    // const [CameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [takenImage, setTakenImage] = useState();
    const [type,settype]=useState(Camera.Constants.Type.back);
    const [flash,setflash]=useState(Camera.Constants.FlashMode.off);
    const cameraRef=useRef(null);
    // const byteimage="";

    useEffect(()=>{
        (async()=>{
            MediaLibrary.requestPermissionsAsync();
            const camerastatus=await Camera.requestCameraPermissionsAsync();
            sethasCameraPermission(camerastatus.status==='granted');
        })();
    },[])

    //client for aws rekognition
    const client = new RekognitionClient({
        region: 'ap-south-1',
        credentials: {
          accessKeyId:'AKIAWOOMMV3GPB3EJZB5',                          //change it important
          secretAccessKey: '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',
        }
    });

    if(hasCameraPermission===false){
        return <Text>No camera permission</Text>
    }



    //converting image to base64 binary
    
    const detectLabels=async(sourceBytes)=>{
      const detectLabelsCommand = new DetectLabelsCommand({
        Image: {
          Bytes: sourceBytes,
        },
        MaxLabels: 10,
      });
      
      client.send(detectLabelsCommand).then((response) => {
        console.log(response.Labels);
      }).catch((error) => {
        console.error(error);
      });
    }

    // const detectLabels = async (sourceBytes) => {
    //     // console.log(sourceBytes)
    //     try {
    //       const params = {
    //         Image: {
    //           Bytes: sourceBytes,
    //         },
    //         MaxLabels: 10,
    //         MinConfidence: 70,
    //       };         
    //       const command = new DetectLabelsCommand(params);
    //       const response = await client.send(command);
    //       console.log("THIS IS response\n"+response)
    //       console.log(response.Labels);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };

      //upload image to s3 bucket

      const fetchimage=async(imageuri)=>{
        const response=await fetch(imageuri);
        const blob=await response.blob();
        return blob;
      }

      const uploadimage=async(image)=>{
        const img=await fetchimage(image.uri)
        return Storage.put(`demo${Math.random()}.jpg`,img,{
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
          })
        }).catch(error=>{
          console.log(error);
        })
      }

      const takePicture=async()=>{
        if(cameraRef){
            try{
                const options={quality:0.5,base64:false,skipProcessing:true};
                const data=await cameraRef.current.takePictureAsync(options);          
                setTakenImage(data.uri);
                // await detectLabels(data.base64);
                uploadimage(data);

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