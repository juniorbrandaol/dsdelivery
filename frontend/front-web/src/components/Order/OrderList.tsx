import {useEffect, useState,useCallback} from 'react'
import './styles.css';
//API
import userService from '../../Services/apiServices/Api';
import Navbar from '../Navbar';
import { toast } from "react-toastify";
import {OrdersList} from '../../models/Order'
import OrderCard from './OrderCard';
import AsyncSelect from 'react-select/async';
import {useNavigate} from 'react-router-dom'

type INITIAL_DATA ={value: number, label: string }

function OrderList(){

  const navigation= useNavigate()
  const [update,setUpdate] = useState(false)
  const [selectData, setselectData] = useState<INITIAL_DATA>(
     {value:100,label:"TODOS"},
  );

  const [orders,setOrders]=useState<OrdersList[]>([]);

  useEffect(()=>{
    checkIsConnected();
    fetchOrders()
  },[update])

  const checkIsConnected=useCallback(async()=>{
    
    try{ 
      await userService.userIsAuthenticated();
    }catch(error){   
      
      if(error===403){
        toast.warning("Verifique sua conexão");  
      }else{
        toast.warning("Erro "+error);  
      }
      navigation("/");
    }
  },[]);

  const fetchOrders=async()=>{
    
    const userId = await userService.authenticatedUser();
    try{
      if(selectData.value===100){
        await userService.listOrdersByUserId(
          userId.data.id).then(response=>{
           setOrders(response.data);
       })
      }else{
        await userService.listOrdersByUserIdStatusId(
          userId.data.id,selectData.value).then(response=>{
           setOrders(response.data);
       })
      }
    }
    catch(error:any){
     toast.error("Erro: " + error.code) ;
    }
  }

  const loadOptions=async()=>{
   const data= [
      {value: 100, label: "TODOS"},
      {value: 0, label: "PENDING"},
      {value: 1, label: "DELIVERED"},
    ]
    return data
  }

  const handleChangeSelect = (place: INITIAL_DATA) => {
    setselectData(place)
    setUpdate(!update)
  };

  return(
      <>
        <div className='orders-container'>
           <Navbar />
       
           <div className='content-order-list'>
              <h2 className='orders-list-title'>Seus pedidos</h2>
              <h3 className="status-title">
                Selecione o status do pedido:
              </h3>   
              <div className="filter-select-status">
                <AsyncSelect
                  className="filter-status"
                  loadOptions={loadOptions}
                  value={selectData}
                  defaultOptions
                  onChange={value=>handleChangeSelect(value as INITIAL_DATA)}
                />
              </div>  
           </div>   
           <div className="orders-list-items">
            {
            orders.map( item =>{
              return(
                <OrderCard 
                    order={item} 
                    key={item.id}
                  />  
              )
            })}
           </div>
        </div>
      </>
  )
}

export default OrderList;