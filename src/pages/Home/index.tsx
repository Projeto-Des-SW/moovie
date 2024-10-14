import Menu from "../../components/Menu";
import classes from "./Home.module.css";
import Highlight from "../../components/Highlight/Highlight.tsx";
import {useEffect, useState} from "react";
import Background from "../../components/UI/Background.tsx";
import {getCollection, getPopular} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails, getVideos} from "../../api/Details.ts";
import {MovieProps} from "../Movies";
import Carousel from "../../components/Carousel/Carousel.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import {getTrailer} from "../../utils/Details.ts";

function Home() {
    const [movie, setMovie] = useState({} as MovieProps);
    const [popularMovies, setPopularMovies] = useState([] as MovieProps[]);
    const [popularSeries, setPopularSeries] = useState([] as MovieProps[]);
    const [collection, setcollection] = useState([] as MovieProps[]);
    const [trailer, setTrailer] = useState([] as TrailerProps[]);

    useEffect(() => {
        document.title = "Início"
        requestHighlitedMovie();
    }, []);

    async function requestHighlitedMovie() {
        const popMovies = await getPopular('movie');
        setPopularMovies(popMovies.results);
        const choosenMovie = chooseItem(popMovies.results);
        const movieDetails = await getDetails('movie', choosenMovie.id);
        setMovie(movieDetails);
        const popSeries = await getPopular('tv');
        setPopularSeries(popSeries.results);
        const choosenCollection = await getCollection(10);
        setcollection(choosenCollection.parts)
        const trailerData = await getVideos('movie', choosenMovie.id, 'pt-BR');
        if (trailerData.results.length > 0)
            setTrailer(trailerData.results);
        else {
            const trailerData = await getVideos('movie', choosenMovie.id, 'en-US');
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
                    descriptionPosition={'top'}
                    hasGenre
                    hasRating
                    hasTrailer
                    hasAdd
                    hasFav
                    trailer={getTrailer(trailer)}
                />
            </Background>

            <div className={classes.carousel}>
                <Carousel type='movie' title='Coleção de Star Wars' data={collection}/>
                <Carousel type='tvshow' title='Séries em alta' data={popularSeries}/>
                <Carousel type='movie' title='Filmes em alta' data={popularMovies}/>
            </div>

            <Footer/>
        </>
    )
}

export default Home;

export interface TrailerProps {
    key: string,
    site: string,
    type: string
}
