import './styles.css';
import {ReactComponent as Logo} from '../../assets/imgs/logo.svg'

function Navbar(){
  return(
   <nav className="main-navbar">
      <Logo/>
      <a href='home' className='logo-text'>DS Delivery</a>
      <a href='https://github.com/juniorbrandaol' className='company-name'> By @juniorBrandaol</a>
   </nav>
  )
}

export default Navbar;