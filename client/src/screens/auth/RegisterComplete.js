import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'; 
import {auth}  from '../../firebase'
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useDispatch , useSelector } from 'react-redux'
import axios from 'axios'
import { createOrUpdateUser } from '../../functions/auth'


  
export const RegisterComplete = () => {

    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')
    const navigate = useNavigate(); 
    const dispatch = useDispatch()

    useEffect(()=>{

        setemail(window.localStorage.getItem("emailForRegistration"))
    },[])

    const handleSubmit = async (e) =>{

        e.preventDefault();

        if(!email || !password){
            toast.error("Email and password is required")
            return
        }

        if(password.length<6){
            toast.error("Password must be atleast 6 characters long.")
            return
        }

        try{

            const result = await auth.signInWithEmailLink(email, window.location.href);
            if(result.user.emailVerified){

                window.localStorage.removeItem("emailForRegistration")
                let user = auth.currentUser 
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                createOrUpdateUser(idTokenResult.token)
                .then((res)=>{
                  dispatch({
                    type:"LOGGED_IN_USER",
                    payload : {
                      name: res.data.name,
                      email : res.data.email,
                      token : idTokenResult.token,
                      role : res.data.role,
                      _id:res.data._id
                    }, 
                })
                .catch()

                navigate('/')

                
            }
        )}

    }
        catch{

            console.log(error)
            toast.error(error.message)
        }

    } 

    const completeregisterForm = () => 
        <form onSubmit={handleSubmit}>
            <input 
            type = 'email'
            className='form-control'
            value = {email}
            placeholder='Enter Email'
            autoFocus
            
            />
             <input 
            type = 'password'
            className='form-control'
            value = {password}
            onChange={(e)=>setpassword(e.target.value)}
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
                {completeregisterForm()}
            </div>
        </div>
    </div>

  )
}
