import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt,faArrowRight, faMicrophoneAlt, faTheaterMasks, faRunning, faPhone, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const RotatedTypography = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  marginLeft: '10px',
  marginTop: '-10px',
  
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)', // Yeni stil
}));

function Header() {
  return (
    <>
      <AppBar position="static" style={{ height: '80px' , backgroundColor:"#2D3250", borderRadius:"3px"}}>
        <Toolbar>
          <StyledBox sx={{ flexGrow: 1, position: 'relative' }}>
            <RotatedTypography variant="h5">
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledBox>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                  <br />
                  Eventhall
                </StyledBox>
              </Link>
            </RotatedTypography>
          </StyledBox>
          <StyledButton color="inherit" component={Link} to="/concert">
            <FontAwesomeIcon icon={faMicrophoneAlt} style={{ marginRight: '5px' }} />
            Concerts
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/theatre">
            <FontAwesomeIcon icon={faTheaterMasks} style={{ marginRight: '5px' }} />
            Theatre
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/sport">
            <FontAwesomeIcon icon={faRunning} style={{ marginRight: '5px' }} />
            Sports
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/past">
            <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '5px' }} />
            Past Events
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/contact">
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} />
            Contact
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/about">
            <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '5px' }} />
            About
          </StyledButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
