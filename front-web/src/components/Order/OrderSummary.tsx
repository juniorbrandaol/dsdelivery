import {formatPrice} from '../../utils/Formatters'

type Props={
  items: number;
  quantity: number;
  totalPrice: number;
  address : string;
  onSubmit : ()=> void;
}

function OrderSummary({items,quantity,totalPrice,address,onSubmit}:Props){

    return(
      <div className="order-summary-container">
         <div className="order-summary-content">
           <div>
               <span className="amount-selected-container">
                  <strong className="amount-selected">{items}</strong>
                  PEDIDOS SELECIONADOS
               </span>
               <span className="order-summer-total">
                  <strong className="amount-selected">  {formatPrice(quantity*totalPrice,'BRL',2)}</strong>
                  VALOR TOTAL
               </span>
               
           </div>
           <div>
           <span className="order-summer-total">
                  <strong className="address-selected">ENDEREÇO DA LOJA: </strong>
                   {address}
               </span>
           </div>
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