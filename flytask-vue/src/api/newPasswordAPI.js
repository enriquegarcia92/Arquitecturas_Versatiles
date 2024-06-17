import { axiosInstance } from "./base.api";

const endpoint = "/auth/recover-authenticated"

export const setNewPassword = {
    setPassword: function (newPasswordData) {
        return axiosInstance.post(endpoint, {
            newPassword: newPasswordData.newPassword, 
            passwordConfirmation: newPasswordData.passwordConfirmation, 
            token: newPasswordData.token
        })
    }
}
