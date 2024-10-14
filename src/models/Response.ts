import {
    EpisodeProps,
    RatedEpisodeProps,
    RatedMovieProps,
    RatedSerieProps
} from "../components/MediaVisualizer/MediaVisualizer.tsx";

export interface MediaTypeResponse {
    page: number,
    total_pages: number,
    total_results: number,
}

export interface RatedMovieResponse extends MediaTypeResponse {
    results: RatedMovieProps[],
}

export interface RatedTvShowResponse extends MediaTypeResponse {
    results: RatedSerieProps[],
}

export interface RatedEpisodeResponse extends MediaTypeResponse {
    results: RatedEpisodeProps[],
}

export interface SeasonDetailsResponse {
    _id: string,
    air_date: string,
    episodes: EpisodeProps[],
    name: string,
    overview: string,
    id: number,
    poster_path: string,
    season_number: number,
}