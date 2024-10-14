import api, {apiDefault} from "./main";
import {ApiErrorHandler} from "../utils/ApiErrorHandler.ts";

export async function addMovieOrTvRating(id: number, rating: number, type: string, session_id: string) {
    try {
        const response = await apiDefault.post(`/${type}/${id}/rating`, {
            value: rating,
            params: {
                session_id: session_id
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function addEpisodeRating(series_id: number, season_number: number, episode_number: number, rating: number, session_id: string) {
    try {
        const response = await apiDefault.post(`/tv/${series_id}/season/${season_number}/episode/${episode_number}/rating`, {
            value: rating,
            params: {
                session_id: session_id
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getMovieOrTvAccountStates(id: number, type: string, session_id: string) {
    try {
        const response = await api.get(`/${type}/${id}/account_states`, {
            params: {
                session_id: session_id
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getEpisodeAccountStates(series_id: number, season_number: number, episode_number: number, session_id: string) {
    try {
        const response = await apiDefault.get(`/tv/${series_id}/season/${season_number}/episode/${episode_number}/account_states`, {
            params: {
                session_id: session_id
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}