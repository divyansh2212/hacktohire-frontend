import React, { useState, useEffect } from 'react';
import FlightCard from '../../components/FlightCard/FlightCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Box } from "@mui/material";
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import dummyFlights from './dummy.js';
import { auth } from "../../firebase.js";
import SearchBar from '../../components/SearchBar/SearchBar';

const AdminPage = () => {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const func = async () => {
            const user = auth.currentUser;
            const fetchedToken = await user?.getIdToken();
            setToken(fetchedToken);
        };
        func();

        const fetchFlights = async () => {
            try {
                if (token) {
                    const response = await axios.get("http://localhost:8081/flights", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    setFlights(response.data);
                    setFilteredFlights(response.data);
                } else {
                    setFlights(dummyFlights);
                    setFilteredFlights(dummyFlights);
                }
            } catch (error) {
                console.error("Error fetching flights:", error);
                setFlights(dummyFlights);
                setFilteredFlights(dummyFlights);
            }
        };
        fetchFlights();
    }, [token]);

    const handleUpdateStatus = (id, newStatus) => {
        setFlights(flights.map(flight => flight.id === id ? { ...flight, status: newStatus } : flight));
        setFilteredFlights(filteredFlights.map(flight => flight.id === id ? { ...flight, status: newStatus } : flight));
    };

    const handleSearch = (searchTerm) => {
        const filtered = flights.filter(flight =>
            flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFlights(filtered);
    };

    return (
        <>
            <Navbar />
            <Container>
                <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                            margin: '20px'
                        }}
                    >
                        Flight List
                    </Typography>
                </Box>
                <SearchBar onSearch={handleSearch} />
                <Grid container spacing={3}>
                    {filteredFlights.length > 0 ? (
                        filteredFlights.map((flight) => (
                            <Grid item xs={12} sm={6} md={4} key={flight.id}>
                                <FlightCard flight={flight} onUpdateStatus={handleUpdateStatus} isAdmin={true} />
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" component="p" sx={{ margin: '20px' }}>
                            No flights found.
                        </Typography>
                    )}
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default AdminPage;
