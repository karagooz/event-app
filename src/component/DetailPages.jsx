import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { axiosInstance } from "../api/axiosInstance";
import "../styles/Slider.css";
import Slider from "react-slick";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";

function DetailPages() {
  const { id } = useParams();
  const [deepData, setDeepData] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [personCounts, setPersonCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`/eventList/` + id)
      .then((res) => {
        setDeepData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const updatedTotalPrice = selectedCategories.reduce((total, category) => {
      const { price } = category;
      const personCount = personCounts[category.category] || 0;
      return total + personCount * price;
    }, 0);

    setTotalPrice(updatedTotalPrice);
  }, [selectedCategories, personCounts]);

  const handleCategoryChange = (event, category) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((c) => c !== category)
      );
    }

    // Total Price sıfırlanacak mı kontrolü burada yapılıyor
    if (!isChecked && selectedCategories.length === 1) {
      setTotalPrice(0);
    }
  };

  const handlePersonCountChange = (event, category) => {
    const count = event.target.value;
    setPersonCounts((prevCounts) => ({ ...prevCounts, [category]: count }));
  };

  const photos = deepData.detail ? deepData.detail.photos : [];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const ticketCategories = deepData.detail?.ticketCategories || [];
  const { camera, ticketPresentation, doorOpeningTime } =
    deepData.detail?.rules || {};

  return (
    <>
      <h1>{deepData.name}</h1>
      <hr />
      <div className="event-photos">
        <Slider {...settings}>
          {photos.map((photo, index) => (
            <div key={index}>
              <img src={photo} alt={`Event ${index}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div
        className="eventDetail"
        style={{ display: "inline-block", marginLeft: "150px", width: "500px" }}
      >
        <h1>ATTENTION!</h1>
        <hr />
        <List>
          <ListItem>
            <ListItemText primary={` ${camera}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={` ${ticketPresentation}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`${doorOpeningTime}`} />
          </ListItem>
        </List>
        
      </div>

      <FormGroup
        className="form-group"
        style={{ display: "inline-block", marginLeft: "120px", width: "500px" }}
      >
        <h1>Tickets Area</h1>
        <hr />
        {ticketCategories.map((category, index) => (
          <div key={index}>
            <FormControlLabel
              control={<Checkbox />}
              label={`${category.category} - $${category.price}`}
              onChange={(event) => handleCategoryChange(event, category)}
            />
            <Select
              value={personCounts[category.category] || 0}
              onChange={(event) =>
                handlePersonCountChange(event, category.category)
              }
            >
              {[1, 2, 3, 4, 5].map((count) => (
                <MenuItem key={count} value={count}>
                  {count} Person
                </MenuItem>
              ))}
            </Select>
          </div>
        ))}
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Total Price: ${totalPrice}</h2>
          <Button
            variant="contained"
            color="success"
            style={{ padding: "10px", width: "150px" }}
          >
            Pay
          </Button>
        </div>
      </FormGroup>
    </>
  );
}

export default DetailPages;
