import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_URL_API

const userToken = localStorage.getItem('token')

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  };

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})