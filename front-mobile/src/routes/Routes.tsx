import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../components/Home";
import Order from "../components/Orders";

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
                <Stack.Screen name="Orders" component={Order}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
      )
}

export default Routes;