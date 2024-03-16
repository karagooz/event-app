import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import moment from "moment";
import Filters from "../component/Filters";
import Slider from "../component/Slider";
import Card from "../component/Card";

function FilterPage({ categoryFilter, to }) {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null);

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

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleLocationClick = (location) => {
    setClickedLocation(location);
  };

  const handleClearFilters = () => {
    setSelectedCategory(categoryFilter);
    setSelectedLocation("all");
    setStartDate(null);
    setEndDate(null);
    setSearchInput("");
    setClickedLocation(null);
  };

  const filteredEvents = events.filter((event) => {
    const isCategoryMatch =
      selectedCategory === categoryFilter ||
      event.category === selectedCategory;
    const isLocationMatch =
      (selectedLocation === "all" ||
        event.location.includes(selectedLocation)) &&
      (clickedLocation === null || event.location.includes(clickedLocation));
    const isStartDateMatch =
      !startDate ||
      moment(event.date, "DD-MM-YYYY HH:mm").isSameOrAfter(startDate, "day");
    const isEndDateMatch =
      !endDate ||
      moment(event.date, "DD-MM-YYYY HH:mm").isSameOrBefore(endDate, "day");

    return (
      isCategoryMatch &&
      isLocationMatch &&
      isStartDateMatch &&
      isEndDateMatch &&
      event.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  return (
    <>
      <Filters
        searchInput={searchInput}
        categories={uniqueCategories}
        locations={uniqueLocations}
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
        startDate={startDate}
        endDate={endDate}
        handleSearchChange={handleSearchChange}
        handleCategoryChange={handleCategoryChange}
        handleLocationChange={handleLocationChange}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleClearFilters={handleClearFilters}
      />
      <Slider />
      <h1>All Events</h1>
      <div className="card-container">
        {filteredEvents.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            description={item.description}
            date={item.date}
            location={item.location}
            to={to || "/" + item.id}
            onClickLocation={handleLocationClick}
          />
        ))}
      </div>
    </>
  );
}

export default FilterPage;
