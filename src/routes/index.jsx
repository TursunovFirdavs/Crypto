import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Single from './single/Single'

const index = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/single/:id' element={<Single/>} /> 
    </Routes>
  )
}

export default index