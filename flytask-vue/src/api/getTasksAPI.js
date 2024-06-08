import { axiosInstance } from "./base.api"
import { headers } from "./base.api"

const endpoint = 'task/search?keyword=&status=0&userId=' + localStorage.getItem('id')

export const getTasks = {
    getTasks: function() {
        return axiosInstance.get(endpoint, {headers})
    } 
}