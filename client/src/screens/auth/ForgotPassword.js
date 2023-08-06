import React, { useState,useEffect } from 'react'
import {auth}  from '../../firebase'
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux'


const ForgotPassword = () => {
    const [email,setemail] = useState(null)
    const [loading,setloading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
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
            
            ></input>
        </form>


    </div>
}


export default ForgotPassword;
