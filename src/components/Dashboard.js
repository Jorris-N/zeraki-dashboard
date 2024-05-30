import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import SignupOverview from './SignupOverview';
import InvoiceList from './InvoicesList';
import { fetchMetrics, fetchTargets, fetchSignups } from '../services/api';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [targets, setTargets] = useState(null);
  const [signups, setSignups] = useState(null);

  useEffect(() => {
    fetchMetrics().then(data => setMetrics(data));
    fetchTargets().then(data => setTargets(data));
    fetchSignups().then(data => {
      console.log("Fetched signups:", data);
      setSignups(data);
    });
  }, []);

  if (!metrics || !targets || !signups) {
    return <CircularProgress />;
  }

  const pieData = (data) => ({
    labels: ['Target Achieved', 'Remaining Target'],
    datasets: [
      {
        data: [data.achieved, data.target - data.achieved],
        backgroundColor: ['#00C49F', '#FFBB28'],
      },
    ],
  });

  return (
    <div className="p-6">
      <Grid container spacing={4}>
        {/* Top Card Metrics */}
        <Grid item xs={12} md={3}>
          <Card className="bg-white shadow-md">
            <CardContent>
              <Typography sx={{ textAlign: 'center', fontWeight: 'semi-bold' }} variant="h6" component="div">Collections</Typography>
              <Typography variant="h4" component="div">{metrics.collections}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="bg-white shadow-md">
            <CardContent>
              <Typography variant="h6" component="div">Sign-ups</Typography>
              <Typography variant="h4" component="div">{metrics.signups}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="bg-white shadow-md">
            <CardContent>
              <Typography variant="h6" component="div">Total Revenue</Typography>
              <Typography variant="h4" component="div">${metrics.revenue}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="bg-white shadow-md">
            <CardContent>
              <Typography variant="h6" component="div">Bounced Cheques</Typography>
              <Typography variant="h4" component="div">{metrics.bounced}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Targets Visualization */}
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" component="div">Zeraki Analytics Targets</Typography>
            <Pie data={pieData(targets.analytics)} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" component="div">Zeraki Finance Targets</Typography>
            <Pie data={pieData(targets.finance)} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" component="div">Zeraki Timetable Targets</Typography>
            <Pie data={pieData(targets.timetable)} />
          </Paper>
        </Grid>

        {/* Sign-ups Overview */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h6" component="div">Sign-ups Overview</Typography>
            <SignupOverview signups={signups} />
          </Paper>
        </Grid>

        {/* Upcoming Invoices */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <InvoiceList />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
