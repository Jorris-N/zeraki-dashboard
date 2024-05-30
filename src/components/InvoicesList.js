import React, { useEffect, useState } from 'react';
import { fetchUpcomingInvoices } from '../services/api'; // Adjust the import path if necessary
import { Button, Modal, Box, Typography, List, ListItem, ListItemText, TextField, Grid } from '@mui/material';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    paymentMethod: '',
    paymentDate: '',
  });

  useEffect(() => {
    fetchUpcomingInvoices().then(data => {
      const sortedInvoices = data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setInvoices(sortedInvoices);
    });
  }, []);

  const handleOpen = (invoice) => {
    setSelectedInvoice(invoice);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInvoice(null);
    setPaymentDetails({
      amount: '',
      paymentMethod: '',
      paymentDate: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePayment = async () => {
    const paymentData = {
      invoiceId: selectedInvoice.id,
      ...paymentDetails,
    };
  
    try {
      const response = await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
  
      if (response.ok) {
        // Handle successful payment
        console.log('Payment successful:', paymentData);
      } else {
        // Handle error
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  
    handleClose();
  };
  

  return (
    <div>
      <Typography variant="h6" component="div">Upcoming Invoices</Typography>
      <List>
        {invoices.map(invoice => (
          <ListItem key={invoice.id} className="invoice-item">
            <ListItemText
              primary={invoice.schoolName}
              secondary={`Amount Due: Kes ${invoice.amountDue}, Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`}
            />
            <Button variant="contained" color="primary" onClick={() => handleOpen(invoice)}>Collect Payment</Button>
          </ListItem>
        ))}
      </List>

      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6">Collect Payment</Typography>
          {selectedInvoice && (
            <div>
              <Typography variant="body1">School: {selectedInvoice.schoolName}</Typography>
              <Typography variant="body1">Amount Due: Kes {selectedInvoice.amountDue}</Typography>
              <form>
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Amount"
                      name="amount"
                      value={paymentDetails.amount}
                      onChange={handleInputChange}
                      variant="outlined"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Payment Method"
                      name="paymentMethod"
                      value={paymentDetails.paymentMethod}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Payment Date"
                      name="paymentDate"
                      value={paymentDetails.paymentDate}
                      onChange={handleInputChange}
                      variant="outlined"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handlePayment}>Confirm Payment</Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default InvoiceList;
