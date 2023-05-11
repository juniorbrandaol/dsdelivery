import {useEffect, useState,useCallback} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import './styles.css';
import {ReactComponent as OrderPending} from '../../assets/imgs/pending.svg'
import {ReactComponent as OrderAccepted} from '../../assets/imgs/accepted.svg'
import {ReactComponent as OrderRejected} from '../../assets/imgs/rejected.svg'
import {ReactComponent as OrderDispatched} from '../../assets/imgs/dispatched.svg'
import {ReactComponent as OrderDelivered} from '../../assets/imgs/delivered.svg'
import { toast } from "react-toastify";

import Navbar from '../Navbar';
import {OrdersList} from '../../models/Order'

import {formatPrice} from '../../utils/Formatters'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
//API
import userService from '../../Services/apiServices/Api';

function OrderDetails(){
  
  const route= useLocation()
  const navigation = useNavigate();
  const [orders,setOrders]=useState<OrdersList>();
  const dateFromNow=(date:any)=>{
    return dayjs(date).fromNow();
  }

  const dateFromDate=(date:any)=>{
    return dayjs(date).format('MMMM DD/MM/YYYY dddd h:mm');
  }
  
  useEffect(()=>{
    checkIsConnected();
    setOrders(route.state.order)
  },[])

  const fetchStatusOrder=()=>{

    if(route.state.order.status==='PENDING'){
      return <OrderPending className='order-details-image-status'/>
    }else if(route.state.order.status==='ACCEPTED'){
      return <OrderAccepted className='order-details-image-status'/>
    }else if(route.state.order.status==='REJECTED'){
      return <OrderRejected className='order-details-image-status'/>
    }else if(route.state.order.status==='DISPATCHED'){
      return <OrderDispatched className='order-details-image-status'/>
    }else{
      return <OrderDelivered className='order-details-image-status'/>
    }
  }

  const checkIsConnected=useCallback(async()=>{
  
    try{
      await userService.userIsAuthenticated();
    }catch(error){   
      if(error===403){
        toast.warning("Verifique sua conexão.");  
      }else{
        toast.warning("Erro "+error);  
      }
      navigation("/");
    }
  },[])

  const updateStatus=async()=>{

    //status de delivered
    const statusId=1;
    const orderId =route.state.order.id
    try{
       await userService.updateOrderStatus(orderId,statusId);
       toast("Status alterado");  
       navigation("/orderList");
    }catch(error){
      if(error===404){
        toast.warning("Pedido não encontrado");  
      }else{
        toast.warning("Erro "+error);  
      }
    }

  }

  return(
      <>
       <Navbar />
        <div className='orders-container'>
          <div className='order-details-container'>
          <h2 className='orders-list-title'>Detalhes do pedido #{orders?.id}</h2>
            <div className='order-details-card-content'>
               <div className='order-details-status'>
                 <h3 className='order-details-card-status'>PEDIDO {orders?.status}</h3>
                 {fetchStatusOrder()}
                 {orders?.status==='DISPATCHED'?
                    <button 
                      className='order-details-send-status'
                      onClick={updateStatus}
                    >RECEBI O PEDIDO</button>
                 :
                 <></>
                 }
               </div> 
            </div>
            <span className='order-details-steps'>
               Realizado em {dateFromDate(orders?.moment)}, {dateFromNow(orders?.moment)}
            </span>
            <div className='order-details-style'>      
               <span className='order-details-steps'><strong>Detalhes do pedido</strong> </span>
               <span className='order-details-steps'><strong>itens: {orders?.items.length}</strong></span>
            </div>
            <div className='order-details-product'>
              {
                  orders?.items.map( (item) =>{
                    return(
                      <div className='order-details-product-card'>
                        <div >
                          <h3>1 {item.name}</h3>
                          <h3>{item.description}</h3>
                          <img 
                            className='order-details-image-product'
                            src={item.imageUri}
                            alt={item.name}
                          />
                        </div>
                        <div className='order-details-total'>
                          {formatPrice(item.price,'BRL',2)}
                        </div>
                      </div>
                    )
                })
              }
            </div>
            {
              <div className='order-details-summary'>
                <div>
                  <span className='order-details-steps'><strong>entrega</strong></span>
                </div>
                <span className='order-details-steps'>{orders?.address}</span>
                <p></p>
                <div>
                  <span className='order-details-steps'><strong>pagamento</strong></span>
                </div>
                <div className='order-details-style'>
                  <span className='order-details-steps'>total</span>
                  <span className='order-details-steps'>
                     <strong>{formatPrice(orders?.total,'BRL',2)}</strong>
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      </>
  )
}

export default OrderDetails;