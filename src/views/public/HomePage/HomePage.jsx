import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import moment from "moment";
import "moment/locale/tr";
import "../../../styles/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays,faMapMarkerAlt,} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import Filters from "../../../component/Filters";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/eventList")
      .then((response) => setEvents(response.data));
  }, []);

  useEffect(() => {
    const categories = events.map((event) => event.category);
    const uniqueCategories = [...new Set(categories)];
    setUniqueCategories(uniqueCategories);

    const locations = events.map((event) => {
      const [, city] = event.location.split(",").map((part) => part.trim());
      return city;
    });
    const uniqueCities = [...new Set(locations)];
    setUniqueLocations(uniqueCities);
  }, [events]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedDate(null);
    setSearchInput("");
  };

  const filteredEvents = events.filter((event) => {
    const isCategoryMatch =
      selectedCategory === "all" || event.category === selectedCategory;
    const isLocationMatch =
      selectedLocation === "all" || event.location.includes(selectedLocation);
    const isDateMatch =
      !selectedDate ||
      moment(event.date, "DD-MM-YYYY HH:mm").isSame(selectedDate, "day");

    return (
      isCategoryMatch &&
      isLocationMatch &&
      isDateMatch &&
      event.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const formattedDate = (date) => {
    return moment(date, "DD-MM-YYYY HH:mm")
      .locale("tr")
      .format("DD MMMM dddd YYYY HH:mm");
  };

  return (
    <>
      <Filters
        searchInput={searchInput}
        categories={uniqueCategories}
        locations={uniqueLocations}
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
        selectedDate={selectedDate}
        handleSearchChange={handleSearchChange}
        handleCategoryChange={handleCategoryChange}
        handleLocationChange={handleLocationChange}
        handleDateChange={handleDateChange}
        handleClearFilters={handleClearFilters}
      />

      <h1>Tüm Etkinlikler</h1>
      <div className="card-container">
        {filteredEvents.map((item, index) => (
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
    </>
  );
}

export default HomePage;
