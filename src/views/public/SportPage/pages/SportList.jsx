import React, { useEffect, useState } from 'react'
import "../../../../styles/card.css"
import {axiosInstance} from '../../../../api/axiosInstance'
function SportList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get('/eventList')
      .then(response => {
        const filteredEvents = response.data.filter(item => item.category === "spor");
        setEvents(filteredEvents);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);
  return (
    <div className="card-container">
    {events.map((item, index) => (
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

export default SportList