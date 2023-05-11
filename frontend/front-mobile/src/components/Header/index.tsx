import {View,Text,Image} from 'react-native'
import styles from "./styles";
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import {AntDesign } from '@expo/vector-icons'; 

/*TouchableWithoutFeedback => torna uma view clicavel*/
type Props={
 goback:Boolean;
 title: string
}

export default function Header({goback,title}:Props) {
    
  const navigation = useNavigation();
 
  const  handleOnPress=()=>{
      navigation.goBack();
  }

  return (
     <TouchableWithoutFeedback 
           style={[styles.button, title ? {height:130}: {height:90}]} 
           onPress={handleOnPress}
     >
        <View style={styles.container}>
          {goback===true?
            <View style={styles.grid}>
              <AntDesign style={styles.headerButton} name="left" size={26} color="white" />
            </View>
          :
          <View style={styles.grid}>
          </View>
          }
          <View style={styles.grid}>
            <Image source={require('../../assets/logo.png')}/>
            <Text style={styles.title_logo}>DS Delivery</Text>
          </View>
          <View style={styles.grid}>
       
          </View>  
        </View>
        <Text style={styles.title_msg}>{title}</Text>
     </TouchableWithoutFeedback>    
  );
}

