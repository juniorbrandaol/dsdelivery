import React,{useState} from 'react'
import {View,Text,Image,TextInput,ScrollView,KeyboardAvoidingView,Platform} from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
//API
import userService from '../../Services/apiServices/api';
import Storage from '../../Services/storageServices/Storage';

import Messages from '../../utils/Messages';

export default function Login() {

  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -100 : 0
  const behavior = Platform.OS === 'ios' ? "position" : 'position'
 
  const data={
      email:email,
      password:password
  }
  
  const handleOnPressSend=async()=>{
    
    if(checkInputs()===false){
      return
    }
    try{  
        var auth= await userService.auth(data);
        Storage.setToken(auth.data.token); 
        checkIsUserHasVehicle()
    }
    catch(error: any)  {
        Messages(""+error,'danger', 'top') ;
    }
  }

  const checkIsUserHasVehicle=async()=>{
    const userId = await userService.authenticatedUser();
    try{  
      await userService.fetchVehicleByuserId(userId.data.id);
      navigation.navigate('Orders') 
    }
    catch(error: any)  {
      Messages("Você não tem um veículo cadastrado.",'danger', 'top') ;
      navigation.navigate('RegisterVehicle')
    }
  }

  const handleOnPressRegister=()=>{
    navigation.navigate('Register') 
  }

  const checkInputs=()=>{
    
     if(email===""){
       Messages('Informe o email. ', 'warning', 'top')
       return false;
     }
     if(password===""){
       Messages('Informe a senha. ', 'warning', 'top')
       return false;
     }
     return true;
 }

  return (
    <>
      <View style={styles.container} >
          <Image style={styles.image_login} source={require('../../assets/deliveryman.png')}/>
          <Text style={styles.title}>Faça seu Login</Text>
         
          <KeyboardAvoidingView
            style={{ flex:1 }}
            behavior={behavior}
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <ScrollView style={{height:'100%'}} keyboardShouldPersistTaps='handled'>
              <View style={[styles.content,{height:'50%'}]}>
                <TextInput style={styles.text_Input}
                  placeholder="Email"
                  onChangeText={value => setEmail(value)}
                  keyboardType={'email-address'}
                />
                <TextInput style={styles.text_Input} placeholder="Senha"
                  onChangeText={value => setPassword(value)}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.footer}>
                <RectButton 
                  style={styles.button}
                  onPress={handleOnPressSend}
                >
                  <Text style={styles.buttonText}>ENVIAR</Text>
                </RectButton>
                <RectButton 
                  style={styles.button}
                  onPress={handleOnPressRegister}
                >
                  <Text style={styles.buttonText}>CADASTRE-SE</Text>
                </RectButton>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
       </View>
    </>
  );
}

