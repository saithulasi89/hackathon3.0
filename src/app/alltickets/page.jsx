'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Tickets from '@/components/Tickets';



const AllTickets = () => {
    const { isLogin } = useAuth(); // Use AuthContext to check login status
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLogin) {
      // Redirect to login page if user is not logged in
      router.push('/login');
    }
  }, [isLogin, router]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets');
        const data = await response.json();
        if (data.success) {
          setTickets(data.tickets);
        } else {
          setError(data.message || 'Failed to fetch tickets');
        }
      } catch (err) {
        setError('An error occurred while fetching tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (!isLogin) {
    return null; // Prevent rendering until login status is determined
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        All Tickets
      </Typography>

        <Tickets page="alltickets"/>
    </Box>
  );
};

export default AllTickets;
