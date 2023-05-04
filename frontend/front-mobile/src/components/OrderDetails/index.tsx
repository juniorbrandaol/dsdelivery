import {View,Text,Alert,Linking} from 'react-native'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler'
import Header from '../Header';
import { Order } from '../../models/Order';
import OrderCard from '../OrderCard';

type Props={
  route:{
    params:{
      order:Order;
    }
  }
}

export default function OrderDatails({route}:Props) {
    
  const navigation = useNavigation();
  const {order} = route.params;
  const  handleOnCancel=()=>{
    navigation.navigate('Orders')
  }
  const handleStartNavigation=()=>{
     Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`)
  }
//onPress={()=>handleConfirmDelivery()}
  return (
    <>
       <Header/> 
        <View style={styles.container}>
          <OrderCard order={order} detailsOrder={true}/>
          <RectButton style={styles.button} onPress={handleStartNavigation}>
             <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
          </RectButton>
          <RectButton style={styles.button} >
             <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
          </RectButton>
          <RectButton style={styles.button} onPress={handleOnCancel}>
             <Text style={styles.buttonText}>CANCELAR</Text>
          </RectButton>
        </View>
     </>
  );
}

