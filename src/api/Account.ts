import api, {apiDefault} from "./main";
import {ApiErrorHandler} from "../utils/ApiErrorHandler.ts";
import {
    MediaType,
    RatedEpisodeProps,
    RatedMovieProps,
    RatedSerieProps
} from "../components/MediaVisualizer/MediaVisualizer.tsx";
import {RatedEpisodeResponse, RatedMovieResponse, RatedTvShowResponse} from "../models/Response.ts";

export async function manageFavorite(account_id: string, media_type: string, media_id: number, favorite: boolean, session_id: string) {
    try {
        const response = await apiDefault.post(`/account/${account_id}/favorite`, {
            media_type: media_type,
            media_id: media_id,
            favorite: favorite,
            params: {
                session_id: session_id,
            }
        });

        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function manageToWatchList(account_id: string, media_type: string, media_id: number, watchlist: boolean, session_id: string) {
    try {
        const response = await apiDefault.post(`/account/${account_id}/watchlist`, {
            media_type: media_type,
            media_id: media_id,
            watchlist: watchlist,
            params: {
                session_id: session_id,
            }
        });

        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getFavorite(account_id: string, type: string, session_id: string, page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/account/${account_id}/favorite/${type}`, {
            params: {
                session_id: session_id,
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

export async function getToWatchList(account_id: string, type: string, session_id: string, page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get(`/account/${account_id}/watchlist/${type}`, {
            params: {
                session_id: session_id,
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

export async function getAccountDetails(account_id: string, session_id: string) {
    try {
        const response = await api.get(`/account/${account_id}`, {
            params: {
                session_id: session_id,
            }
        });
        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getRatedMovies(account_id: string, session_id: string, page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await apiDefault.get<RatedMovieResponse>(`/account/${account_id}/rated/movies`, {
            params: {
                language: language,
                page: page,
                session_id: session_id,
            }
        });
        response.data.results = response.data.results.map((movie: RatedMovieProps) => {
            movie.media_type = MediaType.MOVIE;
            return movie;
        });

        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getRatedTvShows(account_id: string, session_id: string, page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get<RatedTvShowResponse>(`/account/${account_id}/rated/tv`, {
            params: {
                language: language,
                page: page,
                session_id: session_id,
            }
        });
        response.data.results = response.data.results.map((tvShow: RatedSerieProps) => {
            tvShow.media_type = MediaType.TV;
            return tvShow;
        });

        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getRatedEpisodes(account_id: string, session_id: string, page: number = 1, language: string = 'pt-BR') {
    try {
        const response = await api.get<RatedEpisodeResponse>(`/account/${account_id}/rated/tv/episodes`, {
            params: {
                language: language,
                page: page,
                session_id: session_id,
            }
        });
        response.data.results = response.data.results.map((episode: RatedEpisodeProps) => {
            episode.media_type = MediaType.RATED_EPISODE;
            return episode;
        });

        return response.data;
    } catch (error) {
        ApiErrorHandler(error);
    }
}