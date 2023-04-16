import { LocationData } from './Location';


type ProductId={
  id: number;
}

/*CRIA UM TIPO COM UMA LISTA DE PRODUTOS E UM TIPO LOCATION DATA */
export type OrderPayload={
  products :ProductId[];
}&LocationData;

