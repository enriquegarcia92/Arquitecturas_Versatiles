import { yyyymmddToISO } from "@/utils/dataConversions"
import { axiosInstance, headers} from "./base.api"


const endpoint = '/task/edit/'

export const editTask = {
    editTask: function (values, taskId) {
        return axiosInstance.put(endpoint + taskId, {
            title: values.title,
            description: values.description,
            dueDate: yyyymmddToISO(values.dueDate) 
        }, {headers})
    }
}