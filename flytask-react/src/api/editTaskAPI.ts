import { axiosInstance, headers} from "./base.api"


const endpoint = '/task/edit/'

export const editTask = {
    editTask: function (updatedTaskData: {
        title: string, 
        description: string, 
        dueDate: string
    }, taskId: number) {
        return axiosInstance.put(endpoint + taskId, {
            title: updatedTaskData.title,
            description: updatedTaskData.description,
            dueDate: updatedTaskData.dueDate
        }, {headers})
    }
}