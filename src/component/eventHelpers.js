import moment from "moment";
export function formattedDate  (date) {
  return moment(date, "DD-MM-YYYY HH:mm")
    .locale("tr")
    .format("DD MMMM dddd YYYY HH:mm");
};

export const handleLocationClick = (location, setSelectedLocation) => {
  setSelectedLocation(location);
};
