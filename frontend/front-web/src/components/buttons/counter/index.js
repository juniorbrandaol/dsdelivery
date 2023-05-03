/* COMPONENTE QUE CRIA UM BOTÃO DE INCREMENTO E DECREMENTO 
*  EXISTE UMA PROPS, maxInc, QUE LIMITA O NÚMERO MÁXIMO DE   
*  INCREMENTO. OUTRA PROPS TIPO FUNÇÃO , É RESPONSÁVEL POR PASSAR
*  COMUNICAÇÃO INDIRETA ENTRE COMPONENTES FILHO PARA PAI.
*  ESTE COMPONENTE IMPORTA UM HOOKS CUSTOMIZADO, QUE É RESPONSÁVEL
*  POR FUNÇOES DE INCREMENTO E DECREMENTO 
*/
import { toast } from "react-toastify";
import React ,{useEffect} from 'react';
import './styles.css';
//LIBRARIES
import { FaPlus,FaMinus } from "react-icons/fa";
//HOOKS
import UseCounter from '../../../hooks/UseCounter';

export default function ButtonCounter(props) {

  const [count, inc, dec] = UseCounter(props.initInc, props.maxInc)
  useEffect(()=>{
    props.OnClick(count)
  },[count])

  function setQuantity(operation) {

    if (operation === 'inc') {
      inc()
      if (count >= props.maxInc) {
        toast.warning(`Quantidade máxima permitida para este produto [  ${ props.maxInc }  ]`) ;
      }
    } else { 
      dec()
    }
  }

  return (
      <div className="container">
        <div className="content">
          <button 
                className="inc-dec"
                onClick={()=>setQuantity('dec')}
              >
              <FaMinus color={'#DA5C5C'}/>
          </button>
          <span className="quantity">{count}</span>
          <button 
               className="inc-dec"
                onClick={()=>setQuantity('inc')}
              >
              <FaPlus color={'#DA5C5C'}/>  
          </button>
        </div>
      </div>
  );
}


