import React,{useEffect, useState} from 'react'
import {View,Text,Image,ScrollView,StatusBar} from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
//API
import userService from '../../Services/apiServices/api';
import Messages from '../../utils/Messages';
import imgDefault from '../../../src/assets/default.jpg'
import {AntDesign } from '@expo/vector-icons'; 

export default function Profile() {

  const [user,setUser] = useState<any>();
  const navigation = useNavigation();
  
  useEffect(()=>{
    
    fetchUser();
  },[])

  const fetchUser=async()=>{
    try{  
      const result = await userService.authenticatedUser();   
      setUser(result.data);
    }
    catch(error)  {
      if(error===403){
        Messages("Erro:"+error,'danger', 'top') ;
      }else{
        Messages("Erro ao buscar usuário. ",'danger', 'top') ;
      }
    }
  }
  
  const backHandleOnPress=()=>{
    navigation.goBack();
  }
  
  return (
    <>
      <View style={styles.container} >
         <StatusBar hidden={false} backgroundColor={'#DA5C5C'} />
         <View style={styles.header}>
            <View style={styles.titleHeader}>
                <RectButton style={styles.headerButton} onPress={backHandleOnPress}>
                  <AntDesign name="left" size={24} color="black" />
                </RectButton >
                <RectButton style={styles.headerButton} onPress={()=>alert('1')}>
                  <Text style={[styles.title,{fontSize:18}]}>Editar</Text>
                </RectButton>
                <RectButton style={styles.headerButton} onPress={()=>alert('1')}>
                   <Text style={[styles.title,{fontSize:18,paddingRight:30}]}>Salvar</Text>
                </RectButton>
            </View>
            <View style={styles.perfil}>
              <Image style={styles.imagePerfil} source={imgDefault}/>     
            </View>
         </View>    
         <View style={[
                styles.content,{marginHorizontal:0,
                  marginTop:0,paddingTop:0,paddingVertical:0,
                  borderRadius: 0,height:'75%', backgroundColor:"#fff" 
                }]}>
            <ScrollView>
              <View style={styles.line}></View>
              <View style={styles.dataProfile} >
                 <Text style={styles.lineTitle}>Primeiro nome</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                   {user?.firstName}
                 </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.dataProfile} >
                 <Text style={styles.lineTitle}>Último nome</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                    {user?.lastName}
                 </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.dataProfile} >
                 <Text style={styles.lineTitle}>Cpf</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                    {user?.cpf}
                 </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.dataProfile} >
                 <Text style={styles.lineTitle}>Telefone</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                     {user?.phone}
                 </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.dataProfile}>
                 <Text style={styles.lineTitle}>E-mail</Text>
                 <Text style={[styles.lineTitle,{paddingTop:5,color:'black'}]}>
                     {user?.email}
                 </Text>
              </View>
              <View style={styles.line}></View>
            </ScrollView>  
         </View>
      </View>
    </>
  );
}

