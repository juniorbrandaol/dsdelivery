

import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "../Home";
import Order from "../Order";
import OrderList from "../Order/OrderList";
import OrderDetails from "../Order/OrderDetails";
import Login from "../User/login";
import CreateUser from "../User/create";
import Profile from "../User/profile";
import Edit from "../User/profile/Edit"

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
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/edit" element={<Edit/>}/>
       </Routes>
       
    </BrowserRouter>
  )
}
export default _Routes;