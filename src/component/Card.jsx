// Card.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { formattedDate } from "../component/eventHelpers";
import "../styles/card.css";

const Card = ({ id, image, name, description, date, location, to, onClickLocation }) => {
  const handleLocationClick = () => {
    if (onClickLocation) {
      onClickLocation(location);
    }
  };

  return (
    <div className="card" key={id}>
      <Link to={to} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img className="card-image" src={image} alt={name} />
        <h2 className="card-title">{name}</h2>
      </Link>
      <span className="card-description">{description}</span>
      <span className="card-date">
        <FontAwesomeIcon icon={faCalendarDays} />
        <br />
        {formattedDate(date)}
      </span>
      <span className="card-location" style={{ color: "green", cursor: "pointer" }} onClick={handleLocationClick}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "green" }} />
        <br />
        {location}
      </span>
    </div>
  );
};

export default Card;
