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
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import TicketModal from './TicketModal'; // Import the modal component

const Tickets = (props) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets');
        const data = await response.json();
        if (data.success) {
          if (props.page === 'dashboard') {
            const unresolvedTickets = data.tickets
              .filter((ticket) => ticket.Status !== 'Resolved' && ticket.Status !== 'Rejected')
              .slice(0, 4);
            setTickets(unresolvedTickets);
          } else {
            setTickets(data.tickets);
          }
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
  }, [props.page]);

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTicket(null);
  };

  const handleStatusUpdate = async (updatedTicket, type) => {
    try {
      // Update the ticket status in the database
      const updateResponse = await fetch(`/api/tickets/${updatedTicket._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: updatedTicket.Status,
          comment: updatedTicket.Comment || '',
        }),
      });
  
      if (updateResponse.ok) {
        // Update the ticket in the frontend state
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === updatedTicket._id ? updatedTicket : ticket
          )
        );
        handleCloseModal();
      } else {
        const data = await updateResponse.json();
        console.error('Error updating ticket:', data.message);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      return; // Exit early if ticket update fails
    }
  
    // Handle email sending if required
    if (type === 'sendEmail') {
      sendEmailNotification(updatedTicket);
    }
  };
  
  // Reusable function to send email notifications
  const sendEmailNotification = async (ticket) => {

    const { UserEmail: UserEmail, Status: Status, Comment: Comment } = ticket;

    const emailDetails = {
      Resolved: {
        subject: 'Your Request Has Been Approved',
        html: `<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
              <h2>Thank You for Your Interest!</h2>
              <a href='https://postimages.org/' target='_blank'>
                <img src= "/intellishield-logo.png" border='0' alt='image' width='600' height='400'/>
              </a>
              <p>We are happy to inform you that we have approved your request.</p>
              <p>Please reach out to our customer care at 1800-014-007 incase if you have any queries</p>
              <p>Thank you for choosing our services!</p>
              <br>
              <p style='color: #888;'>Warm regards,<br>The Insurance Team</p>
              </body></html>`,
      },
      Rejected: {
        subject: 'Your Request Has Been Rejected',
        html: `<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
              <a href='https://postimages.org/' target='_blank'>
                <img src= "/intellishield-logo.png" border='0' alt='image' width='600' height='400'/>
              </a>
              <p>We regret to inform you that your request has been rejected.</p>
              <p><strong>Reason : </strong>${Comment}</p>
              <p>Please reach out to our customer care at 1800-014-007 incase if you have any queries</p>
              <p>Thank you for choosing our services!</p>
              <br>
              <p style='color: #888;'>Warm regards,<br>The Insurance Team</p>
              </body></html>`,
      },
      'Waiting For Approval': {
        subject: 'More Information Required',
        html: `<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
              <h2>Thank You for Your Interest!</h2>
              <a href='https://postimages.org/' target='_blank'>
                <img src= "/intellishield-logo.png" border='0' alt='image' width='600' height='400'/>
              </a>
              <p>Please provide additional information to process your request.'</p>
              <p><strong>Reason : </strong>${Comment}</p>
              <p>Please reach out to our customer care at 1800-014-007 incase if you have any queries</p>
              <p>Thank you for choosing our services!</p>
              <br>
              <p style='color: #888;'>Warm regards,<br>The Insurance Team</p>
              </body></html>`,
      },
    };
  
  
    const { subject, html } = emailDetails[Status] || {};
  
    if (!subject || !html) {
      console.error('Invalid status for email notification.');
      return;
    }
  
    try {
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserEmail, subject, html }),
      });
  
      const result = await emailResponse.json();
  
      if (emailResponse.ok) {
        alert(result.message);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };
  
  const handleRedirect = () => {
    router.push('/alltickets');
  };

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
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Ticket ID</strong></TableCell>
              <TableCell><strong>User Email</strong></TableCell>
              <TableCell><strong>Policy Number</strong></TableCell>
              {props.page === 'alltickets' && <TableCell><strong>Type</strong></TableCell>}
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.TicketNumber}>
                <TableCell>{ticket.TicketNumber}</TableCell>
                <TableCell>{ticket.UserEmail}</TableCell>
                <TableCell>{ticket.PolicyNumber}</TableCell>
                {props.page === 'alltickets' && <TableCell>{ticket.CategorisationType}</TableCell>}
                <TableCell>{ticket.Status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenModal(ticket)}
                    style={{textTransform : "none", width :"6rem"}}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {tickets.length >= 4 && props.page === 'dashboard' && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleRedirect}>
            View All Tickets
          </Button>
        </Box>
      )}

      {/* Integrate the TicketModal */}
      <TicketModal
        open={open}
        onClose={handleCloseModal}
        ticket={selectedTicket}
        onStatusUpdate={handleStatusUpdate}
      />
    </Box>
  );
};

export default Tickets;
