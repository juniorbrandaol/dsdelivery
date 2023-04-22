

import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "../Home";
import Order from "../Order";
import Navbar from "../Navbar";
import OrderDatails from "../Order/OrderDetails";
import Login from "../User/login";
import CreateUser from "../User/create";


function _Routes(){
  return(
    <BrowserRouter >
     
       <Routes>
         <Route path="/orders" element={<Order/>}/>
         <Route path="/" element={<Home />}/>
         <Route path="/orderDetails" element={<OrderDatails />}/>
         <Route path="/login" element={<Login />}/>
         <Route path="/createUser" element={<CreateUser />}/>
       </Routes>
       
    </BrowserRouter>
  )
}
export default _Routes;