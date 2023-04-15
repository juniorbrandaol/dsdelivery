import ProductList from './ProductList';
import StepsHeader from './StepsHeader';
import {useEffect, useState} from 'react';
import { Product } from "../../models/Product";

import './styles.css';

//API
import userService from "../../apiServices/api";

import { toast } from "react-toastify";
import Location from '../Location';
import { LocationData } from '../../models/Location';

function Order(){

  const [products,setProducts] = useState<Product[]>([]);
  const [location, setLocation] = useState<LocationData>();

  useEffect(()=>{
    fetchProducts();
  },[])

  const fetchProducts = async () => {
     try{
        await userService.findAllProducts().then(response=>{
            setProducts(response.data);
            //toast.info("Sms enviado com sucesso.") ;
        })
     }
     catch(error){
       toast.info("Erro: " + error) ;
     }
  }

  return (
   <div className='orders-container'>
      <StepsHeader/>
      <ProductList products={products}/>
      <Location onchangeLocation={location=>setLocation(location)}/>
   </div>
  )
}

export default Order;