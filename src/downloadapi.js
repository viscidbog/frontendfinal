export const getAuthorizationHeader = () => `Bearer ${Token}`;

// import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: getAuthorizationHeader(),
  },
});
