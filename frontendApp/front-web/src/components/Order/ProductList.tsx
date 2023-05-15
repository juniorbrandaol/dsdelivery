
import ProductCard from "./ProductCard";
import { Product } from "../../models/Product";
import { checkIsSelected } from "./helpers";

type Props={
   products:Product[];
   onSelectProduct:(product:Product) =>void;
   selectedProduct: Product[];
   items:(product:Product,qtd:number)=>any;
}

function ProductList({products,selectedProduct,onSelectProduct,items}:Props){
  
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
              items={items}
            />  
         )
       })}
     </div>
   </div>
  )
}

export default ProductList;