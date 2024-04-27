import { axiosInstance } from "./base.api";

const endpoint = "/auth/register";

export const registerUser = {
  register: function (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
  }) {
    return axiosInstance.post(endpoint, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword
    });
  },
};