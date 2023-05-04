import {ScrollView,Alert,Text,RefreshControl} from 'react-native'
import styles from "./styles";
import Header from '../Header';
import OrderCard from '../OrderCard';
import { useEffect, useState } from 'react';
import { Order } from '../../models/Order';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { useNavigation,useIsFocused } from '@react-navigation/native';
//API
import userService from "../../Services/apiServices/api";

export default function Orders() {
 
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [orders,setOrders]= useState<Order[]>([]);
  const [refreshing, setRefreshing] = useState(false)

  useEffect(()=>{
    if(isFocused){
      fetchOrders();
    }
  },[isFocused])

  const fetchOrders = async () => {
    setIsLoading(true);
    try{
       await userService.fetchOrdersByStatus(0).then(response=>{
          setOrders(response.data);
       })
    }
    catch(error){
      console.log(error)
      Alert.alert('Erro ao carregar pedidos');
    }
    finally{
      setIsLoading(false);
    }
 }

 const  handleOnPress=(order:Order)=>{
  navigation.navigate('OrdersDetails',{
      order
  });
 }

 const refreshData = () => {
  if(isFocused){
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
      <Header/>
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
                 <OrderCard order={item} detailsOrder={false}/>
              </TouchableWithoutFeedback>
            ))
           )
         }
      </ScrollView>
    </>
  );
}

