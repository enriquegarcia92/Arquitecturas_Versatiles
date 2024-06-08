import { axiosInstance } from "./base.api";
import { headers } from "./base.api";

const endpoint = '/task/create'

export const createTask = {
    createTask: function (taskData, userId){
        return axiosInstance.post(endpoint, {
            title: taskData.title, 
            description: taskData.description, 
            dueDate: taskData.dueDate, 
            userId: userId
        }, {headers});
    }
}