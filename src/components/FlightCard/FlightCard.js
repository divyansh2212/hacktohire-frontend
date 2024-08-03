import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  Chip,
  Box,
} from "@mui/material";
import {
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Cancel as CancelIcon,
  ArrowForward as ArrowForwardIcon,
  Flight as FlightIcon,
} from "@mui/icons-material";
import axios from "axios";

const FlightCard = ({ flight, onUpdateStatus, isAdmin }) => {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(flight.status);
  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    onUpdateStatus(flight.id, newStatus);
    setOpen(false);
    flight = { ...flight, status: newStatus };
    if (token) {
      await axios.put(`http://localhost:8081/flights/${flight.id}`, flight, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "On Time":
        return <Chip label="On Time" sx={{ backgroundColor: '#4caf50', color: '#ffffff' }} />;
      case "Delayed":
        return <Chip label="Delayed" sx={{ backgroundColor: '#ff9800', color: '#ffffff' }} />;
      case "Cancelled":
        return <Chip label="Cancelled" sx={{ backgroundColor: '#f44336', color: '#ffffff' }} />;
      default:
        return <Chip label="Unknown" />;
    }
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          marginBottom: 2,
          borderRadius: 4,
          backgroundColor: '#1e1e1e',
          color: '#e0e0e0',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
          transition: 'background-color 0.3s, transform 0.3s',
          '&:hover': {
            backgroundColor: '#2c2c2c',
            transform: 'scale(1.02)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <FlightTakeoffIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  {flight.departureAirport} <ArrowForwardIcon sx={{ mx: 1 }} /> {flight.arrivalAirport}
                  <FlightLandIcon sx={{ ml: 1 }} />
                </Typography>
              </Box>
              {isAdmin && (
                <IconButton
                  onClick={handleClickOpen}
                  sx={{
                    color: "#03dac6",
                    backgroundColor: "rgba(3, 218, 198, 0.2)",
                    "&:hover": {
                      backgroundColor: "rgba(3, 218, 198, 0.3)",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" display="flex" alignItems="center">
                <FlightIcon sx={{ mr: 1, color: "#03dac6" }} />
                Flight ID: {flight.id}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" display="flex" alignItems="center">
                <LocationOnIcon sx={{ mr: 1, color: "#03dac6" }} />
                Gate No.: {flight.gateNo}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" display="flex" alignItems="center">
                <AccessTimeIcon sx={{ mr: 1, color: "#03dac6" }} />
                Departure Time: {new Date(flight.departureDate).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={1}>
                {getStatusChip(flight.status)}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {isAdmin && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Flight Status</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newStatus}
                label="Status"
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <MenuItem value="On Time">On Time</MenuItem>
                <MenuItem value="Delayed">Delayed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default FlightCard;
