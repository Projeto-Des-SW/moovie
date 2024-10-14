import styles from "./MediaVisualizer.module.css";
import {getDatePtBr, getMinutes} from "../../utils/Details.ts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating"
import StarIcon from '@mui/icons-material/Star';
import {changeRating, getUserMovieTvOrEpisodeRating, RatingProps} from "../../utils/UserDetails.ts";
import {useEffect, useState} from "react";
import {getEpisodeAccountStates} from "../../api/Rating.ts";
import {useSelector} from "react-redux";
import {SessionState} from "../../store/session.ts";
import {Skeleton} from "@mui/material";
import imageNotFound from '../../assets/images/image-not-found-2.png';

const IMG_BASE_URL = import.meta.env.VITE_IMG;

export interface EpisodeProps {
    "air_date": string,
    "episode_number": number,
    "id": number,
    "name": string,
    "overview": string,
    "production_code": string,
    "season_number": number,
    "show_id": number,
    "still_path": string,
    "vote_average": number,
    "vote_count": number,
    "runtime": number
    "media_type": MediaType.EPISODE,
}

export interface RatedSerieProps {
    "adult": boolean,
    "backdrop_path": string
    "genre_ids": number[],
    "id": number
    "origin_country": string[],
    "original_language": string,
    "original_name": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "first_air_date": string,
    "name": string,
    "vote_average": number,
    "vote_count": number,
    "rating": number,
    "media_type": MediaType.TV,
}

export interface RatedMovieProps {
    "adult": boolean,
    "backdrop_path": string
    "genre_ids": number[],
    "id": number
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "release_date": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number,
    "rating": number,
    "media_type": MediaType.MOVIE,
}

export interface RatedEpisodeProps {
    "air_date": string,
    "episode_number": number,
    "id": number,
    "name": string,
    "overview": string,
    "production_code": string,
    "runtime": number,
    "season_number": number,
    "show_id": number,
    "still_path": string,
    "vote_average": number,
    "vote_count": number,
    "rating": number
    "media_type": MediaType.RATED_EPISODE,
}

export enum MediaType {
    MOVIE = 'movie',
    TV = 'tv',
    EPISODE = 'episode',
    RATED_EPISODE = 'rated_episode',
}

export type MediaVisualizerProps = EpisodeProps[] | RatedSerieProps[] | RatedMovieProps[] | RatedEpisodeProps[];

