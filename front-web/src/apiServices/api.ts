import axios from "axios";

const BASE_URL = "http://localhost:8080";

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
            return Promise.reject(error.response.data)
        })
    }

}

const userService = new UserService()
export default userService;