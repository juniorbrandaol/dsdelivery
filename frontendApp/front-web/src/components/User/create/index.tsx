import './styles.css';
import Navbar from '../../Navbar';
import { useNavigate   } from 'react-router-dom';
import { toast } from "react-toastify";
import { newUser } from '../../../models/User';
import { cpfMask,phoneMask,onlyNumber } from '../../../utils/Formatters';

//API
import userService from '../../../Services/apiServices/Api';
import { useState } from 'react';

function CreateUser(){

  const[user,setUser] = useState<newUser>({
    firstName:'',
    lastName:'',
    cpf:'',
    email:'',
    phone:'',
    password:''
  });

  const navigation = useNavigate();

  const handleChangeFirstName =(e:any)  => {
    e.preventDefault();
    setUser({...user,firstName:e.target.value}) 
  };
  const handleChangeLastName =(e:any)  => {
    e.preventDefault();
    setUser({...user,lastName: e.target.value}) 
  };
  const handleChangePhone =(e:any)  => {
    e.preventDefault();
    setUser({...user,phone: e.target.value}) 
  };
  const handleChangeCpf =(e:any)  => {
    e.preventDefault();
    setUser({...user,cpf:e.target.value})
  };
  const handleChangeEmail =(e:any)  => {
    e.preventDefault();
    setUser({...user,email:e.target.value}) 
  };
  const handleChangePassword =(e:any)  => {
    e.preventDefault();
    setUser({...user,password:e.target.value}) 
  };

  const checkInputs=()=>{
     
    if(user.firstName===""){
      toast.warning("Informe o primeiro nome.");  
      return false;
    }
    if(user.lastName===""){
      toast.warning("Informe o ultimo nome");  
      return false;
    }
    if(user.phone===""){
      toast.warning("Informe o telefone");  
      return false;
    }
    if(user.cpf===""){
      toast.warning("Informe o cpf");  
      return false;
    }
    if(user.email===""){
      toast.warning("Informe o email");  
      return false;
    }
    if(user.password===''){
      toast.warning("Informe a senha");  
      return false;
    }
    return true;
}

  const createUser=async()=>{

    const data={
       firstName:user.firstName,
       lastName:user.lastName,
       phone:"+"+onlyNumber(user.phone),
       cpf:onlyNumber(user.cpf),
       email:user.email,
       password:user.password,
       rolles:[{id: 1},{id:2}]
    }
    if(checkInputs()===false)return
     
    try{  
       await userService.saveUser(data);
       toast("Usuário salvo") ;
       navigation("/login");
    }
    catch(error: any)  {
       if(error.status===403){
          toast.warning("Usuário não pode ser salvo") ;
        }else{
          toast.error(""+error);
        }
    }
 }

  return(
     <>
      <Navbar />
      <div className='userCreate-container'>
          <div className='userCreate-contents'>
          <h2>Forneça os dados abaixo</h2> 
             <h3>Primeiro nome</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={user.firstName}
                    placeholder="Primeiro nome"
                    onChange={(e)=>handleChangeFirstName(e)}
                    maxLength={15}
                  />
             </div>
             <h3>Último nome</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={user.lastName}
                    placeholder="Último nome"
                    onChange={(e)=>handleChangeLastName(e)}
                    maxLength={40}
                  />
             </div>
             <h3>Telefone</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={phoneMask(user.phone)}
                    placeholder="Telefone"
                    onChange={(e)=>handleChangePhone(e)}
                    maxLength={18}
                  />
             </div>
             <h3>Cpf</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={cpfMask(user.cpf)}
                    placeholder="Cpf"
                    onChange={(e)=>handleChangeCpf(e)}
                  />
             </div>
             <h3>E-mail</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="email"
                    value={user.email}
                    placeholder="Email"
                    onChange={(e)=>handleChangeEmail(e)}
                    maxLength={40}
                  />
             </div>
             <h3>Senha</h3> 
             <div className="app">
                  <input
                    className='input-userCreate'
                    type="password"
                    value={user.password}
                    placeholder="Senha"
                    onChange={(e)=>handleChangePassword(e)}
                    minLength={4}
                    maxLength={8}
                  />
             </div>
             <button 
              className="make-userCreate"
              onClick={createUser}
             >
              ENVIAR
             </button>
          </div>
       </div>
   
     </>
  )
}

export default CreateUser;