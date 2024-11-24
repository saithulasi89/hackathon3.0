"use client"; // Required for interactivity with Material-UI and Chart.js

import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Tickets from "@/components/Tickets";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { username } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets");
        const data = await response.json();
        if (data.success) {
          setTickets(data.tickets);
        } else {
          setError(data.message || "Failed to fetch tickets");
        }
      } catch (err) {
        setError("An error occurred while fetching tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const total = tickets && tickets.length;
  const newTickets =
    tickets && tickets.filter((ticket) => ticket.Status == "New").length;
  const InProgress =
    tickets &&
    tickets.filter((ticket) => ticket.Status == "In Progress").length;
  const waitingForApproval =
    tickets &&
    tickets.filter((ticket) => ticket.Status == "Waiting For Approval").length;
  const Resolved =
    tickets && tickets.filter((ticket) => ticket.Status == "Resolved").length;
  const Rejected =
    tickets && tickets.filter((ticket) => ticket.Status == "Rejected").length;

  const pieChartData = {
    labels: [
      "New",
      "InProgress",
      "Waiting For Approval",
      "Resolved",
      "Rejected",
    ],
    datasets: [
      {
        label: "Tickets by Category",
        data: [newTickets, InProgress, waitingForApproval, Resolved, Rejected],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "red"],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {username}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <Typography>Total</Typography>
              <Typography variant="h5">{total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <Typography>New</Typography>
              <Typography variant="h5">{newTickets}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <Typography>In Progress</Typography>
              <Typography variant="h5">{InProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <Typography>Waiting for Approval</Typography>
              <Typography variant="h5">{waitingForApproval}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <Typography>Resolved</Typography>
              <Typography variant="h5">{Resolved}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <Typography>Rejected</Typography>
              <Typography variant="h5">{Rejected}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Tickets page="dashboard" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography>Tickets by Category</Typography>
              <Pie data={pieChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
