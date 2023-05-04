import {View,Text} from 'react-native';
import styles from './styles.js'
import { Order } from '../../models/Order.js';
import {formatPrice}  from '../../utils/Formatters';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

type Props={
  order:Order;
  detailsOrder: boolean;
}

function OrderCard({order,detailsOrder}:Props) {

  const dateFromNow=(date:string)=>{
    return dayjs(date).fromNow();
  }
  const dateFromDate=(date:any)=>{
    return dayjs(date).format('dddd h:mm');
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
         <Text style={styles.orderName}>Pedido {order.id}</Text>
         <Text style={styles.orderPrice}>{formatPrice(order.total,'BRL',2)}</Text>
      </View>
      <Text style={styles.text}>Realizado {dateFromDate(order.moment)}, {dateFromNow(order.moment)}</Text>
      <View style={styles.line}></View>
      <View style={styles.productsList}>
         {
          order.products.map(item=>(
            <Text style={styles.text} key={item.id}>{item.name}</Text>
          ))
         }
      </View>
      {detailsOrder===true ?
       <View>
         <View style={styles.line}></View>
         <View style={styles.address}>
            <Text style={styles.addressName}>{order.address}</Text>
         </View>
       </View>
      :
       <></>
      }
    </View>
  );
}

export default OrderCard;
