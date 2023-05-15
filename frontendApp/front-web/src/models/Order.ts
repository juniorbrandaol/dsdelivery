import { LocationData } from './Location';

type ProductId={
  id: number;
}

/*CRIA UM TIPO COM UMA LISTA DE PRODUTOS E UM TIPO LOCATION DATA */
export type OrderPayload={
  products :ProductId[];
}&LocationData;

export type OrdersList={
  id : number;
  name : string;
  price : number;
  description : number;
  imageUri:string;
  total:number;
  moment:string;
  amount : number;
  status:string;
  items:[
    {
    id : number;
    name : string;
    price : number;
    description : number;
    quantity: number;
    total:number;
    imageUri:string;
    }
  ];
 
}&LocationData;