import axios from "axios";
import storage from '../storageServices/Storage'
const BASE_URL = "http://192.168.1.8:8080";
const mapboxToken=process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;


class UserService {

    /******************* USER **********************/

    //SALVA UM USER
   async saveUser(payLoad:object) {

        return axios({
            url: BASE_URL + "/users/save",
            method: "POST",
            data: payLoad,
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
        
            if (error.response) { 
                return Promise.reject(error.response)
            } else if (error.request) { 
                return Promise.reject(error)
            } else { 
                // anything else 
                return Promise.reject(error)
            } 
        })
   }

    //ATUALIZA UM FIELD DE USER
    async updateUserField(payLoad:object,userId:number,fieldName:string) {

        return axios({
            url: BASE_URL + "/users/update/"+fieldName+"/"+userId,
            method: "PUT",
            data: payLoad,
            headers: {
               "Authorization": "Bearer " +await storage.getToken(),
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                return Promise.reject(error.response)
            } else if (error.request) { 
                return Promise.reject(error)
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
    async userIsAuthenticated() {

        return axios({
            url: BASE_URL + "/users/userisauthenticated",
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



    /********************* PRODUCTS ******************/ 
    
    //RETORNA OS PRODUTOS
    async findAllProducts() {

        return axios({
            url: BASE_URL + "/products",
            method: "GET",
          
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }

    /********************* COMPANY ******************/ 
    
    //RETORNA AS EMPRESAS
    async findAllCompany() {

        return axios({
            url: BASE_URL + "/companies",
            method: "GET",
            headers: {
                "Authorization": "Bearer ",
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }

    //RETORNA UMA EMPRESA POR ID
    async findCompanyById(id:number) {

        return axios({
            url: BASE_URL + "/companies/id/"+id,
            method: "GET",
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.response) { 
                // client received an error response (5xx, 4xx)
                return Promise.reject(error)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject(error)
              } 
        })
    }

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

   /************************ ORDER ******************************/

   //SALVA UM PEDIDO
   async saveOrder(payLoad:object) {

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
                // A requisição foi feita e o servidor respondeu com um código de status
                // que sai do alcance de 2xx
                return Promise.reject(error.response)
            } else if (error.request) { 
                // A requisição foi feita mas nenhuma resposta foi recebida
                // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
                // http.ClientRequest no node.js 
                return Promise.reject(error)
            } else { 
                // anything else 
                return Promise.reject(error)
            } 
        })
    }


    //RETORNA OS PEDIDOS POR ID DE USUARIO
   async listOrdersByUserId(userId:number) {

    return axios({
        url: BASE_URL + "/orders/getAll/userId/"+userId,
        method: "GET",
        headers: {
            "Authorization": "Bearer "+ await storage.getToken(),
        }
       
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
        
            if (error.response) { 
                return Promise.reject(error.response)
            } else if (error.request) { 
                return Promise.reject(error)
            } else { 
                return Promise.reject(error)
            } 
        })
    }

   //RETORNA OS PEDIDOS POR ID DE USUARIO E STATUS
   async listOrdersByUserIdStatusId(userId:number,statusId:number) {

        return axios({
            url: BASE_URL + "/orders/userId/"+userId+"/statusId/"+statusId,
            method: "GET",
            headers: {
                "Authorization": "Bearer "+ await storage.getToken(),
            }
        
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => { 
            if (error.response) { 
                return Promise.reject(error)
            } else if (error.request) {
                return Promise.reject(error)
            } else{
                return Promise.reject(error)
            } 
        })
   }

   //RETORNA OS PEDIDOS POR ID DE USUARIO E STATUS
   async updateOrderStatus(orderId:number,statusId:number) {

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
            return Promise.reject(error.response.status)
        } else if (error.request) {
            return Promise.reject(error)
        } else{
            return Promise.reject(error)
        } 
    })
}


}

const userService = new UserService();
export default userService;