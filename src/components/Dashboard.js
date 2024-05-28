import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { fetchMetrics, fetchTargets, fetchSignups } from '../services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [targets, setTargets] = useState(null);
  const [signups, setSignups] = useState(null);

  useEffect(() => {
    fetchMetrics().then(data => setMetrics(data));
    fetchTargets().then(data =>{console.log("Fetched targets:", data); setTargets(data)});
    fetchSignups().then(data => setSignups(data));
  }, []);

  if (!metrics || !targets || !signups) {
    return <CircularProgress />;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6">
      <Grid container spacing={4}>
        {/* Top Card Metrics */}
        <Grid item xs={12} md={3}>
          <Card className="bg-white shadow-md">
            <CardContent>
              <Typography variant="h6" component="div">Collections</Typography>
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
            <PieChart width={200} height={200}>
            <Pie
                data={Object.entries(targets.analytics).map(([key, value]) => ({ name: key, value: value }))}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
            >
                {Object.entries(targets.analytics).map(([key, entry], index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            </PieChart>
        </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" component="div">Zeraki Finance Targets</Typography>
            <PieChart width={200} height={200}>
              <Pie
                data={Object.entries(targets.finance).map(([key, value]) => ({ name: key, value: value }))}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
              >
                {Object.entries(targets.finance).map(([key, entry], index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" component="div">Zeraki Timetable Targets</Typography>
            <PieChart width={200} height={200}>
              <Pie
                data={Object.entries(targets.timetable).map(([key, value]) => ({ name: key, value: value }))}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
              >
                {Object.entries(targets.timetable).map(([key, entry], index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>

        {/* Signups Overview */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h6" component="div">Sign-ups Overview</Typography>
            <BarChart
              width={600}
              height={300}
              data={Object.entries(signups).map(([key, value]) => ({ name: key, ...value }))}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="primary" fill="#8884d8" />
              <Bar dataKey="secondary" fill="#82ca9d" />
              <Bar dataKey="igcse" fill="#ffc658" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
