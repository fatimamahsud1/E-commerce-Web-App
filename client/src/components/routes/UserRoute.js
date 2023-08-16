import React, { Children } from "react";
import {Route,Link} from 'react-router-dom'
import { UseSelector, useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({children, ...rest}) => {
    const {user} = useSelector((state)=>({...state}))

    return user && user.token ? (
        <Route {...rest} />

    ) : (<LoadingToRedirect/>)
}

export default UserRoute