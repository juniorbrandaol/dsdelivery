import { Double } from "react-native/Libraries/Types/CodegenTypes"

export type VehicleModel={
  vehicleType:[
    {label: 'CARRO', value: 'CARRO'},
    {label: 'MOTOCICLETA', value: 'MOTOCICLETA'}  ,
    {label: 'BICICLETA', value: 'BICICLETA'}  
   ],
  yearManufacture:string,
  color:string,
  license: string,
  mileage: Double
}