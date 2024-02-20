import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../api/axiosInstance";
import "../../../../styles/card.css"
import moment from "moment";
import "moment/locale/tr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays,faMapMarkerAlt,} from "@fortawesome/free-solid-svg-icons";

function ConcertList() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Axios instance kullanarak veri çekme
    axiosInstance.get('/eventList')
      .then(response => {
        // Filtrasyon işlemi: Sadece "tiyatro" kategorisindeki etkinlikleri al
        const filteredEvents = response.data.filter(item => item.category === "konser");
        setEvents(filteredEvents);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);
  const formattedDate = (date) => {
    return moment(date, "DD-MM-YYYY HH:mm")
      .locale("tr")
      .format("DD MMMM dddd YYYY HH:mm");
  };


  return (
    <div className="card-container">
        {events.map((item, index) => (
          <div className="card" key={index}>
            <img className="card-image" src={item.image} alt={item.name} />
            <h2 className="card-title">{item.name}</h2>
            <span className="card-description">{item.description}</span>
            <span className="card-date">
              <FontAwesomeIcon icon={faCalendarDays} />
              <br />
              {formattedDate(item.date)}
            </span>
            <span className="card-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'green' }}/>
              <br />
              {item.location}
            </span>
          </div>
        ))}
      </div>
  );
}

export default ConcertList;
