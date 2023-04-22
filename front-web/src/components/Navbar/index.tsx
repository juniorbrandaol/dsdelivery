import {useEffect, useState} from 'react'
import './styles.css';
import {ReactComponent as Logo} from '../../assets/imgs/logo.svg'
import {ReactComponent as Login} from '../../assets/imgs/login.svg'
import {ReactComponent as Logout} from '../../assets/imgs/logout.svg'
import {ReactComponent as Hamburguer} from '../../assets/imgs/hamburguer.svg'
import { Link } from 'react-router-dom';
//API
import userService from '../../Services/apiServices/Api';

import Storage from '../../Services/storageServices/Storage';

function Navbar(){

  const [userName,setUserName] = useState("")
  useEffect(()=>{
   fetchUser();
  },[userName])

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