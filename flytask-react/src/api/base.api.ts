import axios from 'axios'

export const BASE_URL = process.env.REACT_APP_BASE_URL;

const userToken = localStorage.getItem('token')

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  };

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})