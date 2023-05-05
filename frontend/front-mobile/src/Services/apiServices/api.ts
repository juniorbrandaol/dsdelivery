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

    //SALVA UM PEDIDO
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
                if(error.response.status===403){
                    return Promise.reject(error.response.data.message)
                }else{
                    return Promise.reject(error.response)
                }
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

    //VERIFICA SE AUTENTICADO
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
    
    async fetchOrdersByStatus(statusId:any) {
       
        return axios({
            url: BASE_URL + "/orders/statusId/"+statusId,
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

}

const userService = new UserService();
export default userService;