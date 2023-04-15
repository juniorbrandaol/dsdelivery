import ProductList from './ProductList';
import StepsHeader from './StepsHeader';
import {useEffect, useState} from 'react';
import { Product } from "../../models/Product";

import './styles.css';

//API
import userService from "../../apiServices/api";

import { toast } from "react-toastify";

function Order(){

  const [products,setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    fetchProducts();
  },[])

  const fetchProducts = async () => {
     try{
        await userService.findAllProducts().then(response=>{
            setProducts(response.data);
            toast.info("Sms enviado com sucesso.") ;
        })
     }
     catch(error){
       toast.info("Erro.") ;
     }
  }

  return (
   <div className='orders-container'>
      <StepsHeader/>
      <ProductList products={products}/>
   </div>
  )
}

export default Order;