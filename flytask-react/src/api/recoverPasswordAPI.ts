
import { axiosInstance } from "./base.api";

const endpoint = '/auth/recover-password?email='

export const recoverPRequest = {
    recoverPassword: function (email: string){
        return axiosInstance.post(endpoint + email)
    }
}