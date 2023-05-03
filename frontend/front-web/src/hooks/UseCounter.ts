/*
* By Junior Brandão
* HOOK CUSTOMIZADA PARA FUNCIONALIDADES DE UM CONTADOR
* DUAS FUNÇÕES SÃO CRIADAS, INC(INCREMENTO) E DEC(DECREMENTO)
* O HOOK RETORNA AS DUAS FUNÇÕES E O STATE.
* RECEBE COMO PARAMETROS, INITIALVALUE COM DAFAULT 1, QUE SERVE
* PARA INFORMAR COMO SERÁ O INCREMENTO, NO CASO DE 1 EM 1.
* O PARAMETRO MAXVALUE, INFORMA O VALOE MÁXIMO PARA INCREMENTO
*/

import {useState} from "react";

const UseCounter=(initialValue=1,maxValue=0)=>{

  const [count,setCount]= useState(initialValue)

  const inc=()=>{
     setCount((count+1)<=maxValue?count+1:count)
  }

  const dec=()=>{
     setCount((count-1)>0?(count-1):1)
  }

  return [count,inc,dec]

}

export default UseCounter