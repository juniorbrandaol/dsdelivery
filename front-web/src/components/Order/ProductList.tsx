import ProductCard from "./ProductCard";
import { Product } from "../../models/Product";

type Props={
   products:Product[];
}

function ProductList({products}:Props){
  return (
   <div className='orders-list-container'>
     <div className="orders-list-items">
      {
       products.map( item =>{
        return(
           <ProductCard product={item} key={item.id}/>  
         )
       })}
     </div>
   </div>
  )
}

export default ProductList;