import {SearchProps} from "../../pages/Search";
import {Link} from "react-router-dom";
import styles from "./SearchItem.module.css";

function SearchItem({item}: { item: SearchProps }) {
    const IMG_BASE_URL: string = import.meta.env.VITE_IMG;

    return <Link to={item.media_type === 'movie' ? `/movie/${item.id}` : `/tvshow/${item.id}`}>
        <img className={styles['search-item-img']} src={IMG_BASE_URL + item.poster_path} alt={item.title}/>
    </Link>;
}

export default SearchItem;