import api from "./main";
import {ApiErrorHandler} from "../utils/ApiErrorHandler.ts";
import {SeasonDetailsResponse} from "../models/Response.ts";
import {MediaType} from "../components/MediaVisualizer/MediaVisualizer.tsx";

export async function getPopular(type: string, page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/${type}/popular`, {
            params: {
                page: page,
                language: language,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getTopRated(type: string, page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/${type}/top_rated`, {
            params: {
                page: page,
                language: language,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getCollection(id: number, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/collection/${id}`, {
            params: {
                language: language,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getNowPlaying(page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/movie/now_playing`, {
            params: {
                page: page,
                language: language,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getUpcoming(page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/movie/upcoming`, {
            params: {
                page: page,
                language: language,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getAiringToday(page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/tv/airing_today`, {
            params: {
                page: page,
                language: language,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getOnAir(page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/tv/on_the_air`, {
            params: {
                page: page,
                language: language,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getSeasonDetails(seriesId: number, seasonNumber: number, language: string = 'pt-BR') {
    try {
        const response = await api.get<SeasonDetailsResponse>(`/tv/${seriesId}/season/${seasonNumber}`, {
            params: {
                language: language,
            }
        });
        response.data.episodes = response.data.episodes.map(episode => {
            episode.media_type = MediaType.EPISODE;
            return episode;
        });

        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}