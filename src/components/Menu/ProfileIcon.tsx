import styles from './ProfileIcon.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import React, {useRef, useState} from "react";
import {sessionActions} from "../../store/session.ts";

function ProfileIcon() {
    const profileImageUrl: string = useSelector((state: RootState) => state.session.avatar_path!);
    // const userName = useSelector((state: RootState) => state.session.name!);
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (menuRef.current && !menuRef.current.contains(e.relatedTarget as Node))
            setOpen(false);
    }

    function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    return (
        <div className="profile-container"
             tabIndex={-1}
             onBlur={handleBlur}
        >
            <div className={styles['profile-icon']}>
                <img
                    src={`${import.meta.env.VITE_IMG}${profileImageUrl}`}
                    alt="Avatar"
                    className={styles['profile-image']}
                    onClick={() => setOpen(!open)}
                />
            </div>

            {open &&
                <div className={styles.dropdown}
                     ref={menuRef}
                     tabIndex={-1}
                >
                    <ul className={styles['dropdown-menu']}>
                        <li><a href="/ratedmovies">Filmes Avaliados</a></li>
                        <li><a href="/ratedtvshows">Séries Avaliadas</a></li>
                        <li><a href="/ratedepisodes">Episódios Avaliados</a></li>
                        <li><a onClick={handleLogout} href="/">Sair</a></li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default ProfileIcon;
