import React,{useState} from 'react'
import {View,Text,Image,ScrollView, TextInput,KeyboardAvoidingView,Platform} from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
//API
import userService from '../../Services/apiServices/api';

import Messages from '../../utils/Messages';
import { UserModel } from '../../models/UserModel';

export default function Register() {

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0
  const behavior = Platform.OS === 'ios' ? "position" : 'position'

  const navigation = useNavigation()

  const [_user,set_User] = useState<UserModel>({
    firstName:'',
    lastName:'',
    cpf:'',
    phone:'',
    email:'',
    password:''
  });

  const handleOnPressSend=async()=>{

    if(checkInputs()===false){
      return
    }
    const data={
      firstName:_user.firstName,
      lastName:_user.lastName,
      cpf:_user.cpf,
      phone:_user.phone,
      email:_user.email,
      password:_user.password,
      rolles:[{id: 1}]
    }

    try{  
        await userService.saveUser(data);
        Messages("Usuário salvo. ",'success', 'top') ;
        navigation.navigate('Login' as never) 
    }
    catch(error: any)  {
      if(error.status===403){
        Messages("Erro:"+error,'danger', 'top') ;
      }else if(error.status===403){
        Messages("Erro: "+error,'danger', 'top') ;
      }else{
        Messages("Usuário não pode ser salvo. ",'danger', 'top') ;
      }
    }
  
  }

  const handleOnPressRegister=()=>{
    navigation.navigate('Register' as never) 
  }

  const checkInputs=()=>{

     if(_user?.firstName===undefined ||_user?.firstName==""){
      Messages('Informe o primeiro nome. ', 'warning', 'top')
      return false;
     }
     if(_user?.lastName===undefined || _user?.lastName===""){
       Messages('Informe o último nome. ', 'warning', 'top')
       return false;
     }
     if(_user?.cpf===undefined || _user?.cpf===''){
      Messages('Informe o cpf. ', 'warning', 'top')
      return false;
     }
     if(_user?.phone===undefined || _user?.phone===''){
      Messages('Informe o telefone. ', 'warning', 'top')
      return false;
     }
     if(_user?.email===undefined || _user?.email===""){
      Messages('Informe o email. ', 'warning', 'top')
      return false;
     }
     if(_user?.password===undefined ||_user?.password===""){
       Messages('Informe a senha. ', 'warning', 'top')
       return false;
     }
     return true;
 }

 return (
  
    <View style={styles.container} >
        <Image style={styles.imageLogin} source={require('../../assets/deliveryman.png')}/>
        <Text style={styles.title}>Faça seu Cadastro</Text>
        <Text style={styles.subTitle}>Você receberá no email um código de verificação</Text>
        <KeyboardAvoidingView
          style={{ flex:1 }}
          behavior={behavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <ScrollView style={{height:'100%'}}
             keyboardShouldPersistTaps='handled'
             showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <TextInput style={styles.text_Input}
                placeholder="Primeiro nome"
                onChangeText={(value) => set_User({..._user,firstName:value})}
                keyboardType={'default'}
              />
               <TextInput style={styles.text_Input}
                placeholder="Último nome"
                onChangeText={(value) => set_User({..._user,lastName:value})}
                keyboardType={'default'}
              />
               <TextInput style={styles.text_Input}
                placeholder="Cpf"
                onChangeText={(value) => set_User({..._user,cpf:value})}
                keyboardType={'numeric'}
              />
              <TextInput style={styles.text_Input}
                placeholder="Telefone"
                onChangeText={(value) => set_User({..._user,phone:value})}
                keyboardType={'numeric'}
              />
              <TextInput style={styles.text_Input}
                placeholder="Email"
                onChangeText={(value) => set_User({..._user,email:value})}
                keyboardType={'email-address'}
              />
              <TextInput style={styles.text_Input} placeholder="Senha"
                onChangeText={(value) => set_User({..._user,password:value})}
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
              
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
     </View>
  
);
}

