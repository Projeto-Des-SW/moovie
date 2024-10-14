import axios from "axios";
import store from "../store";
import {loadingActions} from "../store/loading.ts";

const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;

const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
}

const api = axios.create(apiConfig);

api.interceptors.request.use(
    (config) => {
        store.dispatch(loadingActions.startLoading()); // Inicia o loading
        return config;
    },
    (error) => {
        store.dispatch(loadingActions.stopLoading()); // Para o loading em caso de erro
        return Promise.reject(error);
    }
);

// Interceptor para a resposta - desativar o loading
api.interceptors.response.use(
    (response) => {
        store.dispatch(loadingActions.stopLoading()); // Para o loading após a resposta
        return response;
    },
    (error) => {
        store.dispatch(loadingActions.stopLoading()); // Para o loading em caso de erro
        return Promise.reject(error);
    }
);

export const apiDefault = axios.create(apiConfig);

export default api;