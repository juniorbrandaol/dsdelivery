import {ScrollView,Alert,Text} from 'react-native'
import styles from "./styles";
import Header from '../Header';
import OrderCard from '../OrderCard';
import { useEffect, useState } from 'react';
import { Order } from '../../models/Order';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { useNavigation,useIsFocused } from '@react-navigation/native';
//API
import userService from "../../apiServices/api";

export default function Orders() {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [orders,setOrders]= useState<Order[]>([]);

  useEffect(()=>{
    if(isFocused){
      fetchOrders();
    }
  },[isFocused])

  const fetchOrders = async () => {
    setIsLoading(true);
    try{
       await userService.findAllOrders().then(response=>{
          setOrders(response.data);
       })
    }
    catch(error){
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

  return (
    <>
      <Header/>
        <ScrollView  style={styles.container}>
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
                 <OrderCard order={item}/>
              </TouchableWithoutFeedback>
            ))
           )
         }
      </ScrollView>
    </>
  );
}

