import React,{useEffect,useState} from 'react';
import {View,Text} from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler'
import Header from '../Header';
import { Status } from '../Enuns/Status';
import { DeliveryModel } from '../../models/DeliveryModel';
import ConfigEmail from '../../Config/AppConfig';
import DeliveryCard from '../DeliveryCard';
import userService from '../../Services/apiServices/api';
import Messages from '../../utils/Messages';

type Props={
  route:{ params:{delivery:DeliveryModel}
  },
}

export default function DeliveryDatails({route}:Props) {

  const navigation = useNavigation<any>();
  const {delivery} = route.params;

  const handleOnChangeStatus=async(status:Status)=>{  

    const payload={
       orderId:route.params.delivery.orderId,
       statusId:status
    }
    try{
      await userService.updateDelivery(payload.orderId,payload.statusId); 
      sendEmail("edilson_brandaojunior@hotmail.com",
      "Confirmação de entrega de pedido",
      "Você confirmou a entrega #"+ `${delivery.orderId}`+". Por favor "+
       "Agurade contato da DSDelivery."
      )
      Messages("Entrega confirmada.",'success', 'top') ;
      if (navigation.canGoBack()) {
        navigation.goBack()
      }
    }catch(error){
      Messages("entrega não pode ser alterada",'danger', 'top') ;
    }
  }

  const handleOnDelete=async()=>{
    
    try{
      await userService.deleteDelivery(delivery.id);
      Messages("Entrega cancelada",'success', 'top') ;
     
      sendEmail("edilson_brandaojunior@hotmail.com",
                "Cancelamento de entrega",
                `Você cancelou pedido #`+ `${delivery.orderId}`+`. Por favor `+
                 `informar o motivo , clicando na aba Informações`
                )
      navigation.navigate('Orders' as never)          
    }
     catch(error:any){
       Messages("Entrega não pode ser cancelada",'danger', 'top') ;
    }
  }

  const sendEmail=(to:string,subject:string,body:string)=>{

    const payload={
       fromEmail : ConfigEmail.fromEmail,
       fromName:ConfigEmail.fromName,
       replyTo:ConfigEmail.replyTo,
       to:to,
       subject:subject,
       body:body,
       contentType:ConfigEmail.contentType,
    }
    try{
       userService.sendEmail(payload); 
    }catch(error){
      Messages("Erro ao tentar enviar e-mail "+error,'danger', 'top') ;
    }
  }

  return (
    <>
       <Header goback={true} title=''/> 
        <View style={styles.container}>
            <DeliveryCard delivery={delivery} status='' />
            <RectButton style={styles.button} onPress={()=>handleOnChangeStatus(Status.DELIVERED)}>
              <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
            </RectButton>
            <RectButton style={[styles.button,{marginBottom:'10%'}]} onPress={handleOnDelete}>
              <Text style={styles.buttonText}>CANCELAR ENTREGA</Text>
            </RectButton>
        </View>
     </>
  );
}

