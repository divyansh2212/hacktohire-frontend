import React, { useState, useEffect } from 'react';
import FlightCard from '../../components/FlightCard/FlightCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Box } from "@mui/material";
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import dummyFlights from './dummy.js';
import {auth} from "../../firebase.js"

const AdminPage = () => {
    const [flights, setFlights] = useState([]);
    const[token, setToken] = useState(null)
    // const token = localStorage.getItem("token");
    // console.log(token)

    useEffect(() => {
        const func = async()=> {
            const user = auth.currentUser;
            const fetchedtoken = await user?.getIdToken();
            setToken(fetchedtoken)
        }
        func()
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
                } else {
                    setFlights(dummyFlights);
                }
            } catch (error) {
                console.error("Error fetching flights:", error);
                setFlights(dummyFlights);
            }
        };
        fetchFlights();
    }, [token]);

    const handleUpdateStatus = (id, newStatus) => {
        setFlights(flights.map(flight => flight.id === id ? { ...flight, status: newStatus } : flight));
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
                <Grid container spacing={3}>
                    {flights.map((flight) => (
                        <Grid item xs={12} sm={6} md={4} key={flight.id}>
                            <FlightCard flight={flight} onUpdateStatus={handleUpdateStatus} isAdmin={true} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer/>
        </>
    );
};

export default AdminPage;
