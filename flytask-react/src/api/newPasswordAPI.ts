import { axiosInstance } from "./base.api";

const endpoint = "/auth/recover-authenticated"

export const setNewPassword = {
    setPassword: function (newPasswordData: {
        newPassword: string, 
        passwordConfirmation: string, 
        token: string
    } ) {
        return axiosInstance.post(endpoint, {
            newPassword: newPasswordData.newPassword, 
            passwordConfirmation: newPasswordData.passwordConfirmation, 
            token: newPasswordData.token
        })
    }
}
