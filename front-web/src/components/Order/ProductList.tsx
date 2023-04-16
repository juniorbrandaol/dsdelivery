import ProductCard from "./ProductCard";
import { Product } from "../../models/Product";
import { checkIsSelected } from "./helpers";

type Props={
   products:Product[];
   onSelectProduct:(product:Product) =>void;
   selectedProduct: Product[];
}

function ProductList({products,selectedProduct,onSelectProduct}:Props){
  return (
   <div className='orders-list-container'>
     <div className="orders-list-items">
      {
       products.map( item =>{
        return(
           <ProductCard 
              product={item} 
              key={item.id}
              onSelectProduct={onSelectProduct}
              isSelected={checkIsSelected(selectedProduct,item)}
            />  
         )
       })}
     </div>
   </div>
  )
}

export default ProductList;