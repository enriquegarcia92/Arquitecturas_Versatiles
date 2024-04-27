import { axiosInstance } from "./base.api"
import { headers } from "./base.api"

function formatTimestamp(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Adding 1 to month because months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }

var date = new Date()
var sqlTimestampDate = formatTimestamp(date)

const endpoint = 'task/search?keyword=&status=0&dueDate=' + sqlTimestampDate + '&creationDate=' +sqlTimestampDate


export const getTasks = {
    getTasks: function() {
        return axiosInstance.get(endpoint, {headers})
    } 
}