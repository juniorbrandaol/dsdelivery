import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../components/Home";
import OrderDetails from "../components/OrderDetails";
import Login from "../components/Users/Login";
import Register from "../components/Users/Register";
import RegisterVehicle from "../components/Vehicles/Register";


import Tabs from "./app.routes.bottom";

const Stack =  createNativeStackNavigator();

function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home" screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={Home}></Stack.Screen>
              <Stack.Screen name="Login" component={Login}></Stack.Screen>
              <Stack.Screen name="Register" component={Register}></Stack.Screen>
              <Stack.Screen name="OrdersDetails" component={OrderDetails}></Stack.Screen>
              <Stack.Screen name="RegisterVehicle" component={RegisterVehicle}></Stack.Screen>
              <Stack.Screen options={{ headerTintColor: '#19159A', }} name="Orders" component={Tabs}/>
            </Stack.Navigator>
        </NavigationContainer>
      )
}

export default Routes;