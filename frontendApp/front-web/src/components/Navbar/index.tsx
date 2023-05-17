import {useEffect, useState} from 'react'
import './styles.css';
import {ReactComponent as Logo} from '../../assets/imgs/logo.svg'
import { useNavigate,Link   } from 'react-router-dom';

//API
import userService from '../../Services/apiServices/Api';

import Storage from '../../Services/storageServices/Storage';

function Navbar(props:any){

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

  const [openMenu, setOpenMenu] = useState(false)

  // parameter num corresponds to .open-# classes
  // is assigned when Menu clicked triggering animated dropdown
  const setClassNames = (num:any) => {
      const classArr = ["m-item"];
      if (openMenu) classArr.push(`open-${num}`)
      return classArr.join(' ')
  }

  // takes route string as parameter
  const pushToRoute = (route:any) => {
    if(route==='/orders'){
      Storage.removeToken();
      setUserName("")
    }
      navigation(route);
      setOpenMenu(false)
  }

  const menuDropDown=()=>{
    return(
      <div className="Menu">
            <div className={"m-item m-logo"}
                onClick={() => setOpenMenu(!openMenu)}>
                Menu
            </div>
            { userName!==""?
              <> 
                <div className={setClassNames(1)}
                   onClick={() => pushToRoute("/orderList")}>
                   Pedidos
                </div>
                <div className={setClassNames(2)}
                   onClick={() => pushToRoute("/profile")}>
                   Sua Conta
                </div>
                <div className={setClassNames(3)}
                   onClick={() => pushToRoute("/settings")}>
                   Sistema
                </div>
                <div className={setClassNames(4)}
                  onClick={() => pushToRoute("/sobre")}>
                  Sobre
                </div>
                <div className={setClassNames(5)}
                  onClick={() => pushToRoute("/orders")}>
                  Logout
                </div>
              </>
            :
              <div className={setClassNames(1)}
                onClick={() => pushToRoute("/login")}>
                Login
              </div>
            }
        </div>
    )
  }


  return(
    <>
    
      <nav className="main-navbar">
        <div className='container_navbar'>
          <Logo />
          <Link className='logo-text' to='/Orders' >DS Delivery</Link> 
          {menuDropDown()}
        </div>  
      </nav>
   </>
  )
}

export default Navbar;