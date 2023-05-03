import React,{useEffect, useState} from 'react'
import {View,Text,Image,ScrollView, TextInput,
        KeyboardAvoidingView,Platform} from 'react-native'
import { RectButton} from 'react-native-gesture-handler'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
//API
import userService from '../../Services/apiServices/api';
import DropDownPicker from 'react-native-dropdown-picker';
import Messages from '../../utils/Messages';

import { Vehicle } from '../../models/Vehicle';

export default function Register() {

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0
  const behavior = Platform.OS === 'ios' ? "position" : 'position'
  const navigation = useNavigation()

  const [vehicle,setVehicle] = useState<Vehicle>({
    vehicleType:[ 
     {label: 'CARRO', value: 'CARRO'},
     {label: 'MOTOCICLETA', value: 'MOTOCICLETA'}  ,
     {label: 'BICICLETA', value: 'BICICLETA'}  ,
    ],
    yearManufacture:'',
    color:'',
    license: '',
    mileage: 0
  });

  const [open, setOpen] = useState(false);
  const [vehcleType, setVehicleType] = useState(vehicle.vehicleType[0].label);
  const [openYear, setOpenYear] = useState(false);
  const [yearManufacture, setYearManufacture] = useState(new Date().getFullYear());
  const [years, setYears] = useState([{value: 0,label: 0}]);
  const [editableText,setEditableText] = useState(false)

  useEffect(()=>{
    setYears(getOptions())
    if(vehcleType==="CARRO" || vehcleType==="MOTOCICLETA" ){
      setEditableText(true);
    }else{
      setEditableText(false);
    }
  },[vehcleType])

  function getOptions() {
    var arrayYears  = [];
    var array=[];
    for (let i = 0; i < 10; i++) {
     arrayYears.push(new Date().getFullYear() - i);
   }
     for (let valor of arrayYears) {
       array.push({
          value: valor,
          label: valor
         })  
      }
      return array;
  }

  const handleOnPressSend=async()=>{

    if(checkInputs()===false){
      return
    }
    const userId = await userService.authenticatedUser();
    const data={
      vehicleType:vehcleType.toUpperCase(),
      yearManufacture:yearManufacture,
      color:vehicle.color.toUpperCase(),
      license:vehicle.license.toUpperCase(),
      mileage:vehicle.mileage,
      owner:userId.data.id,
    }
    try{  
        await userService.saveVehicle(data);
        Messages("Veículo salvo. ",'success', 'top') ;
        navigation.navigate('Login') 
    }
    catch(error: any)  {
      if(error===403){
        Messages("Erro:"+error,'danger', 'top') ;
      }else{
        Messages("Veículo não pode ser salvo. ",'danger', 'top') ;
      }
    }
  }

  const checkInputs=()=>{

     if(vehcleType===null || vehcleType===undefined){
      Messages('Informe o tipo de veículo. ', 'warning', 'top')
      return false;
     }
     if(yearManufacture===undefined || yearManufacture===null){
       Messages('Informe o ano. ', 'warning', 'top')
       return false;
     }
     if(vehicle?.color===undefined || vehicle?.color===""){
      Messages('Informe a cor. ', 'warning', 'top')
      return false;
     }
     if(vehcleType==="CARRO" || vehcleType==="MOTOCICLETA" ){
        if(vehicle?.license===undefined || vehicle?.license===""){
          Messages('Informe a placa. ', 'warning', 'top')
          return false;
        }
        if(vehicle?.mileage===undefined || vehicle?.mileage===0){
          Messages('Informe a quilometragem. ', 'warning', 'top')
          return false;
        }
     }
     return true;
 }


 return (
  <>
    <View style={styles.container} >
        <Image style={styles.image_login} source={require('../../assets/deliveryman.png')}/>
        <Text style={styles.title}>Faça o Cadastro do seu Veículo</Text>
        <KeyboardAvoidingView
          style={{ flex:1 }}
          behavior={behavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
           <View style={styles.content}>
              <View   style={{position:'relative',zIndex: 3}}>
                <DropDownPicker
                  style={[styles.dropDownPicker ]}
                  dropDownContainerStyle={styles.dropDownPickerContainer}
                  selectedItemContainerStyle={{
                  backgroundColor: "grey",
                }}
                  open={open}
                  value={vehcleType}
                  items={vehicle.vehicleType}
                  setOpen={setOpen}
                  setValue={setVehicleType}
                />
              </View>
              <View   style={{position:'relative',zIndex: 2 }}>
                <DropDownPicker
                  style={[styles.dropDownPicker,{position:'relative',zIndex: 2 } ]}
                  dropDownContainerStyle={styles.dropDownPickerContainer}
                  selectedItemContainerStyle={{
                    backgroundColor: "grey",
                  }}
                  open={openYear}
                  value={yearManufacture}
                  items={years}
                  setOpen={setOpenYear}
                  setValue={setYearManufacture}
               />
              </View>
              <ScrollView style={{flex:1,marginTop:20}}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
              >   
                 
                  <TextInput style={styles.text_Input}
                    placeholder="Cor principal"
                    onChangeText={(value) => setVehicle({...vehicle,color:value})}
                    keyboardType={'default'}
                    maxLength={20}
                  />
                  <TextInput style={styles.text_Input}
                    placeholder="Placa"
                    onChangeText={(value) => setVehicle({...vehicle,license:value})}
                    keyboardType={'default'}
                    maxLength={8}
                    editable={editableText}
                  />
                  <TextInput style={styles.text_Input}
                    placeholder="Quilometragem atual"
                    onChangeText={(value) => setVehicle({...vehicle,mileage:value})}
                    keyboardType={'numbers-and-punctuation'}
                    maxLength={6}
                    editable={editableText}
                  />
              </ScrollView>
           </View>
           <View style={styles.footer}>
              <RectButton 
                style={styles.button}
                onPress={handleOnPressSend}
              >
                <Text style={styles.buttonText}>ENVIAR</Text>
              </RectButton>   
           </View>
        </KeyboardAvoidingView>
    </View>
  </>
);
}

