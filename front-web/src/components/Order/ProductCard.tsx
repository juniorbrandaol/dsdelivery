
import './styles.css';
import { Product } from '../../models/Product';
import {formatPrice} from '../../utils/Formatters'

type Props={
  product: Product;
}

function ProductCard({product}:Props){
  return (
   <div className='order-card-container'>
      <h3 className='order-card-title'>
          {product.name}
      </h3>
      <img 
          src={product.imageUri}
          alt={product.name}
          className='order-card-image'
      />
      <h3 className='order-card-price'>
         {formatPrice(product.price,'BRL',2)}
      </h3>
      <div className='order-card-description'>
          <h3>Descrição</h3>
          <p>
             {product.description}
          </p>
      </div>
   </div>
  )
}

export default ProductCard;