import React, { Children, useEffect, useState } from "react";
import {Route,Link} from 'react-router-dom'
import { UseSelector, useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import {currentAdmin} from "../../functions/auth"

const AdminRoute = ({children, ...rest}) => {
    const {user} = useSelector((state)=>({...state}))
    const [ok,setOk] = useState(false)

    useEffect(()=>{
        if (user && user.token){
            currentAdmin(user.token)
            .then((res)=>{
                console.log("CURRENT ADMIN RES", res)
                setOk(true)
            })
            .catch((err)=>{
                console.log("Admin Route ERR", err)
                setOk(false)
            })
        }

    } , [user])

    return ok ? (
        <Route {...rest} />

    ) : (<LoadingToRedirect/>)
}

export default AdminRoute