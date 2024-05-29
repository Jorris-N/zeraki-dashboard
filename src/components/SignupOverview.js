import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchSignups } from '../services/api';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SignupOverview = () => {
  const [signups, setSignups] = useState(null);
  const [selectedBar, setSelectedBar] = useState(null);

  useEffect(() => {
    fetchSignups().then(data => setSignups(data));
  }, []);

  const getChartData = (product) => ({
    labels: ['Primary', 'Secondary', 'IGCSE'],
    datasets: [
      {
        label: 'Sign-ups',
        data: [signups[product]?.primary || 0, signups[product]?.secondary || 0, signups[product]?.igcse || 0],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  });

  const options = {
    responsive: true,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const datasetIndex = elements[0].datasetIndex;
        const schoolType = ['primary', 'secondary', 'igcse'][index];
        const product = ['analytics', 'finance', 'timetable'][datasetIndex];
        setSelectedBar({ product, schoolType });
      }
    },
  };

  const renderDetails = () => {
    if (!selectedBar) return null;

    const { product, schoolType } = selectedBar;
    return (
      <div className="p-4 bg-white shadow-md mt-4">
        <h4 className="text-lg">Details for {product.charAt(0).toUpperCase() + product.slice(1)} - {schoolType.charAt(0).toUpperCase() + schoolType.slice(1)}</h4>
        <p>Sign-ups: {signups[product]?.[schoolType]}</p>
      </div>
    );
  };

  if (!signups) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['analytics', 'finance', 'timetable'].map(product => (
          <div key={product} className="bg-white shadow-md p-4">
            <h3 className="text-xl mb-4">{product.charAt(0).toUpperCase() + product.slice(1)}</h3>
            <Bar data={getChartData(product)} options={options} />
          </div>
        ))}
      </div>
      {renderDetails()}
    </div>
  );
};

export default SignupOverview;
