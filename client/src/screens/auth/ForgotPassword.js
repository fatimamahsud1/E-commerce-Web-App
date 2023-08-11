import React, { useState,useEffect } from 'react'
import {auth}  from '../../firebase'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'



const ForgotPassword = () => {
    const [email,setemail] = useState(null)
    const [loading,setloading] = useState(false)
    const {user} = useSelector((state) => ({...state}))
    const navigate = useNavigate()

    useEffect(()=>{
        if(user&&user.token) navigate("/")
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true);

        const config = {
            url : process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };
        await auth.sendPasswordResetEmail(email, config).then(()=>{
            setemail('')
            setloading(false)
            toast.success("Check your email for password reset link!")
        }).catch((error)=>{
            setloading(false);
            toast.error(error.message)
            console.log("ERROR MSG IN FORGOT PASSWORD",error)
        })
    }

    return <div className='container col-md-6 offset-md-3 p-5'>
        {loading ? (<h4 className='text-danger'> Loading </h4>) : (<h4>Forgot Password</h4>)}
        <form onSubmit={handleSubmit}>

            <input 
            type='email'
            className='form-control'
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            placeholder='Type your email'
            autoFocus
            
            />
            <br/>
            <button className='btn btn-raised' disabled = {!email}></button>
        </form>


    </div>
}


export default ForgotPassword;
