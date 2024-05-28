import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { fetchSchools } from '../services/api';

const Schools = ({ onSelectSchool }) => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchSchools().then(data => setSchools(data));
  }, []);

  return (
    <List>
      {schools.map(school => (
        <ListItemButton key={school.id} onClick={() => onSelectSchool(school)}>
          <ListItemText primary={school.name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default Schools;
