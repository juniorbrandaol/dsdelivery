import ProductList from './ProductList';
import Navbar from '../Navbar';
import StepsHeader from './StepsHeader';
import {useEffect, useState} from 'react';
import { Product } from "../../models/Product";
import { Items } from '../../models/Items';
import { useLocation } from 'react-router-dom';
import './styles.css';
//API
import userService from '../../Services/apiServices/Api';

import { toast } from "react-toastify";
import Location from '../Location';
import { LocationData } from '../../models/Location';
import OrderSummary from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelected } from './helpers';

function Order(){

  const route= useLocation()

  const [products,setProducts] = useState<Product[]>([]);
  const [selectedItems,setSelectedItems] = useState<Items[]>([]);
  const [selectedProducts,setSelectedProducts] = useState<Product[]>([]);
  const [location, setLocation] = useState<LocationData>();
  const [company,setCompany] = useState('');
  const [address,setAddress]= useState('');
  const [getQuantity,setQuantity]= useState(1);

  useEffect(()=>{
    fetchCompanyId(1);
    fetchProducts();
  },[setLocation,address])


  const handleSelectProduct = (product: Product) => {
   
    const isAlreadySelected = checkIsSelected(selectedProducts,product);
 
    if (isAlreadySelected) {
      const selected = selectedProducts.filter(item => item.id !== product.id);
      setSelectedProducts(selected);
    } else {
      setSelectedProducts(previous => [...previous, product]);
    }

  }
 
  const handleSubmit = async () => {

    var userId;
    
     userId = await userService.authenticatedUser().then((result)=>{
        return result.data.id;
     }).catch((error)=>{
        console.log("Erro ao tentar capturar id do user")
     })

    if(userId===undefined){
      toast.warning("Usuário não logado ou não autorizado");  
      return
    }
  
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...location!,
      products: productsIds,
      items:selectedItems,
      client:userId
    }

    if(selectedItems.length===0){
      toast.warning("Nenhum produto selecionado.");
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
        if(error.status===403){
          toast.warning("Usuário não logado ou não autorizado");  
        }else{
          toast.warning(""+error);
        }
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

  const fetchCompanyId=async(id:number)=>{
    await userService.findCompanyById(id).then((response) => {
       setCompany(response.data.address);
    })
      .catch((error) => {
        toast.warning(""+error);
    })
  }

  const totalPrice=selectedItems.reduce((sum,item)=>{
    return (sum+(item.price*item.quantity));
  },0);

  const totalItems=selectedItems.reduce((sum,item)=>{
    return (sum+(item.quantity));
  },0);

  const _items=(product:Product,qtd:number)=>{
    if(qtd===0) return
    const items={id:0,quantity:0,price:0}

    const isAlreadySelected = selectedItems.some(item => item.id === product.id );
    if (isAlreadySelected) {
       selectedItems.filter((item)=>{
        if(item.id === product.id){
          selectedItems.splice(selectedItems.indexOf(item), 1);
        }
        return true;
      })
      items.id=product.id;
      items.quantity= qtd;
      items.price = product.price
      setSelectedItems(previous=>[...previous,items]);
    } else {
      items.id=product.id;
      items.quantity= qtd;
      items.price = product.price
      setSelectedItems(previous=>[...previous,items]);
    }
  }
 
  return (
    <>
        <Navbar />
        <div className='orders-container'>
            <StepsHeader/>
            <ProductList 
                products={products}
                onSelectProduct={handleSelectProduct}
                selectedProduct={selectedProducts}
                items={_items}
            />
            <Location onchangeLocation={location=>setLocation(location)}/>
            <OrderSummary
              items={totalItems}
              quantity={getQuantity}
              totalPrice={totalPrice}
              address={address}
              onSubmit={handleSubmit}
            />
        </div>
        <Footer/>
    </>
  )
}

export default Order;