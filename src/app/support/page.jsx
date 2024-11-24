'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SupportPage = () => {
  const faqs = [
    
        {
          question: 'How can I check the status of my claim?',
          answer:
            'You can check the status of your claim by emailing us with your ticket number. We will try to reach out as early as possible.',
        },
        {
          question: 'What documents are required to submit a claim?',
          answer:
            'Documents like your policy, hospital bills, doctors prescription, and discharge summary are typically required.',
        },
        {
          question: 'How do I update my contact details?',
          answer:
            'You can update your contact details by sending us an email at intellishieldinsurance@gmail.com.',
        },
        {
          question: 'How can I renew my policy?',
          answer:
            'You can renew your policy by sending us an email with your policy number.',
        },
        {
          question: 'What happens if I miss my premium payment?',
          answer:
            'If you miss a premium payment, you can still pay within the grace period to keep your policy active. Email us for more details.',
        },
        {
          question: 'What are the options for health insurance plans?',
          answer:
            'We offer individual, family, and critical illness insurance plans. Email us to get a personalized recommendation.',
        },
        {
          question: 'How do I file a complaint?',
          answer:
            'You can file a complaint by emailing us at intellishieldinsurance@gmail.com. with your issue details. We will respond within 3-5 business days.',
        },
        {
          question: 'How do I add a new dependent to my policy?',
          answer:
            'To add a new dependent, email us with their details and any necessary supporting documents.',
        },
        {
          question: 'What is the process for canceling my policy?',
          answer:
            'To cancel your policy, email us at intellishieldinsurance@gmail.com. with your policy number and reason for cancellation.',
        },
 
      
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {/* Introduction */}
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          Support Center
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="textSecondary">
          We are here to help you with your health insurance needs.
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Whether you have questions about your policy, need help with claims, or want assistance with your account, our team is here to support you.
        </Typography>
      </Paper>

      {/* Contact Information */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Contact Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography>1800-014-007 (Available 24/7)</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography>intellishieldinsurance@gmail.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography>Madhapur, Hyderabad, India</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* FAQs */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default SupportPage;
