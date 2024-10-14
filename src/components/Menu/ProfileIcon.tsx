import styles from './ProfileIcon.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import React, {useRef, useState} from "react";
import {sessionActions} from "../../store/session.ts";
import {Link} from "react-router-dom";
import profileImageDefault from '../../assets/images/profile-image-default.png';

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
                    src={profileImageUrl != 'default-avatar' ? import.meta.env.VITE_IMG + profileImageUrl : profileImageDefault}
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
                        <li><Link to="/ratedmovies">Filmes Avaliados</Link></li>
                        <li><Link to="/ratedtvshows">Séries Avaliadas</Link></li>
                        <li><Link to="/ratedepisodes">Episódios Avaliados</Link></li>
                        <li><Link onClick={handleLogout} to="/">Sair</Link></li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default ProfileIcon;
