// TheatreList.js
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api/axiosInstance';
import moment from "moment";
import "moment/locale/tr";
import Filters from "../../../../component/Filters";
import Card from "../../../../component/Card";

function TheatreList() {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("theatre");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [uniqueLocations, setUniqueLocations] = useState([]);

  useEffect(() => {
    axiosInstance.get('/eventList')
      .then(response => {
        const filteredEvents = response.data.filter(item => item.category === "theatre");
        setEvents(filteredEvents);
  
        const locations = filteredEvents.map((event) => {
          const [, city] = event.location.split(",").map((part) => part.trim());
          return city;
        });
        const uniqueCities = [...new Set(locations)];
        setUniqueLocations(uniqueCities);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);
  

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
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

  const handleClearFilters = () => {
    setSelectedLocation("all");
    setStartDate(null);
    setEndDate(null);
    setSearchInput("");
  };
  
  const filteredEvents = events.filter((event) => {
    const isLocationMatch =
      (selectedLocation === "all" || event.location.includes(selectedLocation));
    const isStartDateMatch =
      !startDate ||
      moment(event.date, "DD-MM-YYYY HH:mm").isSameOrAfter(startDate, "day");
    const isEndDateMatch =
      !endDate ||
      moment(event.date, "DD-MM-YYYY HH:mm").isSameOrBefore(endDate, "day");

    return (
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
        categories={["theatre"]}
        locations={uniqueLocations}
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
        startDate={startDate}
        endDate={endDate}
        handleSearchChange={handleSearchChange}
        handleCategoryChange={() => {}} // TheatreList sadece bir kategori ile çalıştığı için boş bir fonksiyon
        handleLocationChange={handleLocationChange}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleClearFilters={handleClearFilters}
      />
-      <div className="card-container">
        {filteredEvents.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            description={item.description}
            date={item.date}
            location={item.location}
            to={'/theatre/'+ item.id}      
            />
        ))}
      </div>
    </>
  );
}

export default TheatreList;
