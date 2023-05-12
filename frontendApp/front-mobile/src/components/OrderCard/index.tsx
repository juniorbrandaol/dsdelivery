
import React,{useState,useEffect} from 'react';
import {View,Text} from 'react-native';
import styles from './styles.js'
import { OrderModel } from '../../models/OrderModel.js';
import {formatPrice}  from '../../utils/Formatters';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime'
import { MaterialIcons } from '@expo/vector-icons';
//API
import userService from '../../Services/apiServices/api';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

type Props={
  order:OrderModel;
  showDetailsOrder: boolean;
  selectedDeliveries?:any;
}

function OrderCard({order,showDetailsOrder,selectedDeliveries}:Props) {
  const [isSelected, setIsSelected] =useState(Boolean);
  const [isClientDatails,setIsClientDatails]= useState(false);
  const [client,setClient] = useState(Object);

  useEffect(()=>{
      if(selectedDeliveries)
      checkIsDeliverySelected();
  },[order]);

  const checkIsDeliverySelected=async()=>{
    setIsSelected(selectedDeliveries.some( (item: { orderId: number
     })  => item.orderId === order.id ));
  }

  const fetchUser=async()=>{
   
    try{  
      const result = await userService.fetchUser(order.client);   
      setClient(result.data);
    }
    catch(error)  {
     console.log(error);
    }
  }

  const dateFromNow=(date:string)=>{
    return dayjs(date).fromNow();
  }
  const dateFromDate=(date:any)=>{
    return dayjs(date).format('dddd h:mm');
  }

  const showPhone=()=>{
    fetchUser();
    setIsClientDatails(!isClientDatails);
  }

  return (
    <View style={[styles.container,{borderColor:isSelected?'#DA5C5C':'#fff' }]} >
      <View style={styles.header}>
         <Text style={styles.orderName}>Pedido# {order.id}</Text>
         <Text style={styles.orderPrice}>{formatPrice(order.total,'BRL',2)}</Text>
      </View>
      <Text style={styles.text}>Realizado {dateFromDate(order.moment)}, {dateFromNow(order.moment)}</Text>
      <View style={styles.line}></View>
      <View style={styles.productsList}>
         {
          order.items.map(item=>(
            <Text style={styles.text} key={item.id}>{item.name}</Text>
          ))
         }
      </View>
      <View style={styles.amount}>
        <Text style={styles.text}>itens:{order?.items.length}</Text>
      </View>
      {showDetailsOrder===true ?
       <View>
         <View style={styles.line}></View>
         <View style={styles.address}>
            <Text style={styles.addressName}>{order.address}</Text>
         </View>
         <MaterialIcons onPress={()=>showPhone()} name="contact-phone" size={30} color="black" />
         {isClientDatails?
            <View style={styles.clientDetails}>
              <Text style={styles.textClient}>{client.firstName}</Text>
              <Text style={styles.textClient}>{client.phone}</Text>
            </View>  
          :
          <></>
         }
       </View>
      :
       <></>
      }
    </View>
  );
}

export default OrderCard;
