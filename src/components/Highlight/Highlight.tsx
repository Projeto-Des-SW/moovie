import {RiInformationFill} from "react-icons/ri";
import ButtonOutlined from "../UI/ButtonOutlined.tsx";
import ButtonCircle from "../UI/ButtonCircle.tsx";
import {IoAddOutline} from "react-icons/io5";
import classes from "./Highlight.module.css";
import {useEffect, useState} from "react";
import {
    getDuration,
    getGenres,
    getNumberOfMovies,
    getNumberOfSeasons, getGeneralRating,
    getReleaseYear
} from "../../utils/Details.ts";
import HighlightDescription from "./HighlightDescription.tsx";
import {SerieProps} from "../../pages/TvShows";
import {MovieProps} from "../../pages/Movies";
import {manageFavorite, manageToWatchList} from "../../api/Account.ts";
import {useSelector} from "react-redux";
import {SessionState} from "../../store/session.ts";
import {Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Favorite from "@mui/icons-material/Favorite";
import {changeRating, getUserMovieTvOrEpisodeRating, RatingProps} from "../../utils/UserDetails.ts";
import {getMovieOrTvAccountStates} from "../../api/Rating.ts";

export interface HighlightProps {
    data: MovieProps | SerieProps,
    isMovie?: boolean,
    type: string,
    descriptionPosition: string,
    hasGenre?: boolean,
    hasRating?: boolean,
    hasTrailer?: boolean,
    hasMoreInfo?: boolean,
    hasAdd?: boolean,
    hasFav?: boolean,
    trailer?: string
}

function Highlight(props: HighlightProps) {
    const releaseYear = getReleaseYear(props.isMovie ? (props.data as MovieProps).release_date : (props.data as SerieProps).first_air_date);
    const duration = getDuration(props.data.runtime);
    const genres = getGenres(props.data.genres);
    const numberOfSeasons = getNumberOfSeasons(props.data.number_of_seasons);
    const numberOfMovies = getNumberOfMovies(props.data.number_of_movies);
    const generalRating = getGeneralRating(props.data.vote_average);
    const account_id = useSelector((state: SessionState) => state.session.accountId);
    const session_id = useSelector((state: SessionState) => state.session.sessionId);
    const [favorite, setFavorite] = useState(false);
    const [added, setAdded] = useState(false);
    const [ratingValue, setRatingValue] =  useState<number | null>(null);

    useEffect(() => {
        requestAccountStates();
    }, [props.data.id]);

    async function requestAccountStates() {
        if (!props.data.id)
            return;
        const response: RatingProps = await getMovieOrTvAccountStates(props.data.id, props.isMovie ? 'movie' : 'tv', session_id);
        setRatingValue(getUserMovieTvOrEpisodeRating(response));
        setAdded(response.watchlist);
        setFavorite(response.favorite);
    }

    function secondParameter() {
        switch (props.type) {
            case 'numberOfSeasons':
                return numberOfSeasons;
            case 'duration':
                return duration;
            case 'numberOfMovies':
                return numberOfMovies;
            case 'rating':
                return generalRating;
            default:
                return '';
        }
    }

    async function toggleFavorite() {
        await manageFavorite(account_id, props.isMovie ? 'movie' : 'tv', props.data.id, !favorite, session_id)
        setFavorite((prevState) => !prevState);
    }

    async function toggleAdded() {
        await manageToWatchList(account_id, props.isMovie ? 'movie' : 'tv', props.data.id, !added, session_id)
        setAdded((prevState) => !prevState);
    }

    return (
            <section className={classes['section-highlight']}>
                <div className={classes.info}>
                    <h1>{props.isMovie ? (props.data as MovieProps).title : (props.data as SerieProps).name}</h1>
                    {props.hasGenre && <p className="caption">{genres}</p>}
                    <p className="body-regular">{releaseYear} • {secondParameter()}</p>
                </div>

                {props.hasRating && <Rating
                    name="half-rating"
                    size="large"
                    value={ratingValue !== null ? ratingValue/2 : 0}
                    precision={0.5}
                    emptyIcon={<StarIcon
                        style={{
                            color: "white",
                            opacity: 0.55
                        }}
                        fontSize="inherit"
                    />}
                    onChange={(_, newValue) => {
                        if(!newValue) return;
                        const normalizedValue = newValue * 2;
                        changeRating(props.data.id, normalizedValue, props.isMovie ? 'movie' : 'tv', session_id);
                        setRatingValue(normalizedValue);
                    }}
                    sx={{
                        '& .MuiRating-iconFilled': {
                            color: `#E88CB5`,
                        },
                    }}
                />}

                {props.descriptionPosition === 'top' ?
                    <HighlightDescription description={props.data.overview}/>
                    : null}

                <div className={classes.actions}>
                    {props.hasTrailer && <ButtonOutlined trailer={props.trailer}>trailer</ButtonOutlined>}
                    {props.hasMoreInfo && <ButtonOutlined seriesId={props.data.id}><RiInformationFill/>mais informações</ButtonOutlined>}

                    {props.hasFav &&
                        <ButtonCircle
                            type="button"
                            favoriteOrAdded={added}
                            onClick={toggleAdded}
                        >
                            <IoAddOutline/>
                        </ButtonCircle>
                    }

                    {props.hasAdd &&
                        <ButtonCircle
                            type="button"
                            onClick={toggleFavorite}
                            favoriteOrAdded={favorite}
                        >
                            <Favorite/>
                        </ButtonCircle>
                    }
                </div>

                {props.descriptionPosition === 'bottom' ?
                    <HighlightDescription description={props.data.overview}/>
                    : null}
            </section>
    )
}

export default Highlight;