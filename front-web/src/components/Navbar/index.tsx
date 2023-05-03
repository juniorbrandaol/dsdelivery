import {useEffect, useState,useCallback} from 'react'
import './styles.css';
import {ReactComponent as Logo} from '../../assets/imgs/logo.svg'
import {ReactComponent as Login} from '../../assets/imgs/login.svg'
import {ReactComponent as Logout} from '../../assets/imgs/logout.svg'
import {ReactComponent as Orders} from '../../assets/imgs/orders.svg'
import { Link } from 'react-router-dom';
import { useNavigate   } from 'react-router-dom';
import { toast } from "react-toastify";
//API
import userService from '../../Services/apiServices/Api';

import Storage from '../../Services/storageServices/Storage';

function Navbar(){

  const [userName,setUserName] = useState("")
  useEffect(()=>{
   fetchUser();
  },[])

  const navigation = useNavigate();

  const fetchUser=async()=>{
    await userService.authenticatedUser().then((result)=>{
       setUserName(result.data.firstName)
    }).catch((error)=>{
      setUserName("")
    })
  }
  
  const makeLogout=()=>{
    Storage.removeToken();
    setUserName("")
    navigation("/orders");
  }

  return(
    <>
      <nav className="main-navbar">
        
        <div className='container_navbar'>
          <Logo/>
          <Link to='/' className='logo-text'>DS Delivery</Link>
        </div> 
              { 
              userName!==""?
              <>
                <Link to='/orderList' >
                  <Orders className='make-orders-image' />  
                </Link>
                <button className='content_navbar'
                  onClick={makeLogout}
                >
                  <Logout className='make-login-image' />
                  {userName}
                </button>
              </>
              :
              <>
                <Link to='/login' className='content_navbar'>
                  <Login className='make-login-image' />  
                </Link>
              </>
              }
      </nav>
     
   </>
  )
}

export default Navbar;