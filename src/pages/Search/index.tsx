import Menu from "../../components/Menu";
import styles from "./Search.module.css";
import SearchBar from "../../components/SearchBar";
import {searchMulti} from "../../api/Search.ts";
import {useState} from "react";
import SearchItem from "../../components/SearchBar/SearchItem.tsx";

function Search() {
    const [search, setSearch] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    async function handleSearch(query: string) {
        if (query.trim() !== "") {
            const data = await searchMulti(query);
            setSearch(data.results.filter((item: SearchProps) => item.media_type !== 'person'));
            setHasSearched(true);
        } else {
            setSearch([]);
            setHasSearched(false);
        }
    }

    return <div className={styles['search-page']}>
        <Menu/>

        <div className={styles['search-container']}>
            <SearchBar onSearch={handleSearch}/>

            <div className={styles['search-item-container']}>
                {search.length > 0 ? (
                    search.map((item: SearchProps, index) => (
                        <SearchItem key={index} item={item}/>
                    ))
                ) : hasSearched ? (
                    <p className={styles['search-not-found']}>Nenhum resultado encontrado.</p>
                ) : null}
            </div>
        </div>
    </div>
}

export default Search;

export interface SearchProps {
    id: number;
    title: string;
    media_type: string;
    poster_path: string;
}
