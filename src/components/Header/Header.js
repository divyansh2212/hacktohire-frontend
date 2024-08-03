import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import styles from './Header.module.css'; // Import the CSS module

const Header = () => {
  return (
    <AppBar position="static" className={styles.headerContainer}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" className={styles.logoIcon}>
          <FlightIcon />
        </IconButton>
        <Typography variant="h6" className={styles.logoText}>
          FlightSync
        </Typography>
        <Button className={styles.navButton}>Home</Button>
        <Button className={styles.navButton}>Features</Button>
        <Button className={styles.navButton}>Contact</Button>
        <Button className={styles.getStartedButton} variant="outlined">Get Started</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
