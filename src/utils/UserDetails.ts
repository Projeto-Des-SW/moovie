import {addEpisodeRating, addMovieOrTvRating} from "../api/Rating.ts";

export interface RatingProps {
    "id": number,
    "favorite": boolean,
    "rated": false | {
        "value": number
    },
    "watchlist": boolean
}

export function getUserMovieTvOrEpisodeRating(rating: RatingProps) {
    if (rating.rated) {
        return rating.rated.value;
    }

    return 0;
}

export async function changeRating(id: number, rating: number, type: string, session_id: string, season_number: number | null = null, episode_number: number | null = null) {
    if (season_number && episode_number && type === 'episode') {
        await addEpisodeRating(id, season_number, episode_number, rating, session_id);
    } else {
        await addMovieOrTvRating(id, rating, type, session_id);
    }
}