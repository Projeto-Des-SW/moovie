import Background from "../../components/UI/Background.tsx";
import Menu from "../../components/Menu";
import Highlight from "../../components/Highlight/Highlight.tsx";
import Carousel from "../../components/Carousel/Carousel.tsx";
import {useEffect, useState} from "react";
import {MovieProps} from "./index.tsx";
import {getDetails, getSimilar, getVideos} from "../../api/Details.ts";
import classes from "./Movie.module.css";
import {useParams} from "react-router-dom";
import {TrailerProps} from "../Home";
import {getTrailer} from "../../utils/Details.ts";

function Movie() {
    const params = useParams();
    const [movie, setMovie] = useState({} as MovieProps);
    const [similarMovies, setSimilarMovies] = useState([] as MovieProps[]);
    const [trailer, setTrailer] = useState([] as TrailerProps[]);

    useEffect(() => {
        document.title = "Detalhes do filme"
        fetchMovie();
        window.scrollTo(0, 0);

    }, [params]);

    async function fetchMovie() {
        const movieId = +params.id!;
        const movieDetails = await getDetails('movie', movieId);
        setMovie(movieDetails);
        const similarMoviesData = await getSimilar('movie', movieId,);
        setSimilarMovies(similarMoviesData);
        const trailerData = await getVideos('movie', movieId, 'pt-BR');
        if (trailerData.results.length > 0)
            setTrailer(trailerData.results);
        else {
            const trailerData = await getVideos('movie', movieId, 'en-US');
            setTrailer(trailerData.results);
        }
    }

    return (
        <>
            <Background
                image={movie.backdrop_path}
            >
                <Menu/>
                <Highlight
                    data={movie}
                    isMovie
                    type={'duration'}
                    descriptionPosition={'bottom'}
                    hasRating
                    hasTrailer
                    hasAdd
                    hasFav
                    trailer={getTrailer(trailer)}
                />
            </Background>

            <div className={classes.carousel}>
                <Carousel type='movie' title='Similares' data={similarMovies}/>
            </div>
        </>
    )
}

export default Movie;