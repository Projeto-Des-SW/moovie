import {Genres} from "../pages/Movies";
import {TrailerProps} from "../pages/Home";

export function getGenres(genres: Genres[]) {
    if (!genres) {
        return "";
    }

    const genresArray = genres.map((genre) => {
        return genre.name;
    });

    if (genres.length === 1) {
        return genresArray[0];
    }

    const lastGenre = genresArray.pop();
    return genresArray.join(', ') + ' & ' + lastGenre;
}

export function getReleaseYear(date: string) {
    if (!date) {
        return "";
    }

    return date.split('-')[0];
}

export function getDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours} h ${minutes} min`;
}

export function getNumberOfSeasons(numberOfSeasons: number) {
    if (!numberOfSeasons) {
        return "";
    }

    return `${numberOfSeasons} Temporada${numberOfSeasons > 1 ? 's' : ''}`;
}

export function getNumberOfMovies(numberOfMovies: number) {
    if (!numberOfMovies) {
        return "";
    }

    return `${numberOfMovies} Filme${numberOfMovies > 1 ? 's' : ''}`;
}

export function getGeneralRating(rating: number) {
    if (!rating) {
        return "";
    }

    return `${rating} `;
}

export function getMinutes(minutes: number) {
    if (!minutes) {
        return "";
    }

    return `${minutes} min`;
}

export function getDatePtBr(date: string) {
    const result = new Date(date);
    return result.toLocaleString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'});
}

export function getTrailer(videos: TrailerProps[]){
    const trailers= videos.filter(item => item.type === "Trailer");
    const youtubeUrl = "https://www.youtube.com/embed/";
    if(trailers.length > 0 && trailers[0].site === "YouTube"){
        return youtubeUrl + trailers[0].key;
    } else {
        return '';
    }
}

