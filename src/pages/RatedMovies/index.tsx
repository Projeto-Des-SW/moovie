import {useEffect, useState} from "react";
import {getRatedMovies} from "../../api/Account.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Menu from "../../components/Menu";
import classes from "../MyList/MyList.module.css";
import {SessionState} from "../../store/session.ts";
import MediaVisualizer, {RatedMovieProps} from "../../components/MediaVisualizer/MediaVisualizer.tsx";
import styles from "./RatedMovies.module.css";
import ButtonLoadMore from "../../components/UI/ButtonLoadMore.tsx";

function RatedMovies() {
    const [ratedMovies, setRatedMovies] = useState<RatedMovieProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);
    const accountId: string = useSelector((state: RootState) => state.session.accountId!);
    const session_id: string = useSelector((state: SessionState) => state.session.sessionId!);

    useEffect(() => {
        document.title = "Filmes Avaliados"
        fetchRatedMovies()
    }, [page]);

    async function fetchRatedMovies() {
        if (!hasMorePages) return;
        setLoading(true);

        const ratedMoviesResponse = await getRatedMovies(accountId, session_id, page);

        if (ratedMoviesResponse) {
            // Se a página atual for a última, pare de carregar mais
            if (ratedMoviesResponse.page === ratedMoviesResponse.total_pages) {
                setHasMorePages(false);
            }
            setRatedMovies((prevMovies) => [...prevMovies, ...ratedMoviesResponse.results]);
        }

        setLoading(false);
    }

    function loadMore() {
        if (!loading && hasMorePages) {
            setPage(prevPage => prevPage + 1);  // Incrementa a página para carregar mais
        }
    }

    return (
        <div className={styles['rated-movies-container']}>
            <Menu/>
            <div className={classes.infos}>
                <h1>Filmes Avaliados</h1>
                <p className={`body-large ` + classes['infos-p']}>Todos os filmes que você acha que merecem uma nota</p>
            </div>

            <div className={styles['rated-movies-list-container']}>
                <MediaVisualizer props={ratedMovies}/>

                {hasMorePages && !loading && (
                    <ButtonLoadMore onClick={loadMore}>
                        Carregar mais
                    </ButtonLoadMore>
                )}
            </div>
        </div>
    );
}

export default RatedMovies;