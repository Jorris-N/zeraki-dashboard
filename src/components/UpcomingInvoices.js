import React from 'react'
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { fetchUpcomingInvoices } from '../services/api';

const UpcomingInvoices = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
      fetchUpcomingInvoices().then(data => setInvoices(data));
    }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {invoices.map(invoice => (
        <Card key={invoice.schoolName} className="bg-white shadow-md">
          <CardContent>
            <Typography variant="h5" component="div">{invoice.schoolName}</Typography>
            <Typography variant="body2">Amount Due: {invoice.amountDue}</Typography>
            <Typography variant="body2">Due Date: {invoice.dueDate}</Typography>
            <Button variant="contained" color="primary" className="mt-2">Collect Payment</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default UpcomingInvoices