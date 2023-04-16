import {View,Text,Image} from 'react-native'
import styles from "./styles";
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import Home from '../Home';

/*TouchableWithoutFeedback => torna uma view clicavel*/

export default function Header() {
    
  const navigation = useNavigation();
 
 

  const  handleOnPress=()=>{
      navigation.navigate('Home')
  }

  return (
     <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={styles.container}>
          <Image source={require('../../assets/logo.png')}/>
          <Text style={styles.text_logo}>DS Delivery</Text>
        </View>
     </TouchableWithoutFeedback>    
  );
}

