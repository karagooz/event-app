import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HomePageDetail from './pages/HomePageDetail'

function index() {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<HomePageDetail />} />
    </Routes>
  </>  )
}

export default index