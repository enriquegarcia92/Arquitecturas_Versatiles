import axios from 'axios'

export const BASE_URL = 'http://localhost:8080/api'

const userToken = localStorage.getItem('token')

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  };

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})