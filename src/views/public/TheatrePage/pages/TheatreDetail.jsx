import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function TheatreDetail() {
  const { id } = useParams()
  const [detail, setdetail] = useState({})
  useEffect(() => {
    axios.get('http://localhost:3000/eventList' + id)
      .then(res => {
        setdetail(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <>
    <h1>Id: {id}</h1>
    <hr />
    <h1>Name: {detail.name}</h1>
  </>
  )
}

export default TheatreDetail