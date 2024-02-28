import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PastEvents from './pages/PastEvents'
import PastEventsDetails from './pages/PastEventsDetails'

function index() {
  return (
    <>
    <Routes>
        <Route path="/" element={<PastEvents />} />
        <Route path="/:id" element={<PastEventsDetails />} />
    </Routes>
  </>  )
}

export default index