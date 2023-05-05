import { Items } from "./Items";

export type Order={
    id: number;
    client:number;
    address:string;
    latitude: number;
    longitude: number;
    moment: string;
    status: string;
    total: number;
    items:Items[];
    
}