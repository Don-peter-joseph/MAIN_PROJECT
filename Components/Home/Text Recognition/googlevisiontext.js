import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImagePickerComponent from "./imagePickerComponent";
import callGoogleVisionAsync from "./helperFunctions";
// import getNutritionalInformation  from './Components/syntaxAnalysis';

const textDetection=()=> {
  return (
    <View>
      <ImagePickerComponent onSubmit={callGoogleVisionAsync} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default textDetection;