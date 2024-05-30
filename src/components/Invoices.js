import React, { useState, useEffect, useCallback } from 'react';
import { List, ListItem, ListItemText, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice, addCollection } from '../services/api';

const Invoices = ({ schoolId }) => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filter, setFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({
    item: '',
    amount: 0,
    dueDate: new Date().toISOString().split('T')[0],
  });
  const [openCollectionDialog, setOpenCollectionDialog] = useState(false);
  const [collectionData, setCollectionData] = useState({
    invoiceId: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const fetchInvoiceData = useCallback(async () => {
    const data = await fetchInvoices(schoolId);
    setInvoices(data);
    setFilteredInvoices(data);
  }, [schoolId]);

  useEffect(() => {
    fetchInvoiceData();
  }, [fetchInvoiceData]);

  const filterInvoices = useCallback(() => {
    if (filter === 'all') {
      setFilteredInvoices(invoices);
    } else if (filter === 'completed') {
      setFilteredInvoices(invoices.filter(invoice => invoice.status === 'Paid'));
    } else {
      setFilteredInvoices(invoices.filter(invoice => invoice.status !== 'Paid'));
    }
  }, [filter, invoices]);

  useEffect(() => {
    filterInvoices();
  }, [filterInvoices]);

  const handleCreateInvoice = async () => {
    await createInvoice(schoolId, newInvoiceData);
    fetchInvoiceData();
    setOpenDialog(false);
    setNewInvoiceData({ item: '', amount: 0, dueDate: new Date().toISOString().split('T')[0] });
  };

  const handleUpdateInvoice = async (invoiceId, updatedData) => {
    await updateInvoice(schoolId, invoiceId, updatedData);
    fetchInvoiceData();
  };

  const handleDeleteInvoice = async (invoiceId) => {
    await deleteInvoice(schoolId, invoiceId);
    fetchInvoiceData();
  };

  const handleAddCollection = async () => {
    await addCollection(schoolId, collectionData.invoiceId, collectionData);
    fetchInvoiceData();
    setOpenCollectionDialog(false);
    setCollectionData({ invoiceId: '', amount: 0, date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div>
      <Typography variant="h6" component="div">Invoices</Typography>
      <FormControl>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={() => setOpenDialog(true)}>Create Invoice</Button>

      <List>
        {filteredInvoices.map(invoice => (
          <ListItem key={invoice.id}>
            <ListItemText primary={`Invoice #: ${invoice.number}, Item: ${invoice.item}, Amount: ${invoice.amount}, Paid Amount: ${invoice.paidAmount}, Balance: ${invoice.balance}, Due Date: ${invoice.dueDate}, Status: ${invoice.status}`} />
            <Button onClick={() => handleUpdateInvoice(invoice.id, { status: 'Paid' })}>Mark Paid</Button>
            <Button onClick={() => handleDeleteInvoice(invoice.id)}>Delete</Button>
            <Button onClick={() => {
              setCollectionData({ ...collectionData, invoiceId: invoice.id });
              setOpenCollectionDialog(true);
            }}>Add Collection</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Invoice</DialogTitle>
        <DialogContent>
          <TextField
            label="Item"
            value={newInvoiceData.item}
            onChange={(e) => setNewInvoiceData({ ...newInvoiceData, item: e.target.value })}
          />
          <TextField
            label="Amount"
            type="number"
            value={newInvoiceData.amount}
            onChange={(e) => setNewInvoiceData({ ...newInvoiceData, amount: e.target.value })}
          />
          <TextField
            label="Due Date"
            type="date"
            value={newInvoiceData.dueDate}
            onChange={(e) => setNewInvoiceData({ ...newInvoiceData, dueDate: e.target.value })}
          />
          <Button onClick={handleCreateInvoice}>Create</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={openCollectionDialog} onClose={() => setOpenCollectionDialog(false)}>
        <DialogTitle>Add Collection</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={collectionData.amount}
            onChange={(e) => setCollectionData({ ...collectionData, amount: e.target.value })}
          />
          <TextField
            label="Date"
            type="date"
            value={collectionData.date}
            onChange={(e) => setCollectionData({ ...collectionData, date: e.target.value })}
          />
          <Button onClick={handleAddCollection}>Add Collection</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invoices;
