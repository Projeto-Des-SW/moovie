import api from "./main";
import {ApiErrorHandler} from "../utils/ApiErrorHandler.ts";

export async function requestToken() {
    try {
        const response = await api.get('/authentication/token/new');
        const resData = response.data;
        const {request_token} = resData;
        window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/approved`;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function createSession(request_token: string) {
    try {
        const response = await api.post('/authentication/session/new', {
            request_token: request_token
        });
        const resData = response.data;
        const {session_id} = resData;
        return session_id;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export async function getAccountID(session_id: string) {
    try {
        const response = await api.get(`/account`, {
            params: {
                session_id: session_id
            }
        });
        const resData = response.data;
        const {id} = resData;
        return id;
    } catch (error) {
        ApiErrorHandler(error);
    }
}