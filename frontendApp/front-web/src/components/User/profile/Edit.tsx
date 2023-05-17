import './styles.css';
import Navbar from '../../Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { newUser } from '../../../models/User';
import { phoneMask} from '../../../utils/Formatters';
import OtpInput from 'react-otp-input';
import {onlyNumber} from '../../../utils/Formatters'
import Storage from '../../../Services/storageServices/Storage';

//API
import userService from '../../../Services/apiServices/Api';
import userServiceFeignClient from '../../../Services/apiServices/ApiFeignClient';
import { useEffect, useState } from 'react';

function Edit(){

  const navigate = useNavigate()

  const route= useLocation();
  
  const fieldName = route.state.fieldName
  const fieldPhone = route.state.fieldPhone

  const [typeInput,setTypeInput] = useState('')
  const [codeSent,setCodeSent] = useState(false);
  const [count,setCount] = useState(1);
  const [value, setValue] = useState("")
  const [code,setCode] = useState('');
  const [buttonActivated,setButtonActivated] = useState(false)

  var msgfield =''
  if(fieldName==='phone'){
    msgfield="seu novo telefone"
  }else if(fieldName==='email'){
    msgfield="seu novo e-mail"
  }else{
    msgfield="sua nova senha"
  }

  const[user,setUser] = useState<newUser>({
    email:'',
    phone:'',
    password:'',
  });

  useEffect(()=>{
 
  },[])

  const handleChange =(e:any)  => {
    e.preventDefault();
    if(fieldName==='email'){
      setUser({...user,email:e.target.value}) 
    }else if(fieldName==='phone'){
      setUser({...user,phone:e.target.value}) 
    } else{
      setTypeInput("password")
      setUser({...user,password:e.target.value}) 
    }  
  };

  const sendSms=async()=>{

    if(fieldName==='email'){
      if(user.email===''){
       toast.warning("Preencha o campo email") ;
       return
      } 
   }else if(fieldName==='phone'){
      if(user.phone==='') {
       toast.warning("Preencha o campo telefone") ;
       return
      }
      
   } else{
     if(user.password==='') {
       toast.warning("Preencha o campo senha") ;
       return
     }
   }  

    setCodeSent(true)
    const payload={to:fieldPhone}
  
    try{
      const result = await userServiceFeignClient.sendSms(payload); 
      setCode(result.data.token);
      setButtonActivated(true);
       return true;
    }catch(error){
      toast.warning("Erro ao tentar enviar sms ") ;
      return false;
    }
  }
  
  const checkSms=async()=>{
  
    if(value.length<4 || value===''){
      toast.warning("Informe o código.") ;
      return
    }
    console.log(code +"  " + value)
    setCount(count+1);
    if(code!==value){
      toast.warning("Código digitado não conefere ") ;
      if(count>=3){
        toast.warning("Número de tentativas exedido.") ;
        navigate("/Orders")
        Storage.removeToken();
        return
      }
      return
    }
 
    const data={
      phone:"+"+onlyNumber(user.phone),
      email:user.email,
      password:user.password,
    }
    try{
      const userId = await userService.authenticatedUser();
      await userService.updateUserField(data,userId.data.id,fieldName);
      toast("Cadastro alterado.") ;
      navigate("/Login")
    }catch(error){
      Storage.removeToken();
      toast.warning("Erro ao tentar alterar cadastro ") ;
      navigate('/Login')
    }
     
}

 const newCode=async()=>{
  
   const payload={to:fieldPhone}
   userServiceFeignClient.sendSms(payload).then((result)=>{
     if(result){
      toast("Sms reenviado. ") ;
     }else{
      toast.error("Erro ao tentar reenviar e-mail ") ;
     }
   })
  }
  
  return(
     <>
      <Navbar />
      <div className='userCreate-container'>
          <div className='userCreate-contents'>
             <h2>Alterar seus Dados</h2> 
             <h3>Você receberá um sms com código de verificação</h3>
             <h3>Informe {msgfield}</h3>
             {fieldName==='password'?
              <>
                <div className='edit-user'>
                  <h3>Senha</h3>
                </div>
                <div className="app">
                  <input
                      className='input-userCreate'
                      type={typeInput}
                      value={user.password}
                      placeholder="Senha"
                      onChange={(e)=>handleChange(e)}
                      maxLength={8}
                      disabled={buttonActivated}
                  />
                </div>
              </>
              :
              <>
                <div className="app">
                  <input
                     className='input-userCreate'
                     type="text"
                     value={fieldName==='phone'?phoneMask(user.phone):
                           user.email
                           }
                     placeholder={fieldName==='phone'?"55(XX)XXXX-XXXX":
                           "E-mail"
                           }
                     onChange={(e)=>handleChange(e)}
                     maxLength={fieldName==='phone'?18:40}    
                     minLength={fieldName==='phone'?18:20} 
                     disabled={buttonActivated} 
                  />
                </div>    
              </>         
          }
           {
            codeSent?
              <div className='opt-input'>
                  <h3>Insira o código de segurança
                      que enviamos para o seu celular.
                  </h3>
                  <OtpInput
                    inputStyle={{fontSize:30}}
                    value={value}
                    onChange={setValue}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />

              </div>
            :
              <></>
            }

            <button 
              className="make-userCreate"
              onClick={codeSent?checkSms:sendSms}
             >
              {codeSent?'CONFIRMAR':'ENVIAR'}
            </button>
            {codeSent?
              <div className='newCode'>
                <h4>Não recebeu seu código?</h4>
                <button onClick={newCode}>
                  <h4>Obtenha um novo.</h4>
                </button>
              </div>
            :
            <></>  
            }
          </div>
       </div>
   
     </>
  )
}

export default Edit;