function MediaVisualizer({props, requestRating}: { props?: MediaVisualizerProps, requestRating?: boolean }) {
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState<{ [key: number]: number | false }>({});
    const sessionId = useSelector((state: SessionState) => state.session.sessionId);

    useEffect(() => {
        if (requestRating) requestAccountStates();
        else {
            const allRatings = props?.reduce((acc, item) => {
                if (item.media_type === MediaType.EPISODE) return acc
                return {...acc, [item.id]: item.rating};
            }, {} as { [key: number]: number });
            if (!allRatings) return;
            setRatings(allRatings);
            setLoading(false);
        }
    }, [props]);

    async function requestAccountStates() {
        const newRatings: { [key: number]: number } = {};
        setLoading(true);
        if (!props) return;
        for (const item of props) {
            if (item.media_type === MediaType.EPISODE) {
                const response: RatingProps = await getEpisodeAccountStates(item.show_id, item.season_number, item.episode_number, sessionId);
                newRatings[item.id] = getUserMovieTvOrEpisodeRating(response);
            }
        }
        setRatings(newRatings);
        setLoading(false);
    }

    async function handleRatingChange(id: number, newValue: number | null, item: EpisodeProps | RatedSerieProps | RatedMovieProps | RatedEpisodeProps) {
        if (!newValue) return;
        const normalizedValue = newValue * 2;

        if (item.media_type === MediaType.MOVIE) {
            await changeRating(item.id, normalizedValue, 'movie', sessionId);
            setRatings((prevRatings) => ({
                ...prevRatings,
                [id]: normalizedValue,
            }));
        } else if (item.media_type === MediaType.TV) {
            await changeRating(item.id, normalizedValue, 'tv', sessionId);
            setRatings((prevRatings) => ({
                ...prevRatings,
                [id]: normalizedValue,
            }));
        } else {
            await changeRating(item.show_id, normalizedValue, 'episode', sessionId, item.season_number, item.episode_number);
            setRatings((prevRatings) => ({
                ...prevRatings,
                [id]: normalizedValue,
            }));
        }
    }

    return (
        <div className={styles['episodes-container']}>
            {props?.map((item, index) => (
                <Card
                    key={item.id}
                    elevation={0}
                    sx={{display: "flex", padding: 2, borderRadius: "16px", backgroundColor: 'rgb(46 47 53 / 79%)'}}
                >
                    <CardMedia
                        image={
                            (item.media_type === MediaType.EPISODE || item.media_type === MediaType.RATED_EPISODE)
                                ? (item.still_path ? IMG_BASE_URL + item.still_path : imageNotFound)
                                : (item.backdrop_path ? IMG_BASE_URL + item.backdrop_path : imageNotFound)
                        }
                        sx={{
                            minWidth: "25%",
                            maxWidth: "25%",
                            flexShrink: 0,
                            backgroundColor: "grey.200",
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px 0 #313439, 0 -2px 8px 0 rgb(21 29 61 / 79%);",
                        }}
                    />
                    <CardContent sx={{pr: 2, display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <Box mb={1} display="flex" alignItems="center">
                            <Box
                                component="h4"
                                color='white'
                                sx={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    letterSpacing: "0.5px",
                                    marginBottom: 0,
                                    marginRight: 1.5,
                                    display: "inline-block",
                                }}
                            >
                                {(item.media_type === MediaType.EPISODE || item.media_type === MediaType.RATED_EPISODE) && `${item.episode_number}. ${item.name}`}
                                {item.media_type === MediaType.TV && item.name}
                                {item.media_type === MediaType.MOVIE && item.title}
                            </Box>

                            <p className={styles['episode-air-date']}>
                                {(item.media_type === MediaType.EPISODE || item.media_type === MediaType.RATED_EPISODE) && getDatePtBr(item.air_date)}
                                {item.media_type === MediaType.TV && getDatePtBr(item.first_air_date)}
                                {item.media_type === MediaType.MOVIE && getDatePtBr(item.release_date)}
                            </p>
                        </Box>
                        <Box
                            component="div"
                            sx={{fontSize: 14, color: "grey.500", mb: "1.275rem"}}
                        >
                            <p>{(item.media_type === MediaType.EPISODE || item.media_type === MediaType.RATED_EPISODE) && getMinutes(item.runtime)}</p>
                            <Divider sx={{mt: 1, mb: 1, backgroundColor: '#818181', width: '100%'}}/>

                            <p>{item.overview}</p>
                            <div className={styles.infos}>
                                <div className={styles['rating-infos']}>
                                    <p className={styles['rating-general']}>Avaliação
                                        Média: {(item.vote_average / 2).toFixed(1)} <StarIcon
                                            sx={{fontSize: 14}}/></p>
                                </div>


                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        sx={{fontSize: '0'}}
                                    >
                                        <Rating size={"small"}/>
                                    </Skeleton>
                                ) : (
                                    <Rating
                                        name={"rating"}
                                        id={index.toString()}
                                        value={ratings[item.id] !== false ? +ratings[item.id] / 2 : 0}
                                        precision={0.5}
                                        size={"small"}
                                        emptyIcon={<StarIcon
                                            style={{
                                                color: "white",
                                                opacity: 0.55
                                            }}
                                            fontSize="inherit"
                                        />}
                                        onChange={(_, newValue) => handleRatingChange(item.id, newValue!, item)}
                                        sx={{
                                            verticalAlign: "text-top",
                                            '& .MuiRating-iconFilled': {
                                                color: `#E88CB5`,
                                            },
                                        }}
                                    />)}
                            </div>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default MediaVisualizer;