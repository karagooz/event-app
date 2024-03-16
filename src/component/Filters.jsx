import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
} from "@mui/material";
import tr from "date-fns/locale/tr";

function Filters({
  searchInput,
  handleSearchChange,
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  handleCategoryChange,
  handleLocationChange,
  handleClearFilters,
}) {
  return (
    <Card
      style={{
        marginBottom: "20px",
        marginTop: "10px",
        backgroundColor: "#EEEDEB",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <FormControl sx={{ flex: 1, marginBottom: "16px" }}>
            <br />
            <br />
            <TextField
              id="search-input"
              style={{ height: "40px" }}
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search by Name"
            />
          </FormControl>

          <FormControl
            sx={{
              height: "40px",
              flex: 1,
              marginRight: "10px",
              marginBottom: "16px",
            }}
          >
            <InputLabel
              htmlFor="category-select"
              sx={{ color: "rgba(0, 0, 0, 0.87)" }}
            >
              Category
            </InputLabel>
            <br />
            <Select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            sx={{
              height: "40px",
              flex: 1,
              marginRight: "10px",
              marginBottom: "16px",
            }}
          >
            <InputLabel
              htmlFor="location-select"
              sx={{ color: "rgba(0, 0, 0, 0.87)" }}
            >
              Location
            </InputLabel>
            <br />
            <Select
              id="location-select"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <MenuItem value="all">All</MenuItem>
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div style={{ height: "40px", flex: 1, marginBottom: "16px" }}>
            <br />
            <DatePicker
              id="start-date-picker"
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select start date"
              customInput={<TextField style={{ height: "40px" }} />}
              locale={tr}
            />
          </div>

          <div style={{ height: "40px", flex: 1, marginBottom: "16px" }}>
            <br />
            <DatePicker
              id="end-date-picker"
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select end date"
              customInput={<TextField style={{ height: "40px" }} />}
              locale={tr}
            />
          </div>

          <Button
            onClick={handleClearFilters}
            variant="#2D3250"
            color="dark"
            sx={{ height: "40px", flex: 1, marginBottom: "10px" }}
          >
            Clear Filters
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Filters;
