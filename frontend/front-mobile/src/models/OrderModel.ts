import { ItemsModel } from "./ItemsModel";

export type OrderModel={
    id: number;
    client:number;
    address:string;
    latitude: number;
    longitude: number;
    moment: string;
    status: string;
    total: number;
    items:ItemsModel[];
}