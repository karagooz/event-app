import React, { useEffect, useState } from 'react'
import eventData from "../../../../data/eventData"
import "../../../../styles/card.css"

function TheatreList() {
  const [data, setdata] = useState(eventData)
  const [theatreData, settheatreData] = useState([])
  useEffect(() => {
   settheatreData(data.filter(q=>q.category==="tiyatro"))
  }, [data])
  
  return (
    <div className="card-container">
    {theatreData.map((item, index) => (
      <div className="card" key={index}>
        <img className="card-image" src={item.image} alt={item.name} />
        <h2 className="card-title">{item.name}</h2>
        <span className="card-description">{item.description}</span>
        <span className="card-date">{item.date}</span>
        <span className="card-location">{item.location}</span>
      </div>
    ))}
  </div>
  )
}

export default TheatreList