import { axiosInstance, headers, BASE_URL } from "./base.api";

export const moveTask = {

  moveTask: function (newStatus, taskId) {
    const userToken = localStorage.getItem('token')
    const url = `/task/${newStatus}/${taskId}`;
    return axiosInstance.put(url, {}, {headers}
    );
  },
};
