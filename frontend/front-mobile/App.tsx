import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts,OpenSans_400Regular,OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import Routes from './src/routes/Routes';
import AppLoading from 'expo-app-loading';
import FlashMessage from "react-native-flash-message";

export default function App() {

  let[fontsLoaded ]= useFonts({
    OpenSans_700Bold,
    OpenSans_400Regular
  });
  if(!fontsLoaded){
   <AppLoading/>
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
     < Routes/>
     <FlashMessage style={{ elevation: 10 }} position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
