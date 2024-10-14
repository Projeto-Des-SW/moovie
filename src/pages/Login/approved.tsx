import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {sessionActions} from "../../store/session.ts";
import {useDispatch} from "react-redux";
import {createSession, getAccountID} from "../../api/Login.ts";
import {getAccountDetails} from "../../api/Account.ts";
import Loading from "../../components/UI/Loading.tsx";

function ApprovedPage() {
    const [queryParameters] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchSession();
    }, []);

    async function fetchSession() {
        try {
            const session_id = await createSession(queryParameters.get('request_token')!);
            const account_id = await getAccountID(session_id);
            const accountDetails = await getAccountDetails(account_id, session_id);
            setSession(account_id, session_id);
            setAccountDetails(accountDetails.username, accountDetails.name ?? accountDetails.username, accountDetails.avatar.tmdb.avatar_path ?? "default-avatar");
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    }

    function setSession(account_id: string, session_id: string) {
        dispatch(sessionActions.login({account_id, session_id}));
    }

    function setAccountDetails(username: string, name: string, avatar_path: string) {
        dispatch(sessionActions.setAccountDetails({username, name, avatar_path}));
    }

    return <Loading/>;
}

export default ApprovedPage;