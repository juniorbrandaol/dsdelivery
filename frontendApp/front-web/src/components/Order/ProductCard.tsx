
import React from 'react'
import './styles.css';
import { Product } from '../../models/Product';
import {formatPrice} from '../../utils/Formatters'
import ButtonCounter from '../buttons/counter';


type Props={
  product: Product;
  onSelectProduct:(product:Product) =>void;
  isSelected: boolean;
  items:(Product:Product,qtd:number,)=>Object;
}

function ProductCard({product,onSelectProduct,isSelected,items}:Props){

     //RETURNS THE QUANTITY OF ITEMS REPORTED FOR THE ITEM.
    function getQuantity(quantity:number) {
     return items(product,quantity)
    };
    
   return (
        <div 
           className={'product-card-container'}   
        >
            <div className={`product-card-content ${isSelected ? 'selected':''}`}
              onClick={()=>onSelectProduct(product)}    
            >
              <h3 className='product-card-title'>{product.name}</h3>
              <img 
                 src={product.imageUri}
                 alt={product.name}
                 className='product-card-image'
              />
              <h3 className='product-card-price'>
                 {formatPrice(product.price,'BRL',2)}
              </h3>
              <div className='product-card-description'>
                <h3>Descrição</h3>
                  <p>
                    {product.description}
                  </p>
              </div>
            </div>
            <div className={`product-card-quantity ${isSelected ? '':'selected'}`}>
                <h3>Quantidade</h3>
                <ButtonCounter
                  OnClick={getQuantity}
                  maxInc={3}
                  initInc={0}
                />       
            </div>
        </div>
    )
}

export default ProductCard;
