import classes from './Login.module.css';
import ButtonPrimary from "../../components/UI/ButtonPrimary.tsx";
import logo from "../../assets/images/moovie-logo.png";
import {requestToken} from "../../api/Login.ts";

function Login() {
    return (
        <div className={classes.background}>
            <div className={classes.login}>
                <img className={classes['login-img']} src={logo} alt="logo"/>

                <h3>Acesse sua conta para ver nossos títulos</h3>
                <ButtonPrimary onClick={requestToken}>Iniciar sessão com TMDB</ButtonPrimary>
            </div>
        </div>
    );
}

export default Login;

