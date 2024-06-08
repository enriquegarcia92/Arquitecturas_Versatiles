import axios from 'axios'

export const BASE_URL = 'http://java_app:7070/api'

const userToken = localStorage.getItem('token')

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  };

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})