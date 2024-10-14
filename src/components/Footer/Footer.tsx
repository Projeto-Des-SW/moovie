import classes from './Footer.module.css';
import logo from "../../assets/images/moovie-logo.png";

function Footer() {
    return (
        <footer>
            <div className={classes.grid}>
                <img className={classes['grid-item']} src={logo} alt="Logo do Moovie"/>
                <ul className={classes['grid-item']}>
                    <li>Política de privacidade</li>
                    <li>Contato</li>
                    <li>Ajuda</li>
                    <li>Sobre o Moovie</li>
                </ul>
                <p className={classes['grid-item']}>© Moovie. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;