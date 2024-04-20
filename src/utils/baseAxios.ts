import axios from "axios";
import { BASE_URL_API } from "./constants";

export const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie
      .split(";")
      ?.find((i) => i.includes("accessToken"))
      ?.split("=")[1]
      ?.trim();

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
