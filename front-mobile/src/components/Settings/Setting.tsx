import React,{useEffect, useState} from 'react'
import {View,Text,StatusBar,Image,ScrollView} from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons,AntDesign } from '@expo/vector-icons'; 
import Storage from '../../Services/storageServices/Storage';

//API
import userService from '../../Services/apiServices/api';
import Messages from '../../utils/Messages';

import imgDefault from '../../../src/assets/default.jpg'

export default function Setting() {

  const navigation = useNavigation()
  const [update,setUpdate] = useState(false);

  useEffect(()=>{
    
  },[update])

  const fetchVehicle=async()=>{

    const userId = await userService.authenticatedUser();
    try{  
       const result = await userService.fetchVehicleByuserId(userId.data.id);
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

  const logout= async()=>{
    await Storage.removeToken();
    navigation.navigate('Home') 
  }

 return (
  <>
    <View style={styles.container} >
       <StatusBar hidden={false} backgroundColor={'#DA5C5C'} />
       <View style={styles.header}>
          <Text style={styles.title}>Configurações</Text>
          <View style={styles.perfil}>
            <Image style={styles.imagePerfil} source={imgDefault}/>
            <Text style={styles.titlePerfil} > Edilson Brandao</Text>
            <RectButton style={styles.editButton} onPress={()=>alert('1')}>
               <MaterialIcons  name="edit" size={35} color="black" /> 
            </RectButton>
          </View>
       </View>    
       <View style={styles.content}>
          <ScrollView>
            <View style={styles.line}></View>
            <RectButton style={styles.buttonLink} >
               <Text style={styles.titleLink}>Editar Perfil</Text>
               <AntDesign name="right" size={24} color="#9E9E9E" />
            </RectButton>
            <View style={styles.line}></View>
            <RectButton style={styles.buttonLink} >
               <Text style={styles.titleLink}>Alterar Senha</Text>
               <AntDesign name="right" size={24} color="#9E9E9E" />
            </RectButton>
            <View style={styles.line}></View>
            <RectButton style={styles.buttonLink} >
               <Text style={styles.titleLink}>Suas mensagens</Text>
               <AntDesign name="right" size={24} color="#9E9E9E" />
            </RectButton>
            <View style={styles.line}></View>
            <RectButton style={styles.buttonLink} >
               <Text style={styles.titleLink}>Suporte</Text>
               <AntDesign name="right" size={24} color="#9E9E9E" /> 
            </RectButton>
            <View style={styles.line}></View>
            <RectButton style={styles.buttonLink} >
               <Text style={styles.titleLink}>Suas Corridas</Text>
               <AntDesign name="right" size={24} color="#9E9E9E" /> 
            </RectButton>
            <View style={styles.line}></View>
            <RectButton style={styles.buttonLink}>
               <Text style={styles.titleLink}>Sua Conta</Text>
               <AntDesign name="right" size={24} color="#9E9E9E" />
            </RectButton>
            <View style={styles.line}></View>
            <RectButton style={styles.buttonLink} onPress={()=>logout()}>
               <Text style={[styles.titleLink,{fontSize:22,color:'#DA5C5C'}]}>SAIR</Text>
               <AntDesign name="right" size={24} color="#9E9E9E" />
            </RectButton>
            <View style={styles.line}></View>
          </ScrollView>  
       </View>
    </View>
  </>
);
}

