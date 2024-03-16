import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../api/axiosInstance";
import moment from "moment";
import "moment/locale/tr";
import "react-datepicker/dist/react-datepicker.css";
import Card from "../../../../component/Card";

function PastEvents() {
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/eventList")
      .then((response) => setPastEvents(response.data));
  }, []);

  const filterPastEvents = (events) => {
    const currentDate = moment();
    return events.filter((event) =>
      moment(event.date, "DD-MM-YYYY HH:mm").isBefore(currentDate)
    );
  };
  const events = filterPastEvents(pastEvents);
  return (
    <div className="card-container" style={{ backgroundColor: "black" }}>
      {events.map((item, index) => (
        <Card 
          key={index}
          id={item.id}
          image={item.image}
          name={item.name}
          description={item.description}
          date={item.date}
          location={item.location}
          to={"/past/" + item.id}
        />
      ))}
    </div>
  );
}

export default PastEvents;
