import {useEffect, useState} from "react";
import classes from "./MyList.module.css";
import Carousel from "../../components/Carousel/Carousel.tsx";
import {MovieProps} from "../Movies";
import {SerieProps} from "../TvShows";
import {getFavorite, getToWatchList} from "../../api/Account.ts";
import {useSelector} from "react-redux";
import Menu from "../../components/Menu";
import {SessionState} from "../../store/session.ts";

function MyList() {
    const [favoriteMovies, setFavoriteMovies] = useState([] as MovieProps[]);
    const [favoriteTvShows, setFavoriteTvShows] = useState([] as SerieProps[]);
    const [toWatchMovies, setToWatchMovies] = useState([] as MovieProps[]);
    const [toWatchTvShows, setToWatchTvShows] = useState([] as SerieProps[]);
    const accountId = useSelector((state: SessionState) => state.session.accountId);
    const sessionId = useSelector((state: SessionState) => state.session.sessionId);

    useEffect(() => {
        document.title = "Minha Lista"
        fetchMoviesList();
    }, []);

    async function fetchMoviesList() {
        const favoriteMoviesData = await getFavorite(accountId, 'movies', sessionId);
        setFavoriteMovies(favoriteMoviesData);
        const favoriteTvShowsData = await getFavorite(accountId, 'tv', sessionId);
        setFavoriteTvShows(favoriteTvShowsData);
        const toWatchMoviesData = await getToWatchList(accountId, 'movies', sessionId);
        setToWatchMovies(toWatchMoviesData);
        const toWatchTvShowsData = await getToWatchList(accountId, 'tv', sessionId);
        setToWatchTvShows(toWatchTvShowsData);
    }

    return (
        <div className={classes.list}>
            <Menu/>
            <div className={classes.infos}>
                <h1>Minhas listas</h1>
                <p className={`body-large ` + classes['infos-p']}>Listas criadas por você de acordo com seus gostos</p>
            </div>

            <div className={classes.carousel}>
                <Carousel type='movie' title='Filmes favoritos' data={favoriteMovies}/>
                <Carousel type='tvshow' title='Séries favoritas' data={favoriteTvShows}/>
                <Carousel type='movie' title='Filmes para ver mais tarde' data={toWatchMovies}/>
                <Carousel type='tvshow' title='Séries para ver mais tarde' data={toWatchTvShows}/>
            </div>
        </div>

    )

}

export default MyList;