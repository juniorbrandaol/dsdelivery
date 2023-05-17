import {ScrollView,Text,RefreshControl} from 'react-native'
import styles from "./styles";
import Header from '../Header';
import OrderCard from '../OrderCard';
import { useEffect, useState} from 'react';
import { OrderModel } from '../../models/OrderModel';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { useNavigation,useIsFocused } from '@react-navigation/native';

//API
import userService from "../../Services/apiServices/api";
import Messages from '../../utils/Messages';

export default function Order() {
 
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [orders,setOrders]= useState<OrderModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDelivery,setSelectedDelivery] = useState<any>();
  const [update,setUpdate]=useState(false);

 
  useEffect(()=>{
    if(isFocused){ 
      fetchOrders();
      fetchDeliveries();
    }
   
  },[isFocused])

  const fetchOrders = async () => {
    
    try{
       const result = await userService.fetchOrdersByStatus(1)
       setOrders(result.data);
    }
    catch(error){
      Messages(""+error,'danger', 'top') ;
    }
    finally{
      setIsLoading(false);
      setUpdate(true);
    }
 }

 const fetchDeliveries = async () => {
  
  try{
  //  const userId = await userService.authenticatedUser(); 
    const result =await userService.fetchDeliveries();
    setSelectedDelivery(result.data)
  }
  catch(error){
    Messages(""+error,'danger', 'top') ;
  }
}

 const  handleOnPress=(order:OrderModel)=>{

   const status = selectedDelivery.some( (item: { orderId: number
   })  => item.orderId === order.id);
   if(status==true){
     Messages("Pedido não disponível",'danger', 'top') ;
     return
   }
    navigation.navigate('OrdersDetails',{
       order 
   });
 }

 const refreshData = () => {
  if(isFocused){
    fetchDeliveries();
    fetchOrders();
  }
}

 const refreshControl = () => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={() => refreshData()}
      title={'refresh...'}
    />
  )
}

  return (
    <>
      <Header goback={false} title=''/>
        <ScrollView  
           style={styles.container}
           showsVerticalScrollIndicator={false}
           refreshControl={refreshControl()}
        >
         {
           isLoading ? (
            <Text>Buscando pedidos....</Text>
           ):
           (
            orders.map(item=>(
              <TouchableWithoutFeedback 
                 key={item.id}
                 onPress={()=>handleOnPress(item)}
              >
                 <OrderCard  order={item} selectedDeliveries={selectedDelivery} showDetailsOrder={false}/>
              </TouchableWithoutFeedback>
            ))
           )
         }
      </ScrollView>
    </>
  );
}

