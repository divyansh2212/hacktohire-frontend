import React, { useState, useEffect } from "react";
import FlightCard from "../../components/FlightCard/FlightCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography, Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { auth } from "../../firebase.js";
import SearchBar from '../../components/SearchBar/SearchBar';

const MyFlights = () => {
  const [flights, setFlights] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [token, setToken] = useState(null);
  const [filteredFlights, setFilteredFlights] = useState([]);

  const handleSearch = (searchTerm) => {
    const filtered = flights.filter(flight =>
        flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFlights(filtered);
};

  useEffect(() => {
    const func = async () => {
      const user = auth.currentUser;
      const fetchedToken = await user?.getIdToken();
      setToken(fetchedToken);
    };
    func();
    if (!token) return;

    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:8081/my-flights", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setFlights(response.data);
        setFilteredFlights(response.data)
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };
    fetchFlights();

    const connectWebSocket = () => {
      const ws = new WebSocket(
        `ws://localhost:8081/flight-status?Authorization=Bearer ${token}`
      );

      ws.onopen = () => {
        setConnectionStatus("Connected");
        console.info("Connected to WebSocket server");
      };

      ws.onmessage = (event) => {
        const data = event.data.split(",");
        const flight = data[0].split(":")[1];
        const update = data[1].split(":")[1];
        handleUpdateStatus(flight, update);
      };

      ws.onclose = () => {
        setConnectionStatus("Disconnected. Attempting to reconnect...");
        console.info(
          "Disconnected from WebSocket server. Attempting to reconnect..."
        );
        setTimeout(connectWebSocket, 20000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [token]);

  const handleUpdateStatus = (id, newStatus) => {
    console.log(`Updating flight with ID: ${id}, New Status: ${newStatus}`);

    setFlights((prevFlights) => {
      const updatedFlights = prevFlights.map((flight) =>
        flight.flightNumber === id ? { ...flight, status: newStatus } : flight
      );
      return updatedFlights;
    });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "black",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              margin: "20px",
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
                    <FlightCard flight={flight} isAdmin={false} />
                  </Grid> 
                ))
            ) : (
                <Typography variant="h6" component="p" sx={{ margin: '20px' }}>
                    No flights found.
                </Typography>
            )}
        </Grid>
      </Container>
    </>
  );
};

export default MyFlights;
