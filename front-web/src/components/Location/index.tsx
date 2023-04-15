/*COMPONENTE QUE RENDERIZA UM MAPA DE LOCALIZAÇÃO.
  PEGANDO SUA LOCALIZAÇÃO ONLINE E UM ENDEREÇO
  FORNECIDO, TRAÇA UMA ROTA DE ENTREGA.
  UTILIZO A API DA MAPBOX PARA TAL.
*/
import AsyncSelect from 'react-select/async';
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
//API
import userService from "../../apiServices/api";

import './styles.css';
import { useState } from "react";
import { LocationData } from '../../models/Location';

/*Inicial latitude e longitude statáticas */
const initialPosition = {
  lat: -7.0243115,
  lng: -37.271039
}  

type Place={
   label?:string;
   value?:string;
   position:{
     lat:number,
     lng: number
   }
}

type Props={
  onchangeLocation:(location:LocationData)=>void;
}

function Location({onchangeLocation}:Props){

  const [address,setAddress]= useState<Place>({
     position:initialPosition
  });
  
  const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
    const response = await userService.fetchLocalMapBox(inputValue);
  
    const places = response.data.features.map((item: any) => {
      return ({
        label: item.place_name,
        value: item.place_name,
        position: {
          lat: item.center[1],
          lng: item.center[0]
        }
      });
    });
    callback(places);
    return places;
  };
  
  const handleChangeSelect = (place: Place) => {
    setAddress(place);
    onchangeLocation({
      latitude: place.position.lat,
      longitude: place.position.lng,
      address: place.label!
    });
  };

  return (
   <div className='location-container'>
      <div className="location-content">
         <h3 className="location-title">
           Selecione onde o pedido deve ser entregue:
         </h3> 
         <div className="filter-container">
            <AsyncSelect
              placeholder="Digite um endereço para entregar o pedido:"
              className="filter"
              loadOptions={loadOptions}
              onChange={value=>handleChangeSelect(value as Place)}
            />
         </div>
         <MapContainer 
              center={address.position} 
              zoom={15} 
              key={address.position.lat}
              scrollWheelZoom={false}
         >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={address.position}>
                <Popup>
                  {address.label}
                </Popup>
              </Marker>
            </MapContainer>
      </div>
   </div>
  )
}

export default Location;