import React from 'react';
import { Box, Typography, Link, Container, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <Box className={styles.footerContainer}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              FlightSync
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              © 2024 FlightSync. All rights reserved.
            </Typography>
            <Box>
              <IconButton className={styles.iconButton} href="https://facebook.com" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton className={styles.iconButton} href="https://twitter.com" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton className={styles.iconButton} href="https://instagram.com" aria-label="Instagram">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link className={styles.link} href="#">
              Home
            </Link>
            <Link className={styles.link} href="#">
              Features
            </Link>
            <Link className={styles.link} href="#contact">
              Contact
            </Link>
            <Link className={styles.link} href="#">
              Get Started
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
