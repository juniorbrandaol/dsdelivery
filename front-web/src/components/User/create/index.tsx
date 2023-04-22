import './styles.css';
import Navbar from '../../Navbar';
import { useNavigate   } from 'react-router-dom';
import { toast } from "react-toastify";
import { newUser } from '../../../models/User';

//API
import userService from '../../../Services/apiServices/Api';
import { useState } from 'react';
import Storage from '../../../Services/storageServices/Storage';


type Props= { 
  newUser:newUser ;
}

function CreateUser(){

  const [firstName,setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf,setCpf] =useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword] = useState();
  const [rolles,setRolles] =useState([]);

  const navigation = useNavigate();

  const handleChangeFirstName =(e:any)  => {
     e.preventDefault();
     setFirstName(e.target.value) 
  };
  const handleChangeLastName =(e:any)  => {
    e.preventDefault();
    setLastName(e.target.value) 
  };
  const handleChangeCpf =(e:any)  => {
    e.preventDefault();
    setCpf(e.target.value) 
  };
  const handleChangeEmail =(e:any)  => {
    e.preventDefault();
    setEmail(e.target.value) 
  };
  const handleChangeRolles =(e:any)  => {
    e.preventDefault();
    setRolles(e.target.value) 
  };
  const handleChangePassword =(e:any)  => {
    e.preventDefault();
    setPassword(e.target.value) 
  };

  const checkInputs=()=>{
     
    if(firstName===""){
      toast.warning("Informe o primeiro nome.");  
      return false;
    }
    if(lastName===""){
      toast.warning("Informe o ultimo nome");  
      return false;
    }
    if(cpf===""){
      toast.warning("Informe o cpf");  
      return false;
    }
    if(email===""){
      toast.warning("Informe o email");  
      return false;
    }
    if(password===""){
      toast.warning("Informe a senha");  
      return false;
    }
    return true;
}

  const createUser=async()=>{

    const data={
       firstName:firstName,
       lastName:lastName,
       cpf:cpf,
       email:email,
       password:password,
       rolles:[
        {
          id: 1
        },
       {
        id:2
       }
       
   ]
    }

     
      if(checkInputs()===false){
       return
      }
     
      try{  
          var auth= await userService.saveUser(data);
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
       <div className='userCreate-content'>
          <h2>Forneça os dados abaixo</h2> 
          <div className='userCreate-header'>
             <h3>Primeiro nome</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={firstName}
                    placeholder="Primeiro nome"
                    onChange={(e)=>handleChangeFirstName(e)}
                  />
             </div>
             <h3>Último nome</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={lastName}
                    placeholder="Último nome"
                    onChange={(e)=>handleChangeLastName(e)}
                  />
             </div>
             <h3>Cpf</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={cpf}
                    placeholder="Cpf"
                    onChange={(e)=>handleChangeCpf(e)}
                  />
             </div>
             <h3>E-mail</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e)=>handleChangeEmail(e)}
                  />
             </div>
             <h3>Senha</h3> 
             <div className="app">
                  <input
                    className='input-userCreate'
                    type="password"
                    value={password}
                    placeholder="Senha"
                    onChange={(e)=>handleChangePassword(e)}
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
     
     </div> 
     </>
  )
}

export default CreateUser;