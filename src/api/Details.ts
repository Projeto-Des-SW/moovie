import api from "./main";
import {ApiErrorHandler} from "../utils/ApiErrorHandler.ts";

export async function getDetails(type: string, id: number, language: string = "pt-BR") {
    try {
        const response = await api.get(`/${type}/${id}`, {
            params: {
                language: language
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getSimilar(type: string, id: number, page: number = 1, language: string = "pt-BR") {
    try {
        const response = await api.get(`/${type}/${id}/similar`, {
            params: {
                page: page,
                language: language,
            }
        });
        const resData = response.data;
        return resData.results;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getVideos(type: string, id: number, language: string) {
    try {
        const response = await api.get(`/${type}/${id}/videos`, {
            params: {
                language: language
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}