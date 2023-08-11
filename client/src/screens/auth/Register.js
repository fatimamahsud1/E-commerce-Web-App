import React, { useState } from 'react'
import {auth}  from '../../firebase'
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

export const Register = () => {


    const [email , setemail] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        if(user&&user.token) navigate("/")
    },[user])

    const handleSubmit = async (e) =>{

        e.preventDefault()
        const config = {
            url : 'https://localhost:3000/register/complete',
            handleCodeInApp : true
        }

        await auth.sendsSignInLinkToEmail(email,config);
        toast.success(`Email is send to ${email} .Click the link to complete your registration.` );

        window.localStorage.setItem('emailForRegistration', email)
        setemail('')

    } 
    const registerForm = () => 
        <form onSubmit={handleSubmit}>
            <input 
            type = 'email'
            className='form-control'
            placeholder='Enter Email'
            value = {email}
            onChange={(e) => setemail(e.target.value)}
            autoFocus
            
            />
            <br/>
        <button type = 'submit' className='btn btn-raised'> Register </button>

        </form>

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <h4>Register</h4>
                <ToastContainer/>
                {registerForm()}
            </div>
        </div>
    </div>

  )
}
