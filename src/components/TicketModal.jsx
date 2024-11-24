import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

const TicketModal = ({ open, onClose, ticket, onStatusUpdate }) => {
  const [status, setStatus] = useState(ticket?.Status || '');
  const [comment, setComment] = useState();

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleUpdateApproval = (value) => {
    onStatusUpdate({ ...ticket, Status: value.Status, Comment: comment },"sendEmail");
    onClose(); // Close the modal after the update
  };

  const handleUpdateStatus = () => {
    onStatusUpdate({ ...ticket, Status: status, Comment: comment },"statusUpdate");
    onClose(); // Close the modal after the update
  };

  

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="ticket-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="ticket-modal-title" variant="h6" component="h2" mb={2}>
          Ticket Details
        </Typography>
        <Typography>ID: {ticket?.TicketNumber}</Typography>
        <Typography>User Email: {ticket?.UserEmail}</Typography>
        <Typography>Policy Number: {ticket?.PolicyNumber}</Typography>
        <Typography>Status: {ticket?.Status}</Typography>
        <Typography>Type: {ticket?.CategorisationType}</Typography>
        <Box mt={2}>
          {ticket?.Status === 'Waiting For Approval' ? (
            <>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                value={comment}
                onChange={handleCommentChange}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateApproval({ ...ticket, Status: 'Resolved' })}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleUpdateApproval({ ...ticket, Status: 'Rejected' })}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleUpdateApproval({ ...ticket, Status: 'Waiting For Approval' })}
                >
                  Send Email
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Select
                fullWidth
                value={status}
                onChange={handleStatusChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Waiting For Approval">Waiting For Approval</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
              <TextField
                label="Comment"
                multiline
                rows={3}
                fullWidth
                value={comment}
                onChange={handleCommentChange}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpdateStatus}
              >
                Update
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default TicketModal;
