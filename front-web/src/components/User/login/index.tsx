import './styles.css';
import Navbar from '../../Navbar';
import { Link, useNavigate   } from 'react-router-dom';
import { toast } from "react-toastify";

//API
import userService from '../../../Services/apiServices/Api';
import { useState } from 'react';

import Storage from '../../../Services/storageServices/Storage';

function Login(){

  const [login,setLogin]=useState(String);
  const [password,setPassword]=useState(String);

  const navigation = useNavigate();

  const data={
     email:login,
     password:password
  }
  
  const makeLogin=async()=>{
   
    if(checkInputs()===false){
     return
    }
    try{  
        var auth= await userService.auth(data);
        Storage.removeToken();
        Storage.setToken(auth.data.token); 
     //  navigation("/orders", { state: { userId: result.data.id } });
        navigation("/orders");
         //   window.location.reload();
    }
    catch(error: any)  {
      if(error.status===403){
        toast.warning("Usuário não logado ou não autorizado") ;
      }else{
        toast.error(""+error);
      }
    }
  }

  const checkInputs=()=>{
     
      if(login===""){
        toast.warning("Informe o login.");  
        return false;
      }
      if(password===""){
        toast.warning("Informe a senha");  
        return false;
      }
      return true;
  }

  const handleChangeLogin =(e:any)  => {
     e.preventDefault();
     setLogin(e.target.value) 
  };
  const handleChangePassword =(e:any)  => {
    e.preventDefault();
    setPassword(e.target.value) 
  };

  return(
     <>
      <Navbar />
      <div className='login-container'>
       <div className='login-content'>
          <h2>Faça seu login</h2> 
          <div className='login-header'>
             <h3>Login</h3>
             <div className="app">
                  <input
                   className='input-login'
                    type="text"
                    value={login}
                    placeholder="login"
                    onChange={(e)=>handleChangeLogin(e)}
                  />
             </div>
             <h3>Senha</h3> 
             <div className="app">
                  <input
                    className='input-login'
                    type="password"
                    value={password}
                    placeholder="Senha"
                    onChange={(e)=>handleChangePassword(e)}
                  />
             </div>
             <button 
              className="make-login"
              onClick={()=>makeLogin()}
            >
              FAZER LOGIN
            </button>
          </div>
          <Link to='/createUser' className='register'>CADASTRAR-SE</Link>
       </div>
     
     </div> 
     </>
  )
}

export default Login;