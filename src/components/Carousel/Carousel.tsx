import {MovieProps} from "../../pages/Movies";
//@ts-ignore
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import classes from './Carousel.module.css';
import {Link, useParams} from "react-router-dom";
import {SerieProps} from "../../pages/TvShows";
import {SeasonProps} from "../../pages/TvShows/Series.tsx";
import imageNotFound from '../../assets/images/image-not-found.png';
import {ArrowForwardIos} from "@mui/icons-material";

const IMG_BASE_URL = import.meta.env.VITE_IMG;

function Carousel<T extends MovieProps | SerieProps | SeasonProps>({type, title, data}: {
    type: string,
    title: string,
    data: T[]
}) {
    const params = useParams();

    const carouselType = 'slide';

    const splideOptions = {
        type: carouselType,
        perPage: 5,
        perMove: 2,
        gap: '0',
        autoplay: false,
        pauseOnHover: true,
        arrows: true,
        pagination: false,
        breakpoints: {
            1850: {
                perPage: 5,
            },
            1540: {
                perPage: 4,
            },
            1210: {
                perPage: 3,
            },
            880: {
                perPage: 2,
            },
        },
    };

    const isSeasonProps = (item: MovieProps | SerieProps | SeasonProps): item is SeasonProps => {
        return (item as SeasonProps).season_number !== undefined;
    };

    return (
        <div className="carousel">
            <h2 className={classes['carousel-title']}>{title}</h2>
            <Splide hasTrack={false} options={splideOptions}>
                <SplideTrack>
                    {data.map((item) => (
                        <SplideSlide key={item.id}>
                            <Link
                                to={type === 'tvshow/season' && isSeasonProps(item) ? `/tvshow/${+params.id!}/season/${item.season_number}` : `/${type}/${item.id}`}>
                                <div className={classes['carousel-item']}>
                                    <img className={classes['carousel-item-img']}
                                         src={item.poster_path ? IMG_BASE_URL + item.poster_path : imageNotFound}
                                         alt={item.media_type === 'movie' ? (item as MovieProps).title : (item as SerieProps | SeasonProps).name}/>
                                    {type === 'movie' && !item.poster_path &&
                                        <p className={classes['carousel-item-title']}>{(item as MovieProps).title}</p>}
                                    {type === 'tvshow' && !item.poster_path &&
                                        <p className={classes['carousel-item-title']}>{(item as SerieProps).name}</p>}
                                    {type === 'tvshow/season' &&
                                        <p className={classes['carousel-item-title']}>{(item as SeasonProps).name}</p>}
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </SplideTrack>

                <div className="splide__arrows">
                    <button className={`splide__arrow splide__arrow--prev ${classes['arrow-prev']}`}><ArrowForwardIos style={{ fill: 'white' }}/></button>
                    <button className={`splide__arrow splide__arrow--next ${classes['arrow-next']}`}><ArrowForwardIos  style={{ fill: 'white' }}/></button>

                </div>
            </Splide>
        </div>
    );
}

export default Carousel;
