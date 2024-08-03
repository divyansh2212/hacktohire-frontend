import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import styles from './Features.module.css';

const Features = () => {
  const features = [
    { icon: <AccessTimeIcon fontSize="large" />, title: 'Flight Status Updates', description: 'Get the latest updates on flight status.' },
    { icon: <NotificationsActiveIcon fontSize="large" />, title: 'Departure Reminders', description: 'Receive reminders about your flight departure times.' },
    { icon: <FlightTakeoffIcon fontSize="large" />, title: 'Flight History', description: 'View the history of your flight bookings.' },
  ];

  return (
    <Box className={styles.container}>
      <Container>
        <Typography variant="h4" gutterBottom className={styles.title}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box className={styles.box}>
                {feature.icon}
                <Typography variant="h6" gutterBottom className={styles.featureTitle}>
                  {feature.title}
                </Typography>
                <Typography className={styles.featureDescription}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
