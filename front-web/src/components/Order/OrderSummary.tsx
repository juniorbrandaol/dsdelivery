import {formatPrice} from '../../utils/Formatters'
import { Link } from 'react-router-dom';

type Props={
  amount: number;
  totalPrice: number;
  onSubmit : ()=> void;
}

function OrderSummary({amount,totalPrice,onSubmit}:Props){

    return(
      <div className="order-summary-container">
         <div className="order-summary-content">
           <div>
               <span className="amount-selected-container">
                  <strong className="amount-selected">{amount}</strong>
                  PEDIDOS SELECIONADOS
               </span>
               <span className="order-summer-total">
                  <strong className="amount-selected">  {formatPrice(totalPrice,'BRL',2)}</strong>
                  VALOR TOTAL
               </span>
           </div>
           {/*
           <Link to='/orderDetails' className='order-summary-make-order'>
               FAZER PEDIDO
            </Link>
            **/}
            <button 
              className="order-summary-make-order"
              onClick={onSubmit}
            >
              FAZER PEDIDO
            </button>
         </div>
      </div>
    )
}

export default OrderSummary;