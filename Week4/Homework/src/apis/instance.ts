import axios from "axios";
import { AUTH_CODE_KEY } from "../constants/storage";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
    const authCode = localStorage.getItem(AUTH_CODE_KEY);

    if(authCode) {
        config.headers.Authorization = authCode;
    }

    return config;
});