import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from './LandingImage.module.css';

const Hero = () => {
  return (
    <Box className={styles.heroContainer}>
      <Typography
        variant="h2"
        gutterBottom
        className={styles.heroHeading}
      >
        Move in Sync with FlightSync
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        className={styles.heroSubheading}
      >
        Stay updated with real-time flight status and notifications
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={styles.heroButton}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Hero;
