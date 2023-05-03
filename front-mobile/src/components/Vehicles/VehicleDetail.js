import React,{useEffect, useState} from 'react'
import {View,Text,Image, TextInput} from 'react-native'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
//API
import userService from '../../Services/apiServices/api';
import Messages from '../../utils/Messages';

export default function VehicleDetail() {

  const navigation = useNavigation()
  const [vehicle,setVehicle] = useState(Object);
  const [update,setUpdate] = useState(false);

  useEffect(()=>{
    fetchVehicle()
  },[update])

  const fetchVehicle=async()=>{

    const userId = await userService.authenticatedUser();
    try{  
       const result = await userService.fetchVehicleByuserId(userId.data.id);
       setVehicle(result.data);
       setUpdate(true);
    }
    catch(error)  {
      if(error===403){
        Messages("Erro:"+error,'danger', 'top') ;
      }else{
        Messages("Erro ao buscar veículos. ",'danger', 'top') ;
      }
    }
  }

  return (
  <>
    <View style={styles.container} >
        <Image style={styles.image_login} source={require('../../assets/deliveryman.png')}/>
        <Text style={styles.title}>Seus Veículos</Text>
      
        <View style={[
                styles.content,{marginHorizontal:0,
                  marginTop:0,paddingTop:0,paddingVertical:0,
                  borderRadius: 0,height:'75%', backgroundColor:"#fff" 
                }]}>

              <View style={styles.line}></View>
              <View style={styles.dataVehicle} >
                 <Text style={styles.lineTitle}>Tipo</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                   {vehicle.vehicle_Type}
                 </Text>
              </View>    
              <View style={styles.line}></View>
              <View style={styles.dataVehicle} >
                 <Text style={styles.lineTitle}>Ano fabricação</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                   {vehicle.year_Manufacture}
                 </Text>
              </View>  
              <View style={styles.line}></View>  
              <View style={styles.dataVehicle} >
                 <Text style={styles.lineTitle}>Cor principal</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                   {vehicle.color}
                 </Text>
              </View> 
              <View style={styles.line}></View>   
              <View style={styles.dataVehicle} >
                 <Text style={styles.lineTitle}>Placa</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                   {vehicle.license}
                 </Text>
              </View>  
              <View style={styles.line}></View>
              <View style={styles.dataVehicle} >
                 <Text style={styles.lineTitle}>Quilometragem</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                   {vehicle.mileage}
                 </Text>
              </View>  
              <View style={styles.line}></View>
           </View>
    </View>
  </>
);
}

