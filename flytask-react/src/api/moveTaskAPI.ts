import { axiosInstance, headers } from "./base.api"



export const moveTask = {
    moveTask: function(newStatus: string, taskId: number) {

        
        const url = `/task/${newStatus}/${taskId}`;
        return axiosInstance.put(url, {} , {headers: headers}) 
    }
}