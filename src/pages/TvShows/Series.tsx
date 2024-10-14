import Background from "../../components/UI/Background.tsx";
import Menu from "../../components/Menu";
import Highlight from "../../components/Highlight/Highlight.tsx";
import Carousel from "../../components/Carousel/Carousel.tsx";
import {useEffect, useState} from "react";
import {SerieProps} from "./index.tsx";
import {getDetails, getSimilar} from "../../api/Details.ts";
import classes from "./Series.module.css";
import {useParams} from "react-router-dom";

export interface SeasonProps {
    id: number;
    name: string;
    air_date: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
    overview: string;
    media_type: string;
}

function Series() {
    const params = useParams();
    const [serie, setSerie] = useState({} as SerieProps);
    const [serieSeasons, setSerieSeasons] = useState([] as SeasonProps[]);
    const [similarSeries, setSimilarSeries] = useState([] as SerieProps[]);

    useEffect(() => {
        document.title = "Temporadas da Série"
        fetchSerie();
        window.scrollTo(0, 0);
    }, [params]);

    async function fetchSerie() {
        const serieId = +params.id!;
        const serieDetails = await getDetails('tv', serieId);
        setSerie(serieDetails);
        setSerieSeasons(serieDetails.seasons);
        const similarSeriesData = await getSimilar('tv', serieId,);
        setSimilarSeries(similarSeriesData);
    }

    return (
        <>
            <Background
                image={serie.backdrop_path}
            >
                <Menu/>
                <Highlight
                    data={serie}
                    type={'numberOfSeasons'}
                    descriptionPosition={'bottom'}
                    hasGenre
                    hasRating
                    hasAdd
                    hasFav
                />
            </Background>

            <div className={classes.carousel}>
                <Carousel type='tvshow/season' title='Temporadas' data={serieSeasons}/>
                <Carousel type='tvshow' title='Similares' data={similarSeries}/>
            </div>
        </>
    )
}

export default Series;