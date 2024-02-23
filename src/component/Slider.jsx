import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { axiosInstance } from '../api/axiosInstance';
import '../styles/Slider.css';

const EventSlider = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get('/eventList').then((response) => setEvents(response.data));
  }, []);

  const filteredData = events.filter((q) => q.stars > 3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    width: 500,
    height: 500,
  };

  return (
    <Slider {...settings} className="event-slider">
      {filteredData.map((event) => (
        <div key={event.id} className="event-slide">
          <div className="image-container">
            <img src={event.image} alt={event.name} className="event-image" />
          </div>
          <div className="text-container">
            <h2 className="event-title">{event.name}</h2>
            <p className="event-description">{event.description}</p>
            <p className="event-location">{event.location}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default EventSlider;
