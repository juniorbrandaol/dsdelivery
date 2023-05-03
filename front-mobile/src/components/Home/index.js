import React,{useEffect,useCallback,useState} from 'react'
import {View,Text,Image} from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
//API
import userService from '../../Services/apiServices/api';


export default function Home() {

  const navigation = useNavigation()

  const handleOnPress=async()=>{
    try{ 
       await userService.userIsAuthenticated();
       checkIsUserHasVehicle()
    }catch(error){ 
       navigation.navigate('Login')
    }
  }

  const checkIsUserHasVehicle=async()=>{
    const userId = await userService.authenticatedUser();
    try{  
      await userService.fetchVehicleByuserId(userId.data.id);
      navigation.navigate('Orders') 
    }
    catch(error)  {
      navigation.navigate('RegisterVehicle')
    }
  }

  return (
    <>
        <View style={styles.container} >
          <Image source={require('../../assets/deliveryman.png')}/>
          <Text style={styles.title}>Acompanhe os pedidos e {'\n'}entregue no prazo!</Text>
          <Text style={styles.subTitle}>Receba todos os pedidos do seu{'\n'} restaurante na palma da sua mão</Text>
        </View>
        <View style={styles.footer}>
           <RectButton 
             style={styles.button}
             onPress={handleOnPress}
           >
             <Text style={styles.buttonText}>VER PEDIDOS</Text>
           </RectButton>
        </View>
    </>
  );
}

