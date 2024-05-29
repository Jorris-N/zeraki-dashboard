import React from 'react'
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const SchoolDetails = ({ school }) => {
  return (
    <Card className="bg-white shadow-md">
    <CardContent>
      <Typography variant="h5" component="div">{school.name}</Typography>
      <Typography variant="body2">Type: {school.type}</Typography>
      <Typography variant="body2">Products: {school.products.join(', ')}</Typography>
      <Typography variant="body2">County: {school.county}</Typography>
      <Typography variant="body2">Registration Date: {school.registrationDate}</Typography>
      <Typography variant="body2">Contact: {school.contactInfo}</Typography>
      <Typography variant="h6" component="div">Balance: {school.balance}</Typography>
      
      <Typography variant="h6" component="div" className="mt-4">Invoices:</Typography>
      <List>
        {school.invoices.map(invoice => (
          <ListItem key={invoice.id}>
            <ListItemText primary={`Item: ${invoice.item}, Amount: ${invoice.amount}, Due: ${invoice.dueDate}, Status: ${invoice.status}`} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" component="div" className="mt-4">Collections:</Typography>
      <List>
        {school.collections.map(collection => (
          <ListItem key={collection.id}>
            <ListItemText primary={`Invoice ID: ${collection.invoiceId}, Amount: ${collection.amount}, Date: ${collection.date}, Status: ${collection.status}`} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
  )
}

export default SchoolDetails