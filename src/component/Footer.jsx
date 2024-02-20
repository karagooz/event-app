import React from 'react';
import { Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer style={{ marginTop: '2rem', backgroundColor: '#2D3250', color: 'white', padding: '1rem 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Eventhall</Typography>
            <Typography variant="body2" color="inherit" paragraph>
              Your destination for exciting events - concerts, theatre, sports, and more!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Links</Typography>
            <Typography variant="body2">
              <Link href="/about" color="inherit">
                About Us
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/contact" color="inherit">
                Contact
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Connect With Us</Typography>
            <Typography variant="body2" color="inherit">
              Email: info@eventhall.com
            </Typography>
            <IconButton color="inherit" href="#">
              <FontAwesomeIcon icon={faEnvelope} />
            </IconButton>
            <IconButton color="inherit" href="#">
            <FontAwesomeIcon icon={faTwitter} />
            </IconButton>
            <IconButton color="inherit" href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
