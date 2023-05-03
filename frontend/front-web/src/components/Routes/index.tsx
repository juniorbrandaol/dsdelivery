

import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "../Home";
import Order from "../Order";
import Navbar from "../Navbar";
import OrderList from "../Order/OrderList";
import OrderDetails from "../Order/OrderDetails";
import Login from "../User/login";
import CreateUser from "../User/create";


function _Routes(){
  return(
    <BrowserRouter >
     
       <Routes>
         <Route path="/orders" element={<Order/>}/>
         <Route path="/" element={<Home />}/>
         <Route path="/orderList" element={<OrderList />}/>
         <Route path="/login" element={<Login />}/>
         <Route path="/createUser" element={<CreateUser />}/>
         <Route path="/orderDetails" element={<OrderDetails />}/>
       </Routes>
       
    </BrowserRouter>
  )
}
export default _Routes;