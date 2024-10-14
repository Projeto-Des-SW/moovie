import classes from './Loading.module.css';
import {useSelector} from "react-redux";
import {LoadingState} from "../../store/loading.ts";

const Loading = () => {
    const isLoading = useSelector((state: LoadingState) => state.loading.isLoading);

    if (!isLoading && !window.location.href.includes('approved')) return null;

    return (
        <div className={classes["loading-circle"]}>
            <div className={classes.circle}>
            </div>
        </div>
    );
};

export default Loading;
