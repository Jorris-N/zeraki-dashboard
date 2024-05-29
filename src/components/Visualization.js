import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchTargets } from '../services/api';

const Visualization = () => {
  const [targets, setTargets] = useState({
    analytics: { target: 0, achieved: 0 },
    finance: { target: 0, achieved: 0 },
    timetable: { target: 0, achieved: 0 }
  });

  useEffect(() => {
    fetchTargets().then(data => setTargets(data));
  }, []);

  const getChartData = (target) => ({
    labels: ['Achieved', 'Remaining'],
    datasets: [
      {
        data: [target.achieved, target.target - target.achieved],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(targets).map(([key, targetData]) => (
        <div key={key} className="bg-white shadow-md p-4">
          <h3 className="text-xl mb-4">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
          <Pie data={getChartData(targetData)} />
        </div>
      ))}
    </div>
  );
};

export default Visualization;
