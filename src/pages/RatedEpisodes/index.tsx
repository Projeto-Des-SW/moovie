import {useEffect, useState} from "react";
import MediaVisualizer, {RatedEpisodeProps} from "../../components/MediaVisualizer/MediaVisualizer.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {SessionState} from "../../store/session.ts";
import {getRatedEpisodes} from "../../api/Account.ts";
import Menu from "../../components/Menu";
import classes from "../MyList/MyList.module.css";
import styles from "./RatedEpisodes.module.css";
import ButtonLoadMore from "../../components/UI/ButtonLoadMore.tsx";

function RatedEpisodes() {
    const [ratedEpisodes, setRatedEpisodes] = useState<RatedEpisodeProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);
    const accountId: string = useSelector((state: RootState) => state.session.accountId!);
    const session_id: string = useSelector((state: SessionState) => state.session.sessionId!);

    useEffect(() => {
        document.title = "Episódios Avaliados"
        fetchRatedEpisodes()
    }, [page]);

    async function fetchRatedEpisodes() {
        if (!hasMorePages) return;
        setLoading(true);

        const ratedEpisodesResponse = await getRatedEpisodes(accountId, session_id, page);

        if (ratedEpisodesResponse) {
            if (ratedEpisodesResponse.page === ratedEpisodesResponse.total_pages) {
                setHasMorePages(false);
            }
            setRatedEpisodes((prevEpisodes) => [...prevEpisodes, ...ratedEpisodesResponse.results]);
        }

        setLoading(false);
    }

    function loadMore() {
        if (!loading && hasMorePages) {
            setPage(prevPage => prevPage + 1);
        }
    }

    return (
        <div className={styles['rated-episodes-container']}>
            <Menu/>
            <div className={classes.infos}>
                <h1>Episódios Avaliados</h1>
                <p className={`body-large ` + classes['infos-p']}>Todos os episódios que você acha que merecem uma nota</p>
            </div>

            <div className={styles['rated-episodes-list-container']}>
                <MediaVisualizer props={ratedEpisodes}/>

                {hasMorePages && !loading && (
                    <ButtonLoadMore onClick={loadMore}>
                        Carregar mais
                    </ButtonLoadMore>
                )}
            </div>
        </div>
    );
}

export default RatedEpisodes;