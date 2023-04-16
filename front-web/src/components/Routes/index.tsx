

import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "../Home";
import Order from "../Order";
import Navbar from "../Navbar";
import OrderDatails from "../Order/OrderDetails";


function _Routes(){
  return(
    <BrowserRouter>
     <Navbar/>
       <Routes>
         <Route path="/orders" element={<Order/>}/>
         <Route path="/" element={<Home />}/>
         <Route path="/orderDetails" element={<OrderDatails />}/>
       </Routes>
       
    </BrowserRouter>
  )
}
export default _Routes;