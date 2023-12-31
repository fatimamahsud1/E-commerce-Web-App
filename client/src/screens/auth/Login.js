import React, { useState } from 'react'
import {auth, googleAuthProvider}  from '../../firebase'
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Button } from 'antd'
import { GoogleOutlined, MailOutlined } from '@ant-design/icons'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { createOrUpdateUser } from '../../functions/auth'



export const Login = () => {


    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')
    const [loading , setloading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const roleBasedRedirect = (res) => {

      if(res.data.role === "admin"){
        navigate("/admin/dashboard")
      }
      else{
        navigate("/user/history")
      }
    }

    useEffect(()=>{
      if(user&&user.token) navigate("/")
  },[user, navigate])

    const handleSubmit = async (e) =>{

        e.preventDefault()
        setloading(true)
        try{
          const result = await auth.signInWithEmailAndPassword(email, password)
          const {user} = result
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
          roleBasedRedirect(res)
          .catch()

          });
        }
        catch(error){

          console.log(error)
          toast.error(error.message)
          setloading(false)
        }
      
    } 
    const loginForm = () => 
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
          <input 
            type = 'email'
            className='form-control'
            placeholder='Enter Email'
            value = {email}
            onChange={(e) => setemail(e.target.value)}
            autoFocus        
            />
          </div>

          <div className='form-group'>
          <input 
            type = 'password'
            className='form-control'
            placeholder='Enter password'
            value = {password}
            onChange={(e) => setpassword(e.target.value)}
            autoFocus        
            />

          </div>
           
            <br/>
            <Button onClick = {handleSubmit}
            type = "primary"
            className='mb-3'
            block
            shape = "round"
            icon = {<MailOutlined/>}
            size = "large"
            disabled={!email || password.length<6}>
            
              Login With Email/Password

            </Button>
    </form>
    const googleLogin = async = () => {
      auth.signInWithPopup(googleAuthProvider).then(async (result) => {
        const {user} = result;
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
        roleBasedRedirect(res)
        .catch()
        
        });
      })
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                {loading ? (<h4>Loading...</h4>) : (<h4>Login</h4>) }
                <ToastContainer/>
                {loginForm()}

            <Button onClick = {googleLogin}
            type = "danger"
            className='mb-3'
            block
            shape = "round"
            icon = {<GoogleOutlined/>}
            size = "large"
            >
            
              Login With Google

            </Button>
            <Link to = "/forgot/password" className='float-right text-danger'></Link>
            </div>
        </div>
    </div>

  )
}
