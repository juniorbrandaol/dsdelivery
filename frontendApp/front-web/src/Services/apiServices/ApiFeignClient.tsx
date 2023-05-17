import axios from "axios";
import storage from '../storageServices/Storage'
const BASE_URL = "http://192.168.1.8:8080";


class UserServiceFeignClient {

   //SEND SMS
   async sendSms(payLoad:any) {

    return axios({
        url: BASE_URL + "/sms/send",
        method: "POST",
        data: payLoad,
    }).then((response) => {
        return Promise.resolve(response)
    }).catch((error) => {
      console.log(error)
        if (error.response) { 
            return Promise.reject(error.response.status)
          } else if (error.request) { 
            return Promise.reject(error)
          } else { 
            return Promise.reject(error)
          } 
    })
}

}

const userServiceFeignClient = new UserServiceFeignClient();
export default userServiceFeignClient;