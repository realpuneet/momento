import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ForgotPassword from '../pages/ForgotPassword'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default AppRouter