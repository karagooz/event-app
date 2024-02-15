import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ConcertList from './pages/ConcertList'
import ConcertDetail from './pages/ConcertDetail'
function index() {

  return (
    <>
    <Routes>
        <Route path="/" element={<ConcertList />} />
        <Route path="/:id" element={<ConcertDetail />} />
    </Routes>
  </>
  )
}

export default index