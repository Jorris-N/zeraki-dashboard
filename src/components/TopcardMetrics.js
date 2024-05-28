import React from 'react'
import { useEffect, useState } from 'react'
import { fetchMetrics } from '../services/api'
import { Card, CardContent, Typography } from '@mui/material';

const TopcardMetrics = () => {
    const [metrics, setMetrics] = useState ({ collections: 0, signups: 0, revenue: 0, bounced: 0 });

    useEffect (()=> {
        fetchMetrics().then (data => setMetrics(data));
    }, []);

  return (
    <div className='grid lg:grid-cols-4 gap-4'>
        {Object.entries(metrics).map(([key, value]) => (
        <Card key={key} className="bg-white shadow-md">
          <CardContent>
            <Typography variant="h5" component="div">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
            <Typography variant="h4">{value}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default TopcardMetrics