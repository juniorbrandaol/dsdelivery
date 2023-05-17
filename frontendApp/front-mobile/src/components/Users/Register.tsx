import React,{useState} from 'react'
import {View,Text,ScrollView, TextInput,
        KeyboardAvoidingView,Platform,Modal} from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';
//API
import userService from '../../Services/apiServices/api';
import ConfigEmail from '../../Config/AppConfig';
import Messages from '../../utils/Messages';
import { UserModel } from '../../models/UserModel';
import {CodeField,Cursor,useClearByFocusCell,useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import {Fontisto} from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { onlyNumber } from '../../utils/Formatters';

export default function Register() {

  const [value, setValue] = useState("")
  const ref = useBlurOnFulfill({ value, cellCount: 4 })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({value, setValue})

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -100 : 0
  const behavior = Platform.OS === 'ios' ? "position" : 'position'
  const [modalVisible,setModalVisible]= useState(false)
  const [code,setCode] = useState('');
  const [count,setCount] = useState(1);

  const navigation = useNavigation<any>()

  const [_user,set_User] = useState<UserModel>({
    firstName:'',
    lastName:'',
    cpf:'',
    phone:'',
    email:'',
    password:''
  });

  const handleOnPressSend=async()=>{
    if(checkInputs()===false)return
    sendEmailConfirmation(_user.email);
    //sendSmsConfirmation(_user.phone);
    setModalVisible(true)
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

 const sendEmailConfirmation=async(to:any)=>{

  const payload={
     fromEmail : ConfigEmail.fromEmail,
     fromName:ConfigEmail.fromName,
     replyTo:ConfigEmail.replyTo,
     to:to,
     subject:"Validação de cadastro",
     contentType:ConfigEmail.contentType,
  }
  try{
     const result = await userService.sendEmailConfirmation(payload); 
     setCode(result.data.code);
     return true;
  }catch(error){
    Messages("Erro ao tentar enviar e-mail "+error,'danger', 'top') ;
    return false;
  }
}

const sendSmsConfirmation=async(to:any)=>{

  const payload={to:"+"+onlyNumber(to)}
  try{
     const result = await userService.sendSmsConfirmation(payload); 
     setCode(result.data.token);
     console.log(result.data.token)
     return true;
  }catch(error){
    Messages("Erro ao tentar enviar sms "+error,'danger', 'top') ;
    return false;
  }
}

const checkCode=async()=>{

    if(value.length<4 || value==''){
      Messages("Informe o código.",'danger', 'top') ;
      return
    }
    setCount(count+1);
    if(code!==value){
      Messages("Código digitado não conefere ",'danger', 'top') ;
      if(count>=3){
        Messages("Número de tentativas exedido.",'danger', 'top') ;
        navigation.navigate("Login")
        return
      }
      return
    }

    const data={
      firstName:_user.firstName,
      lastName:_user.lastName,
      cpf:onlyNumber(_user.cpf),
      phone:"+"+onlyNumber(_user.phone),
      email:_user.email,
      password:_user.password,
      rolles:[{id: 1}]
    }

    try{
      await userService.saveUser(data);
      Messages("Usuário salvo. ",'success', 'top') ;
      navigation.navigate("Login")
    }catch(error){
      Messages("Erro ao tentar cadastrar usuário "+error,'danger', 'top') ;
    }
    navigation.navigate('Login' as never) 
    setModalVisible(false)
}

const newCode=async()=>{
  sendEmailConfirmation(_user.email).then((result)=>{
    if(result){
      Messages("E-mail reenviado. ",'success', 'top') ;
    }else{
      Messages("Erro ao tentar reenviar e-mail ",'danger', 'top') ;
    }
  })
}

const cancelValidation=()=>{
  setModalVisible(false);
  navigation.navigate("Login")
}

const codeField=()=>{
   return(
    <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={4}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )
        }
    />
   )
}

const screenCheckCode=()=>{
   return(
    <View style={styles.container}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={[styles.content,
            {
              marginHorizontal:20,
              height:'50%',
              justifyContent:'flex-end',
              alignItems:"center",
              position:"relative",
              top:"15%",
              borderColor:'#9E9E9E',
              borderWidth:1
            }]} 
      >
         <RectButton style={styles.cancelValidation} onPress={cancelValidation}>
           <Fontisto name="minus-a" size={28} color="#9E9E9E" />
         </RectButton>
         <Text style={[styles.title,{fontSize:22}]}>Insira o código de segurança</Text>
         <Text style={[styles.subTitle,{fontSize:20,color:'#fff'}]}>Insira o código de segurança
             que enviamos para o email.
         </Text>
         <View style={styles.codeField}>
            {codeField()} 
         </View>
         <RectButton style={[styles.button,{backgroundColor:'#fff'}]} 
           onPress={() => checkCode()}
         >    
           <Text style={[styles.buttonText,{color:"#263238"}]}>ENVIAR</Text>
         </RectButton>
         <View style={styles.looseCode}>
           <Text style={[styles.subTitle,{fontSize:16,color:'#fff'}]}>Não recebeu seu código?</Text>
           <RectButton onPress={() => newCode()}>
             <Text style={[styles.subTitle,{fontSize:16,color:"#263238",fontWeight:'bold'}]}> Obtenha um novo.</Text>
           </RectButton>
         </View>
      </View>
    </Modal>
  </View>
   )
}

 return (
  
    <View style={styles.container} >
        <Header goback={true} title=''/> 
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
              <TextInputMask
                style={styles.text_Input}
                type={'cpf'}
                placeholder="Cpf"
                value={_user.cpf}
                onChangeText={(value) => set_User({..._user,cpf:value})}
                keyboardType={'numeric'}
                maxLength={19}
              />
              <TextInputMask
                style={styles.text_Input}
                type={'cel-phone'}
                placeholder="Telefone"
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '+55(83)'
                }}
                value={_user.phone}
                onChangeText={(value) => set_User({..._user,phone:value})}
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
            {screenCheckCode()}
          </ScrollView>
        </KeyboardAvoidingView>
        
     </View>
  
);
}

