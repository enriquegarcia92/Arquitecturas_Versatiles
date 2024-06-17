import { axiosInstance } from "./base.api";
import { headers } from "./base.api";

const endpoint = 'task/delete/'

export const deleteTask = {
    deleteTask: function (taskId) {
        return axiosInstance.delete(endpoint + taskId, {headers: headers})
    }
}