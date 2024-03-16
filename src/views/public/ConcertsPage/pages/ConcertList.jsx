// ConcertList.js
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../api/axiosInstance";
import moment from "moment";
import Filters from "../../../../component/Filters";
import Card from "../../../../component/Card";

function ConcertList() {
  // State'leri tanımlayın
  const [concerts, setConcerts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Concerts"); // Varsayılan olarak "Concerts" kategorisini seçin
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/eventList")
      .then((response) => {
        const filteredConcerts = response.data.filter(
          (item) => item.category === "concert"
        );
        setConcerts(filteredConcerts);

        const locations = filteredConcerts.map((concert) => {
          const [, city] = concert.location
            .split(",")
            .map((part) => part.trim());
          return city;
        });
        const uniqueCities = [...new Set(locations)];
        setUniqueLocations(uniqueCities);
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  }, []);

  // Arama girişinin değişimini takip eden fonksiyon
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Kategori seçimini takip eden fonksiyon
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Konum seçimini takip eden fonksiyon
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  // Başlangıç tarihini takip eden fonksiyon
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Bitiş tarihini takip eden fonksiyon
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Konuma tıklanmasını takip eden fonksiyon
  const handleLocationClick = (location) => {
    setClickedLocation(location);
  };

  // Filtreleri temizleme fonksiyonu
  const handleClearFilters = () => {
    setSelectedCategory("Concerts");
    setSelectedLocation("all");
    setStartDate(null);
    setEndDate(null);
    setSearchInput("");
    setClickedLocation(null);
  };

  // Filtrelenmiş konserleri belirleyen fonksiyon
  const filteredConcerts = concerts.filter((concert) => {
    const isLocationMatch =
      (selectedLocation === "all" ||
        concert.location.includes(selectedLocation)) &&
      (clickedLocation === null || concert.location.includes(clickedLocation));
    const isStartDateMatch =
      !startDate ||
      moment(concert.date, "DD-MM-YYYY HH:mm").isSameOrAfter(startDate, "day");
    const isEndDateMatch =
      !endDate ||
      moment(concert.date, "DD-MM-YYYY HH:mm").isSameOrBefore(endDate, "day");

    return (
      isLocationMatch &&
      isStartDateMatch &&
      isEndDateMatch &&
      concert.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  // Component'in render edildiği kısım
  return (
    <>
      {/* Filters bileşeni */}
      <Filters
        searchInput={searchInput}
        categories={["Concerts"]} // Sadece "Concerts" kategorisi
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
      <div className="card-container">
        {filteredConcerts.map((concert, index) => (
          <Card
            key={index}
            id={concert.id}
            image={concert.image}
            name={concert.name}
            description={concert.description}
            date={concert.date}
            location={concert.location}
            to={"/concert/" + concert.id}
            onClickLocation={handleLocationClick}

          />
        ))}
      </div>
    </>
  );
}

export default ConcertList;
