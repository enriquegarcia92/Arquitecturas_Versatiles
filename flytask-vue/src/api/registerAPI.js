import { axiosInstance } from "./base.api";

const endpoint = "/auth/register";

export const registerUser = {
  register: function (userData) {
    return axiosInstance.post(endpoint, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword
    });
  },
};