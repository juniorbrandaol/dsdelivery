import { Status } from './../../components/Enuns/Status';
import axios from "axios";
import storage from '../storageServices/Storage'
const BASE_URL = "http://192.168.1.8:8081";
//const mapboxToken=process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;

class UserService {

   
    async fetchLocalMapBox(local:string){
       return axios({
            url:`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`,
            method: "GET",
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => { 
            return Promise.reject(error)
        })
   }

    /******************* USER **********************/

    //SALVA UM USUÀRIO
   async saveUser(payLoad:object) {

    return axios({
        url: BASE_URL + "/users/save",
        method: "POST",
        data: payLoad,
    }).then((response) => {
        return Promise.resolve(response)
    }).catch((error) => {
        if (error.response) { 
            if(error.response.status==400){
              return Promise.reject(error.response.data.errors[0].message)  
            }else if(error.response.status==403){
              return Promise.reject(error.response.data.error)
            }else{
              return Promise.reject(error.response)
            }
        } else if (error.request) { 
            return Promise.reject(error.request)
        } else { 
            // anything else 
            return Promise.reject(error)
        } 
    })
   }

     //SWITCH A VALIDAÇÃO DE UM USUÁRIO
     async switchUserValidation(userId:number) {

        return axios({
            url: BASE_URL + "/users/validation/"+userId,
            method: "PUT",
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                if(error.response.status==400){
                  return Promise.reject(error.response.data.errors[0].message)  
                }else if(error.response.status==403){
                  return Promise.reject(error.response.data.error)
                }else{
                  return Promise.reject(error.response)
                }
            } else if (error.request) { 
                return Promise.reject(error.request)
            } else { 
                // anything else 
                return Promise.reject(error)
            } 
        })
       }



    /******************** Auth *********************/

