import {View,Text,Image} from 'react-native'
import styles from "./styles";
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import {AntDesign } from '@expo/vector-icons'; 

/*TouchableWithoutFeedback => torna uma view clicavel*/

export default function Header() {
    
  const navigation = useNavigation();
 
  const  handleOnPress=()=>{
      navigation.goBack();
  }

  return (
     <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={styles.container}>
          <View style={styles.grid}>
             <AntDesign style={styles.headerButton} name="left" size={26} color="white" />
          </View>
          <View style={styles.grid}>
            <Image source={require('../../assets/logo.png')}/>
            <Text style={styles.text_logo}>DS Delivery</Text>
          </View>
          <View style={styles.grid}>
       
          </View>  
        </View>
     </TouchableWithoutFeedback>    
  );
}

