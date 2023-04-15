import axios from "axios";

const BASE_URL = "http://192.168.1.8:8080";

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
                return Promise.reject(error.response)
              } else if (error.request) { 
                // client never received a response, or request never left 
                return Promise.reject(error)
              } else { 
                // anything else 
                return Promise.reject('nothing')
              } 
          
        })
    }

}

const userService = new UserService()
export default userService;