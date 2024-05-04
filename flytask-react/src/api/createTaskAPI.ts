import { axiosInstance } from "./base.api";
import { headers } from "./base.api";

const endpoint = '/task/create'

export const createTask = {
    createTask: function (taskData: {
        title: string;
        description: string;
        dueDate: string
        userId: number
    }){
        return axiosInstance.post(endpoint, {
            title: taskData.title, 
            description: taskData.description, 
            dueDate: taskData.dueDate, 
            userId: taskData.userId
        }, {headers});
    }
}