import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import { useFonts,OpenSans_400Regular,OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import AppLoading from 'expo-app-loading';
import Home from './src/components/Home';

export default function App() {

  let[fontsLoaded ]= useFonts({
    OpenSans_700Bold,
    OpenSans_400Regular
  });
  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header/>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
