import { useState,useEffect } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import "../../../styles/card.css"
function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Axios instance kullanarak veri çekme
    axiosInstance.get('/eventList')
      .then(response => setEvents(response.data))
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);
  
  return (
    <>
      <h1>Tüm Etkinlikler</h1>
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
    </>
  );
}

export default HomePage;
