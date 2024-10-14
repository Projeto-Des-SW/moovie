import {apiDefault} from "./main";
import {ApiErrorHandler} from "../utils/ApiErrorHandler.ts";

export async function searchMulti(query: string, page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await apiDefault.get(`/search/multi`, {
            params: {
                query: query,
                page: page,
                language: language,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}