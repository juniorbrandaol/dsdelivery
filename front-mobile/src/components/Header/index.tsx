import {View,Text,Image} from 'react-native'
import styles from "./styles";


export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')}/>
      <Text style={styles.text_logo}>DS Delivery</Text>
    </View>
  );
}

