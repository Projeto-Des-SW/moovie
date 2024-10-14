import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";
import {RootState} from "../store";

interface Props {
    component: React.ComponentType
    path?: string
}

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
    const isLogged = useSelector((state: RootState) => state.session.isLoggedIn);

    return isLogged ? <RouteComponent /> : <Navigate to="/login" />;
}

export default PrivateRoute;
