import {ScrollView,Text,RefreshControl,View} from 'react-native'
import styles from "./styles";
import Header from '../Header';
import DeliveryCard from '../DeliveryCard';
import { useEffect, useState,useRef } from 'react';
import { DeliveryModel } from '../../models/DeliveryModel';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { RectButton} from 'react-native-gesture-handler'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { Status } from '../Enuns/Status';
//API
import userService from "../../Services/apiServices/api";
import Messages from '../../utils/Messages';

export default function Delivery() {
 
  const navigation = useNavigation<any>();
  const refText = useRef<any>(null);
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [status,setStatus] = useState("");
  const [orders,setOrders]= useState<DeliveryModel[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    if(isFocused){
      fetchOrders();
    }
  },[isFocused])

  const fetchOrders = async () => {
    setIsLoading(true);
    try{
       const userId = await userService.authenticatedUser(); 
       const result = await userService.fetchDeliveriesByUserId(userId.data.id);
       setOrders(result.data);
    }
    catch(error){
      Messages(""+error,'danger', 'top') ;
    }
    finally{
      setIsLoading(false);
    }
  }

  const  handleOnPressStatus=(status:string)=>{
    setStatus(status);
  }

  const  handleOnPress=(item:DeliveryModel)=>{
       if(item.status!=Status[1]){
        Messages("Este pedido não pode ser alterado",'danger', 'top') ;
       }else{
         navigation.navigate("DeliveryDetails",{
           delivery:item
         })
       }
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
      <Header goback={true} title='Suas Entregas'/>
      <View style={styles.deliveryType}>
        <RectButton 
          style={styles.button}
          onPress={()=>handleOnPressStatus('')}
        >
           <Text ref={refText} style={styles.text}>ALL</Text>
        </RectButton> 
        
        <RectButton 
          style={styles.button}
          onPress={()=>handleOnPressStatus(Status[1])}
        >
          <Text  style={styles.text}>ACCEPTED</Text>
        </RectButton> 
        
        <RectButton 
          style={styles.button}
          onPress={()=>handleOnPressStatus(Status[3])}
        >
          <Text style={styles.text}>DELIVERED</Text>
        </RectButton> 
      </View>
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
                 <DeliveryCard delivery={item} status={status}/>
              </TouchableWithoutFeedback>
            ))
           )
         }
      </ScrollView>
    </>
  );
}

