import './styles.css';
import Navbar from '../../Navbar';
import { useNavigate  } from 'react-router-dom';
import { toast } from "react-toastify";
import { newUser } from '../../../models/User';
import { cpfMask,phoneMask,onlyNumber} from '../../../utils/Formatters';
import { FiEdit } from "react-icons/fi";

//API
import userService from '../../../Services/apiServices/Api';
import { useEffect, useState } from 'react';

function Profile(){

  const[user,setUser] = useState<newUser>({
    firstName:'',
    lastName:'',
    cpf:'',
    email:'',
    phone:'',
    password:''
  });

  useEffect(()=>{
    userProfile()
  },[])

  const navigation = useNavigate();

  const userProfile=async()=>{
    try{
     const result = await userService.authenticatedUser();
      setUser(result.data)
   }catch(error){
     if(error===404){
       toast.warning("Usário não encontrado");  
     }else{
       toast.warning("Erro "+error);  
     }
   }
  }

  const editingFild=(field:string)=>{
   navigation('/Edit',{ state: { fieldName: field,fieldPhone:user.phone } })
  }
  
  return(
     <>
      <Navbar />
      <div className='userCreate-container'>
          <div className='userCreate-contents'>
             <h2>Seus Dados</h2> 
             <h3>Primeiro nome</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={user.firstName}
                    disabled={true}
                  />
             </div>
             <h3>Último nome</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={user.lastName}
                    disabled={true}
                  />
             </div>
             <h3>Cpf</h3>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={cpfMask(user.cpf)}
                    disabled={true}
                  />
             </div>
             <div className='edit-user'>
                <h3>Telefone</h3>
                <button onClick={()=>editingFild('phone')}>
                    <FiEdit fontSize={22}/>
                </button>
             </div>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="text"
                    value={phoneMask(user.phone)}
                    disabled={true}
                  />
             </div>
             <div className='edit-user'>
                <h3>E-mail</h3>
                <button onClick={()=>editingFild('email')}>
                    <FiEdit fontSize={22}/>
                </button>
             </div>
             <div className="app">
                  <input
                   className='input-userCreate'
                    type="email"
                    value={user.email}
                    disabled={true}
                  />
             </div>
             <div className='edit-user'>
                <h3>Senha</h3>
                <button onClick={()=>editingFild('password')}>
                    <FiEdit fontSize={22}/>
                </button>
             </div>
             <div className="app">
                  
             </div>
          </div>
       </div>
   
     </>
  )
}

export default Profile;