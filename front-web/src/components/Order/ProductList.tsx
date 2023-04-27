
import ProductCard from "./ProductCard";
import { Product } from "../../models/Product";
import { checkIsSelected } from "./helpers";

type Props={
   products:Product[];
   onSelectProduct:(product:Product) =>void;
   selectedProduct: Product[];
   qtd:(qtd:number)=>number;
}

function ProductList({products,selectedProduct,onSelectProduct,qtd}:Props){
  
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
              isSelected={ checkIsSelected (selectedProduct,item)}
              qtd={qtd}
            />  
         )
       })}
     </div>
   </div>
  )
}

export default ProductList;