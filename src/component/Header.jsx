import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, Box ,Button} from '@mui/material';
import { styled } from '@mui/system';
import eventData from '../data/eventData'

const RotatedTypography = styled(Typography)(({ theme }) => ({
  transform: 'rotate(-35deg)',
  position: 'absolute',
  marginLeft: '10px',
  marginTop: '-10px',
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
}));

function Header() {
  const [name, setname] = React.useState("");
  const [data, setdata] = React.useState(eventData);
  const search = (value) => {
    var searchData = value.toLowerCase();
    var filteredEvents = data.filter(q => q.name.toLowerCase().includes(searchData))
    setdata(filteredEvents);
  }
  

  return (
    <AppBar position="static" style={{ height: '80px' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <RotatedTypography variant="h6">
            <Button color="inherit" component={Link} to="/">Eventhall</Button>
          </RotatedTypography>
          
        </Box>
        <Button color="inherit" component={Link} to="/concert">
          Concerts
        </Button>
        <Button color="inherit" component={Link} to="/theatre">
          Theatre
        </Button>
        <Button color="inherit" component={Link} to="/sport">
          Sports
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <InputBase
         sx={{ ml: 1, mr: 1, width: '200px', backgroundColor: 'white' }}
         placeholder="Search"
         inputProps={{ 'aria-label': 'search' }}
         onChange={(e) => search(e.target.value)}
/>
      </Toolbar>
    </AppBar>
  );
}

export default Header;