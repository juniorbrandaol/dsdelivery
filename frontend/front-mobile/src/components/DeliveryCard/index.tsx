
import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import styles from './styles.js'
import { DeliveryModel } from '../../models/DeliveryModel.js';
import {formatPrice}  from '../../utils/Formatters';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

type Props={

  delivery:DeliveryModel;
  status?:string;
}

function DeliveryCard({delivery,status}:Props) {

  useEffect(()=>{
 
  },[])

  const dateFromNow=(date:string)=>{
    return dayjs(date).fromNow();
  }
  const dateFromDate=(date:any)=>{
    return dayjs(date).format('dddd h:mm');
  }

  return (
    <>
    {status== ''?
      <View style={styles.container} >
        <View style={styles.header}>
          <Text style={styles.orderName}>Pedido# {delivery.orderId}</Text>
          <Text style={styles.orderPrice}>{formatPrice(delivery.total,'BRL',2)}</Text>
        </View>
        <Text style={styles.text}>Realizado {dateFromDate(delivery.createdAt)}, {dateFromNow(delivery.createdAt)}</Text>
        <View style={styles.line}></View>
        <Text style={[styles.text,{paddingTop:5,color: '#263238',
                  fontFamily: 'OpenSans_700Bold'}]}>{delivery.status}</Text>
        <View style={styles.line}></View>
        <View >
          <View style={styles.address}>
              <Text style={styles.addressName}>{delivery.address}</Text>
          </View>
        </View>
      </View>
    :
      
        status==delivery.status? 
        <View style={styles.container} >
        <View style={styles.header}>
          <Text style={styles.orderName}>Pedido# {delivery.orderId}</Text>
          <Text style={styles.orderPrice}>{formatPrice(delivery.total,'BRL',2)}</Text>
        </View>
        <Text style={styles.text}>Realizado {dateFromDate(delivery.createdAt)}, {dateFromNow(delivery.createdAt)}</Text>
        <View style={styles.line}></View>
        <Text style={[styles.text,{paddingTop:5,color: '#263238',
                  fontFamily: 'OpenSans_700Bold'}]}>{delivery.status}</Text>
        <View style={styles.line}></View>
        <View >
          <View style={styles.address}>
              <Text style={styles.addressName}>{delivery.address}</Text>
          </View>
        </View>
      </View>
        :
        <></>
      
    }
    </>
  );
}

export default DeliveryCard;
