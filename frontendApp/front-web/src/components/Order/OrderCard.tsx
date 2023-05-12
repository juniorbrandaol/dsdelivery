import { useNavigate   } from 'react-router-dom';
import './styles.css';
import {OrdersList} from '../../models/Order'
import {formatPrice} from '../../utils/Formatters'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime'

type Props={
  order: OrdersList;
}

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

function OrderCard({order}:Props){

  const navigation = useNavigate();
 
  const dateFromNow=(date:string)=>{
    return dayjs(date).fromNow();
  }

  const onSelectOrder=async(order:any)=>{
      navigation("/orderDetails", { state: { order: order } });
  }

  return (
   <div 
     className='order-card-container ' key={order.id}
       onClick={()=>onSelectOrder(order)}
   >
     <div className='order-card-content'>
        <h3 className='order-card-id'>
            #{order.id}
        </h3>
        <h3 className='order-card-price'>
          {formatPrice(order.total,'BRL',2)}
        </h3>
     </div>   
     <h3 className='order-details-card-status'>{order.status}</h3> 
     <div className='order-card-moment'>
        <p>
          {dateFromNow(order.moment)}
        </p>
     </div>
   </div>
  )
}

export default OrderCard;