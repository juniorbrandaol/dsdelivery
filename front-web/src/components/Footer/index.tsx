import './styles.css';
import {ReactComponent as YoutubeIcon} from '../../assets/imgs/youtube.svg'
import {ReactComponent as Linkedin} from '../../assets/imgs/linkedin.svg'
import {ReactComponent as Github} from '../../assets/imgs/github.svg'

function Footer(){
  return(
    <footer className='main-footer'>
       App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
       <div className='footer-icons'>
         <a href='youtube' target='_new'>
           <YoutubeIcon/>
         </a>
         <a href='linkedin' target='_new'>
           <Linkedin/>
         </a>
         <a href='https://github.com/juniorbrandaol' target='_new'>
           <Github/>
         </a>
       </div>
    </footer>
  )
}

export default Footer;