    //RETORNA UM TOKEM DE AUTORIZAÇÃO
    async auth(data:any) {
       
        return axios({
            url: BASE_URL + "/users/auth",
            data: data,
            method: "POST",
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                console.log(error.response.data.status)
                if(error.response.data.status===400){
                    return Promise.reject(error.response.data.message)  
                }
                if(error.response.data.status===403){
                    return Promise.reject(error.response.data.message)  
                }else{
                    return Promise.reject(error.response)
                }
              } else if (error.request) { 
                return Promise.reject(error)
              } else { 
                return Promise.reject(error)
              } 
        })
    }

    //RETORNA O USUARIO AUTENTICADO
    async authenticatedUser() {
       
        return axios({
            url: BASE_URL + "/users/currentusername",
            method: "GET",
            headers: {
                "Authorization": "Bearer " +await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error.response)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }

    //VERIFICA SE AUTENTICADO ENDPOINT FEIGNCLEIT
    async fetchUser (userId:any){
    
        return axios({
            url: BASE_URL + "/users/ms/"+userId,
            method: "GET",
            headers: {
                "Authorization": "Bearer "+ await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error.response.status)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }

    /******************** Orders *********************/
     
   //SALVA UMA ENTREGA
   async saveDelivery(payLoad:object) {

    return axios({
        url: BASE_URL + "/orders",
        method: "POST",
        data: payLoad,
        headers: {
            "Authorization": "Bearer "+ await storage.getToken(),
        }
    }).then((response) => {
        return Promise.resolve(response)
    }).catch((error) => {
        if (error.response) { 
            if(error.response.status==400){
              return Promise.reject(error.response.data.errors[0].message)  
            }else if(error.response.status==403){
                console.log(error.response)
              return Promise.reject(error.response)
            }else{
              return Promise.reject(error.response)
            }
        } else if (error.request) { 
            return Promise.reject(error.request)
        } else { 
            // anything else 
            return Promise.reject(error)
        } 
    })
   }  
    
    /*RETORNA TODAS AS ENTREGAS */
    async fetchDeliveries() {
       
        return axios({
            url: BASE_URL + "/orders",
            method: "GET",
            headers: {
                "Authorization": "Bearer " +await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error.response)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }

    /*RETORNA TODAS AS ENTREGAS POR USUSÁRIO */
    async fetchDeliveriesByUserId(userId:any) {
       
        return axios({
            url: BASE_URL + "/orders/"+userId,
            method: "GET",
            headers: {
                "Authorization": "Bearer " +await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error.response)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }

     /*ATUALIZA O STATUS DO PEDIDO POR ORDER ID E SATUS*/
     async updateDelivery(orderId:any,statusId:any) {

        return axios({
            url: BASE_URL + "/orders/"+orderId+"/"+statusId,
            method: "PUT",
            headers: {
                "Authorization": "Bearer "+ await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                if(error.response.status==400){
                  return Promise.reject(error.response.data.errors[0].message)  
                }else if(error.response.status==403){
                    console.log(error.response)
                  return Promise.reject(error.response)
                }else{
                  return Promise.reject(error.response)
                }
            } else if (error.request) { 
                return Promise.reject(error.request)
            } else { 
                // anything else 
                return Promise.reject(error)
            } 
        })
       }  

     /*DELETA UMA ENTREGA POR ORDER ID */
     async deleteDelivery(id:number) {

        return axios({
            url: BASE_URL + "/orders/"+id,
            method: "DELETE",
            headers: {
                "Authorization": "Bearer "+ await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                if(error.response.status==400){
                  return Promise.reject(error.response.data.errors[0].message)  
                }else if(error.response.status==403){
                    console.log(error.response)
                  return Promise.reject(error.response)
                }else{
                  return Promise.reject(error.response)
                }
            } else if (error.request) { 
                return Promise.reject(error.request)
            } else { 
                // anything else 
                return Promise.reject(error)
            } 
        })
       }   

    /*RETORNA PEDIDOS POR STATUS.ENDPOINT FEIGNCLEIT*/
    async fetchOrdersByStatus(statusId:any) {
       
        return axios({
            url: BASE_URL + "/orders/ms/statusId/"+statusId,
            method: "GET",
            headers: {
                "Authorization": "Bearer " +await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error.response)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }
    
     /*RETORNA PEDIDOS POR ID DO PEDIDO.ENDPOINT FEIGNCLEIT*/
    async fetchOrderById(orderId:any) {
       
        return axios({
            url: BASE_URL + "/orders/ms/orderId/"+orderId,
            method: "GET",
            headers: {
                "Authorization": "Bearer " +await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                if(error.response.data.status==404){
                  return Promise.reject(error.response.data.message)
                }else if(error.response.status==403){
                  return Promise.reject(error.response.data.error)
                }else{
                  return Promise.reject(error.response)
                } 
              } else if (error.request) { 
                return Promise.reject(error.request)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }


    /******************** Vehicles *********************/
    
    async fetchVehicleByuserId(userId:any) {
       
        return axios({
            url: BASE_URL + "/vehicles/userId/"+userId,
            method: "GET",
            headers: {
                "Authorization": "Bearer " +await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error.response)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }
    //SALVA UM VEÍCULO
    async saveVehicle(payLoad:object) {
        return axios({
            url: BASE_URL + "/vehicles/save",
            method: "POST",
            data: payLoad,
            headers: {
                "Authorization": "Bearer " +await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            console.log(error.response)
            if (error.response) { 
               if(error.response.status==400){
                return Promise.reject(error.response.data.errors[0].message)  
               }else if(error.response.status==403){
                return Promise.reject(error.response.data.error)
               }else{
                return Promise.reject(error.response)
               }
            } else if (error.request) { 
                return Promise.reject(error.request)
            } else {
                // anything else 
                return Promise.reject(error)
            } 
        })
    }

    /******** SERVIÇO DE EMAILS - FEIGNCLIENT */

    //ENVIA EMAIL
    async sendEmail(payLoad:object) {
      
        return axios({
            url: BASE_URL + "/emails/send",
            method: "POST",
            data: payLoad,
           
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
          
            if (error.response) { 
               if(error.response.status==400){
                return Promise.reject(error.response.data.errors[0].message)  
               }else if(error.response.status==403){
                return Promise.reject(error.response.data.error)
               }else{
                return Promise.reject(error.response)
               }
            } else if (error.request) { 
                return Promise.reject(error.request)
            } else {
                // anything else 
                return Promise.reject(error)
            } 
        })
    }

    //ENVIA EMAIL
    async sendEmailConfirmation(payLoad:object) {
   
        return axios({
            url: BASE_URL + "/emails/send/confirmation",
            method: "POST",
            data: payLoad,
           
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
       
            if (error.response) { 
               if(error.response.status==400){
                return Promise.reject(error.response.data.errors[0].message)  
               }else if(error.response.status==403){
                return Promise.reject(error.response.data.error)
               }else{
                return Promise.reject(error.response)
               }
            } else if (error.request) { 
                return Promise.reject(error.request)
            } else {
                // anything else 
                return Promise.reject(error)
            } 
        })
    }

}

const userService = new UserService();
export default userService;