import { axiosInstance } from "./base.api";

const endpoint = "/auth/login";

export const loginUser = {
  login: function (loginData) {
    return axiosInstance.post(endpoint, {
      email: loginData.email,
      password: loginData.password,
    });
  },
};