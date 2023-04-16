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
import OrderSummary from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelected } from './helpers';

function Order(){

  const [products,setProducts] = useState<Product[]>([]);
  const [selectedProducts,setSelectedProducts] = useState<Product[]>([]);
  const [location, setLocation] = useState<LocationData>();

  const totalPrice=selectedProducts.reduce((sum,item)=>{
    return sum+item.price;
  },0);

  useEffect(()=>{
    fetchProducts();
  },[])

  const handleSelectProduct = (product: Product) => {
    
    const isAlreadySelected = checkIsSelected(selectedProducts,product);
  
    if (isAlreadySelected) {
      const selected = selectedProducts.filter(item => item.id !== product.id);
      setSelectedProducts(selected);
    } else {
      setSelectedProducts(previous => [...previous, product]);
    }
    //toast.info(product.name) ;
  }

  const handleSubmit = async () => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...location!,
      products: productsIds
    }

    if(productsIds.length===0){
      toast.warning("Nenhum produto inserido.");
      return
    }
    if(!payload.address){
      toast.warning("Nenhum endereço informado.");
      return
    }
    await userService.saveOrder(payload).then((response) => {
      toast.error(`Pedido enviado com sucesso! Nº ${response.data.id}` );
      setSelectedProducts([]);
    })
      .catch((error) => {
        toast.warning(""+error);
    })
  }

  const fetchProducts = async () => {
     try{
        await userService.findAllProducts().then(response=>{
            setProducts(response.data);
        })
     }
     catch(error){
       toast.error("Erro: " + error) ;
     }
  }

 
  return (
    <>
        <div className='orders-container'>
            <StepsHeader/>
            <ProductList 
                products={products}
                onSelectProduct={handleSelectProduct}
                selectedProduct={selectedProducts}
            />
            <Location onchangeLocation={location=>setLocation(location)}/>
            <OrderSummary
              amount={selectedProducts.length}
              totalPrice={totalPrice}
              onSubmit={handleSubmit}
            />
        </div>
        <Footer/>
    </>
  )
}

export default Order;