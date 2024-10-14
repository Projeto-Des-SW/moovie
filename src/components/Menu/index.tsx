import styles from "./Menu.module.css";
import MenuLink from "../MenuLink";
import logo from "../../assets/images/moovie-logo.png";
import { AiFillHome } from "react-icons/ai";
import { PiTelevisionFill } from "react-icons/pi";
import { PiFilmReelBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import ProfileIcon from "./ProfileIcon.tsx";

export default function Menu() {
  return (
    <header>
      <nav className={styles.navbar}>
        <MenuLink to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </MenuLink>
        <MenuLink to="/">
          <AiFillHome className={styles.icon} />
          Inicio
        </MenuLink>
        <MenuLink to="/tvshows">
          <PiTelevisionFill className={styles.icon} /> Séries
        </MenuLink>
        <MenuLink to="/movies">
          <PiFilmReelBold className={styles.icon} /> Filmes
        </MenuLink>
      </nav>

      <nav className={styles.navbar}>
        <MenuLink to="/search">
          <BiSearch className={styles.icon}/> Buscar
        </MenuLink>
        <MenuLink to="/mylist">
          <FaPlus className={styles.icon}/> Minha Lista
        </MenuLink>
        <ProfileIcon />
      </nav>
    </header>
  );
}
