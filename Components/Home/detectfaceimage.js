import { Auth } from "aws-amplify";
import { useState } from "react";
import { View, Text, StyleSheet,Button, TextInput,Pressable,Image,ImageBackground, Alert } from "react-native";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetectFaceImage = ({route, navigation }) => {

    const {image} = route.params;
    return (
        <View style={styles.outline}>
            <View style={styles.row}>
                <Image source={{uri:image.uri}} style={styles.camera}/>
                <Button title='Open cam' onPress={()=>navigation.navigate("detectfacescreen")}></Button>
            </View>
            <View style={styles.row}>
                <Text>hii</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outline: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:' #f5f5f5',
        position:'absolute',
        width:windowWidth,
        height:windowHeight,
    },
    camera:{
        // flex:1,
        width:'100%',
        height:'50%',
        borderWidth:2,
        borderColor:'blue'
    },
    row:{
        flex:1,
        borderWidth:2,
        borderColor:'red',
        width:'100%',
    }
});

export default DetectFaceImage
