import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';

function ImagePickerComponent({ onSubmit }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('Please add an image');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true, //return base64 data.
      //this will allow the Vision API to read this image.
    });
    if (!result.canceled) { //if the user submits an image,
      setImage(result.assets[0].uri)
      //run the onSubmit handler and pass in the image data. 
      setText("Loading..");
      const responseData = await onSubmit(result.assets[0].base64);
  setText(responseData.text); 
    }
  };
  console.log("test "+text);
  return (
    <View style={styles.imagepreviewcontainer}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.imageStyle}
        />
      )}
      <Text style={styles.recogtext}>{text}</Text>
    </View>
  );
}
export default ImagePickerComponent;

const styles=StyleSheet.create({
    imagepreviewcontainer:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:200,
        backgroundColor:'#f0cced',
        marginVertical:8,
        borderRadius:8,
        marginTop: 200,
        },
    imageStyle:{
      marginTop:60,
    width:'100%',
    height:'100%',
    },
    recogtext:{
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 60,
    }
    })