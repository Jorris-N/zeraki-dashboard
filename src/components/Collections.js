import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { fetchCollections } from '../services/api';

const Collections = ({ schoolId }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections(schoolId).then(data => setCollections(data));
  }, [schoolId]);

  return (
    <div>
      <Typography variant="h6" component="div">Collections</Typography>
      <List>
        {collections.map(collection => (
          <ListItem key={collection.id}>
            <ListItemText primary={`Invoice ID: ${collection.invoiceId}, Amount: ${collection.amount}, Date: ${collection.date}, Status: ${collection.status}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Collections;
