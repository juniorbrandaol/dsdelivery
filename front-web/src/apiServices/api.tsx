import axios from "axios";

const BASE_URL = "http://localhost:8080";
const mapboxToken=process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;

class UserService {

    /********************* PRODUCTS ******************/ 
    
    //RETORNA AS VENDAS
    async findAllProducts() {

        return axios({
            url: BASE_URL + "/products",
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

    //RETORNA AS EMPRESAS
    async findCompanyById(id:number) {

        return axios({
            url: BASE_URL + "/companies/"+id,
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

}

const userService = new UserService();
export default userService;