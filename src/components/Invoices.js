import React from 'react';
import { useState, useEffect } from 'react'
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } from '../services/api';
import { Card, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Invoices = ({ schoolId }) => {
  const [invoices, setInvoices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({ item: '', amount: '', dueDate: '' });

  useEffect(() => {
    fetchInvoices(schoolId).then(data => setInvoices(data));
  }, [schoolId]);

  const handleCreateInvoice = () => {
    createInvoice(schoolId, invoiceForm).then(newInvoice => {
      setInvoices([...invoices, newInvoice]);
      setIsDialogOpen(false);
    });
  };

  const handleUpdateInvoice = (id, updates) => {
    updateInvoice(id, updates).then(updatedInvoice => {
      setInvoices(invoices.map(invoice => invoice.id === id ? updatedInvoice : invoice));
    });
  };

  const handleDeleteInvoice = (id) => {
    deleteInvoice(id).then(() => {
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>Add Invoice</Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add Invoice</DialogTitle>
        <DialogContent>
          <TextField label="Item" value={invoiceForm.item} onChange={(e) => setInvoiceForm({ ...invoiceForm, item: e.target.value })} fullWidth />
          <TextField label="Amount" type="number" value={invoiceForm.amount} onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: e.target.value })} fullWidth />
          <TextField label="Due Date" type="date" value={invoiceForm.dueDate} onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateInvoice}>Add</Button>
        </DialogActions>
      </Dialog>

      {invoices.map(invoice => (
        <Card key={invoice.id} className="bg-white shadow-md mt-4">
          <CardContent>
            <Typography variant="h6" component="div">{invoice.item}</Typography>
            <Typography variant="body2">Amount: {invoice.amount}</Typography>
            <Typography variant="body2">Due Date: {invoice.dueDate}</Typography>
            <Typography variant="body2">Status: {invoice.status}</Typography>
            <Button variant="contained" color="secondary" onClick={() => handleUpdateInvoice(invoice.id, { status: 'Paid' })}>Mark as Paid</Button>
            <Button variant="contained" color="error" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Invoices;
