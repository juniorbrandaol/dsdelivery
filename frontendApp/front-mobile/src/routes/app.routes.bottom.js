import React from "react";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Fontisto,AntDesign } from '@expo/vector-icons';
//HOMES
import Order from "../components/Orders";
import VehicleDetail from "../components/Vehicles/VehicleDetail";
import Setting from "../components/Settings/Setting";

const Tab = createBottomTabNavigator();

export default function Tabs() {

  return (
    <Tab.Navigator

      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        headerTintColor: "#FFF",
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "#DA5C5C",
          position: 'absolute',
          bottom: 0,
          padding: 10,

        },

        tabBarIcon: ({ color }) => {
          let iconName = ''
          switch (route.name) {
            case 'Order':
              iconName = 'home';
              size = 25;
              padding=0;
              break;
            case 'VehicleDetail':
              iconName = 'automobile';
              size = 35;
              padding=0;
              break;
            
            case 'Setting':
              iconName = 'setting';
              size = 35;
              padding=0;
              break;  
          }
          if (route.name == 'Profile') {
            return <AntDesign padding={padding} name={iconName} size={size} color={color} />
          }else if(route.name == 'Setting'){
            return <AntDesign spadding={padding} name={iconName} size={size} color={color}/>
          }else{
            return <Fontisto padding={padding} name={iconName} size={size} color={color} />
          }
        },
      })
      }
    >
      <Tab.Screen name="Order" component={Order} options={{
        headerShown: false,
        tabBarLabel: () => { return null },
      }} />
     
      <Tab.Screen name="VehicleDetail" component={VehicleDetail} options={{
        headerShown: false,
        tabBarLabel: () => { return null },
      }} />
      
      <Tab.Screen name="Setting" component={Setting} options={{
        headerShown: false,
        tabBarLabel: () => { return null },
      }} />
    </Tab.Navigator>
  )



}
