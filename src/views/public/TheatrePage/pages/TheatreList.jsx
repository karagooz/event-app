import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../../../styles/card.css";
import { axiosInstance } from '../../../../api/axiosInstance';

function TheatreList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get('/eventList')
      .then(response => {
        const filteredEvents = response.data.filter(item => item.category === "tiyatro");
        setEvents(filteredEvents);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  return (
    <div className="card-container">
      {events.map((item, index) => (
        <Link to={`/theatre/${item.id}`} key={index} className="card-link">
          <div className="card">
            <img className="card-image" src={item.image} alt={item.name} />
            <h2 className="card-title">{item.name}</h2>
            <span className="card-description">{item.description}</span>
            <span className="card-date">{item.date}</span>
            <span className="card-location">{item.location}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TheatreList;
