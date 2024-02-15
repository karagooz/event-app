import React from 'react'
import SportList from './pages/SportList'
import SportDetail from './pages/SportDetail'
import { Route, Routes } from 'react-router-dom'

function index() {
  return (
    <>
    <Routes>
        <Route path="/" element={<SportList />} />
        <Route path="/:id" element={<SportDetail />} />
    </Routes>
  </>  )
}

export default index