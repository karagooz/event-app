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
import { Button, Card, CardContent, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock,faTicketAlt,faCamera,} from "@fortawesome/free-solid-svg-icons";

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
      <Card>
        <CardContent>
          <Typography variant="h4">{deepData.name}</Typography>
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
          <div className="eventDetail">
            <Typography variant="h6">INFORMATION !</Typography>
            <hr />
            <List>
              <ListItem>
                <FontAwesomeIcon
                  icon={faCamera}
                  style={{ marginRight: "8px" }}
                />
                <ListItemText primary={` ${camera}`} />
              </ListItem>
              <ListItem>
                <FontAwesomeIcon
                  icon={faTicketAlt}
                  style={{ marginRight: "8px" }}
                />
                <ListItemText primary={` ${ticketPresentation}`} />
              </ListItem>
              <ListItem>
                <FontAwesomeIcon
                  icon={faClock}
                  style={{ marginRight: "8px" }}
                />
                <ListItemText primary={`${doorOpeningTime}`} />
              </ListItem>
            </List>

            <hr />
          </div>

          <FormGroup className="form-group">
            <Typography variant="h6">Tickets Area</Typography>
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
              <Typography variant="h6">Total Price: ${totalPrice}</Typography>
              <Button
                variant="contained"
                color="success"
                style={{ padding: "10px", width: "150px" }}
              >
                Pay
              </Button>
            </div>
          </FormGroup>
        </CardContent>
      </Card>
    </>
  );
}

export default DetailPages;
