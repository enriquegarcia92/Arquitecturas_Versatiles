import { axiosInstance, headers } from "./base.api";

const endpoint = "/auth/whoami"

export const whoami = {
    whoami: function () {
        return axiosInstance.post(endpoint, {}, {headers: headers})
    }
}