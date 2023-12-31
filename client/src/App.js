import React, { useEffect } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Login} from './screens/auth/Login';
import {Register} from './screens/auth/Register';
import { Home } from './screens/Home';
import Header from './components/nav/Header';
import { RegisterComplete } from './screens/auth/RegisterComplete';
import {Auth} from './firebase'
import { useDispatch } from 'react-redux';
import ForgotPassword from '../src/screens/auth/ForgotPassword'
import { currentUser } from './functions/auth';
import { History } from './screens/user/History';
import UserRoute from './components/routes/UserRoute';
import { Password } from './screens/user/Password';
import { Wishlist } from './screens/user/Wishlist';
import  {AdminDashboard}  from './screens/admin/AdminDashboard';
import AdminRoute from './components/routes/AdminRoute';

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        console.log("user" , user);
        currentUser(idTokenResult.token)
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
        .catch(err=>console.log(err))
        })
      }
    })
    return () => unsubscribe()

})

  return (
    <BrowserRouter>
    <Header/>
    <Routes>     
      <Route exact path = '/' Component={Home}/>
      <Route path = '/login' Component={Login}/>
      <Route path = '/register' Component={Register}/>
      <Route path = '/register/complete' Component={RegisterComplete}/>
      <Route path = '/forgot/password' Component={ForgotPassword}/>
      <UserRoute path = '/user/history' Component={History}/>
      <UserRoute path = '/user/password' Component={Password}/>
      <UserRoute path = '/user/wishlist' Component={Wishlist}/>
      <AdminRoute path = '/admin/dashboard' Component={AdminDashboard}/>





    </Routes>
    </BrowserRouter>
  )
}

export default App;