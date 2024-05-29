import React from 'react';
import { useEffect, useState } from 'react'
import { fetchCollections, updateCollectionStatus } from '../services/api';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Collections = ({ schoolId }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections(schoolId).then(data => setCollections(data));
  }, [schoolId]);

  const handleUpdateStatus = (id, status) => {
    updateCollectionStatus(id, status).then(updatedCollection => {
      setCollections(collections.map(collection => collection.id === id ? updatedCollection : collection));
    });
  };

  return (
    <div>
      {collections.map(collection => (
        <Card key={collection.id} className="bg-white shadow-md mt-4">
          <CardContent>
            <Typography variant="h6" component="div">Invoice ID: {collection.invoiceId}</Typography>
            <Typography variant="body2">Amount: {collection.amount}</Typography>
            <Typography variant="body2">Date: {collection.date}</Typography>
            <Typography variant="body2">Status: {collection.status}</Typography>
            <Button variant="contained" color="secondary" onClick={() => handleUpdateStatus(collection.id, 'Valid')}>Mark as Valid</Button>
            <Button variant="contained" color="error" onClick={() => handleUpdateStatus(collection.id, 'Bounced')}>Mark as Bounced</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Collections;
