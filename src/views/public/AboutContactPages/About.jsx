import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Eventhall, your go-to platform for discovering and attending various events such as concerts,
        theatre performances, and sports events.
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission is to provide a seamless experience for event enthusiasts, connecting them with the events
        that match their interests.
      </Typography>
      <Typography variant="body1" paragraph>
        Meet our team:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Batu Karagoz" secondary="Co-Founder" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Jane Smith" secondary="Lead Developer" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Alex Johnson" secondary="Designer" />
        </ListItem>
      </List>
    </Container>
  );
};

export default About;
