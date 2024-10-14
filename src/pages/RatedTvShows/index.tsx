import Menu from "../../components/Menu";
import classes from "../MyList/MyList.module.css";
import MediaVisualizer, {RatedSerieProps} from "../../components/MediaVisualizer/MediaVisualizer.tsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {SessionState} from "../../store/session.ts";
import {getRatedTvShows} from "../../api/Account.ts";
import styles from "./RatedTvShows.module.css";
import ButtonLoadMore from "../../components/UI/ButtonLoadMore.tsx";

function RatedTvShows() {
    const [ratedTvShows, setRatedTvShows] = useState<RatedSerieProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);
    const accountId: string = useSelector((state: RootState) => state.session.accountId!);
    const session_id: string = useSelector((state: SessionState) => state.session.sessionId!);

    useEffect(() => {
        document.title = "Séries Avaliadas"
        fetchRatedTvShows()
    }, [page]);

    async function fetchRatedTvShows() {
        if (!hasMorePages) return;
        setLoading(true);

        const ratedTvShowsResponse = await getRatedTvShows(accountId, session_id, page);

        if (ratedTvShowsResponse) {
            if (ratedTvShowsResponse.page === ratedTvShowsResponse.total_pages) {
                setHasMorePages(false);
            }
            setRatedTvShows((prevTvShows) => [...prevTvShows, ...ratedTvShowsResponse.results]);
        }

        setLoading(false);
    }

    function loadMore() {
        if (!loading && hasMorePages) {
            setPage(prevPage => prevPage + 1);
        }
    }

    return (
        <div className={styles['rated-tv-shows-container']}>
            <Menu/>
            <div className={classes.infos}>
                <h1>Séries Avaliadas</h1>
                <p className={`body-large ` + classes['infos-p']}>Todos as séries que você acha que merecem uma nota</p>
            </div>

            {ratedTvShows.length != 0 &&
                <div className={styles['rated-tv-shows-list-container']}>
                    <MediaVisualizer props={ratedTvShows}/>

                    {hasMorePages && !loading && (
                        <ButtonLoadMore onClick={loadMore}>
                            Carregar mais
                        </ButtonLoadMore>
                    )}
                </div>
            }
        </div>
    );
}

export default RatedTvShows;