import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../../api/axiosInstance";
import moment from "moment";
import "moment/locale/tr";
import "react-datepicker/dist/react-datepicker.css";

function PastEvents() {
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/eventList")
      .then((response) => setPastEvents(response.data));
  }, []);

  const filterPastEvents = (events) => {
    const currentDate = moment();
    return events.filter(event => moment(event.date, "DD-MM-YYYY HH:mm").isBefore(currentDate));
  };

  const events = filterPastEvents(pastEvents);

  const formattedDate = (date) => {
    return moment(date, "DD-MM-YYYY HH:mm")
      .locale("tr")
      .format("DD MMMM dddd YYYY HH:mm");
  };

  return (
    <>
      <div className="card-container" style={{ backgroundColor: '#000000' }}>
        {events.map((item, index) => (
          <div className="card" key={index} style={{ backgroundColor: '#000000' }}>
            <img className="card-image" src={item.image} alt={item.name} />
            <h2 className="card-title">{item.name}</h2>
            <span className="card-description">{item.description}</span>
            <span className="card-date" style={{color:"red"}}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <br />
              {formattedDate(item.date)}
            </span>
            <span className="card-location">
              <FontAwesomeIcon icon={faMapMarkerAlt}  />
              <br />
              {item.location}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default PastEvents;
