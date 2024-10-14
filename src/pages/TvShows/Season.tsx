import Background from "../../components/UI/Background.tsx";
import Menu from "../../components/Menu";
import Highlight from "../../components/Highlight/Highlight.tsx";
import {useEffect, useState} from "react";
import {SerieProps} from "./index.tsx";
import MediaVisualizer, {EpisodeProps} from "../../components/MediaVisualizer/MediaVisualizer.tsx";
import {useParams} from "react-router-dom";
import {getDetails} from "../../api/Details.ts";
import {getSeasonDetails} from "../../api/Lists.ts";
import classes from "./Season.module.css";

function Season() {
    const params = useParams();
    const [serie, setSerie] = useState({} as SerieProps);
    const [episodes, setEpisodes] = useState<EpisodeProps[]>();
    const serieId = +params.id!;
    const season = +params.season_number!;

    useEffect(() => {
        document.title = "Episódios da Série"
        fetchEpisodes();
        window.scrollTo(0, 0);
    }, []);

    async function fetchEpisodes() {
        const serieDetails = await getDetails('tv', serieId);
        setSerie(serieDetails);
        const episodesDetails = await getSeasonDetails(serieId, season);
        setEpisodes(episodesDetails?.episodes);
    }

    return (
        <>
            <Background
                image={serie.backdrop_path}
            >
                <Menu/>

                <Highlight
                    data={serie}
                    type={'rating'}
                    descriptionPosition={'bottom'}
                />
            </Background>

            <div className={classes['episode-list-container']}>
                <h1>Temporada {season}</h1>
                <MediaVisualizer props={episodes} requestRating/>
            </div>
        </>
    );
}

export default Season;