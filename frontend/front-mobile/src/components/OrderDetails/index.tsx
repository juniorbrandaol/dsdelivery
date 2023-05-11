import React,{useEffect,useState} from 'react';
import {View,Text,Linking} from 'react-native'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import {RectButton, ScrollView} from 'react-native-gesture-handler'
import Header from '../Header';
import { OrderModel } from '../../models/OrderModel';
import OrderCard from '../OrderCard';
import userService from '../../Services/apiServices/api';
import Messages from '../../utils/Messages';

type Props={
  route:{
    params:{
      order:OrderModel;
    }
  }
}

export default function OrderDatails({route}:Props) {

  const [acceptedDelivery,setAcceptedDelivery] = useState('');
    
  const navigation = useNavigation<any>();
  const {order} = route.params;
  
  const  handleOnCancel=async()=>{
      navigation.navigate('Orders' as never);
  }

  const handleDelivery=async()=>{
    
    try{
     const response = await userService.fetchOrderById(order.id);
     
         if(response.data.status=='ACCEPTED'){
          const userId = await userService.authenticatedUser();
            const payload={
              orderId:response.data.id,
              user:userId.data.id,
              address : response.data.address,
              total : response.data.total
            }
            try{
              await userService.saveDelivery(payload); 
              Messages("Pedido aceito.",'success', 'top') ;
              navigation.navigate("Order")
            }catch(error){
              Messages("Pedido não pode ser aceito",'danger', 'top') ;
            }  
         }else{
           Messages("Pedido ainda não foi aceito pela empresa",'danger', 'top') ;
         }
         setAcceptedDelivery(response.data.status);
     }
    catch(error:any){
      Messages(""+error,'danger', 'top') ;
    }
  }

  const handleStartNavigation=()=>{
  
    if(acceptedDelivery=='ACCEPTED'){
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`)
    }else{
       Messages("Aceite a entrega do pedido primeiro.",'danger', 'top') ;
    }
  }

  return (
    <>
       <Header goback={true} title=''/> 
        <View style={styles.container}>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <OrderCard order={order}  showDetailsOrder={true}/>
            <RectButton style={styles.button} onPress={handleStartNavigation}>
              <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={handleDelivery} >
              <Text style={styles.buttonText}>ACEITAR ENTREGA</Text>
            </RectButton>
            <RectButton style={[styles.button,{marginBottom:'10%'}]} onPress={handleOnCancel}>
              <Text style={styles.buttonText}>CANCELAR</Text>
            </RectButton>
          </ScrollView>
        </View>
     </>
  );
}

