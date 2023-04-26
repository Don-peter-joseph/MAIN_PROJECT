import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImagePickerComponent from "./Components/imagePickerComponent";
import callGoogleVisionAsync from "./Components/helperFunctions";
import getNutritionalInformation  from './Components/syntaxAnalysis';

export default function textDetection() {
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
