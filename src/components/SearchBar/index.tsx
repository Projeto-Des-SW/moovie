import {useEffect, useState} from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                onSearch(search);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    return (
        <div className={styles['search-bar-container']}>
            <input
                type="text"
                className={styles['search-bar-input']}
                placeholder="Pesquisar..."
                value={search}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;